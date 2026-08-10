"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import Magnetic from "./Magnetic";
import { Download, Calendar, ArrowRight, Zap, Target, Award } from "lucide-react";

const stats = [
  { label: "B.Tech CGPA (Sem 4)", value: "8.60", icon: Calendar },
  { label: "AI & ML Projects", value: "08+", icon: Target },
  { label: "Awards & Honors", value: "06", icon: Award },
  { label: "Model Evaluation", value: "94%", icon: Zap },
];

export default function RecruiterStats() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-sand/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-clay/5 blur-[120px] rounded-full pointer-events-none" />

      <ScrollReveal direction="up">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-[1px] bg-clay" />
              <span className="text-label text-clay">Recruiter Quick-Scan</span>
            </div>
            
            <h2 className="text-editorial-h2 text-espresso leading-[0.9]">
              High Impact. <br />
              <span className="italic">Execution Intelligence.</span>
            </h2>
            
            <p className="text-espresso/70 font-light text-xl leading-relaxed max-w-md">
              Specialized in building end-to-end AI systems and engineering dashboards that bridge the gap between complex data and human intent.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Magnetic strength={0.3}>
                <a 
                  href="/resume/Murshid_ATS_Resume_v4.docx" 
                  download
                  className="flex items-center space-x-3 bg-espresso text-cream px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-clay transition-colors group"
                >
                  <span>Download CV</span>
                  <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                </a>
              </Magnetic>
              
              <Magnetic strength={0.3}>
                <a 
                  href="https://calendly.com/murshidcalendar/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 border border-espresso/10 text-espresso px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-espresso/5 transition-colors group"
                >
                  <span>Book a Call</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 relative z-10">
            {stats.map((stat, i) => (
              <ScrollReveal 
                key={stat.label} 
                direction="up" 
                delay={0.2 + i * 0.1}
                className="p-8 bg-cream border border-sand/20 rounded-2xl shadow-sm hover:shadow-xl hover:border-clay/40 transition-all duration-700 group cursor-default"
              >
                <div data-cursor-text="METRIC">
                  <stat.icon className="text-clay mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" size={24} />
                  <div className="text-4xl font-serif text-espresso mb-2 group-hover:text-clay transition-colors">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
