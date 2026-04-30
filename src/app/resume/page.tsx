"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import Contact from "@/components/Contact";

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

const education = [
  {
    institution: "Dr. M.G.R Educational and Research Institute",
    degree: "B.Tech — CSE (DS & AI)",
    period: "2023 – Present",
    gpa: "8.60/10.00"
  }
];

export default function ResumePage() {
  return (
    <main className="bg-cream min-h-screen text-espresso">
      <Nav />
      
      <div className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-sand/30 pb-12 mb-20 gap-8">
            <div className="space-y-2">
              <p className="font-serif italic text-sm text-clay uppercase tracking-[0.3em]">Curriculum Vitae</p>
              <h1 className="text-6xl md:text-8xl font-serif font-light leading-none">Murshid R.</h1>
              <p className="text-sand font-sans text-xs uppercase tracking-[0.2em] font-medium mt-4">AI Research Engineer · Applied Systems</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-xs uppercase tracking-widest text-espresso/60">Chennai, India</p>
              <p className="text-xs uppercase tracking-widest text-espresso/60">murshidreyas@gmail.com</p>
              <p className="text-xs uppercase tracking-widest text-espresso/60">+91 8939043919</p>
            </div>
          </div>
        </ScrollReveal>

        {/* The Narrative */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">01. The Narrative</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-2xl md:text-3xl font-serif font-light leading-relaxed text-balance">
               Building systems that don't just process data, but understand <span className="italic">intent.</span> Specializing in deep learning for aerospace and LLM-powered agentic workflows.
            </p>
          </ScrollReveal>
        </section>

        {/* The Track Record */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">02. The Track Record</h2>
          </ScrollReveal>
          <div className="space-y-16">
            {experience.map((exp, i) => (
              <ScrollReveal key={i} direction="up" delay={0.2}>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-serif">{exp.company}</h3>
                      <p className="text-clay text-xs uppercase tracking-widest mt-1 font-medium">{exp.role}</p>
                    </div>
                    <p className="text-sand text-[10px] uppercase tracking-widest font-bold">{exp.period}</p>
                  </div>
                  <ul className="space-y-3">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-espresso/80 font-light leading-relaxed flex items-start text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-sand/40 mt-1.5 mr-4 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* The Knowledge */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">03. The Knowledge</h2>
          </ScrollReveal>
          <div className="space-y-12">
            {education.map((edu, i) => (
              <ScrollReveal key={i} direction="up" delay={0.2}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif">{edu.institution}</h3>
                    <p className="text-clay text-xs uppercase tracking-widest mt-1 font-medium">{edu.degree}</p>
                    <p className="text-espresso/60 text-xs mt-4">Current GPA: <span className="text-espresso font-semibold">{edu.gpa}</span></p>
                  </div>
                  <p className="text-sand text-[10px] uppercase tracking-widest font-bold">{edu.period}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* The Toolkit */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">04. The Toolkit</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {Object.entries(skills).map(([category, items], i) => (
              <ScrollReveal key={category} direction="up" delay={0.1 + i * 0.05}>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold mb-4 border-b border-sand/10 pb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="text-espresso/70 text-[11px] uppercase tracking-wider bg-sand/5 px-2 py-1 rounded border border-sand/10">
                      {item}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Download Action */}
        <ScrollReveal direction="up" className="border-t border-sand/30 pt-20 pb-32 text-center">
          <p className="font-serif italic text-sm text-sand uppercase tracking-[0.2em] mb-8">Need a physical copy?</p>
          <Magnetic strength={0.3}>
            <a 
              href="/resume/Murshid_ATS_Resume_v4.docx" 
              download
              className="inline-flex items-center space-x-4 bg-espresso text-cream px-12 py-6 rounded-full group hover:bg-clay transition-colors duration-500"
            >
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Download Full Dossier</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform duration-500">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </Magnetic>
        </ScrollReveal>
      </div>

      <Contact />
    </main>
  );
}
