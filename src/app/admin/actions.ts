"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const publish = formData.get("publish") === "true";

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        published: publish,
        publishedAt: publish ? new Date() : null,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("Unique constraint")) {
      redirect(`/admin/posts/new?error=slug`);
    }
    throw err;
  }

  revalidatePath("/blog");
  if (publish) revalidatePath("/blog/" + slug);
  redirect("/admin");
}

export async function updatePost(id: string, formData: FormData) {
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) redirect("/admin");

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const publish = formData.get("publish") === "true";

  // Only set publishedAt when first publishing
  const publishedAt =
    publish && !existing.published ? new Date() : existing.publishedAt;

  try {
    await prisma.post.update({
      where: { id },
      data: { title, slug, excerpt, content, published: publish, publishedAt },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("Unique constraint")) {
      redirect(`/admin/posts/${id}/edit?error=slug`);
    }
    throw err;
  }

  revalidatePath("/blog");
  revalidatePath("/blog/" + existing.slug);
  if (slug !== existing.slug) revalidatePath("/blog/" + slug);
  redirect("/admin");
}

export async function deletePost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    select: { slug: true },
  });
  await prisma.post.delete({ where: { id } });

  revalidatePath("/blog");
  if (post?.slug) revalidatePath("/blog/" + post.slug);
  redirect("/admin");
}
