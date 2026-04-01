import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AutoRickshaw = ({ initialZ, speed, laneX, paused, isMobile }: any) => {
  const ref = useRef<THREE.Group>(null);
  const direction = speed > 0 ? 1 : -1;
  const wobbleOffset = Math.random() * 100;

  useFrame((state, delta) => {
    if (ref.current && !paused) {
      ref.current.position.z += speed * delta;

      // Slight lane drift/wobble
      // Reduce wobble frequency on mobile
      if (!isMobile) {
        const wobble = Math.sin(state.clock.elapsedTime * 2 + wobbleOffset) * 0.2;
        ref.current.position.x = laneX + wobble;
      }

      if (ref.current.position.z > 150) ref.current.position.z = -150;
      if (ref.current.position.z < -150) ref.current.position.z = 150;
    }
  });

  return (
    <group ref={ref} position={[laneX, 0.6, initialZ]} rotation={[0, direction > 0 ? 0 : Math.PI, 0]}>
      {/* Body (Yellow Top) */}
      <mesh castShadow={!isMobile} position={[0, 0.8, -0.2]}>
        <boxGeometry args={[1.4, 0.8, 1.8]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.4} />
      </mesh>
      {/* Lower Body (Black) */}
      <mesh castShadow={!isMobile} position={[0, 0.3, 0]}>
        <boxGeometry args={[1.3, 0.6, 2.2]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      {/* Windshield */}
      <mesh position={[0, 0.8, 0.71]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Wheels (3 wheels) */}
      <mesh position={[0, -0.3, 1.0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0.6, -0.3, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-0.6, -0.3, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
};

const MTCBus = ({ initialZ, speed, laneX, paused, isMobile }: any) => {
  const ref = useRef<THREE.Group>(null);
  const direction = speed > 0 ? 1 : -1;

  // Bus Stop Logic
  // Stops are at z = -40 and z = 80 on the Right side (laneX > 0)
  const isRightLane = laneX > 0;
  const stops = isRightLane ? [-40, 80] : [];

  const [busState, setBusState] = useState<'moving' | 'stopping' | 'stopped' | 'accelerating'>('moving');
  const stopTimer = useRef(0);
  const currentSpeed = useRef(Math.abs(speed));
  const maxSpeed = Math.abs(speed);

  // Passengers visual
  const [passengersVisible, setPassengersVisible] = useState(false);

  useFrame((state, delta) => {
    if (ref.current && !paused) {
      // ... existing movement logic ...
      if (isRightLane) { // Stop logic runs on all devices now
        const z = ref.current.position.z;

        if (busState === 'moving') {
          for (const stopZ of stops) {
            const dist = stopZ - z;
            if (dist > 0 && dist < 15) {
              setBusState('stopping');
            }
          }
          setPassengersVisible(false);
        } else if (busState === 'stopping') {
          currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, 0, delta * 2);
          if (currentSpeed.current < 0.1) {
            currentSpeed.current = 0;
            setBusState('stopped');
            stopTimer.current = 0;
            setPassengersVisible(true); // Show passengers boarding/alighting
          }
        } else if (busState === 'stopped') {
          stopTimer.current += delta;
          if (stopTimer.current > 4) { // Wait 4 seconds
            setBusState('accelerating');
            setPassengersVisible(false);
          }
        } else if (busState === 'accelerating') {
          currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, maxSpeed, delta * 1.5);
          if (currentSpeed.current > maxSpeed * 0.95) {
            currentSpeed.current = maxSpeed;
            setBusState('moving');
          }
        }
      }

      const finalSpeed = (speed > 0 ? 1 : -1) * currentSpeed.current;
      ref.current.position.z += finalSpeed * delta;

      if (ref.current.position.z > 150) ref.current.position.z = -150;
      if (ref.current.position.z < -150) ref.current.position.z = 150;
    }
  });

  return (
    <group ref={ref} position={[laneX, 1.5, initialZ]} rotation={[0, direction > 0 ? 0 : Math.PI, 0]}>
      {/* Main Body (Red/White MTC style) */}
      <mesh castShadow={!isMobile} position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 2.5, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* White Stripe */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.85, 0.8, 8.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Windows */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.9, 0.8, 7.5]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Passengers Boarding/Alighting Animation */}
      {passengersVisible && (
        <group position={[-1.8, -1, 2]}> {/* Near rear door */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh key={i} position={[Math.random() * 0.5, 0, Math.random() * 0.5]}>
              <capsuleGeometry args={[0.15, 0.6]} />
              <meshStandardMaterial color={['#fff', '#333', '#f00'][i]} />
            </mesh>
          ))}
        </group>
      )}

      {/* Wheels */}
      <mesh position={[1.4, -1.2, 2.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1.4, -1.2, 2.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.4, -1.2, -2.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1.4, -1.2, -2.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Brake Lights (Active when stopping/stopped) */}
      {(busState === 'stopping' || busState === 'stopped') && (
        <>
          <mesh position={[1, -0.5, -4.05]}>
            <sphereGeometry args={[0.2]} />
            <meshBasicMaterial color="#ff0000" toneMapped={false} />
          </mesh>
          <mesh position={[-1, -0.5, -4.05]}>
            <sphereGeometry args={[0.2]} />
            <meshBasicMaterial color="#ff0000" toneMapped={false} />
          </mesh>
        </>
      )}
    </group>
  );
};

