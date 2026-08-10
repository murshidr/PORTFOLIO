"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Magnetic from "./Magnetic";
import TextReveal from "./TextReveal";

const projects = [
  {
    id: "01",
    name: "AI Automation SaaS",
    subtitle: "Quantumstacks Lab Workflow Platform",
    tagline: "Python · Groq API · Google OAuth · REST APIs · Export Engine",
    description: "Web-based SaaS application for organizing & analyzing automation tasks. Integrated Groq API for AI-powered summaries and recommendations, with Google OAuth, session management, and CSV/JSON/PDF output generation.",
    image: "/projects/sentinel.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "02",
    name: "SENTINEL",
    subtitle: "Execution Intelligence Platform — AMD Slingshot Hackathon",
    tagline: "Python · FastAPI · React 19 · Llama 3.3 70B · Groq · Supabase · Redis",
    description: "Built end-to-end LLM-powered platform that extracts delivery commitments from Slack and Gmail, scores slip risk 0–100, and auto-alerts owners before deadlines are missed.",
    image: "/projects/sentinel.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "03",
    name: "Combustion AI",
    subtitle: "Instability Prediction — Aerospace Rocket Engines",
    tagline: "Python · PyTorch · TCN · Bayesian Optimization · Sensor Fusion",
    description: "Developed machine learning workflows for combustion instability prediction using TCN models and Bayesian Optimization. 8-channel real-time sensor fusion achieving 92% accuracy, outperforming LSTM baselines.",
    image: "/projects/combustion.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "04",
    name: "CardioTwin-H",
    subtitle: "AI-Driven Cardiovascular Digital Twin",
    tagline: "Python · Machine Learning · Explainability · Real-World Data",
    description: "Cardiovascular digital twin combining ML risk prediction, explainability, physiological data acquisition, and real-world data processing. Awarded Novel Contribution Award at National Conference.",
    image: "/projects/combustion.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "05",
    name: "Crop Health Monitoring",
    subtitle: "Hyperspectral AI Analytics Pipeline",
    tagline: "Python · Random Forest · SVM · Hyperspectral Image Processing",
    description: "End-to-end hyperspectral image processing pipeline for automated crop health assessment. Built an ML ensemble using Random Forest and SVM, achieving 89% disease prediction accuracy.",
    image: "/projects/documind.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "06",
    name: "DocuMind",
    subtitle: "Deep Learning Time-Series Classification",
    tagline: "Python · TensorFlow/Keras · Stacked LSTM · Feature Engineering",
    description: "Deep learning time-series classification workflow for real-world applications with severe class imbalance. Data preprocessing, feature engineering, and model evaluation.",
    image: "/projects/documind.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "07",
    name: "CarbonCut",
    subtitle: "AI-Powered Sustainability & Waste Management",
    tagline: "Python · TensorFlow/Keras · CNN · Computer Vision",
    description: "Engineered CNN-based image recognition system achieving 94% accuracy in waste classification across 6+ categories with automated preprocessing pipelines.",
    image: "/projects/documind.png",
    link: "https://github.com/murshidr"
  },
  {
    id: "08",
    name: "Vynta v2.0",
    subtitle: "AI Task Scheduler for Android",
    tagline: "Kotlin · Jetpack Compose · Groq/Llama · Google Calendar API · Room DB",
    description: "AI-powered Android productivity application mapping natural language task prompts into Google Calendar based on daily predicted energy levels.",
    image: "/projects/vynta.jpg",
    link: "/vynta/index.html"
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
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [imageRevealed, setImageRevealed] = useState(false);

  // Track the scroll progress of this specific card relative to the carousel viewport
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  // Horizontal parallax translation for the card's inner image
  const xImage = useTransform(scrollXProgress, [0, 1], [-40, 40]);

  // Trigger clip-path mask reveal when image scrolls into view
  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="w-[85vw] sm:w-[500px] md:w-[580px] shrink-0 snap-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={project.link}
        target={project.link.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="group block bg-surface/20 border border-sand/15 hover:border-clay/35 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-cinematic transition-colors duration-500 text-decoration-none hover:text-current"
      >
        <div className="space-y-6 md:space-y-8">
          {/* Parallax Image with Clip-Path Mask Reveal */}
          <div
            ref={imageRef}
            className={`relative h-[250px] md:h-[320px] rounded-xl overflow-hidden bg-espresso border border-sand/10 shadow-inner mask-reveal-scale ${imageRevealed ? "revealed" : ""}`}
          >
            <motion.div
              style={{ x: xImage, width: "120%", left: "-10%" }}
              className="absolute top-0 bottom-0 relative h-full"
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 580px"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-700" />
            
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
                <TextReveal text={project.name} />
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
