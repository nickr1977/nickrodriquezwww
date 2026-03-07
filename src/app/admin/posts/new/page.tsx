import Link from "next/link";
import PostForm from "@/components/admin/PostForm";
import { createPost } from "@/app/admin/actions";

export const metadata = { title: "New Post — Admin" };

export default function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/admin" className="hover:text-gray-900 transition-colors">Posts</Link>
        <span>/</span>
        <span className="text-gray-900">New post</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">New post</h1>

      <SlugErrorForm searchParams={searchParams} />
    </div>
  );
}

async function SlugErrorForm({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return <PostForm action={createPost} slugError={params.error === "slug"} />;
}
