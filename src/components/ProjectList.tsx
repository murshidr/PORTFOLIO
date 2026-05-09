"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import Magnetic from "./Magnetic";
import Image from "next/image";

const projects = [
  {
    id: "01",
    name: "SENTINEL",
    subtitle: "Execution Intelligence Platform",
    tagline: "Python · FastAPI · React 19 · Groq API · Llama 3.3 70B · Supabase",
    description: "Built end-to-end LLM-powered platform that extracts delivery commitments from Slack and Gmail, scores slip risk 0–100, and auto-alerts owners before deadlines are missed.",
    image: "/projects/sentinel.png"
  },
  {
    id: "02",
    name: "Combustion AI",
    subtitle: "Instability Prediction — Hybrid Rocket Engines",
    tagline: "Python · PyTorch · Scikit-optimize · NumPy · MATLAB",
    description: "TCN model achieving 92% accuracy for early warning of combustion instability; outperformed LSTM baselines. 8-channel sensor fusion at 1000 Hz sampling rate.",
    image: "/projects/combustion.png"
  },
  {
    id: "03",
    name: "DocuMind",
    subtitle: "Mental State Prediction using Deep Learning",
    tagline: "Python · TensorFlow/Keras · LSTM · Scikit-learn",
    description: "Stacked LSTM for time-series classification of mental health states from social media and lifestyle metrics. Achieved 81% Recall on At_Risk class.",
    image: "/projects/documind.png"
  },
  {
    id: "04",
    name: "AIDEN AI",
    subtitle: "Intelligent Conversational Assistant",
    tagline: "Python · HuggingFace Transformers · Flask API · SQLite",
    description: "End-to-end conversational AI with NLP mood detection and RAG-style retrieval for adaptive academic guidance. Dual recommendation engine.",
    image: "/projects/sentinel.png" // Placeholder
  },
  {
    id: "05",
    name: "Ground Station",
    subtitle: "Real-Time Telemetry Dashboard",
    tagline: "Python · Flask/FastAPI · WebSockets · Plotly · SQLite",
    description: "Production-grade telemetry dashboard: 8+ sensor channels at 1000 Hz, <100ms latency. Selected for INSPACe Model Rocketry Competition national level.",
    image: "/projects/combustion.png" // Placeholder
  },
  {
    id: "06",
    name: "CarbonCut",
    subtitle: "AI-Powered Waste Management",
    tagline: "Python · TensorFlow/Keras · React · Firebase",
    description: "CNN image recognition: 94% accuracy across 6+ waste categories with real-time smartphone integration. SIH 2025 national evaluation selection.",
    image: "/projects/documind.png" // Placeholder
  },
];

export default function ProjectList() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="work" className="py-40 px-6 md:px-12 max-w-7xl mx-auto overflow-visible relative">
      {/* Background Reveal Area */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence>
          {activeProject !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={projects[activeProject].image}
                alt={projects[activeProject].name}
                fill
                className="object-cover grayscale"
                priority
              />
              <div className="absolute inset-0 bg-cream mix-blend-multiply" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-32 gap-8 relative z-10">
           <div className="flex items-center space-x-4">
              <div className="w-8 h-[1px] bg-clay" />
              <span className="text-label text-clay">Cinematic Collection / 2025</span>
           </div>
           <h2 className="text-editorial-h2 text-espresso">The Archive.</h2>
        </div>
      </ScrollReveal>

      <div className="flex flex-col relative z-10">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group border-b border-sand/10 py-16 cursor-none relative"
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <ScrollReveal direction="up" delay={index * 0.05}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                <div className="flex items-baseline space-x-8">
                  <span className="text-label text-sand/50 italic tabular-nums">{project.id}</span>
                  <Magnetic strength={0.2}>
                    <h3 className="text-editorial-h2 text-espresso group-hover:text-clay transition-colors duration-500 whitespace-nowrap">
                      {project.name}
                    </h3>
                  </Magnetic>
                </div>

                <div className="flex-1 max-w-2xl lg:ml-auto">
                  <div className="space-y-6">
                    <p className="text-sm font-sans uppercase tracking-widest text-sand group-hover:text-clay/60 transition-colors">
                      {project.subtitle}
                    </p>
                    <p className="text-espresso/70 font-light text-lg leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                      {project.tagline.split(" · ").map((tech) => (
                        <span key={tech} className="px-3 py-1 border border-sand/20 rounded-full text-[10px] uppercase tracking-widest text-sand">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Floating Preview Image on Hover (Small) */}
            <motion.div 
              className="hidden lg:block absolute right-[20%] top-1/2 -translate-y-1/2 w-64 h-40 pointer-events-none z-20 overflow-hidden rounded-lg shadow-2xl opacity-0 group-hover:opacity-100"
              initial={{ scale: 0.8, rotate: -5 }}
              whileInView={{ scale: 1, rotate: activeProject === index ? (index % 2 === 0 ? 3 : -3) : 0 }}
              transition={{ duration: 0.6, ease: "circOut" }}
            >
               <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-espresso/20 mix-blend-overlay" />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
