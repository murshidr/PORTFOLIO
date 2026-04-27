"use client";

import ScrollReveal from "./ScrollReveal";

const achievements = [
  {
    year: "2026",
    title: "AMD Slingshot Hackathon",
    context: "SENTINEL Submission · Quantumstacks",
  },
  {
    year: "2025",
    title: "2nd Place, YASSC",
    context: "Mechanical Engineering Dept",
  },
  {
    year: "2025",
    title: "Runner-Up, Promptarhon AI",
    context: "AI: Beyond the Algorithm",
  },
  {
    year: "2025",
    title: "INSPACe National Selection",
    context: "Model Rocketry Competition",
  },
];

export default function Recognition() {
  return (
    <section id="recognition" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <ScrollReveal direction="up" delay={0.1}>
        <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-12">
          recognition
        </p>
      </ScrollReveal>

      <div className="space-y-0">
        {achievements.map((item, i) => (
          <ScrollReveal
            key={i}
            direction="up"
            delay={0.2 + i * 0.08}
            className="group"
          >
            <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] items-center py-6 border-b border-sand/30 group-hover:bg-[#EDE5D8]/20 transition-all duration-300 -mx-4 px-4">
              <span className="text-sand font-sans text-xs md:text-sm tracking-widest uppercase">
                {item.year}
              </span>
              <span className="text-espresso font-serif text-xl md:text-2xl group-hover:text-clay transition-colors">
                {item.title}
              </span>
              <span className="text-sand font-sans text-xs md:text-sm md:text-right italic">
                {item.context}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
