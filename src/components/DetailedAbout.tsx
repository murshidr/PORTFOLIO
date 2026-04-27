"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const skills = {
  "AI / ML Frameworks": ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "HuggingFace Transformers", "LangChain"],
  "LLM & Architecture": ["RAG", "MCP", "LLM Prompting & Fine-tuning", "Groq API", "Llama 3.3 70B", "Agentic Systems"],
  "ML Architectures": ["TCN", "LSTM", "CNN", "Bayesian Optimization", "Collaborative Filtering"],
  "Backend & APIs": ["FastAPI", "Flask", "WebSockets", "REST API Design", "JWT", "OAuth 2.0"],
  "Frontend": ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Query"],
  "Databases & Infra": ["Supabase", "PostgreSQL", "SQLite", "Redis", "Vercel", "Docker"],
};

const experience = [
  {
    role: "AI Research Engineer",
    company: "Dr. M.G.R ACS Space Technology Centre",
    period: "2024 – Present",
    points: [
      "Led AI-driven combustion instability prediction research achieving 92% accuracy.",
      "Engineered end-to-end payload integration workflows for CubeSat missions.",
      "Reduced chamber pressure prediction error by 18% through behavior analysis."
    ]
  }
];

export default function DetailedAbout() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-32">
      {/* Intro Section */}
      <section className="grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal direction="up" delay={0.1} className="order-2 md:order-1">
          <h1 className="text-5xl md:text-7xl font-serif text-espresso leading-[0.9] mb-8">
            AI Research Engineer <br />
            <span className="italic font-light">Applied Systems.</span>
          </h1>
          <div className="space-y-8">
            <p className="text-xl md:text-2xl font-light text-espresso leading-relaxed">
              B.Tech CS (Data Science & AI) student with a focus on deep learning for aerospace, 
              LLM-powered agentic systems, and real-time AI pipelines.
            </p>
            <p className="text-espresso/70 font-light leading-relaxed">
              I've spent my time building SENTINEL—an LLM commitment extraction platform—and developing 
              Temporal Convolutional Networks that predict combustion instability in rocket engines. 
              I think at the intersection of intelligence and performance.
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.3} className="order-1 md:order-2">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto group">
            <div className="absolute inset-0 bg-clay/10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            <div className="relative w-full h-full overflow-hidden border border-sand/30">
              <Image
                src="/profile.jpeg"
                alt="Murshid R."
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                priority
              />
              <div className="absolute inset-0 bg-espresso/10 mix-blend-overlay" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Education Section */}
      <section className="space-y-12">
        <ScrollReveal direction="up">
          <h2 className="text-sm font-serif italic text-clay uppercase tracking-[0.2em]">Education</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-16 border-t border-sand/30 pt-8">
          <ScrollReveal direction="up" delay={0.1}>
            <h3 className="text-2xl font-serif text-espresso">Dr. M.G.R Educational and Research Institute</h3>
            <p className="text-sand uppercase tracking-widest text-[10px] mt-2">B.Tech — CSE (DS & AI) · 2023 – Present</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
             <div className="space-y-4">
                <p className="text-espresso font-light">Current GPA: <span className="font-semibold text-clay text-xl">8.60</span>/10.00</p>
                <div className="flex items-end space-x-2 h-16">
                  {[7.38, 7.71, 8.14, 8.60].map((gpa, i) => (
                    <div key={i} className="flex-1 bg-sand/20 group relative" style={{ height: `${(gpa/10)*100}%` }}>
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-bold">{gpa}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-sand uppercase tracking-widest">GPA Trajectory · Semester 1 to 4</p>
             </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section className="space-y-12">
        <ScrollReveal direction="up">
          <h2 className="text-sm font-serif italic text-clay uppercase tracking-[0.2em]">Expertise</h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-sand/30 pt-8">
          {Object.entries(skills).map(([category, items], i) => (
            <ScrollReveal key={category} direction="up" delay={0.1 + i * 0.05}>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item} className="text-espresso text-sm font-light hover:text-clay transition-colors">{item}</li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-12">
        <ScrollReveal direction="up">
          <h2 className="text-sm font-serif italic text-clay uppercase tracking-[0.2em]">Experience</h2>
        </ScrollReveal>
        <div className="space-y-16 border-t border-sand/30 pt-8">
          {experience.map((exp, i) => (
            <ScrollReveal key={i} direction="up" delay={0.2}>
              <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                <div>
                  <h3 className="text-2xl font-serif text-espresso">{exp.company}</h3>
                  <p className="text-sand text-xs uppercase tracking-widest mt-1">{exp.role}</p>
                  <p className="text-sand text-[10px] mt-4 italic">{exp.period}</p>
                </div>
                <ul className="space-y-4">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-espresso font-light leading-relaxed flex items-start">
                      <span className="text-clay mr-4">·</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
