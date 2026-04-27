"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  distance?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className = "",
  distance = 20,
  once = true,
}: ScrollRevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1], // easeOutCubic as requested
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
