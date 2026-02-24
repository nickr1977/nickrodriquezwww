import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl w-full mx-auto">
        <p className="text-indigo-400 font-mono text-sm mb-4 tracking-widest uppercase">
          Hello, I&apos;m
        </p>
        <h1 className="text-6xl sm:text-7xl font-bold text-white leading-tight mb-4">
          Nick Rodriguez
        </h1>
        <h2 className="text-2xl sm:text-3xl font-light text-gray-400 mb-6">
          Solution Engineering Leader
        </h2>
        <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10">
          Building bridges between complex technology and real business outcomes.
          Helping teams ship products that matter.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="#about"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
          >
            About me
          </Link>
          <Link
            href="#contact"
            className="px-6 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
