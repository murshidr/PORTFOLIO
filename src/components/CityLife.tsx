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

const WindDebris = ({ isMobile }: { isMobile: boolean }) => {
  const count = isMobile ? 5 : 15;
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 15, Math.random() * 0.5, (Math.random() - 0.5) * 100),
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.05, 0, -Math.random() * 0.1 - 0.05),
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.1 + Math.random() * 0.2
    }));
  }, []);

  const refs = useRef<(THREE.Mesh | null)[]>([]);

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
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={p.position} rotation={p.rotation} scale={p.scale}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

const PigeonFlock = ({ isMobile }: { isMobile: boolean }) => {
  const count = isMobile ? 0 : 4; // Disable pigeons on mobile
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

// --- OPTIMIZED INSTANCED NPC SYSTEM ---

const getNPCCount = (isMobile: boolean) => isMobile ? 25 : 60;

// Default NPC data - will be filtered based on device
const DEFAULT_NPC_COUNT = 60;
const NPC_DATA = Array.from({ length: DEFAULT_NPC_COUNT }).map((_, i) => ({
  speed: (Math.random() - 0.5) * 4, // Some walk forward, some back
  x: i % 2 === 0 ? 7.35 + (Math.random() - 0.5) * 1 : -7.35 + (Math.random() - 0.5) * 1,
  z: (Math.random() - 0.5) * 600,
  color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
  stride: 5 + Math.random() * 5,
  offset: Math.random() * Math.PI * 2,
  type: Math.random() > 0.8 ? 'static' : 'walking'
}));

const InstancedNPCs = ({ paused, playerPos, isMobile }: { paused: boolean, playerPos: THREE.Vector3, isMobile: boolean }) => {
  const NPC_COUNT = getNPCCount(isMobile);
  const headMesh = useRef<THREE.InstancedMesh>(null);
  const torsoMesh = useRef<THREE.InstancedMesh>(null);
  const legMesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Only use subset of NPC data based on device
  const activeNPCs = useMemo(() => NPC_DATA.slice(0, NPC_COUNT), [NPC_COUNT]);
  
  useEffect(() => {
    if (!headMesh.current || !torsoMesh.current || !legMesh.current) return;
    activeNPCs.forEach((npc, i) => {
      headMesh.current!.setColorAt(i, new THREE.Color("#ffdbac"));
      torsoMesh.current!.setColorAt(i, npc.color);
      legMesh.current!.setColorAt(i, new THREE.Color("#0f172a"));
    });
    headMesh.current.instanceColor!.needsUpdate = true;
    torsoMesh.current.instanceColor!.needsUpdate = true;
    legMesh.current.instanceColor!.needsUpdate = true;
  }, [activeNPCs]);

  useFrame((state, delta) => {
    if (paused) return;
    if (!headMesh.current || !torsoMesh.current || !legMesh.current) return;

    const time = state.clock.elapsedTime;

    activeNPCs.forEach((npc, i) => {
      if (npc.type === 'walking') {
        npc.z += npc.speed * delta;
        if (Math.abs(npc.z) > 400) npc.z = -400 * (npc.speed > 0 ? 1 : -1);
      }

      const t = time * npc.stride + npc.offset;
      const legSwing = Math.sin(t) * 0.5;

      // Update Body
      dummy.position.set(npc.x, 1.0, npc.z);
      dummy.rotation.set(0, npc.speed > 0 ? 0 : Math.PI, 0);
      dummy.updateMatrix();
      torsoMesh.current!.setMatrixAt(i, dummy.matrix);

      // Update Head (with look-at logic if near player)
      const distToPlayer = playerPos.distanceTo(new THREE.Vector3(npc.x, 0, npc.z));
      dummy.position.set(npc.x, 1.6, npc.z);
      if (distToPlayer < 6) {
         dummy.lookAt(playerPos.x, 1.7, playerPos.z);
      } else {
         dummy.rotation.set(0, npc.speed > 0 ? 0 : Math.PI, 0);
      }
      dummy.updateMatrix();
      headMesh.current!.setMatrixAt(i, dummy.matrix);

      // Update Legs (Grouped logic - simplified for instancing)
      // Left Leg
      dummy.position.set(npc.x - 0.15, 0.5, npc.z);
      dummy.rotation.set(legSwing, npc.speed > 0 ? 0 : Math.PI, 0);
      dummy.updateMatrix();
      legMesh.current!.setMatrixAt(i * 2, dummy.matrix);
      // Right Leg
      dummy.position.set(npc.x + 0.15, 0.5, npc.z);
      dummy.rotation.set(-legSwing, npc.speed > 0 ? 0 : Math.PI, 0);
      dummy.updateMatrix();
      legMesh.current!.setMatrixAt(i * 2 + 1, dummy.matrix);
    });

    headMesh.current.instanceMatrix.needsUpdate = true;
    torsoMesh.current.instanceMatrix.needsUpdate = true;
    legMesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={headMesh} args={[undefined, undefined, NPC_COUNT]} castShadow>
        <boxGeometry args={[0.3, 0.35, 0.3]} />
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={torsoMesh} args={[undefined, undefined, NPC_COUNT]} castShadow>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={legMesh} args={[undefined, undefined, NPC_COUNT * 2]} castShadow>
        <boxGeometry args={[0.18, 0.8, 0.18]} />
        <meshStandardMaterial />
      </instancedMesh>
    </group>
  );
};

export default function CityLife({ paused, isMobile }: { paused: boolean, isMobile?: boolean }) {
  const playerPos = new THREE.Vector3(7.35, 0, 0);

  return (
    <group>
      {/* Driving Traffic */}
      <group>
        <DrivingVehicle type="taxi" color="#fbbf24" zStart={200} speed={12} xOffset={-2.5} />
        <DrivingVehicle type="car" color="#111" zStart={50} speed={10} xOffset={2.5} />
        {!isMobile && (
          <>
            <DrivingVehicle type="truck" color="#cbd5e1" zStart={-100} speed={8} xOffset={-2} />
            <DrivingVehicle type="taxi" color="#fbbf24" zStart={-250} speed={11} xOffset={2.2} />
            <DrivingVehicle type="car" color="#475569" zStart={150} speed={14} xOffset={-2.8} />
            <DrivingVehicle type="car" color="#fff" zStart={350} speed={9} xOffset={-2.4} />
          </>
        )}
      </group>

      {/* Atmospheric Effects */}
      <WindDebris isMobile={isMobile ?? false} />
      {!isMobile && <PigeonFlock isMobile={isMobile ?? false} />}

      {/* Parked Cars */}
      <NYCVehicle type="taxi" color="#fbbf24" position={[5.4, 0, -10]} rotation={[0, 0.05, 0]} />
      <NYCVehicle type="car" color="#111" position={[5.5, 0, -25]} rotation={[0, -0.02, 0]} />
      <NYCVehicle type="car" color="#475569" position={[5.3, 0, -40]} rotation={[0, 0.03, 0]} />
      <NYCVehicle type="car" color="#2d3748" position={[5.4, 0, 15]} rotation={[0, 0.01, 0]} />
      <NYCVehicle type="car" color="#e2e8f0" position={[5.5, 0, 85]} rotation={[0, -0.04, 0]} />
      
      {/* Optimized Crowd */}
      <InstancedNPCs paused={paused} playerPos={playerPos} isMobile={isMobile ?? false} />
    </group>
  );
}


