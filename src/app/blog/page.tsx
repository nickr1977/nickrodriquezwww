import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Nick Rodriguez",
  description: "All writing by Nick Rodriguez.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      publishedAt: true,
    },
  });

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-950 text-gray-100">
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Back link */}
            <Link
              href="/"
              className="inline-block text-sm text-gray-400 hover:text-white transition-colors mb-12"
            >
              ← Home
            </Link>

            {/* Page header */}
            <div className="mb-12">
              <p className="text-indigo-400 font-mono text-sm mb-4 tracking-widest uppercase">
                Blog
              </p>
              <h1 className="text-5xl font-bold text-white">All writing</h1>
            </div>

            {/* Post grid or empty state */}
            {posts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-gray-800 rounded-xl">
                <p className="text-gray-500">Posts coming soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-colors"
                  >
                    {post.publishedAt && (
                      <p className="text-gray-500 text-xs mb-3">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                    <h2 className="text-white font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
