import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface CameraFlyInProps {
  onLanded: () => void;
}

export default function CameraFlyIn({ onLanded }: CameraFlyInProps) {
  const { camera } = useThree();
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const landed = useRef(false);

  useEffect(() => {
    if (landed.current) return;
    
    console.log("Starting camera fly-in");
    
    // Initial position: Low over the Bay of Bengal
    camera.position.set(-80, 2, 50);
    camera.lookAt(0, 2, 0);

    // Create animation timeline
    timeline.current = gsap.timeline({
      onComplete: () => {
        console.log("Cinematic intro complete");
        landed.current = true;
        onLanded();
      }
    });

    // 1. Skim the waves towards the shoreline
    timeline.current.to(camera.position, {
      x: -20,
      y: 3,
      z: 20,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => {
        camera.lookAt(7.5, 1.5, 0);
      }
    });

    // 2. Rise and Rotate to settle behind the character
    timeline.current.to(camera.position, {
      x: 7.5, 
      y: 1.8, 
      z: -5, // Settle slightly further back for RDR2 feel
      duration: 2.5,
      ease: "power2.out",
      onUpdate: () => {
        camera.lookAt(7.5, 1.5, 10); // Look forward down the path
      }
    });

    return () => {
      timeline.current?.kill();
    };
  }, [camera, onLanded]);

  return null;
}
