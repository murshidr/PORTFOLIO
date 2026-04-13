import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface CameraFlyInProps {
  onLanded: () => void;
}

export default function CameraFlyIn({ onLanded }: CameraFlyInProps) {
  const { camera } = useThree();
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const landed = useRef(false);
  const [isIntroActive, setIsIntroActive] = useState(false);

  useEffect(() => {
    if (landed.current) return;
    setIsIntroActive(true);
    setTimeout(() => setIsIntroActive(false), 3500);
    
    // Initial position: Rooftop level (approx 40m high), looking down the street
    camera.position.set(0, 40, -100);
    camera.lookAt(0, 0, 0);

    timeline.current = gsap.timeline({
      onComplete: () => {
        if (!landed.current) {
          landed.current = true;
          onLanded();
        }
      }
    });

    // 0.0 - 3.0s: Glide down along the street corridor
    timeline.current.to(camera.position, {
      x: 0,
      y: 15,
      z: -40,
      duration: 3.0,
      ease: "power2.inOut",
      onUpdate: () => {
         camera.lookAt(0, 5, 20);
      }
    });

    // 3.0 - 5.5s: Skim above road surface and rise to eye level facing character at centre
    timeline.current.to(camera.position, {
      x: 0, 
      y: 1.7, 
      z: -5,
      duration: 2.5,
      ease: "power3.out",
      onUpdate: () => {
        camera.lookAt(0, 1.7, 5); // Looking towards where the character will be
      }
    });

    return () => {
      timeline.current?.kill();
    };
  }, [camera, onLanded]);

  return (
    <>
      {isIntroActive && (
        <Html fullscreen style={{ pointerEvents: 'none', zIndex: 100 }}>
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Subtle Lens Moisture / Droplets */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] animate-pulse" />
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/20 rounded-full blur-[4px]" />
            <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-white/10 rounded-full blur-[6px]" />
            <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full blur-[3px]" />
          </div>
        </Html>
      )}
    </>
  );
}
