import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// --- NEW YORK VEHICLES ---

const NYCVehicle = ({ color, position, rotation = [0, 0, 0], type = 'car', hazards = false }: any) => {
  const hazRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (hazards && hazRef.current) {
      const active = Math.sin(state.clock.elapsedTime * 6) > 0;
      hazRef.current.visible = active;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Chassis */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[1.8, 0.8, 4.2]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Cabin */}
      <mesh castShadow position={[0, 1.0, -0.2]}>
        <boxGeometry args={[1.6, 0.6, 2.5]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Windows */}
      <mesh position={[0, 1.0, -0.2]}>
        <boxGeometry args={[1.62, 0.5, 2.2]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      {/* Wheels */}
      {[ [0.9, 0, 1.2], [-0.9, 0, 1.2], [0.9, 0, -1.2], [-0.9, 0, -1.2] ].map((pos, i) => (
        <mesh key={i} position={pos as any} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.4]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}
      {/* Hazards */}
      {hazards && (
        <group ref={hazRef}>
           <mesh position={[0.95, 0.4, 2.1]}><sphereGeometry args={[0.1]} /><meshBasicMaterial color="#fbbf24" /></mesh>
           <mesh position={[-0.95, 0.4, 2.1]}><sphereGeometry args={[0.1]} /><meshBasicMaterial color="#fbbf24" /></mesh>
        </group>
      )}
      {type === 'taxi' && (
        <mesh position={[0, 1.35, -0.2]}>
          <boxGeometry args={[0.6, 0.2, 0.4]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      )}
    </group>
  );
};

// --- NPC SYSTEM (Max 12 localized) ---

const ManhattanNPC = ({ color, position, speed, offset }: any) => {
  const ref = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.z += speed * delta;
      if (Math.abs(ref.current.position.z) > 150) ref.current.position.z = -150 * (speed > 0 ? 1 : -1);
      
      const t = state.clock.elapsedTime * 6 + offset;
      if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t) * 0.5;
      if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(t + Math.PI) * 0.5;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}><boxGeometry args={[0.3, 0.35, 0.3]} /><meshStandardMaterial color="#d4a574" /></mesh>
      {/* Torso */}
      <mesh position={[0, 1.0, 0]}><boxGeometry args={[0.5, 0.8, 0.3]} /><meshStandardMaterial color={color} /></mesh>
      {/* Legs */}
      <mesh ref={leftLeg} position={[-0.15, 0.5, 0]}><boxGeometry args={[0.18, 0.8, 0.18]} /><meshStandardMaterial color="#1e293b" /></mesh>
      <mesh ref={rightLeg} position={[0.15, 0.5, 0]}><boxGeometry args={[0.18, 0.8, 0.18]} /><meshStandardMaterial color="#1e293b" /></mesh>
    </group>
  );
};

export default function CityLife({ paused, isMobile, weather }: { paused: boolean, isMobile?: boolean, weather?: string }) {
  return (
    <group>
      {/* Parked Cars - NYC specified mix */}
      {/* Right Curb */}
      <NYCVehicle type="taxi" color="#fbbf24" position={[4.5, 0, -10]} rotation={[0, 0.05, 0]} /> {/* NYC Taxi (off duty) */}
      <NYCVehicle type="car" color="#111" position={[4.6, 0, -25]} rotation={[0, -0.02, 0]} /> {/* Black town car */}
      <NYCVehicle type="car" color="#475569" position={[4.4, 0, -40]} rotation={[0, 0.03, 0]} /> {/* Beat-up Honda Civic */}
      
      {/* Left Curb */}
      <NYCVehicle type="van" color="#f8fafc" position={[-4.5, 0, -15]} rotation={[0, Math.PI + 0.02, 0]} /> {/* White delivery van */}
      <NYCVehicle type="car" color="#334155" position={[-4.6, 0, -35]} rotation={[0, Math.PI - 0.05, 0]} />
      
      {/* Double-parked / Hazards truck in background */}
      <NYCVehicle type="truck" color="#d1d5db" position={[3, 0, 80]} rotation={[0, 0, 0]} hazards={true} />

      {/* NPCs - Max 12 visible localized crowd */}
      <ManhattanNPC position={[7, 0, -20]} color="#1e3a8a" speed={1.2} offset={0} />
      <ManhattanNPC position={[7.5, 0, 5]} color="#9f1239" speed={0.8} offset={2} />
      <ManhattanNPC position={[-7, 0, -15]} color="#14532d" speed={-1.5} offset={4} />
      <ManhattanNPC position={[-7.5, 0, 20]} color="#f59e0b" speed={1.0} offset={1} />
      
      {!isMobile && (
        <>
          <ManhattanNPC position={[8, 0, -50]} color="#000" speed={1.3} offset={5} />
          <ManhattanNPC position={[-8, 0, -60]} color="#555" speed={-0.9} offset={3} />
          <ManhattanNPC position={[6.5, 0, -80]} color="#2563eb" speed={1.6} offset={6} />
          <ManhattanNPC position={[-6.5, 0, -100]} color="#dc2626" speed={-1.1} offset={0.5} />
        </>
      )}
    </group>
  );
}
