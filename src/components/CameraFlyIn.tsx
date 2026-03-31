import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface CameraFlyInProps {
  onLanded: () => void;
}

export default function CameraFlyIn({ onLanded }: CameraFlyInProps) {
  const { camera } = useThree();
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const landed = useRef(false);
  const [isSeaSkim, setIsSeaSkim] = useState(false);

  useEffect(() => {
    if (landed.current) return;
    setIsSeaSkim(true);
    setTimeout(() => setIsSeaSkim(false), 2200);
    
    // Initial position: 2m above Bay of Bengal (v1.0 spec)
    camera.position.set(-150, 2, 80);
    camera.lookAt(0, 2, 0);

    timeline.current = gsap.timeline({
      onComplete: () => {
        if (!landed.current) {
          landed.current = true;
          onLanded();
        }
      }
    });

    // 0.0 - 2.2s: Skim the water
    timeline.current.to(camera.position, {
      x: -30,
      y: 3,
      z: 50,
      duration: 2.2,
      ease: "power2.in",
      onUpdate: () => {
         camera.lookAt(0, 2, 0);
      }
    });

    // 2.2 - 3.6s: Cross shoreline
    timeline.current.to(camera.position, {
      x: 0,
      y: 4,
      z: 20,
      duration: 1.4,
      ease: "none",
      onUpdate: () => {
        camera.lookAt(7.5, 1.8, 0);
      }
    });

    // 3.6 - 5.0s: Decelerate and settle behind character
    timeline.current.to(camera.position, {
      x: 7.5, 
      y: 1.8, 
      z: -6,
      duration: 1.4,
      ease: "power3.out",
      onUpdate: () => {
        camera.lookAt(7.5, 1.8, 20);
      }
    });

    return () => {
      timeline.current?.kill();
    };
  }, [camera, onLanded]);

  return (
    <>
      {isSeaSkim && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {/* Subtle Lens Moisture / Droplets */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] animate-pulse" />
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/20 rounded-full blur-[4px]" />
          <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-white/10 rounded-full blur-[6px]" />
          <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full blur-[3px]" />
        </div>
      )}
    </>
  );
}
