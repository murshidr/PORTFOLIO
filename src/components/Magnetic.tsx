"use client";

import React, { useRef, useState, ReactNode } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({ children, strength = 0.5, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the motion with spring physics
  const springOptions = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(mouseX, springOptions);
  const y = useSpring(mouseY, springOptions);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsHovered(true);
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    
    // Apply strength factor
    mouseX.set(distance.x * strength);
    mouseY.set(distance.y * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`magnetic-area ${className}`}
    >
      {children}
    </motion.div>
  );
}
