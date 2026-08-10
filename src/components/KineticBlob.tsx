"use client";

import { useEffect, useRef } from "react";

export default function KineticBlob() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);

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

      // Initialize mouse target to center of canvas
      mouseRef.current.targetX = width / 2;
      mouseRef.current.targetY = height / 2;
      mouseRef.current.x = width / 2;
      mouseRef.current.y = height / 2;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;
    const pointsCount = 120; // Number of points in the blob loop for fine resolution
    const baseRadius = 110;

    const draw = () => {
      time += 0.008;

      // Lerp mouse coordinates for custom fluid inertia
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Fetch dynamic colors from CSS variables
      const computedStyle = getComputedStyle(document.documentElement);
      const clay = computedStyle.getPropertyValue("--clay").trim() || "#A0522D";
      const sand = computedStyle.getPropertyValue("--sand").trim() || "#C8A882";

      const centerX = width / 2 + (mouse.x - width / 2) * 0.25;
      const centerY = height / 2 + (mouse.y - height / 2) * 0.25;

      // Set up drop shadow
      ctx.shadowColor = `rgba(160, 82, 45, 0.15)`;
      ctx.shadowBlur = 40;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 20;

      // Draw the morphing path
      ctx.beginPath();

      for (let i = 0; i <= pointsCount; i++) {
        const angle = (i / pointsCount) * Math.PI * 2;
        
        // Multi-frequency wave combinations acting as high-quality Perlin noise
        const wave1 = Math.sin(angle * 3 + time * 1.5) * 20;
        const wave2 = Math.cos(angle * 5 - time * 2.2) * 12;
        const wave3 = Math.sin(angle * 2 + time * 0.8) * 15;
        
        // React to mouse proximity: warp blob shape when mouse gets closer to center
        const dx = mouse.x - (centerX + Math.cos(angle) * baseRadius);
        const dy = mouse.y - (centerY + Math.sin(angle) * baseRadius);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseWarp = dist < 120 ? (120 - dist) * 0.18 : 0;

        const radius = baseRadius + wave1 + wave2 + wave3 + mouseWarp;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();

      // Glassmorphic gradient
      const gradient = ctx.createLinearGradient(
        centerX - baseRadius,
        centerY - baseRadius,
        centerX + baseRadius,
        centerY + baseRadius
      );
      gradient.addColorStop(0, clay);
      gradient.addColorStop(1, sand);

      ctx.fillStyle = gradient;
      ctx.fill();

      // Reset shadows before drawing highlights to preserve frosted glass aesthetics
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // Add a radial light highlight overlay
      ctx.beginPath();
      ctx.arc(centerX - 35, centerY - 35, baseRadius * 0.7, 0, Math.PI * 2);
      const highlightGrad = ctx.createRadialGradient(
        centerX - 35,
        centerY - 35,
        0,
        centerX - 35,
        centerY - 35,
        baseRadius * 0.8
      );
      highlightGrad.addColorStop(0, "rgba(255, 255, 255, 0.25)");
      highlightGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = highlightGrad;
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto cursor-pointer"
      />
    </div>
  );
}
