import Link from "next/link";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: Date | null;
};

export default function BlogPreview({ posts }: { posts: Post[] }) {
  return (
    <section id="blog" className="py-24 px-6 border-t border-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-indigo-400 font-mono text-sm mb-4 tracking-widest uppercase">Blog</p>
            <h2 className="text-4xl font-bold text-white">Latest writing</h2>
          </div>
          <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
            All posts →
          </Link>
        </div>

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
                <h3 className="text-white font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
