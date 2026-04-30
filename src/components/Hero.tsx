"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-clay/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[40vw] h-[40vw] bg-sand/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] items-end gap-12">
          <div className="space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
               <span className="text-label text-clay">Digital Portfolio / 2024 — Present</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-editorial-h1 text-espresso"
            >
              Murshid <br />
              <span className="text-editorial-display text-clay ml-[0.1em]">Reyas.</span>
            </motion.h1>
          </div>

          <div className="md:text-right space-y-6 md:pb-8">
             <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-sand font-serif italic text-xl md:text-2xl max-w-xs md:ml-auto leading-relaxed"
            >
              "Building systems that don't just process data, but understand intent."
            </motion.p>
            <div className="h-[0.5px] bg-sand/30 w-24 md:ml-auto" />
             <div className="text-label text-espresso/60 space-y-1">
                <p>AI Research Engineer</p>
                <p>Applied Systems · Space Tech</p>
             </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
        className="absolute bottom-12 left-6 md:left-12"
      >
        <div className="flex items-center space-x-6">
           <span className="text-[10px] uppercase tracking-[0.4em] text-sand font-bold">Scroll</span>
           <motion.div 
            animate={{ width: [48, 80, 48] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="h-[0.5px] bg-sand" 
           />
        </div>
      </motion.div>
    </section>
  );
}
