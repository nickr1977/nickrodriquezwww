import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    select: { title: true, excerpt: true },
  });

  if (!post) {
    return { title: "Post Not Found — Nick Rodriguez" };
  }

  return {
    title: `${post.title} — Nick Rodriguez`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-950 text-gray-100">
        <article className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-block text-sm text-gray-400 hover:text-white transition-colors mb-12"
            >
              ← All posts
            </Link>

            {/* Post header */}
            <header className="mb-10">
              {post.publishedAt && (
                <p className="text-indigo-400 font-mono text-sm mb-4 tracking-widest uppercase">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              <h1 className="text-4xl font-bold text-white leading-tight">{post.title}</h1>
            </header>

            {/* Post content */}
            <div className="prose prose-invert prose-indigo max-w-none text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
