"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for Zajno luxury inertia
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target or any parent has data-cursor attribute
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorElement = target.closest("[data-cursor-text]") as HTMLElement | null;
      const interactiveElement = target.closest("a, button, [role='button']") as HTMLElement | null;

      if (cursorElement && cursorElement.dataset.cursorText) {
        setCursorText(cursorElement.dataset.cursorText);
        setIsHovered(true);
      } else if (interactiveElement) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: cursorText ? 2.5 : isHovered ? 1.6 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full transition-colors duration-300 ${
        cursorText
          ? "w-16 h-16 bg-clay/90 text-cream backdrop-blur-sm border border-cream/30 shadow-2xl"
          : isHovered
          ? "w-10 h-10 bg-clay/30 border border-clay/60 backdrop-blur-[2px]"
          : "w-4 h-4 bg-clay/70 border border-cream/50 shadow-sm"
      }`}
    >
      {cursorText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="text-[8px] font-sans uppercase font-bold tracking-[0.25em] text-cream select-none text-center leading-none px-1"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
