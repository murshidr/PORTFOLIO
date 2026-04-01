import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const YellowTaxi = ({ initialZ, speed, laneX, paused, isMobile }: any) => {
  const ref = useRef<THREE.Group>(null);
  const direction = speed > 0 ? 1 : -1;

  useFrame((state, delta) => {
    if (ref.current && !paused) {
      ref.current.position.z += speed * delta;
      if (ref.current.position.z > 150) ref.current.position.z = -150;
      if (ref.current.position.z < -150) ref.current.position.z = 150;
    }
  });

  return (
    <group ref={ref} position={[laneX, 0.6, initialZ]} rotation={[0, direction > 0 ? 0 : Math.PI, 0]}>
      <mesh castShadow={!isMobile} position={[0, 0.3, 0]}>
        <boxGeometry args={[1.8, 0.8, 4]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh castShadow={!isMobile} position={[0, 0.9, -0.2]}>
        <boxGeometry args={[1.6, 0.6, 2.5]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Taxi Sign */}
      <mesh position={[0, 1.3, -0.2]}>
        <boxGeometry args={[0.6, 0.2, 0.4]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 0.9, -0.2]}>
        <boxGeometry args={[1.62, 0.5, 2.2]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Wheels */}
      {[ [0.9, -0.3, 1.2], [-0.9, -0.3, 1.2], [0.9, -0.3, -1.2], [-0.9, -0.3, -1.2] ].map((pos, i) => (
        <mesh key={i} position={pos as any} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.4]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}
    </group>
  );
};

const BlackSedan = ({ initialZ, speed, laneX, color, paused, isMobile }: any) => {
  const ref = useRef<THREE.Group>(null);
  const direction = speed > 0 ? 1 : -1;

  useFrame((state, delta) => {
    if (ref.current && !paused) {
      ref.current.position.z += speed * delta;
      if (ref.current.position.z > 150) ref.current.position.z = -150;
      if (ref.current.position.z < -150) ref.current.position.z = 150;
    }
  });

  return (
    <group ref={ref} position={[laneX, 0.6, initialZ]} rotation={[0, direction > 0 ? 0 : Math.PI, 0]}>
      <mesh castShadow={!isMobile} position={[0, 0.3, 0]}>
        <boxGeometry args={[1.9, 0.8, 4.2]} />
        <meshStandardMaterial color={color || "#111"} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh castShadow={!isMobile} position={[0, 0.9, -0.2]}>
        <boxGeometry args={[1.7, 0.6, 2.8]} />
        <meshStandardMaterial color={color || "#111"} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.9, -0.2]}>
        <boxGeometry args={[1.72, 0.5, 2.5]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      {/* Wheels */}
      {[ [1.0, -0.3, 1.3], [-1.0, -0.3, 1.3], [1.0, -0.3, -1.3], [-1.0, -0.3, -1.3] ].map((pos, i) => (
        <mesh key={i} position={pos as any} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}
    </group>
  );
};

// --- ADVANCED NPC HUMAN ---
interface Routine {
  type: 'commuter' | 'shopper' | 'stroller' | 'beachWatcher' | 'socializing';
  targetX?: number;
  targetZ?: number;
  waitTime?: number;
}

const HumanNPC = ({ initialZ, speed, initialLaneX, paused, isMobile, routine, weather }: any) => {
  const ref = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);

  const [behavior, setBehavior] = useState<'walking' | 'idle_browsing' | 'idle_waiting' | 'watching_ocean'>('walking');
  const timer = useRef(Math.random() * 5);
  const direction = useRef(speed > 0 ? 1 : -1);
  const currentSpeed = useRef(Math.abs(speed));

  const skinTone = useMemo(() => ['#ffdbac', '#f1c27d', '#e0ac69', '#8d5524', '#c68642'][Math.floor(Math.random() * 5)], []);
  const shirtColor = useMemo(() => ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#6b7280', '#ffffff'][Math.floor(Math.random() * 6)], []);
  const pantColor = useMemo(() => ['#1e3a8a', '#111827', '#4b5563', '#d1d5db'][Math.floor(Math.random() * 4)], []);

  useFrame((state, delta) => {
    if (!ref.current || paused) return;

    const isRaining = weather === 'RAIN' || weather === 'STORM';

    // RDR2 Detail: Seek shelter when raining
    if (isRaining && behavior !== 'idle_waiting' && routine.type !== 'commuter') {
       // Force move towards the bus stop (z=-40) or building side
       routine.type = 'commuter';
       routine.targetZ = -40;
       currentSpeed.current = Math.abs(speed) * 1.5; // Walk faster in rain
    }

    if (behavior === 'walking') {
      ref.current.position.z += currentSpeed.current * direction.current * delta;
      ref.current.rotation.y = direction.current > 0 ? 0 : Math.PI;
      
      const time = state.clock.elapsedTime * currentSpeed.current * 4;
      if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(time) * 0.5;
      if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(time + Math.PI) * 0.5;
      if (leftArm.current) leftArm.current.rotation.x = Math.sin(time + Math.PI) * 0.5;
      if (rightArm.current) rightArm.current.rotation.x = Math.sin(time) * 0.5;

      // Routine Detection
      if (routine.type === 'beachWatcher' && !isRaining) {
         const characterX = 17.5;
         const characterZ = 0;
         const dist = Math.abs(ref.current.position.z - (routine.targetZ || 0));
         if (dist < 1) {
            setBehavior('watching_ocean');
            timer.current = 10 + Math.random() * 20;
            // Face the ocean (Ocean is at x = -75)
            ref.current.rotation.y = -Math.PI / 2;
         }
      }

      if (routine.type === 'shopper' && routine.targetZ) {
        const dist = Math.abs(ref.current.position.z - routine.targetZ);
        if (dist < 0.5) {
          setBehavior('idle_browsing');
          timer.current = 5 + Math.random() * 5;
          ref.current.rotation.y = initialLaneX > 0 ? -Math.PI / 2 : Math.PI / 2;
        }
      }

      // Loop
      if (Math.abs(ref.current.position.z) > 150) {
          ref.current.position.z = -150 * direction.current;
      }

    } else {
      // Idle / Watching
      timer.current -= delta;
      if (leftLeg.current) leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, 0, 0.1);
      if (rightLeg.current) rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, 0, 0.1);
      
      if (timer.current <= 0) {
        setBehavior('walking');
        currentSpeed.current = Math.abs(speed);
        if (Math.random() > 0.7) direction.current *= -1;
      }
    }
  });

  return (
    <group ref={ref} position={[initialLaneX, 0, initialZ]} rotation={[0, direction.current > 0 ? 0 : Math.PI, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[0.3, 0.35, 0.3]} />
        <meshStandardMaterial color={skinTone} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      
      <group position={[-0.35, 1.3, 0]} ref={leftArm}>
        <mesh position={[0, -0.35, 0]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
          <meshStandardMaterial color={skinTone} />
        </mesh>
      </group>
      <group position={[0.35, 1.3, 0]} ref={rightArm}>
        <mesh position={[0, -0.35, 0]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
          <meshStandardMaterial color={skinTone} />
        </mesh>
      </group>

      <group position={[-0.15, 0.6, 0]} ref={leftLeg}>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.2]} />
          <meshStandardMaterial color={pantColor} />
        </mesh>
      </group>
      <group position={[0.15, 0.6, 0]} ref={rightLeg}>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.2]} />
          <meshStandardMaterial color={pantColor} />
        </mesh>
      </group>
    </group>
  );
};

