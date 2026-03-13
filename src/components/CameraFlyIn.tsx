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
    
    // Initial position: High in the sky
    camera.position.set(0, 100, 100);
    camera.lookAt(0, 0, 0);

    // Create animation timeline
    timeline.current = gsap.timeline({
      onComplete: () => {
        console.log("Camera fly-in complete");
        landed.current = true;
        onLanded();
      }
    });

    // Animate to ground level
    timeline.current.to(camera.position, {
      x: 7.5, // Sidewalk X position
      y: 1.5, // Eye level (Straight at character)
      z: -4, // Distance IN FRONT of character
      duration: 4,
      ease: "power2.inOut",
      onUpdate: () => {
        // Keep looking at the character center (on sidewalk) during flight
        camera.lookAt(7.5, 1.5, 0);
      }
    });

    return () => {
      timeline.current?.kill();
    };
  }, [camera, onLanded]);

  return null;
}
