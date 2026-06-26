"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  tags: string[];
}

const features: Feature[] = [
  {
    id: "01",
    title: "AI & Space Technology",
    subtitle: "Combustion Instability Prediction",
    description: "Developing Temporal Convolutional Networks (TCN) to analyze rocket engine behavior, predicting combustion instability with 92% accuracy and outperforming LSTM baselines.",
    details: [
      "8-channel sensor fusion at 1000 Hz sampling rate",
      "End-to-end payload integration workflows for CubeSat missions",
      "18% reduction in chamber pressure prediction error"
    ],
    image: "/projects/combustion.png",
    tags: ["Python", "PyTorch", "NumPy", "MATLAB", "Sensor Fusion"]
  },
  {
    id: "02",
    title: "Execution Intelligence",
    subtitle: "SENTINEL Platform",
    description: "An end-to-end LLM-powered commitment extraction platform that scans emails and Slack threads, scores delivery risks, and proactively alerts owners.",
    details: [
      "Llama 3.3 70B & Groq API pipeline",
      "0–100 probability slip risk classification engine",
      "Real-time event processing via Supabase database webhooks"
    ],
    image: "/projects/sentinel.png",
    tags: ["FastAPI", "React 19", "Llama 3.3", "Supabase", "LLMs"]
  },
  {
    id: "03",
    title: "Ambient Task Scheduling",
    subtitle: "Vynta Assistant",
    description: "A smart assistant mapping natural language tasks directly onto Google Calendar based on the user's predicted daily energy states.",
    details: [
      "Natural language understanding via structured LLM parsing",
      "Adaptive scheduling (Low, Medium, High energy profiles)",
      "Syncing and event resolving using Google Calendar API"
    ],
    image: "/projects/vynta.jpg",
    tags: ["Kotlin", "Jetpack Compose", "Groq API", "SQLite"]
  },
  {
    id: "04",
    title: "Real-Time Telemetry",
    subtitle: "Ground Station Dashboard",
    description: "A high-performance telemetry dashboard selected for national evaluations, rendering high-frequency sensor streams with sub-100ms latency.",
    details: [
      "WebSocket communication rendering 8+ sensor channels",
      "Real-time data visualization via Plotly and React",
      "Engineered for INSPACe Model Rocketry Competition"
    ],
    image: "/projects/documind.png",
    tags: ["Flask", "FastAPI", "WebSockets", "Plotly", "React"]
  }
];

const svgs = [
  // 01: Orbit/Radar circle
  <svg key="0" className="w-56 h-56 text-clay" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="4 4" />
    <circle cx="50" cy="50" r="25" strokeWidth="1" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>,
  // 02: Network nodes
  <svg key="1" className="w-56 h-56 text-clay" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <path d="M20 20 L80 20 L80 80 L20 80 Z" strokeWidth="0.5" />
    <path d="M20 20 L80 80 M80 20 L20 80" strokeWidth="0.5" strokeDasharray="2 2" />
    <circle cx="20" cy="20" r="4" fill="currentColor" />
    <circle cx="80" cy="20" r="4" fill="currentColor" />
    <circle cx="80" cy="80" r="4" fill="currentColor" />
    <circle cx="20" cy="80" r="4" fill="currentColor" />
    <circle cx="50" cy="50" r="6" fill="currentColor" />
  </svg>,
  // 03: Concentric triangles
  <svg key="2" className="w-56 h-56 text-clay" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <polygon points="50,15 15,80 85,80" strokeWidth="1" />
    <polygon points="50,35 30,70 70,70" strokeWidth="0.5" strokeDasharray="3 3" />
    <circle cx="50" cy="55" r="4" fill="currentColor" />
  </svg>,
  // 04: Star / Compass
  <svg key="3" className="w-56 h-56 text-clay" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <path d="M50 10 L50 90 M10 50 L90 50" strokeWidth="1" />
    <path d="M25 25 L75 75 M75 25 L25 75" strokeWidth="0.5" strokeDasharray="2 2" />
    <polygon points="50,30 55,45 70,50 55,55 50,70 45,55 30,50 45,45" fill="currentColor" />
  </svg>
];

export default function StickyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative px-6 md:px-12 py-32 max-w-7xl mx-auto border-t border-sand/20">
      <div className="grid md:grid-cols-[1.2fr_2fr] gap-16 items-start relative">
        {/* Sticky Left Column */}
        <div className="sticky top-32 h-[calc(100vh-16rem)] flex flex-col justify-between pointer-events-none select-none z-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-[1px] bg-clay" />
              <span className="text-label text-clay">Capabilities</span>
            </div>
            <div className="h-20 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.15 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 text-[10rem] font-serif font-light leading-none text-sand"
                >
                  {features[activeIndex].id}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="h-16 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 text-xl font-sans uppercase tracking-[0.2em] font-bold text-espresso"
                >
                  {features[activeIndex].title}
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>

          {/* Morphing/Rotating SVG Vector Graphic */}
          <div className="flex items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6 }}
                >
                  {svgs[activeIndex]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="text-[10px] uppercase tracking-widest text-sand font-bold">
            01 — 04 Core Focus Areas
          </div>
        </div>

        {/* Scrolling Right Column */}
        <div className="space-y-40 md:space-y-64 pb-20">
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={idx}
              onVisible={(index) => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  onVisible: (index: number) => void;
}

function FeatureCard({ feature, index, onVisible }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Set up vertical scroll hooks for parallax scrolling
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Animate text and image at different speeds to create depth (parallax)
  const yText = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <motion.div
      ref={cardRef}
      onViewportEnter={() => onVisible(index)}
      viewport={{ amount: 0.5 }}
      className="grid gap-12 items-center min-h-[70vh] relative pt-12 md:pt-0"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Parallax Text Block */}
        <motion.div style={{ y: yText }} className="space-y-8 order-2 md:order-1">
          <div className="space-y-3">
            <span className="text-label text-sand font-bold italic">{feature.subtitle}</span>
            <h4 className="text-3xl md:text-4xl font-serif text-espresso leading-tight font-light">
              {feature.title}
            </h4>
          </div>

          <p className="text-espresso/80 font-light text-lg leading-relaxed">
            {feature.description}
          </p>

          <ul className="space-y-4 pt-4 border-t border-sand/15">
            {feature.details.map((detail, dIdx) => (
              <li key={dIdx} className="text-sm text-espresso/70 font-light flex items-start">
                <span className="text-clay mr-3 font-serif">/</span>
                {detail}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-4">
            {feature.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-sand/20 text-[10px] uppercase tracking-widest text-sand font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Parallax Image Block */}
        <motion.div style={{ y: yImage }} className="relative order-1 md:order-2">
          <div className="absolute inset-0 border border-sand/20 translate-x-3 translate-y-3 rounded-lg pointer-events-none" />
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-espresso shadow-cinematic border border-sand/10">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
