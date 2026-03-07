"use client";

import { useRef, useState } from "react";
import RichEditor from "@/components/admin/RichEditor";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
};

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostForm({
  action,
  post,
  slugError,
}: {
  action: (formData: FormData) => Promise<void>;
  post?: Post;
  slugError?: boolean;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post?.slug);

  const publishInputRef = useRef<HTMLInputElement>(null);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    if (!slugTouched) {
      setSlug(toSlug(val));
    }
  }

  function handleSubmit(publish: boolean) {
    if (publishInputRef.current) {
      publishInputRef.current.value = publish ? "true" : "false";
    }
  }

  return (
    <form action={action} className="space-y-6">
      <input ref={publishInputRef} type="hidden" name="publish" defaultValue="false" />

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={handleTitleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Post title"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
          className={`w-full border rounded-lg px-3 py-2 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${slugError ? "border-red-400" : "border-gray-300"}`}
          placeholder="post-url-slug"
        />
        {slugError && (
          <p className="mt-1 text-xs text-red-600">That slug is already in use. Choose a different one.</p>
        )}
        <p className="mt-1 text-xs text-gray-400">Will be available at /blog/{slug || "…"}</p>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          placeholder="Short description shown in blog listing"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <RichEditor name="content" defaultValue={post?.content} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          onClick={() => handleSubmit(false)}
          className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-5 rounded-lg text-sm transition-colors"
        >
          Save draft
        </button>
        <button
          type="submit"
          onClick={() => handleSubmit(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-lg text-sm transition-colors"
        >
          {post?.published ? "Update & keep published" : "Publish"}
        </button>
      </div>
    </form>
  );
}
