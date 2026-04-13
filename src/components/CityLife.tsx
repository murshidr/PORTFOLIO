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
// --- ENVIRONMENT DETAILS (Wind & Birds) ---

const WindDebris = () => {
  const count = 15;
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 15, Math.random() * 0.5, (Math.random() - 0.5) * 100),
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.05, 0, -Math.random() * 0.1 - 0.05),
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.1 + Math.random() * 0.2
    }));
  }, []);

  const refs = useRef<THREE.Group[]>([]);

  useFrame((state, delta) => {
    refs.current.forEach((ref, i) => {
      if (ref) {
        ref.position.addScaledVector(particles[i].velocity, 60 * delta);
        ref.rotation.x += 0.02;
        ref.rotation.y += 0.01;
        if (ref.position.z < -70) ref.position.z = 70;
      }
    });
  });

  return (
    <group>
      {particles.map((p, i) => (
        <mesh key={i} ref={el => refs.current[i] = el!} position={p.position} rotation={p.rotation} scale={p.scale}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

const PigeonFlock = () => {
  const count = 8;
  const birds = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
        phase: Math.random() * Math.PI * 2,
        offset: new THREE.Vector3((Math.random() - 0.5) * 5, 5 + Math.random() * 10, (Math.random() - 0.5) * 5)
    }));
  }, []);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.position.z -= 0.15;
        if (groupRef.current.position.z < -80) groupRef.current.position.z = 80;
        
        groupRef.current.children.forEach((b, i) => {
            const t = state.clock.elapsedTime * 10 + birds[i].phase;
            b.position.y = birds[i].offset.y + Math.sin(t) * 0.5;
            b.rotation.z = Math.sin(t) * 0.5; // Flapping wing feel
        });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
        {birds.map((b, i) => (
            <mesh key={i} position={b.offset.toArray() as any}>
                <boxGeometry args={[0.2, 0.1, 0.4]} />
                <meshStandardMaterial color="#4b5563" />
            </mesh>
        ))}
    </group>
  );
};

const DrivingVehicle = ({ color, speed, zStart, xOffset, type = 'car' }: any) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.z -= speed * delta;
      // Loop back
      if (ref.current.position.z < -140) ref.current.position.z = 140;
    }
  });

  const isTruck = type === 'truck';

  return (
    <group ref={ref} position={[xOffset, 0, zStart]}>
      {/* Chassis */}
      <mesh castShadow receiveShadow position={[0, isTruck ? 0.6 : 0.4, 0]}>
        <boxGeometry args={[isTruck ? 2.5 : 1.8, isTruck ? 1.2 : 0.8, isTruck ? 6 : 4.2]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Upper/Cabin */}
      <mesh castShadow position={[0, isTruck ? 1.8 : 1.0, isTruck ? -1.5 : -0.2]}>
        <boxGeometry args={[isTruck ? 2.4 : 1.6, isTruck ? 1.5 : 0.6, isTruck ? 3 : 2.5]} />
        <meshStandardMaterial color={isTruck ? "#fff" : color} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Wheels */}
      {[ [0.9, 0, 1.2], [-0.9, 0, 1.2], [0.9, 0, -1.2], [-0.9, 0, -1.2] ].map((pos, i) => (
        <mesh key={i} position={[pos[0] * (isTruck ? 1.3 : 1), 0, pos[2] * (isTruck ? 1.8 : 1)]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[isTruck ? 0.5 : 0.35, isTruck ? 0.5 : 0.35, 0.4]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}
      {/* Headlights */}
      <mesh position={[isTruck ? 1 : 0.7, 0.5, 2.1]}><sphereGeometry args={[0.15]} /><meshBasicMaterial color="#fff" /></mesh>
      <mesh position={[isTruck ? -1 : -0.7, 0.5, 2.1]}><sphereGeometry args={[0.15]} /><meshBasicMaterial color="#fff" /></mesh>
    </group>
  );
};

// --- NPC SYSTEM (Max 12 localized) ---

const ManhattanNPC = ({ color, position, speed, offset, playerPos }: any) => {
  const ref = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.z += speed * delta;
      if (Math.abs(ref.current.position.z) > 150) ref.current.position.z = -150 * (speed > 0 ? 1 : -1);
      
      const t = state.clock.elapsedTime * 6 + offset;
      if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t) * 0.5;
      if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(t + Math.PI) * 0.5;

      // --- Head Tracking ---
      if (headRef.current && playerPos) {
        const dist = ref.current.position.distanceTo(playerPos);
        if (dist < 6) {
           headRef.current.lookAt(playerPos.x, 1.7, playerPos.z);
        } else {
           headRef.current.rotation.set(0, 0, 0);
        }
      }
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Head */}
      <group ref={headRef} position={[0, 1.6, 0]}>
         <mesh><boxGeometry args={[0.3, 0.35, 0.3]} /><meshStandardMaterial color="#d4a574" /></mesh>
      </group>
      {/* Torso */}
      <mesh position={[0, 1.0, 0]}><boxGeometry args={[0.5, 0.8, 0.3]} /><meshStandardMaterial color={color} /></mesh>
      {/* Legs */}
      <mesh ref={leftLeg} position={[-0.15, 0.5, 0]}><boxGeometry args={[0.18, 0.8, 0.18]} /><meshStandardMaterial color="#1e293b" /></mesh>
      <mesh ref={rightLeg} position={[0.15, 0.5, 0]}><boxGeometry args={[0.18, 0.8, 0.18]} /><meshStandardMaterial color="#1e293b" /></mesh>
    </group>
  );
};

