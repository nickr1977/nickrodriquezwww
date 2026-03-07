import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: Date | null;
};

export default function BlogPreview({ posts }: { posts: Post[] }) {
  return (
    <section id="blog" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="flex items-end justify-between mb-12">
          <div>
            <p className="text-indigo-600 font-mono text-sm mb-4 tracking-widest uppercase">Blog</p>
            <h2 className="text-4xl font-bold text-gray-900">Latest writing</h2>
          </div>
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            All posts →
          </Link>
        </ScrollReveal>

        {posts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-500">Posts coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-indigo-200 transition-all duration-200"
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
                <h3 className="text-gray-900 font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
              </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
