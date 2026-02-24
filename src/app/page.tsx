import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nick Rodriquez",
  description: "Site in progress.",
};

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4">
          Coming soon
        </p>
        <h1 className="text-4xl font-bold text-white mb-3">Nick Rodriquez</h1>
        <p className="text-gray-500">Site in progress.</p>
      </div>
    </main>
  );
}
