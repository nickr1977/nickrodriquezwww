import ScrollReveal from "@/components/ui/ScrollReveal";

const entries = [
  {
    dates: "2022 – Present",
    title: "Director of Solution Engineering",
    company: "[Company Name]",
    location: "Remote",
    description:
      "Leading a team of solution engineers across the enterprise segment. Defining pre-sales methodology, driving technical win strategy, and partnering with product on roadmap alignment.",
  },
  {
    dates: "2019 – 2022",
    title: "Senior Solution Engineer",
    company: "[Company Name]",
    location: "[City, State]",
    description:
      "Owned the technical evaluation process for strategic accounts. Built custom demos, led proof-of-concept engagements, and collaborated closely with AEs to close complex deals.",
  },
  {
    dates: "2016 – 2019",
    title: "Solution Engineer",
    company: "[Company Name]",
    location: "[City, State]",
    description:
      "Supported mid-market and enterprise sales cycles with technical discovery, product demonstrations, and RFP responses. Contributed to onboarding playbooks for new SE hires.",
  },
  {
    dates: "2013 – 2016",
    title: "Technical Pre-Sales",
    company: "[Company Name]",
    location: "[City, State]",
    description:
      "Assisted the sales team with technical qualification and product fit analysis. Delivered product presentations and built early-stage proof-of-concept environments for prospects.",
  },
];

export default function CareerTimeline() {
  return (
    <section id="timeline" className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-16">
          <p className="text-indigo-600 font-mono text-sm mb-4 tracking-widest uppercase">
            Career
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Where I&apos;ve been</h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="absolute top-0 bottom-0 w-px bg-gray-200 hidden md:block" style={{ left: "8rem" }} />

          <div className="space-y-8">
            {entries.map((entry, i) => (
              <ScrollReveal key={entry.title} delay={i * 100}>
                <div className="flex gap-8 relative">
                  {/* Date column — desktop only */}
                  <div className="w-32 shrink-0 text-right hidden md:flex items-start pt-5">
                    <span className="text-sm text-gray-500 font-mono w-full">{entry.dates}</span>
                  </div>

                  {/* Dot on the line — desktop only */}
                  <div className="hidden md:flex items-start pt-6 -ml-1.5">
                    <div className="w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-gray-50 shrink-0" />
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-indigo-200 transition-all duration-200">
                    <p className="text-indigo-600 font-mono text-xs tracking-widest uppercase mb-1 md:hidden">
                      {entry.dates}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 mb-0.5">{entry.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">
                      {entry.company} · {entry.location}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">{entry.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
