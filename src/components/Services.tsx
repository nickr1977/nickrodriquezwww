import ScrollReveal from "@/components/ui/ScrollReveal";

const services = [
  {
    title: "Solution Engineering",
    description:
      "Translating complex technical capabilities into compelling customer narratives. Bridging the gap between product and market to drive meaningful outcomes.",
  },
  {
    title: "Technical Leadership",
    description:
      "Building and scaling high-performing pre-sales and solution engineering teams. Defining processes that enable consistent, repeatable execution.",
  },
  {
    title: "Strategic Consulting",
    description:
      "Advising organizations on go-to-market strategy, technical positioning, and how to win in competitive enterprise deals.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="text-indigo-600 font-mono text-sm mb-4 tracking-widest uppercase">
            Services
          </p>
          <h2 className="text-4xl font-bold text-gray-900">What I do</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 120}>
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 hover:border-indigo-200 transition-all duration-300 h-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