const Cyclist = ({ initialZ, speed, laneX, color, paused, isMobile }: any) => {
  const ref = useRef<THREE.Group>(null);
  const frontWheel = useRef<THREE.Mesh>(null);
  const backWheel = useRef<THREE.Mesh>(null);
  const direction = speed > 0 ? 1 : -1;

  useFrame((state, delta) => {
    if (ref.current && !paused) {
      ref.current.position.z += speed * delta;
      
      // Rotate wheels based on speed
      const wheelRotationSpeed = (speed * delta) / 0.35; // speed / radius
      if (frontWheel.current) frontWheel.current.rotation.x -= wheelRotationSpeed;
      if (backWheel.current) backWheel.current.rotation.x -= wheelRotationSpeed;

      if (ref.current.position.z > 100) ref.current.position.z = -100;
      if (ref.current.position.z < -100) ref.current.position.z = 100;
    }
  });

  return (
    <group ref={ref} position={[laneX, 0.5, initialZ]} rotation={[0, direction > 0 ? 0 : Math.PI, 0]}>
      {/* Bicycle Frame */}
      {!isMobile && (
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.1, 0.5, 1.5]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      )}
      {/* Wheels */}
      {!isMobile && (
        <>
          <mesh ref={frontWheel} position={[0, 0, 0.6]}>
            <group rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.35, 0.05, 8, 16]} />
              <meshStandardMaterial color="#111" />
              {/* Spokes for visual rotation */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.7]} />
                <meshStandardMaterial color="#888" />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.01, 0.01, 0.7]} />
                <meshStandardMaterial color="#888" />
              </mesh>
            </group>
          </mesh>
          <mesh ref={backWheel} position={[0, 0, -0.6]}>
            <group rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.35, 0.05, 8, 16]} />
              <meshStandardMaterial color="#111" />
              {/* Spokes for visual rotation */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.7]} />
                <meshStandardMaterial color="#888" />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.01, 0.01, 0.7]} />
                <meshStandardMaterial color="#888" />
              </mesh>
            </group>
          </mesh>
          {/* Handlebars */}
          <mesh position={[0, 0.9, 0.6]} rotation={[0, 0, Math.PI/2]}>
             <cylinderGeometry args={[0.03, 0.03, 0.6]} />
             <meshStandardMaterial color="#111" />
          </mesh>
        </>
      )}
      {/* Rider */}
      <mesh position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.25, 0.8, 4, isMobile ? 4 : 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {!isMobile && (
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#ffccaa" />
        </mesh>
      )}
    </group>
  );
};

