import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/lib/prisma";
import { updatePost, deletePost } from "@/app/admin/actions";

export const metadata = { title: "Edit Post — Admin" };

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const { error } = await searchParams;
  const updatePostWithId = updatePost.bind(null, id);

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/admin" className="hover:text-gray-900 transition-colors">Posts</Link>
        <span>/</span>
        <span className="text-gray-900 truncate max-w-[200px]">{post.title}</span>
      </div>

      <div className="flex items-start justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit post</h1>

        {post.published && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View post →
          </Link>
        )}
      </div>

      <PostForm
        action={updatePostWithId}
        post={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          published: post.published,
        }}
        slugError={error === "slug"}
      />

      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">Danger zone</p>
        <DeleteButton action={deletePost.bind(null, id)} />
      </div>
    </div>
  );
}