const Car = ({ initialZ, speed, laneX, color, paused, isMobile }: any) => {
  const ref = useRef<THREE.Group>(null);
  const direction = speed > 0 ? 1 : -1;
  const wobbleOffset = Math.random() * 100;

  const [isBraking, setIsBraking] = useState(false);
  const currentSpeed = useRef(Math.abs(speed));
  const maxSpeed = Math.abs(speed);

  useFrame((state, delta) => {
    if (ref.current && !paused) {
      // Very basic "traffic sensing"
      // If a vehicle is ahead or if near character (z=0, x=7.5)
      const distToCenter = Math.abs(ref.current.position.z - 0);
      const isNearCharacter = distToCenter < 15 && Math.abs(laneX - 7.5) < 10;
      
      if (isNearCharacter) {
        setIsBraking(true);
        currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, maxSpeed * 0.4, delta * 2);
      } else {
        setIsBraking(false);
        currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, maxSpeed, delta);
      }

      const finalSpeed = (speed > 0 ? 1 : -1) * currentSpeed.current;
      ref.current.position.z += finalSpeed * delta;

      if (!isMobile) {
        const wobble = Math.sin(state.clock.elapsedTime * 1.5 + wobbleOffset) * 0.15;
        ref.current.position.x = laneX + wobble;
      }

      if (ref.current.position.z > 150) ref.current.position.z = -150;
      if (ref.current.position.z < -150) ref.current.position.z = 150;
    }
  });

  return (
    <group ref={ref} position={[laneX, 0.6, initialZ]} rotation={[0, direction > 0 ? 0 : Math.PI, 0]}>
      {/* Car Body */}
      <mesh castShadow={!isMobile} receiveShadow={!isMobile} position={[0, 0.3, 0]}>
        <boxGeometry args={[1.8, 0.8, 4]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Car Top */}
      <mesh castShadow={!isMobile} receiveShadow={!isMobile} position={[0, 0.9, -0.2]}>
        <boxGeometry args={[1.6, 0.6, 2.5]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Windows */}
      <mesh position={[0, 0.9, -0.2]}>
        <boxGeometry args={[1.62, 0.5, 2.2]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Headlights */}
      <mesh position={[0.6, 0.3, 2]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} toneMapped={false} />
      </mesh>
      <mesh position={[-0.6, 0.3, 2]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} toneMapped={false} />
      </mesh>

      {/* Taillights */}
      <mesh position={[0.6, 0.3, -2]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={isBraking ? 10 : 3} toneMapped={false} />
      </mesh>
      <mesh position={[-0.6, 0.3, -2]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={isBraking ? 10 : 3} toneMapped={false} />
      </mesh>

      {/* Wheels */}
      <mesh position={[0.9, -0.3, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-0.9, -0.3, 1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0.9, -0.3, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-0.9, -0.3, -1.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4]} />
        <meshStandardMaterial color="#111" />
      </mesh>
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
  
  const data = useMemo(() => Array.from({ length: count }).map(() => ({
    z: (Math.random() - 0.5) * 300,
    x: initialLaneX + (Math.random() - 0.5) * laneWidth,
    speed: (1 + Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1),
    offset: Math.random() * 100,
    skinColor: new THREE.Color(['#ffdbac', '#f1c27d', '#e0ac69', '#8d5524', '#c68642'][Math.floor(Math.random() * 5)]),
    shirtColor: new THREE.Color(['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#6b7280', '#ffffff'][Math.floor(Math.random() * 6)])
  })), [count, initialLaneX, laneWidth]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize colors
  useEffect(() => {
    data.forEach((p, i) => {
      torsoRef.current?.setColorAt(i, p.shirtColor);
      headRef.current?.setColorAt(i, p.skinColor);
      leftArmRef.current?.setColorAt(i, p.skinColor);
      rightArmRef.current?.setColorAt(i, p.skinColor);
      leftLegRef.current?.setColorAt(i, p.shirtColor); // Pants same as shirt for simplicity or different
      rightLegRef.current?.setColorAt(i, p.shirtColor);
    });
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

      const stride = 8;
      const walkCycle = Math.sin(t * stride + p.offset);
      const walkCycleLegs = Math.sin(t * stride + p.offset);
      const direction = p.speed > 0 ? 0 : Math.PI;

      // --- RESET DUMMY ROTATION (Fixes 'Raised Arms') ---
      dummy.rotation.set(0, 0, 0);

      // --- TORSO ---
      dummy.position.set(p.x, 1.0, p.z);
      dummy.rotation.y = direction;
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      torsoRef.current!.setMatrixAt(i, dummy.matrix);

      // --- HEAD ---
      dummy.rotation.set(0, direction, 0);
      dummy.position.set(p.x, 1.45 + Math.abs(walkCycle) * 0.05, p.z);
      dummy.scale.set(0.3, 0.35, 0.3);
      dummy.updateMatrix();
      headRef.current!.setMatrixAt(i, dummy.matrix);

      // --- FACE ---
      dummy.position.set(p.x, 1.45 + Math.abs(walkCycle) * 0.05, p.z + (p.speed > 0 ? 0.16 : -0.16));
      dummy.scale.set(0.15, 0.05, 0.02);
      dummy.updateMatrix();
      faceRef.current!.setMatrixAt(i, dummy.matrix);

      // --- ARMS ---
      // Left Arm
      dummy.rotation.set(walkCycle * 0.5, direction, 0);
      dummy.position.set(p.x + 0.35, 1.3, p.z);
      dummy.scale.set(0.12, 0.6, 0.12);
      dummy.updateMatrix();
      leftArmRef.current!.setMatrixAt(i, dummy.matrix);

      // Right Arm
      dummy.rotation.set(-walkCycle * 0.5, direction, 0);
      dummy.position.set(p.x - 0.35, 1.3, p.z);
      dummy.updateMatrix();
      rightArmRef.current!.setMatrixAt(i, dummy.matrix);

      // --- LEGS ---
      dummy.scale.set(0.18, 0.8, 0.18);
      
      // Left Leg
      dummy.rotation.set(walkCycleLegs * 0.6, direction, 0);
      dummy.position.set(p.x + 0.15, 0.5, p.z);
      dummy.updateMatrix();
      leftLegRef.current!.setMatrixAt(i, dummy.matrix);

      // Right Leg
      dummy.rotation.set(-walkCycleLegs * 0.6, direction, 0);
      dummy.position.set(p.x - 0.15, 0.5, p.z);
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

  return (
    <group>
      <instancedMesh ref={torsoRef} args={[undefined, undefined, count]} castShadow>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={headRef} args={[undefined, undefined, count]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial /> 
      </instancedMesh>
      <instancedMesh ref={leftArmRef} args={[undefined, undefined, count]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={rightArmRef} args={[undefined, undefined, count]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={leftLegRef} args={[undefined, undefined, count]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={rightLegRef} args={[undefined, undefined, count]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </instancedMesh>
      <instancedMesh ref={faceRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#000000" />
      </instancedMesh>
    </group>
  );
};

export default function CityLife({ paused, isMobile, weather }: { paused: boolean, isMobile?: boolean, weather?: string }) {
  return (
    <group>
      {/* Layer 1: Waterline (Dynamic) */}
      <HumanInstances count={isMobile ? 20 : 50} color="#ffbdad" initialLaneX={-40} laneWidth={10} paused={paused} weather={weather} />
      
      {/* Layer 2: Pathway (Dynamic) - Centered on User pathway (x=17.5) */}
      <HumanInstances count={isMobile ? 30 : 80} color="#ffffff" initialLaneX={17.5} laneWidth={12} paused={paused} weather={weather} />

      {/* Layer 5: Street Stalls (Marina Style) */}
      <StreetStalls count={isMobile ? 10 : 25} />
      
      {/* Layer 6: Sand NPCs (Sitting/Watching) */}
      <HumanInstances count={isMobile ? 15 : 40} color="#ffbdad" initialLaneX={-45} laneWidth={20} paused={paused} weather={weather} />

      {/* Optimized Vehicles */}
      <VehiclesLayer paused={paused} isMobile={isMobile} />
      
      <BirdGroup paused={paused} isMobile={isMobile} />
    </group>
  );
};

const StreetStalls = ({ count }: { count: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => Array.from({ length: count }).map(() => ({
    z: (Math.random() - 0.5) * 300,
    x: 22 + (Math.random() - 0.5) * 2,
    color: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]
  })), [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    data.forEach((d, i) => {
      dummy.position.set(d.x, 0.8, d.z);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
      meshRef.current?.setColorAt(i, new THREE.Color(d.color));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [data]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow>
      <boxGeometry args={[1.5, 1.6, 1.5]} />
      <meshStandardMaterial roughness={0.7} />
    </instancedMesh>
  );
};

const VehiclesLayer = ({ paused, isMobile }: any) => {
  const count = isMobile ? 12 : 30;
  const vehicles = useMemo(() => Array.from({ length: count }).map((_, i) => {
    const laneX = [-7.5, -2.5, 2.5, 7.5][Math.floor(Math.random() * 4)];
    const direction = laneX > 0 ? 1 : -1;
    return {
      type: Math.random() > 0.7 ? 'auto' : (Math.random() > 0.4 ? 'car' : 'bus'),
      z: (Math.random() - 0.5) * 300,
      laneX,
      speed: (15 + Math.random() * 10) * direction
    };
  }), [count, isMobile]);

  return (
    <>
      {vehicles.map((v, i) => {
        if (v.type === 'auto') return <AutoRickshaw key={i} initialZ={v.z} laneX={v.laneX} speed={v.speed} paused={paused} isMobile={isMobile} />;
        if (v.type === 'bus') return <MTCBus key={i} initialZ={v.z} laneX={v.laneX} speed={v.speed} paused={paused} isMobile={isMobile} />;
        return <Car key={i} initialZ={v.z} laneX={v.laneX} speed={v.speed} paused={paused} color={['#f00', '#00f', '#fff'][i%3]} isMobile={isMobile} />;
      })}
    </>
  );
};

const BirdGroup = ({ paused, isMobile }: any) => {
  const count = isMobile ? 8 : 20;
  return Array.from({ length: count }).map((_, i) => (
    <Bird key={i} initialZ={(Math.random()-0.5)*200} speed={10+Math.random()*5} initialX={(Math.random()-0.5)*40} initialY={10+Math.random()*5} paused={paused} isMobile={isMobile} />
  ));
};
