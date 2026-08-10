"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Cpu, ShieldCheck, Zap, Layers } from "lucide-react";
import Magnetic from "./Magnetic";

export interface ProjectData {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  link: string;
  details?: string[];
  architecture?: string[];
  metrics?: { label: string; value: string }[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Listen for Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/80 backdrop-blur-md"
          />

          {/* Morphing Modal Window */}
          <motion.div
            layoutId={`project-container-${project.id}`}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-full max-w-4xl bg-cream border border-sand/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-20">
              <Magnetic strength={0.3}>
                <button
                  onClick={onClose}
                  className="p-3 bg-espresso/80 hover:bg-clay text-cream rounded-full backdrop-blur-md border border-sand/20 transition-colors shadow-lg group"
                >
                  <X size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </Magnetic>
            </div>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto p-6 md:p-12 space-y-10 scrollbar-none">
              {/* Header Image Container */}
              <motion.div
                layoutId={`project-image-${project.id}`}
                className="relative h-[260px] md:h-[380px] rounded-2xl overflow-hidden bg-espresso border border-sand/20 shadow-inner"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-sand tracking-[0.3em] bg-espresso/60 px-3 py-1 rounded-full border border-sand/20 backdrop-blur-sm">
                      Case Study {project.id}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-cream font-light mt-2">
                      {project.name}
                    </h2>
                  </div>
                </div>
              </motion.div>

              {/* Tagline & Overview */}
              <div className="space-y-4 border-b border-sand/20 pb-8">
                <p className="text-xs uppercase tracking-widest text-clay font-bold font-sans">
                  {project.subtitle}
                </p>
                <p className="text-xl font-serif text-espresso leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* System Architecture Node Diagram */}
              <div className="space-y-4 bg-sand/10 p-6 md:p-8 rounded-2xl border border-sand/20">
                <div className="flex items-center space-x-3">
                  <Cpu className="text-clay" size={20} />
                  <h4 className="text-xs font-sans uppercase font-bold text-espresso tracking-[0.2em]">
                    System Architecture & Engineering Pipeline
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-cream/80 rounded-xl border border-sand/20">
                    <span className="text-[9px] uppercase tracking-widest text-sand font-bold">Data Ingestion</span>
                    <p className="text-xs text-espresso/80 font-medium mt-1">Multi-Channel Sensor Fusion / Real-Time Telemetry Data streams</p>
                  </div>
                  <div className="p-4 bg-cream/80 rounded-xl border border-sand/20">
                    <span className="text-[9px] uppercase tracking-widest text-clay font-bold">Model Engine</span>
                    <p className="text-xs text-espresso/80 font-medium mt-1">Deep TCN / Llama 3.3 70B & Groq Inference Optimization</p>
                  </div>
                  <div className="p-4 bg-cream/80 rounded-xl border border-sand/20">
                    <span className="text-[9px] uppercase tracking-widest text-sand font-bold">Execution Output</span>
                    <p className="text-xs text-espresso/80 font-medium mt-1">Automated Risk Alerting & Real-Time Visualization Dashboard</p>
                  </div>
                </div>
              </div>

              {/* Technical Stack Tags */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-sand block">Tech Stack & Infrastructure</span>
                <div className="flex flex-wrap gap-2">
                  {project.tagline.split(" · ").map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full border border-sand/25 bg-cream text-[10px] uppercase tracking-wider text-espresso font-medium shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* External CTA Actions */}
              <div className="pt-6 border-t border-sand/20 flex flex-wrap gap-4 items-center justify-between">
                <Magnetic strength={0.3}>
                  <a
                    href={project.link}
                    target={project.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-espresso text-cream px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-clay transition-colors group shadow-md"
                  >
                    <span>Inspect Codebase / Repository</span>
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </Magnetic>

                <button
                  onClick={onClose}
                  className="text-xs uppercase tracking-widest text-sand hover:text-espresso font-bold transition-colors py-2"
                >
                  Close Modal [ESC]
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
