import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { isValidToken, ADMIN_COOKIE } from "@/lib/auth";

const storage = new Storage();

export async function POST(request: NextRequest) {
  // Verify admin auth
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token || !isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bucket = process.env.GCS_BUCKET;
  if (!bucket) {
    return NextResponse.json(
      { error: "GCS_BUCKET environment variable not set" },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "bin";
  const filename = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const gcsFile = storage.bucket(bucket).file(filename);

  await gcsFile.save(buffer, {
    contentType: file.type,
    metadata: { cacheControl: "public, max-age=31536000" },
  });

  const url = `https://storage.googleapis.com/${bucket}/${filename}`;
  return NextResponse.json({ url });
}