const Bird = ({ initialZ, speed, initialX, initialY, paused, isMobile }: any) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current && !paused) {
      ref.current.position.z += speed * delta;
      // Circle or wave motion
      ref.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 2 + initialZ) * 2;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 5) * 0.2; // Flapping roll

      if (ref.current.position.z > 150) ref.current.position.z = -150;
      if (ref.current.position.z < -150) ref.current.position.z = 150;
    }
  });

  return (
    <group ref={ref} position={[initialX, initialY, initialZ]}>
      {/* Simple V shape bird */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <coneGeometry args={[0.1, 0.5, 3]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {!isMobile && (
        <>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.4, 0.05, 0.2]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.4, 0.05, 0.2]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </>
      )}
    </group>
  );
};

// --- GPU INSTANCED ACTOR SYSTEM (Extreme Optimization) ---
const HumanInstances = ({ count, color, initialLaneX, laneWidth, weather, paused }: any) => {
  const torsoRef = useRef<THREE.InstancedMesh>(null);
  const headRef = useRef<THREE.InstancedMesh>(null);
  const leftArmRef = useRef<THREE.InstancedMesh>(null);
  const rightArmRef = useRef<THREE.InstancedMesh>(null);
  const leftLegRef = useRef<THREE.InstancedMesh>(null);
  const rightLegRef = useRef<THREE.InstancedMesh>(null);
  const faceRef = useRef<THREE.InstancedMesh>(null);
  
  const data = useMemo(() => Array.from({ length: count }).map((_, i) => {
    // Professional NYC crowd - mix of suits, casuals, colorful outfits
    const outfitPalettes = [
      // Dark business suits
      { torso: '#1e293b', legs: '#0f172a', skin: '#ffdbac' },
      { torso: '#1e3a5f', legs: '#172554', skin: '#d4a574' },
      // Colorful business casual
      { torso: '#2563eb', legs: '#1e293b', skin: '#ffdbac' },
      { torso: '#dc2626', legs: '#1e293b', skin: '#c68642' },
      { torso: '#16a34a', legs: '#14532d', skin: '#ffdbac' },
      { torso: '#7c3aed', legs: '#1e293b', skin: '#d4a574' },
      // Light / smart casual
      { torso: '#f1f5f9', legs: '#334155', skin: '#ffdbac' },
      { torso: '#fbbf24', legs: '#1e293b', skin: '#8d5524' },
      { torso: '#f97316', legs: '#292524', skin: '#c68642' },
      { torso: '#06b6d4', legs: '#0f172a', skin: '#ffdbac' },
    ];
    const palette = outfitPalettes[Math.floor(Math.random() * outfitPalettes.length)];
    
    // Organized Manhattan foot traffic: split into directional lanes to avoid chaos
    const isForward = i % 2 === 0;
    const laneOffset = isForward ? (Math.random() * laneWidth / 2) : -(Math.random() * laneWidth / 2);
    
    // Distribute evenly along the Z axis to prevent massive clumping
    const spacing = 300 / count;
    const baseZ = -150 + i * spacing;

    return {
      z: baseZ + (Math.random() - 0.5) * spacing * 0.8,
      x: initialLaneX + laneOffset,
      speed: (2.0 + Math.random() * 1.5) * (isForward ? 1 : -1),
      offset: Math.random() * Math.PI * 2,
      torsoColor: new THREE.Color(palette.torso),
      legColor: new THREE.Color(palette.legs),
      skinColor: new THREE.Color(palette.skin),
    };
  }), [count, initialLaneX, laneWidth]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize colors
  useEffect(() => {
    data.forEach((p, i) => {
      torsoRef.current?.setColorAt(i, p.torsoColor);
      headRef.current?.setColorAt(i, p.skinColor);
      leftArmRef.current?.setColorAt(i, p.skinColor);
      rightArmRef.current?.setColorAt(i, p.skinColor);
      leftLegRef.current?.setColorAt(i, p.legColor);
      rightLegRef.current?.setColorAt(i, p.legColor);
    });
    if (torsoRef.current?.instanceColor) torsoRef.current.instanceColor.needsUpdate = true;
    if (headRef.current?.instanceColor) headRef.current.instanceColor.needsUpdate = true;
    if (leftArmRef.current?.instanceColor) leftArmRef.current.instanceColor.needsUpdate = true;
    if (rightArmRef.current?.instanceColor) rightArmRef.current.instanceColor.needsUpdate = true;
    if (leftLegRef.current?.instanceColor) leftLegRef.current.instanceColor.needsUpdate = true;
    if (rightLegRef.current?.instanceColor) rightLegRef.current.instanceColor.needsUpdate = true;
  }, [data]);

  useFrame((state, delta) => {
    if (!torsoRef.current || !headRef.current || paused) return;
    
    const playerPos = { x: 17.5, z: 0 };
    const t = state.clock.elapsedTime;

    data.forEach((p, i) => {
      // Basic Movement
      p.z += p.speed * delta;
      if (Math.abs(p.z) > 150) p.z = -150 * (p.speed > 0 ? 1 : -1);

      // Avoidance
      if (Math.abs(p.z - playerPos.z) < 15) {
        if (Math.abs(p.x - playerPos.x) < 1.5) p.x += (p.x > playerPos.x ? 0.05 : -0.05);
      }

      const stride = 8 * (p.speed > 0 ? 1 : 1.1);
      const walkCycle = Math.sin(t * stride + p.offset);
      const direction = p.speed > 0 ? 0 : Math.PI;

      // --- RESET DUMMY ---
      dummy.rotation.set(0, 0, 0);
      const npcScale = 1.0; // Same height as player
      dummy.scale.set(npcScale, npcScale, npcScale);

      // --- TORSO (Pivot: Bottom center) ---
      dummy.position.set(p.x, 0.6 * npcScale, p.z);
      dummy.rotation.y = direction;
      dummy.scale.set(0.5 * npcScale, 0.8 * npcScale, 0.3 * npcScale);
      dummy.updateMatrix();
      torsoRef.current!.setMatrixAt(i, dummy.matrix);

      // --- HEAD (Pivot: Bottom center) ---
      dummy.rotation.set(0, direction, 0);
      dummy.position.set(p.x, (1.4 + Math.abs(walkCycle) * 0.05) * npcScale, p.z);
      dummy.scale.set(0.3 * npcScale, 0.35 * npcScale, 0.3 * npcScale);
      dummy.updateMatrix();
      headRef.current!.setMatrixAt(i, dummy.matrix);

      // --- FACE ---
      dummy.position.set(p.x, (1.4 + Math.abs(walkCycle) * 0.05) * npcScale, p.z + (p.speed > 0 ? 0.16 : -0.16) * npcScale);
      dummy.scale.set(0.15 * npcScale, 0.05 * npcScale, 0.02 * npcScale);
      dummy.updateMatrix();
      faceRef.current!.setMatrixAt(i, dummy.matrix);

      // --- ARMS ---
      const shoulderY = 1.3 * npcScale;
      const shoulderX = 0.35 * npcScale;
      
      // Left Arm
      dummy.rotation.set(walkCycle * 0.5, direction, 0);
      dummy.position.set(p.x + shoulderX, shoulderY, p.z);
      dummy.scale.set(0.12 * npcScale, 0.6 * npcScale, 0.12 * npcScale);
      dummy.updateMatrix();
      leftArmRef.current!.setMatrixAt(i, dummy.matrix);

      // Right Arm
      dummy.rotation.set(-walkCycle * 0.5, direction, 0);
      dummy.position.set(p.x - shoulderX, shoulderY, p.z);
      dummy.updateMatrix();
      rightArmRef.current!.setMatrixAt(i, dummy.matrix);

      // --- LEGS ---
      const hipY = 0.75 * npcScale;
      const hipX = 0.18 * npcScale;
      dummy.scale.set(0.18 * npcScale, 0.8 * npcScale, 0.18 * npcScale);
      
      // Left Leg
      dummy.rotation.set(-walkCycle * 0.6, direction, 0);
      dummy.position.set(p.x + hipX, hipY, p.z);
      dummy.updateMatrix();
      leftLegRef.current!.setMatrixAt(i, dummy.matrix);

      // Right Leg
      dummy.rotation.set(walkCycle * 0.6, direction, 0);
      dummy.position.set(p.x - hipX, hipY, p.z);
      dummy.updateMatrix();
      rightLegRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    torsoRef.current.instanceMatrix.needsUpdate = true;
    headRef.current.instanceMatrix.needsUpdate = true;
    leftArmRef.current.instanceMatrix.needsUpdate = true;
    rightArmRef.current.instanceMatrix.needsUpdate = true;
    leftLegRef.current.instanceMatrix.needsUpdate = true;
    rightLegRef.current.instanceMatrix.needsUpdate = true;
    faceRef.current.instanceMatrix.needsUpdate = true;
  });

  // --- GEOMETRY HELPERS (Pivots for natural animation) ---
  const torsoGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0); // Pivot at bottom
    return geo;
  }, []);

  const limbGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, -0.5, 0); // Pivot at top
    return geo;
  }, []);

  return (
    <group>
      <instancedMesh ref={torsoRef} args={[torsoGeo, undefined, count]} castShadow>
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={headRef} args={[undefined, undefined, count]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial /> 
      </instancedMesh>
      <instancedMesh ref={leftArmRef} args={[limbGeo, undefined, count]} castShadow>
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={rightArmRef} args={[limbGeo, undefined, count]} castShadow>
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={leftLegRef} args={[limbGeo, undefined, count]} castShadow>
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={rightLegRef} args={[limbGeo, undefined, count]} castShadow>
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={faceRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#000000" />
      </instancedMesh>
    </group>
  );
};

const VehiclesLayer = ({ paused, isMobile }: any) => {
  const count = isMobile ? 15 : 40;
  const vehicles = useMemo(() => Array.from({ length: count }).map((_, i) => {
    const laneX = [-7, -3, 3, 7][Math.floor(Math.random() * 4)];
    const direction = laneX > 0 ? 1 : -1;
    return {
      type: Math.random() > 0.5 ? 'taxi' : 'car',
      z: (Math.random() - 0.5) * 300,
      laneX,
      speed: (12 + Math.random() * 8) * direction,
      color: ['#000', '#111', '#222', '#333'][Math.floor(Math.random() * 4)]
    };
  }), [count, isMobile]);

  return (
    <group>
      {vehicles.map((v, i) => {
        if (v.type === 'taxi') return <YellowTaxi key={i} initialZ={v.z} laneX={v.laneX} speed={v.speed} paused={paused} isMobile={isMobile} />;
        return <BlackSedan key={i} initialZ={v.z} laneX={v.laneX} speed={v.speed} paused={paused} color={v.color} isMobile={isMobile} />;
      })}
    </group>
  );
};

const BirdGroup = ({ paused, isMobile }: any) => {
  const count = isMobile ? 8 : 20;
  return Array.from({ length: count }).map((_, i) => (
    <Bird key={i} initialZ={(Math.random()-0.5)*200} speed={10+Math.random()*5} initialX={(Math.random()-0.5)*40} initialY={10+Math.random()*5} paused={paused} isMobile={isMobile} />
  ));
};

export default function CityLife({ paused, isMobile, weather }: { paused: boolean, isMobile?: boolean, weather?: string }) {
  return (
    <group>
      {/* Layer 1: Waterline (Dynamic) */}
      <HumanInstances count={isMobile ? 20 : 50} color="#ffbdad" initialLaneX={-40} laneWidth={10} paused={paused} weather={weather} />
      
      {/* Layer 1: Road (Vehicles only) */}
      
      {/* Layer 2: Right Sidewalk */}
      <HumanInstances count={isMobile ? 30 : 80} color="#ffffff" initialLaneX={13.5} laneWidth={3} paused={paused} weather={weather} />

      {/* Layer 6: Left Sidewalk */}
      <HumanInstances count={isMobile ? 20 : 60} color="#cbd5e1" initialLaneX={-13.5} laneWidth={3} paused={paused} weather={weather} />

      {/* Optimized Vehicles */}
      <VehiclesLayer paused={paused} isMobile={isMobile} />
      
      <BirdGroup paused={paused} isMobile={isMobile} />
    </group>
  );
};