export default function CityLife({ paused, isMobile }: { paused: boolean, isMobile?: boolean }) {
  // Use a simple state or global sync for player pos (simulated here at center sidewalk)
  const playerPos = new THREE.Vector3(7.35, 0, 0);

  return (
    <group>
      {/* Driving Traffic */}
      {!isMobile && (
        <group>
          <DrivingVehicle type="taxi" color="#fbbf24" zStart={80} speed={12} xOffset={-2.5} />
          <DrivingVehicle type="car" color="#111" zStart={20} speed={10} xOffset={2.5} />
          <DrivingVehicle type="truck" color="#cbd5e1" zStart={-40} speed={8} xOffset={-2} />
        </group>
      )}

      {/* Atmospheric Effects */}
      {!isMobile && (
        <>
          <WindDebris />
          <PigeonFlock />
        </>
      )}

      {/* Parked Cars - NYC specified mix */}
      {/* Right Curb */}
      <NYCVehicle type="taxi" color="#fbbf24" position={[5.4, 0, -10]} rotation={[0, 0.05, 0]} />
      <NYCVehicle type="car" color="#111" position={[5.5, 0, -25]} rotation={[0, -0.02, 0]} />
      <NYCVehicle type="car" color="#475569" position={[5.3, 0, -40]} rotation={[0, 0.03, 0]} />
      <NYCVehicle type="car" color="#2d3748" position={[5.4, 0, 15]} rotation={[0, 0.01, 0]} />
      <NYCVehicle type="car" color="#e2e8f0" position={[5.5, 0, 35]} rotation={[0, -0.04, 0]} />
      
      {/* Left Curb */}
      <NYCVehicle type="car" color="#5a1010" position={[-5.4, 0, -5]} rotation={[0, 0.02, 0]} />
      <NYCVehicle type="car" color="#1a202c" position={[-5.5, 0, -20]} rotation={[0, -0.03, 0]} />
      <NYCVehicle type="car" color="#94a3b8" position={[-5.3, 0, 10]} rotation={[0, 0.01, 0]} />

      {/* Walking NPCs */}
      <ManhattanNPC color="#2563eb" position={[7, 0, -50]} speed={1.2} offset={0} playerPos={playerPos} />
      <ManhattanNPC color="#dc2626" position={[7.5, 0, -80]} speed={0.8} offset={Math.PI/2} playerPos={playerPos} />
      <ManhattanNPC color="#059669" position={[-7.4, 0, -30]} speed={-1.5} offset={Math.PI} playerPos={playerPos} />
      {!isMobile && (
        <>
          <ManhattanNPC color="#7c3aed" position={[7.2, 0, 20]} speed={1.1} offset={3} playerPos={playerPos} />
          <ManhattanNPC color="#ea580c" position={[-7.6, 0, 60]} speed={-0.9} offset={5} playerPos={playerPos} />
          <ManhattanNPC color="#be185d" position={[-7.2, 0, 90]} speed={-1.2} offset={4} playerPos={playerPos} />
        </>
      )}
    </group>
  );
}
