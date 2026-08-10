"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TextReveal from "./TextReveal";

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
    title: "Aerospace AI & Space Tech",
    subtitle: "Combustion Instability & Avionics",
    description: "Developing machine learning workflows for combustion instability prediction using TCN models, Bayesian Optimization, and multi-channel sensor data processing.",
    details: [
      "8-channel sensor fusion at 1000 Hz sampling rate achieving 92% accuracy",
      "Avionics & flight software development for IN-SPACe National Rocketry Competition",
      "Digital-twin & real-time telemetry pipelines for aerospace research"
    ],
    image: "/projects/combustion.png",
    tags: ["Python", "PyTorch", "TCN", "Bayesian Opt", "Sensor Fusion"]
  },
  {
    id: "02",
    title: "Execution Intelligence",
    subtitle: "SENTINEL Platform — AMD Slingshot",
    description: "Full-stack LLM-powered platform extracting delivery commitments from Slack and Gmail, scoring slip risk (0–100), and alerting owners.",
    details: [
      "Llama 3.3 70B & Groq API inference pipeline",
      "Real-time event processing via Supabase & Redis cache",
      "AMD Slingshot Hackathon 2026 featured project"
    ],
    image: "/projects/sentinel.png",
    tags: ["FastAPI", "React 19", "Llama 3.3", "Supabase", "Redis"]
  },
  {
    id: "03",
    title: "AI Automation SaaS",
    subtitle: "Quantumstacks Lab Workflow",
    description: "End-to-end web SaaS application organizing automation workflows with Groq API summaries, Google OAuth, and multi-format exports.",
    details: [
      "Structured Groq LLM parsing & intelligent automation summaries",
      "Google OAuth 2.0 authentication & secure session management",
      "Downloadable CSV, JSON, and PDF report generators"
    ],
    image: "/projects/sentinel.png",
    tags: ["Python", "Groq API", "REST APIs", "OAuth 2.0", "FastAPI"]
  },
  {
    id: "04",
    title: "Cardiovascular Digital Twin",
    subtitle: "CardioTwin-H Research",
    description: "AI-driven digital twin combining ML risk prediction, explainability, physiological data acquisition, and real-world data processing.",
    details: [
      "Novel Contribution Award at National Research Conference",
      "Integrates predictive analytics with physiological sensor metrics",
      "Published research & ongoing project funding"
    ],
    image: "/projects/documind.png",
    tags: ["Python", "Scikit-learn", "Deep Learning", "Explainable AI"]
  }
];

const svgs = [
  <svg key="0" className="w-56 h-56 text-clay" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="4 4" />
    <circle cx="50" cy="50" r="25" strokeWidth="1" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>,
  <svg key="1" className="w-56 h-56 text-clay" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <path d="M20 20 L80 20 L80 80 L20 80 Z" strokeWidth="0.5" />
    <path d="M20 20 L80 80 M80 20 L20 80" strokeWidth="0.5" strokeDasharray="2 2" />
    <circle cx="20" cy="20" r="4" fill="currentColor" />
    <circle cx="80" cy="20" r="4" fill="currentColor" />
    <circle cx="80" cy="80" r="4" fill="currentColor" />
    <circle cx="20" cy="80" r="4" fill="currentColor" />
    <circle cx="50" cy="50" r="6" fill="currentColor" />
  </svg>,
  <svg key="2" className="w-56 h-56 text-clay" viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <polygon points="50,15 15,80 85,80" strokeWidth="1" />
    <polygon points="50,35 30,70 70,70" strokeWidth="0.5" strokeDasharray="3 3" />
    <circle cx="50" cy="55" r="4" fill="currentColor" />
  </svg>,
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

          {/* Morphing/Rotating SVG */}
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
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [imageRevealed, setImageRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax coefficients for deeper depth
  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  // Trigger clip-path reveal when image enters viewport
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      onViewportEnter={() => onVisible(index)}
      viewport={{ amount: 0.5 }}
      className="grid gap-12 items-center min-h-[70vh] relative pt-12 md:pt-0"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Parallax Text Block with TextReveal */}
        <motion.div style={{ y: yText, scale }} className="space-y-8 order-2 md:order-1">
          <div className="space-y-3">
            <span className="text-label text-sand font-bold italic">{feature.subtitle}</span>
            <h4 className="text-3xl md:text-4xl font-serif text-espresso leading-tight font-light">
              <TextReveal text={feature.title} />
            </h4>
          </div>

          <p className="text-espresso/80 font-light text-lg leading-relaxed">
            <TextReveal text={feature.description} delay={0.15} />
          </p>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
            }}
            className="space-y-4 pt-4 border-t border-sand/15"
          >
            {feature.details.map((detail, dIdx) => (
              <motion.li
                key={dIdx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-sm text-espresso/70 font-light flex items-start"
              >
                <span className="text-clay mr-3 font-serif">/</span>
                {detail}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } }
            }}
            className="flex flex-wrap gap-2 pt-4"
          >
            {feature.tags.map((tag) => (
              <motion.span
                key={tag}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="px-3 py-1 rounded-full border border-sand/20 text-[10px] uppercase tracking-widest text-sand font-medium"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Parallax Image Block with Clip-Path Mask Reveal */}
        <motion.div style={{ y: yImage }} className="relative order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, x: 12, y: 12 }}
            whileInView={{ opacity: 1, x: 3, y: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 border border-sand/20 rounded-lg pointer-events-none"
          />
          <div
            ref={imageRef}
            className={`relative aspect-[4/3] rounded-lg overflow-hidden bg-espresso shadow-cinematic border border-sand/10 mask-reveal ${imageRevealed ? "revealed" : ""}`}
          >
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
            />
            {/* Gradient overlay for polished look */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
