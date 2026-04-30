"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    id: "01",
    name: "SENTINEL",
    subtitle: "Execution Intelligence Platform",
    tagline: "Python · FastAPI · React 19 · Groq API · Llama 3.3 70B · Supabase",
    description: "Built end-to-end LLM-powered platform that extracts delivery commitments from Slack and Gmail, scores slip risk 0–100, and auto-alerts owners before deadlines are missed.",
  },
  {
    id: "02",
    name: "Combustion AI",
    subtitle: "Instability Prediction — Hybrid Rocket Engines",
    tagline: "Python · PyTorch · Scikit-optimize · NumPy · MATLAB",
    description: "TCN model achieving 92% accuracy for early warning of combustion instability; outperformed LSTM baselines. 8-channel sensor fusion at 1000 Hz sampling rate.",
  },
  {
    id: "03",
    name: "DocuMind",
    subtitle: "Mental State Prediction using Deep Learning",
    tagline: "Python · TensorFlow/Keras · LSTM · Scikit-learn",
    description: "Stacked LSTM for time-series classification of mental health states from social media and lifestyle metrics. Achieved 81% Recall on At_Risk class.",
  },
  {
    id: "04",
    name: "AIDEN AI",
    subtitle: "Intelligent Conversational Assistant",
    tagline: "Python · HuggingFace Transformers · Flask API · SQLite",
    description: "End-to-end conversational AI with NLP mood detection and RAG-style retrieval for adaptive academic guidance. Dual recommendation engine.",
  },
  {
    id: "05",
    name: "Ground Station",
    subtitle: "Real-Time Telemetry Dashboard",
    tagline: "Python · Flask/FastAPI · WebSockets · Plotly · SQLite",
    description: "Production-grade telemetry dashboard: 8+ sensor channels at 1000 Hz, <100ms latency. Selected for INSPACe Model Rocketry Competition national level.",
  },
  {
    id: "06",
    name: "CarbonCut",
    subtitle: "AI-Powered Waste Management",
    tagline: "Python · TensorFlow/Keras · React · Firebase",
    description: "CNN image recognition: 94% accuracy across 6+ waste categories with real-time smartphone integration. SIH 2025 national evaluation selection.",
  },
];

export default function ProjectList() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="work" className="py-40 px-6 md:px-12 max-w-7xl mx-auto overflow-visible">
      <ScrollReveal direction="up" delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-32 gap-8">
           <div className="flex items-center space-x-4">
              <div className="w-8 h-[1px] bg-clay" />
              <span className="text-label text-clay">Lookbook / Collection</span>
           </div>
           <h2 className="text-editorial-h2 text-espresso">Selected Work.</h2>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-40">
        {projects.map((project, index) => (
          <ScrollReveal
            key={project.id}
            direction="up"
            delay={0.2 + (index % 2) * 0.1}
            className={`group ${index % 3 === 0 ? "md:col-span-2" : ""}`}
          >
            <div
              className="relative border-t border-sand/30 pt-12 space-y-12 cursor-none"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                 <div className="flex items-start space-x-6">
                    <span className="text-label text-sand italic">{project.id}</span>
                    <div>
                      <h3 className="text-editorial-h2 text-espresso group-hover:text-clay transition-colors duration-700">
                        {project.name}
                      </h3>
                      <p className="text-label text-sand mt-4">{project.subtitle}</p>
                    </div>
                 </div>
                 
                 <div className="hidden md:block w-px h-12 bg-sand/20 self-center" />
                 
                 <div className="max-w-md">
                    <p className="text-espresso/70 font-light text-lg leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                      {project.description}
                    </p>
                 </div>
              </div>

              <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-1000 ease-in-out">
                 <div className="pt-12 flex flex-wrap gap-x-12 gap-y-4 items-center border-t border-sand/10">
                    <p className="text-label text-sand">Technologies</p>
                    <p className="text-sm text-espresso/60 font-light italic">{project.tagline}</p>
                 </div>
              </div>

              {/* Decorative Line */}
              <div className="absolute top-0 right-0 w-0 h-[1px] bg-clay transition-all duration-1000 group-hover:w-full" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
