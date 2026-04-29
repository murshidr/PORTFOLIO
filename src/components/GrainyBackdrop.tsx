"use client";

import React from "react";

export default function GrainyBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] contrast-150 brightness-100 dark:opacity-[0.05]">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
