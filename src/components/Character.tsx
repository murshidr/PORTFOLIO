import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useCursor, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import RadialMenu from './RadialMenu';

interface CharacterProps {
  onClick: () => void;
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  isWalking?: boolean;
}

export default function Character({ onClick, isMenuOpen, onCloseMenu, isWalking = false }: CharacterProps): React.ReactElement {
  const [narrativeState, setNarrativeState] = useState<'WALKING'>('WALKING');
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  
  // Limbs refs for animation
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  
  useCursor(hovered);

  useFrame((state, delta) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      
      if (isMenuOpen) {
        // --- IDLE / PAUSED STATE ---
        // Smoothly transition to idle pose
        
        // Gentle breathing
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t * 2) * 0.02, 0.1);
        
        // Reset limbs to idle
        if (leftLeg.current) leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, 0, 0.1);
        if (rightLeg.current) rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, 0, 0.1);
        
        // Arms relaxed
        if (leftArm.current) {
            leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, -0.2, 0.1); // Phone held up slightly
            leftArm.current.rotation.z = THREE.MathUtils.lerp(leftArm.current.rotation.z, 0.2, 0.1);
        }
        if (rightArm.current) {
            rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, 0, 0.1);
            rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, -0.1, 0.1);
        }

        // Head looking at "user" (camera) or phone
        if (head.current) {
            head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, Math.sin(t * 0.5) * 0.1, 0.05); // Subtle look around
            head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, 0.1, 0.05); // Look down at phone/menu
        }

        // Maintain 180 rotation (facing -Z) but add idle sway
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.PI + Math.sin(t * 0.5) * 0.05, 0.05);

        // --- Camera Follow (Menu Open) ---
        // When menu is open, the camera swings to the FRONT to look at the character
        const frontZ = group.current.position.z - 5; 
        const frontY = 2; // slightly elevated
        const frontX = 17.5; 

        camera.position.z = THREE.MathUtils.lerp(camera.position.z, frontZ, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, frontY, 0.05);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, frontX, 0.05);

        const controls = state.controls as any;
        if (controls) {
            // Look straight at character head level
            controls.target.z = THREE.MathUtils.lerp(controls.target.z, group.current.position.z, 0.1);
            controls.target.y = THREE.MathUtils.lerp(controls.target.y, 1.5, 0.1);
            controls.target.x = THREE.MathUtils.lerp(controls.target.x, 17.5, 0.1);
            controls.update();
        }

        return; // Skip walking logic
      }

      // --- WALKING STATE ---
      const walkSpeed = 3.0; // Faster walk
      const stride = 10; // Animation speed multiplier
      
      // Body Bobbing (Vertical bounce)
      // Smoother bounce using sine squared for more "weight"
      group.current.position.y = Math.abs(Math.sin(t * stride)) * 0.06;
      
      // Leg Swing (Opposite phases)
      if (leftLeg.current) {
        leftLeg.current.rotation.x = Math.sin(t * stride) * 0.6;
      }
      if (rightLeg.current) {
        rightLeg.current.rotation.x = Math.sin(t * stride + Math.PI) * 0.6;
      }
      
      // Arm Swing (Opposite to legs, smoother)
      // Added slight delay/drag to arms for realism
      if (leftArm.current) {
        leftArm.current.rotation.x = Math.sin(t * stride + Math.PI - 0.2) * 0.5;
        leftArm.current.rotation.z = 0.1 + Math.sin(t * stride * 0.5) * 0.05; // Breathing arm width
      }
      if (rightArm.current) {
        rightArm.current.rotation.x = Math.sin(t * stride - 0.2) * 0.5;
        rightArm.current.rotation.z = -0.1 - Math.sin(t * stride * 0.5) * 0.05;
      }
      
      // Head Bob/Groove (Subtle, synchronized)
      if (head.current) {
        // Vertical head bob slightly offset from body bob
        head.current.position.y = 1.85 - Math.abs(Math.sin(t * stride)) * 0.01;
        // Subtle side-to-side sway
        head.current.rotation.z = Math.sin(t * stride / 2) * 0.02;
        // Look slightly up/down rhythm
        head.current.rotation.x = Math.sin(t * stride) * 0.015;
        head.current.rotation.y = Math.sin(t * stride / 4) * 0.02; // Very slow look sway
      }
      
      // Torso Twist (Counter-rotation to hips/legs)
      // Add Math.PI to rotate character 180 degrees to face -Z (Forward direction of movement)
      group.current.rotation.y = Math.PI + Math.sin(t * stride) * 0.08;

      // --- Forward Movement ---
      if (isWalking) {
        group.current.position.z -= walkSpeed * delta;
      }

      // Infinite Loop Logic
      if (group.current.position.z < -140) {
        const jumpDistance = 280;
        group.current.position.z += jumpDistance;
        camera.position.z += jumpDistance;
        
        // Fix orbit controls target if they exist
        const controls = state.controls as any;
        if (controls) {
          controls.target.z += jumpDistance;
          controls.update();
        }
      }

      // --- 3rd Person Camera Follow (Walking) ---
      const targetX = 17.5;
      const lerpFactor = 0.1;
      const controls = state.controls as any;

      if (controls && isWalking) {
        // --- Tethered Follow Logic (v1.5) - Smoother Transitions ---
        const idealZ = group.current.position.z + 7; 
        const idealY = 1.8;
        const lerpVal = 0.05;
        
        // Follow the character's position
        controls.target.x = THREE.MathUtils.lerp(controls.target.x, 0, lerpVal);
        controls.target.y = THREE.MathUtils.lerp(controls.target.y, 1.5, lerpVal);
        controls.target.z = THREE.MathUtils.lerp(controls.target.z, group.current.position.z, lerpVal);
        
        // Follow the camera position
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, lerpVal);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, idealY, lerpVal);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, idealZ, lerpVal);
        
        controls.update(); 
      }
    }
  });

  // Material for the pulsing hint
  const hintMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#60a5fa", 
    emissive: "#3b82f6", 
    emissiveIntensity: 2,
    transparent: true,
    opacity: 0.8
  }), []);


  // Materials
  const skinMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffdbac", roughness: 0.5 }), []);
  const jacketMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.6 }), []); // Dark Blazer
  const shirtMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#cbd5e1", roughness: 0.7 }), []); // Light Blue Shirt
  const pantMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.8 }), []); // Dark Trousers
  const shoeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.4 }), []); 
  const backpackMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.9 }), []);
  const hairMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#000000", roughness: 0.9 }), []);
  const headphoneMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ef4444", roughness: 0.2, metalness: 0.5 }), []);

  // Facial feature materials
  const eyeMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: "#000000" }), []);
  const eyeMouthMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 1.0 }), []); // Eyebrows, mouth
  const noseMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#eab308", roughness: 0.6 }), []); // Slightly darker skin tone for nose
  const earMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffdbac", roughness: 0.5 }), []); // Same as skin


  return (
    <group 
      ref={group} 
      onClick={(e) => {
        // Prevent click from propagating if menu is already open
        if (!isMenuOpen) {
          e.stopPropagation();
          onClick();
        }
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Hitbox */}
      <mesh visible={false} position={[0, 1, 0]}>
        <boxGeometry args={[1.5, 3, 1.5]} />
        <meshBasicMaterial transparent opacity={0.5} color="red" />
      </mesh>

      {/* --- TORSO & BLAZER --- */}
      <mesh position={[0, 1.4, 0]} castShadow material={jacketMaterial}>
        <boxGeometry args={[0.5, 0.7, 0.3]} />
      </mesh>
      {/* Inner Shirt Detail */}
      <mesh position={[0, 1.5, 0.1]} material={shirtMaterial}>
        <boxGeometry args={[0.15, 0.4, 0.12]} />
      </mesh>

      {/* --- BACKPACK --- */}
      <mesh position={[0, 1.35, -0.2]} material={backpackMaterial} castShadow>
        <boxGeometry args={[0.4, 0.5, 0.15]} />
      </mesh>

      {/* --- HEAD GROUP --- */}
      <group ref={head} position={[0, 1.85, 0]}>
        {/* Face */}
        <mesh material={skinMaterial}>
          <boxGeometry args={[0.25, 0.3, 0.25]} />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.16, 0]} material={hairMaterial}>
          <boxGeometry args={[0.27, 0.1, 0.27]} />
        </mesh>
        <mesh position={[0, 0, -0.1]} material={hairMaterial}>
          <boxGeometry args={[0.27, 0.3, 0.1]} />
        </mesh>
        
        {/* -- Facial Features -- */}
        {/* Eyes */}
        <mesh position={[0.06, 0.04, 0.13]} material={eyeMaterial}>
          <boxGeometry args={[0.04, 0.04, 0.02]} />
        </mesh>
        <mesh position={[-0.06, 0.04, 0.13]} material={eyeMaterial}>
          <boxGeometry args={[0.04, 0.04, 0.02]} />
        </mesh>
        
        {/* Eyebrows */}
        <mesh position={[0.06, 0.08, 0.135]} material={eyeMouthMaterial}>
          <boxGeometry args={[0.06, 0.015, 0.02]} />
        </mesh>
        <mesh position={[-0.06, 0.08, 0.135]} material={eyeMouthMaterial}>
          <boxGeometry args={[0.06, 0.015, 0.02]} />
        </mesh>

        {/* Nose */}
        <mesh position={[0, -0.02, 0.14]} material={noseMaterial}>
          <boxGeometry args={[0.03, 0.05, 0.03]} />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, -0.08, 0.13]} material={eyeMouthMaterial}>
          <boxGeometry args={[0.06, 0.02, 0.02]} />
        </mesh>

        {/* Ears */}
        <mesh position={[0.13, 0, 0]} material={earMaterial}>
          <boxGeometry args={[0.02, 0.06, 0.04]} />
        </mesh>
        <mesh position={[-0.13, 0, 0]} material={earMaterial}>
          <boxGeometry args={[0.02, 0.06, 0.04]} />
        </mesh>

        {/* Headphones (moved slightly out to accommodate ears) */}
        <mesh position={[0.15, 0, 0]} material={headphoneMaterial}>
          <boxGeometry args={[0.05, 0.15, 0.1]} />
        </mesh>
        <mesh position={[-0.14, 0, 0]} material={headphoneMaterial}>
          <boxGeometry args={[0.05, 0.15, 0.1]} />
        </mesh>
        <mesh position={[0, 0.16, 0]} rotation={[0, 0, Math.PI/2]} material={headphoneMaterial}>
          <torusGeometry args={[0.16, 0.02, 8, 16]} />
        </mesh>
      </group>

      {/* --- ARMS --- */}
      {/* Left Arm (Holding Phone) */}
      <group ref={leftArm} position={[0.3, 1.6, 0]}>
        {/* Sleeve (Blazer) */}
        <mesh position={[0, -0.1, 0]} material={jacketMaterial}>
          <boxGeometry args={[0.13, 0.2, 0.13]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.35, 0]} material={skinMaterial}>
          <boxGeometry args={[0.1, 0.35, 0.1]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.55, 0]} material={skinMaterial}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
        {/* Mobile Phone */}
        <mesh position={[0, -0.6, 0.05]} rotation={[0.5, 0, 0]}>
          <boxGeometry args={[0.12, 0.2, 0.02]} />
          <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Screen Glow */}
        <mesh position={[0, -0.6, 0.065]} rotation={[0.5, 0, 0]}>
          <planeGeometry args={[0.1, 0.18]} />
          <meshBasicMaterial color="#60a5fa" toneMapped={false} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArm} position={[-0.3, 1.6, 0]}>
        {/* Sleeve (Blazer) */}
        <mesh position={[0, -0.1, 0]} material={jacketMaterial}>
          <boxGeometry args={[0.13, 0.2, 0.13]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.35, 0]} material={skinMaterial}>
          <boxGeometry args={[0.1, 0.35, 0.1]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.55, 0]} material={skinMaterial}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
      </group>

      {/* --- LEGS --- */}
      {/* Left Leg */}
      <group ref={leftLeg} position={[0.15, 1.05, 0]}>
        <mesh position={[0, -0.5, 0]} material={pantMaterial}>
          <boxGeometry args={[0.2, 1.0, 0.2]} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -1.05, 0.05]} material={shoeMaterial}>
          <boxGeometry args={[0.22, 0.1, 0.35]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLeg} position={[-0.15, 1.05, 0]}>
        <mesh position={[0, -0.5, 0]} material={pantMaterial}>
          <boxGeometry args={[0.2, 1.0, 0.2]} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -1.05, 0.05]} material={shoeMaterial}>
          <boxGeometry args={[0.22, 0.1, 0.35]} />
        </mesh>
      </group>


      {/* Persistent Pulsing Hint (Visible before first interaction) */}
      {!isMenuOpen && (
        <group position={[0, 2.8, 0]}>
          <Html center>
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="flex flex-col items-center pointer-events-none"
            >
               <div className="bg-blue-500/80 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/20 backdrop-blur-sm shadow-lg mb-2">
                Click to Explore
              </div>
              <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-transparent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </motion.div>
          </Html>
        </group>
      )}

      {/* Hover Label */}
      {hovered && !isMenuOpen && (
        <Html position={[0, 2.5, 0]} center>
          <div className="bg-black/90 text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border border-blue-500/50 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-200 uppercase tracking-tighter">
            Interaction Available
          </div>
        </Html>
      )}
    </group>

  );
}
