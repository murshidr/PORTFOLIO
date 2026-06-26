"use client";

import { useEffect, useRef } from "react";

export default function VectorWaves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollYRef = useRef(0);
  const currentScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial phase values for waves
    let phase1 = 0;
    let phase2 = Math.PI / 3;
    let phase3 = (Math.PI * 2) / 3;

    const draw = () => {
      // Lerp scroll position for smooth slow reaction
      currentScrollRef.current += (scrollYRef.current - currentScrollRef.current) * 0.05;
      const scrollFactor = currentScrollRef.current;

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Dynamically fetch theme colors
      const computedStyle = getComputedStyle(document.documentElement);
      const clay = computedStyle.getPropertyValue("--clay").trim() || "#A0522D";
      const sand = computedStyle.getPropertyValue("--sand").trim() || "#C8A882";
      const espresso = computedStyle.getPropertyValue("--espresso").trim() || "#1C1410";

      // Draw three distinct waves
      // Wave 1: Sand/Clay blend
      drawWave(
        ctx,
        width,
        height,
        phase1,
        0.002, // frequency
        40 + scrollFactor * 0.05, // amplitude reacting to scroll
        height * 0.65 + Math.sin(scrollFactor * 0.002) * 20, // baseline
        `rgba(200, 168, 130, ${computedStyle.getPropertyValue("--theme") === "dark" ? "0.08" : "0.05"})`
      );

      // Wave 2: Clay wave
      drawWave(
        ctx,
        width,
        height,
        phase2,
        0.0015,
        60 + scrollFactor * 0.08,
        height * 0.7 + Math.cos(scrollFactor * 0.001) * 15,
        `rgba(160, 82, 45, ${computedStyle.getPropertyValue("--theme") === "dark" ? "0.06" : "0.04"})`
      );

      // Wave 3: Subtle Espresso accent wave
      drawWave(
        ctx,
        width,
        height,
        phase3,
        0.0025,
        30 + scrollFactor * 0.03,
        height * 0.75 + Math.sin(scrollFactor * 0.003) * 10,
        `rgba(28, 20, 16, ${computedStyle.getPropertyValue("--theme") === "dark" ? "0.04" : "0.03"})`
      );

      // Increment phases (time progression + scroll reaction)
      phase1 += 0.004 + scrollFactor * 0.00001;
      phase2 += 0.003 + scrollFactor * 0.000008;
      phase3 += 0.005 + scrollFactor * 0.000012;

      animationFrameId = requestAnimationFrame(draw);
    };

    const drawWave = (
      c: CanvasRenderingContext2D,
      w: number,
      h: number,
      phase: number,
      freq: number,
      amp: number,
      yOffset: number,
      color: string
    ) => {
      c.beginPath();
      c.moveTo(0, h);
      
      for (let x = 0; x <= w; x += 10) {
        // Sine calculation with noise
        const y = yOffset + Math.sin(x * freq + phase) * amp;
        c.lineTo(x, y);
      }

      c.lineTo(w, h);
      c.closePath();
      c.fillStyle = color;
      c.fill();
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
