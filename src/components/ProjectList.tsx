"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    id: "01",
    name: "SENTINEL",
    subtitle: "Execution Intelligence Platform",
    tagline: "Python · FastAPI · React 19 · Groq API · Llama 3.3 70B · Supabase · Vercel",
    description: "Built end-to-end LLM-powered platform that extracts delivery commitments from Slack and Gmail, scores slip risk 0–100, and auto-alerts owners before deadlines are missed.",
    color: "#A0522D", // Clay
  },
  {
    id: "02",
    name: "Combustion AI",
    subtitle: "Instability Prediction — Hybrid Rocket Engines",
    tagline: "Python · PyTorch · Scikit-optimize · NumPy · MATLAB",
    description: "TCN model achieving 92% accuracy for early warning of combustion instability; outperformed LSTM baselines. 8-channel sensor fusion at 1000 Hz sampling rate.",
    color: "#6B4226", // Walnut
  },
  {
    id: "03",
    name: "DocuMind",
    subtitle: "Mental State Prediction using Deep Learning",
    tagline: "Python · TensorFlow/Keras · LSTM · Scikit-learn",
    description: "Stacked LSTM for time-series classification of mental health states from social media and lifestyle metrics. Achieved 81% Recall on At_Risk class.",
    color: "#1C1410", // Espresso
  },
  {
    id: "04",
    name: "AIDEN AI",
    subtitle: "Intelligent Conversational Assistant",
    tagline: "Python · HuggingFace Transformers · Flask API · SQLite",
    description: "End-to-end conversational AI with NLP mood detection and RAG-style retrieval for adaptive academic guidance. Dual recommendation engine.",
    color: "#C8A882", // Sand
  },
  {
    id: "05",
    name: "Ground Station",
    subtitle: "Real-Time Telemetry Dashboard",
    tagline: "Python · Flask/FastAPI · WebSockets · Plotly · SQLite",
    description: "Production-grade telemetry dashboard: 8+ sensor channels at 1000 Hz, <100ms latency. Selected for INSPACe Model Rocketry Competition national level.",
    color: "#A0522D",
  },
  {
    id: "06",
    name: "Data Pipeline",
    subtitle: "Enterprise Automation & Analytics",
    tagline: "Python · Pandas · NumPy · Plotly Express · Streamlit",
    description: "Fully automated Python pipeline that cleans messy CSV exports and delivers a real-time Streamlit BI dashboard with vectorized cleaning.",
    color: "#6B4226",
  },
  {
    id: "07",
    name: "Smart Attendance",
    subtitle: "Desktop Application — Admin Dashboard",
    tagline: "Python · CustomTkinter · SQLite · Pandas",
    description: "Full-featured desktop app with dual-mode architecture: Admin Dashboard + Staff Terminal. Local storage with zero server setup required.",
    color: "#1C1410",
  },
  {
    id: "08",
    name: "CarbonCut",
    subtitle: "AI-Powered Waste Management",
    tagline: "Python · TensorFlow/Keras · React · Firebase",
    description: "CNN image recognition: 94% accuracy across 6+ waste categories with real-time smartphone integration. SIH 2025 national evaluation selection.",
    color: "#C8A882",
  },
];

export default function ProjectList() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="work" className="py-20 px-6 md:px-12 max-w-7xl mx-auto overflow-visible" ref={containerRef}>
      <ScrollReveal direction="up" delay={0.1}>
        <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-12">
          selected work
        </p>
      </ScrollReveal>

      <div className="relative">
        {projects.map((project, index) => (
          <ScrollReveal
            key={project.id}
            direction="up"
            delay={0.2 + index * 0.08}
            className="group"
          >
            <div
              className="border-b border-sand/30 py-8 md:py-12 flex flex-col md:flex-row md:items-end justify-between cursor-pointer transition-all duration-300 hover:bg-[#EDE5D8]/30 group-hover:px-4 -mx-4"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex items-start space-x-6 md:space-x-12">
                <span className="font-serif italic text-sm text-sand mt-2 md:mt-4">
                  {project.id}
                </span>
                <div className="max-w-2xl">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl text-espresso group-hover:text-clay transition-colors duration-300 leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-sand font-sans font-light text-xs md:text-sm mt-2 uppercase tracking-widest">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <div className="hidden md:block text-right max-w-xs">
                <p className="text-espresso/60 text-[10px] uppercase tracking-widest font-medium">
                  Tech Stack
                </p>
                <p className="text-espresso/80 text-xs font-light mt-1">
                  {project.tagline}
                </p>
              </div>

              {/* Mobile View Detail */}
              <div className="md:hidden mt-6 overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-700 ease-in-out">
                <p className="text-espresso/80 text-sm font-light leading-relaxed mb-4">
                  {project.description}
                </p>
                <p className="text-clay text-[10px] uppercase tracking-widest font-medium">
                  {project.tagline}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Floating Preview (Desktop Only) */}
        <AnimatePresence>
          {activeProject !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                left: mousePos.x + 40,
                top: mousePos.y - 150,
                pointerEvents: "none",
                zIndex: 100,
              }}
              className="hidden lg:block w-[400px] bg-cream/95 backdrop-blur-md border border-sand/30 p-8 shadow-2xl"
            >
              <div className="space-y-6">
                 <div className="flex justify-between items-start">
                    <span className="font-serif italic text-clay text-sm">{projects[activeProject].id}</span>
                    <div className="w-12 h-[1px] bg-sand mt-3" />
                 </div>
                 <p className="text-espresso text-sm font-light leading-relaxed italic">
                    "{projects[activeProject].description}"
                 </p>
                 <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-sand font-semibold">Technologies</p>
                    <p className="text-[11px] text-espresso/70">{projects[activeProject].tagline}</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
