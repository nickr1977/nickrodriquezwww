import Link from "next/link";
import TypeWriter from "@/components/ui/TypeWriter";
import Counter from "@/components/ui/Counter";

const stats = [
  { to: 10, suffix: "+", label: "Years experience" },
  { to: 50, suffix: "+", label: "Enterprise clients" },
  { to: 3,  suffix: "x", label: "Average team growth" },
];

export default function Hero() {
  return (
    <section className="py-32 sm:py-40 px-6">
      <div className="max-w-5xl w-full mx-auto">
        <p className="text-indigo-600 font-mono text-sm mb-4 tracking-widest uppercase">
          Hello, I&apos;m
        </p>
        <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 leading-tight mb-4">
          Nick Rodriguez
        </h1>
        <h2 className="text-2xl sm:text-3xl font-light text-gray-600 mb-6 min-h-[2.5rem]">
          <TypeWriter text="Solution Engineering Leader" />
        </h2>
        <p className="text-gray-600 text-lg max-w-xl leading-relaxed mb-10">
          Building bridges between complex technology and real business outcomes.
          Helping teams ship products that matter.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="#about"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium rounded-lg transition-all duration-200"
          >
            About me →
          </Link>
          <Link
            href="#contact"
            className="px-6 py-3 border border-gray-300 hover:border-indigo-400 hover:text-indigo-600 text-gray-700 font-medium rounded-lg transition-all duration-200"
          >
            Get in touch →
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-10 border-t border-gray-100 grid grid-cols-3 gap-8 max-w-xs sm:max-w-sm">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-gray-900">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
