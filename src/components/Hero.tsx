"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 max-w-7xl mx-auto relative">
      <div className="space-y-6 md:space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-walnut font-serif italic text-xl md:text-3xl lg:text-4xl font-light"
        >
          builder of quiet, intelligent things.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-espresso font-serif text-[clamp(64px,10vw,120px)] leading-[0.9] font-semibold uppercase tracking-tight"
        >
          MURSHID R.
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-[1px] bg-sand origin-left w-full md:w-2/3"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
          className="text-sand font-sans text-sm md:text-base font-light tracking-wide flex flex-wrap gap-x-4"
        >
          <span>AI researcher.</span>
          <span>Applied AI & LLM Systems.</span>
          <span>Space Technology AI.</span>
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-sand relative"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-r border-b border-sand rotate-45" />
        </motion.div>
      </motion.div>
    </section>
  );
}
