"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Magnetic from "./Magnetic";

const projects = [
  {
    id: "01",
    name: "Vynta",
    subtitle: "AI-Powered Task Scheduler",
    tagline: "Kotlin · Jetpack Compose · Groq API · Google Calendar API",
    description: "Describe what you need in plain English. Vynta's AI figures out the when, the where, and the how — scheduling events into your Google Calendar based on daily energy levels.",
    image: "/projects/vynta.jpg",
    link: "/vynta/index.html"
  },
  {
    id: "02",
    name: "SENTINEL",
    subtitle: "Execution Intelligence Platform",
    tagline: "Python · FastAPI · React 19 · Llama 3.3 70B · Supabase",
    description: "Built end-to-end LLM-powered platform that extracts delivery commitments from Slack and Gmail, scores slip risk 0–100, and auto-alerts owners before deadlines are missed.",
    image: "/projects/sentinel.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "03",
    name: "Combustion AI",
    subtitle: "Instability Prediction — Hybrid Rocket Engines",
    tagline: "Python · PyTorch · Scikit-optimize · NumPy · MATLAB",
    description: "TCN model achieving 92% accuracy for early warning of combustion instability; outperformed LSTM baselines. 8-channel sensor fusion at 1000 Hz sampling rate.",
    image: "/projects/combustion.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "04",
    name: "DocuMind",
    subtitle: "Mental State Prediction",
    tagline: "Python · TensorFlow/Keras · LSTM · Scikit-learn",
    description: "Stacked LSTM for time-series classification of mental health states from social media and lifestyle metrics. Achieved 81% Recall on At_Risk class.",
    image: "/projects/documind.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "05",
    name: "AIDEN AI",
    subtitle: "Intelligent Conversational Assistant",
    tagline: "Python · HuggingFace Transformers · Flask API · SQLite",
    description: "End-to-end conversational AI with NLP mood detection and RAG-style retrieval for adaptive academic guidance. Dual recommendation engine.",
    image: "/projects/sentinel.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "06",
    name: "Ground Station",
    subtitle: "Real-Time Telemetry Dashboard",
    tagline: "Python · Flask/FastAPI · WebSockets · Plotly · SQLite",
    description: "Production-grade telemetry dashboard: 8+ sensor channels at 1000 Hz, <100ms latency. Selected for INSPACe Model Rocketry Competition national level.",
    image: "/projects/combustion.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "07",
    name: "CarbonCut",
    subtitle: "AI-Powered Waste Management",
    tagline: "Python · TensorFlow/Keras · React · Firebase",
    description: "CNN image recognition: 94% accuracy across 6+ waste categories with real-time smartphone integration. SIH 2025 national evaluation selection.",
    image: "/projects/documind.png",
    link: "https://github.com/murshidr"
  }
];

export default function ProjectList() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Linear wheel redirection to scroll horizontally
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Find limits
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const canScrollLeft = isScrollingUp && currentScroll > 0;
      const canScrollRight = isScrollingDown && currentScroll < maxScroll;

      // Only hijack the scroll if we can scroll horizontally in that direction
      if (canScrollLeft || canScrollRight) {
        e.preventDefault();
        // Move container horizontally by the wheel's vertical delta
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section id="work" className="py-24 overflow-hidden relative">
      {/* Background Soft Gradients */}
      <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] bg-sand/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-[1px] bg-clay" />
            <span className="text-label text-clay">Portfolio & Gallery</span>
          </div>
          <h2 className="text-editorial-h2 text-espresso">
            Selected <span className="text-editorial-display text-clay">Work.</span>
          </h2>
        </div>
        <div className="flex items-center space-x-4 text-sand text-xs uppercase tracking-widest font-bold">
          <span>Swipe or Scroll</span>
          <div className="w-16 h-[1px] bg-sand/30" />
          <span>{projects.length} Projects</span>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={containerRef}
        className="flex flex-row overflow-x-auto overflow-y-hidden gap-8 md:gap-12 px-6 md:px-[calc((100vw-min(1280px,100vw-3rem))/2)] pb-12 pt-4 scrollbar-none select-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[number];
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function ProjectCard({ project, index, containerRef }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Track the scroll progress of this specific card relative to the carousel viewport
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  // Calculate horizontal parallax translation for the card's inner image
  // Moves in the opposite direction of the scroll to create a sliding depth effect
  const xImage = useTransform(scrollXProgress, [0, 1], [-40, 40]);

  return (
    <motion.div
      ref={cardRef}
      className="w-[85vw] sm:w-[500px] md:w-[580px] shrink-0 snap-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
    >
      <a
        href={project.link}
        target={project.link.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="group block bg-surface/20 border border-sand/15 hover:border-clay/35 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-cinematic transition-colors duration-500 text-decoration-none hover:text-current"
      >
        <div className="space-y-6 md:space-y-8">
          {/* Parallax Image Mask */}
          <div className="relative h-[250px] md:h-[320px] rounded-xl overflow-hidden bg-espresso border border-sand/10 shadow-inner">
            <motion.div
              style={{ x: xImage, width: "120%", left: "-10%" }}
              className="absolute top-0 bottom-0 relative h-full"
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 580px"
              />
            </motion.div>
            <div className="absolute inset-0 bg-espresso/15 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
            
            {/* Top-Right Project ID Badge */}
            <span className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-sand/25 text-[10px] uppercase font-bold text-espresso/70 tracking-widest tabular-nums shadow-sm">
              Project {project.id}
            </span>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-clay font-bold font-sans">
                {project.subtitle}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-espresso leading-none group-hover:text-clay transition-colors duration-500">
                {project.name}
              </h3>
            </div>

            <p className="text-espresso/75 font-light text-base leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <div className="h-[0.5px] bg-sand/20 my-4" />

            <div className="flex flex-wrap gap-2">
              {project.tagline.split(" · ").map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full border border-sand/15 text-[9px] uppercase tracking-widest text-sand font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Case Study Call to Action */}
            <div className="pt-4 flex justify-end">
              <Magnetic strength={0.25}>
                <div className="flex items-center space-x-3 text-clay text-xs uppercase tracking-widest font-bold">
                  <span>View Project</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-sm"
                  >
                    →
                  </motion.span>
                </div>
              </Magnetic>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
