"use client";

export default function DeleteButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this post permanently? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg px-4 py-2 transition-colors"
      >
        Delete post
      </button>
    </form>
  );
}
