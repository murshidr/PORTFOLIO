"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import VectorWaves from "./VectorWaves";
import KineticBlob from "./KineticBlob";
import TextReveal from "./TextReveal";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typingFinished, setTypingFinished] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        index++;
        setWordIndex(index);
        if (index >= 2) {
          clearInterval(interval);
          setTypingFinished(true);
        }
      }, 500);

      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative overflow-hidden bg-cream/30">
      {/* Scroll-Reactive Vector Waves Background */}
      <VectorWaves />

      {/* Background Soft Glows */}
      <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-clay/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[40vw] h-[40vw] bg-sand/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] items-end gap-12">
          {/* Main Headline with word-by-word typing and blinking cursor */}
          <div className="space-y-8 md:space-y-12 min-h-[clamp(8rem,20vw,24rem)] flex items-end">
            <h1 className="text-editorial-h1 text-espresso select-none flex items-baseline flex-wrap">
              {wordIndex >= 1 && (
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mr-[0.2em]"
                >
                  Murshid
                </motion.span>
              )}
              {wordIndex >= 2 && (
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-editorial-display text-clay mr-[0.1em]"
                >
                  R.
                </motion.span>
              )}
              {/* Blinking Cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                className="inline-block w-[4px] h-[0.8em] bg-clay ml-1 self-center"
                style={{ verticalAlign: "middle" }}
              />
            </h1>
          </div>

          {/* Right Side: Kinetic Blob + Sub-headlines */}
          <div className="md:text-right space-y-6 md:pb-8 flex flex-col items-end">
            {/* Interactive Kinetic Morphing Blob */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={typingFinished ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center justify-center -mr-8 -mb-4"
            >
              <KineticBlob />
            </motion.div>

            {/* Sub-headlines: TextReveal on tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={typingFinished ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xs md:ml-auto"
            >
              <p className="text-sand font-serif italic text-xl md:text-2xl leading-relaxed">
                <TextReveal
                  text={`"Building systems that don't just process data, but understand intent."`}
                  delay={0.6}
                />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={typingFinished ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="h-[0.5px] bg-sand/30 w-24 md:ml-auto origin-right"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={typingFinished ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-label text-espresso space-y-1"
            >
              <p>AI Research Engineer</p>
              <p>Applied Systems · Space Tech</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={typingFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
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
