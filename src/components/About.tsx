export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-indigo-600 font-mono text-sm mb-4 tracking-widest uppercase">About</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Building solutions, leading teams.
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              I&apos;m a Solution Engineering Leader with a passion for translating
              technical complexity into clear, actionable strategies that drive business growth.
            </p>
            <p>
              I specialize in working at the intersection of technology and business —
              partnering with sales, product, and engineering to design solutions
              that win customers and scale with them.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Leadership", value: "Teams & orgs" },
            { label: "Focus", value: "Solutions Eng" },
            { label: "Approach", value: "Customer-first" },
            { label: "Stack", value: "Full-stack" },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-gray-900 font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
