"use client";

import ScrollReveal from "./ScrollReveal";

const currently = [
  { label: "Currently", value: "B.Tech CSE (AI & Data Science), MGR" },
  { label: "Working on", value: "Vynta, SENTINEL, Flowtimize 2.0" },
  { label: "Interested in", value: "AI/ML, space tech, building in public" },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <ScrollReveal direction="up" delay={0.1}>
        <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-12">
          about
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        <ScrollReveal direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-espresso leading-tight font-light">
            I build things that <br /> <span className="italic">think.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-espresso text-lg md:text-xl font-light leading-relaxed">
              I'm Murshid — a third-year CS student at MGR specialising in AI and data science. 
              I build systems that understand: from telemetry dashboards selected for national 
              competition to LLM execution platforms built at hackathons. 
            </p>
          </ScrollReveal>

          <div className="space-y-6 pt-8 border-t border-sand/30">
            {currently.map((item, i) => (
              <ScrollReveal key={item.label} direction="up" delay={0.4 + i * 0.1} className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <span className="text-sand text-xs uppercase tracking-widest font-medium md:w-32">
                  {item.label}
                </span>
                <span className="text-espresso text-base md:text-lg font-light">
                  {item.value}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
