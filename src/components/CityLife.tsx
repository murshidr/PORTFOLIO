import { useRef, useMemo, useState } from 'react';
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
        <meshStandardMaterial color="#fbbf24" roughness={0.4} /> {/* Chennai Auto Yellow */}
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
        <meshStandardMaterial color="#ef4444" /> {/* Red */}
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

  useFrame((state, delta) => {
    if (ref.current && !paused) {
      ref.current.position.z += speed * delta;

      // Slight lane drift
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
        <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh position={[-0.6, 0.3, -2]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={3} toneMapped={false} />
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
  type: 'commuter' | 'shopper' | 'stroller';
  targetX?: number;
  targetZ?: number;
  waitTime?: number;
}

const HumanNPC = ({ initialZ, speed, initialLaneX, paused, isMobile, routine }: any) => {
  const ref = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);

  const [behavior, setBehavior] = useState<'walking' | 'idle_browsing' | 'idle_waiting'>('walking');
  const timer = useRef(0);
  const direction = useRef(speed > 0 ? 1 : -1);
  const currentSpeed = useRef(Math.abs(speed));

  // Randomize clothing
  const skinTone = useMemo(() => ['#ffdbac', '#f1c27d', '#e0ac69', '#8d5524', '#c68642'][Math.floor(Math.random() * 5)], []);
  const shirtColor = useMemo(() => ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#6b7280', '#ffffff'][Math.floor(Math.random() * 6)], []);
  const pantColor = useMemo(() => ['#1e3a8a', '#111827', '#4b5563', '#d1d5db'][Math.floor(Math.random() * 4)], []);

  useFrame((state, delta) => {
    if (!ref.current || paused) return;

    if (behavior === 'walking') {
      // Move along Z
      ref.current.position.z += currentSpeed.current * direction.current * delta;
      ref.current.rotation.y = direction.current > 0 ? 0 : Math.PI;
      
      // Animate limbs (walking cycle)
      const time = state.clock.elapsedTime * currentSpeed.current * 3;
      if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(time) * 0.5;
      if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(time + Math.PI) * 0.5;
      if (leftArm.current) leftArm.current.rotation.x = Math.sin(time + Math.PI) * 0.5;
      if (rightArm.current) rightArm.current.rotation.x = Math.sin(time) * 0.5;

      // Routine checks
      if (routine.type === 'shopper' && routine.targetZ) {
        const dist = Math.abs(ref.current.position.z - routine.targetZ);
        if (dist < 0.5) {
          // Reached store
          setBehavior('idle_browsing');
          timer.current = routine.waitTime || 5;
          // Face the store (tea stall is at x=12, road is at x=0)
          ref.current.rotation.y = initialLaneX > 0 ? -Math.PI / 2 : Math.PI / 2;
        }
      } else if (routine.type === 'commuter' && routine.targetZ) {
        const dist = Math.abs(ref.current.position.z - routine.targetZ);
        if (dist < 0.5) {
          // Reached bus stop
          setBehavior('idle_waiting');
          timer.current = routine.waitTime || 10;
          // Face road
          ref.current.rotation.y = initialLaneX > 0 ? Math.PI / 2 : -Math.PI / 2;
        }
      }

      // Loop Strollers
      if (ref.current.position.z > 150) {
          ref.current.position.z = -150;
          // Assign new routine on loop to keep things fresh
          if (Math.random() > 0.5) {
             routine.type = Math.random() > 0.5 ? 'shopper' : 'commuter';
             routine.targetZ = (Math.random() - 0.5) * 80;
             routine.waitTime = 5 + Math.random() * 10;
          } else {
             routine.type = 'stroller';
          }
      }
      if (ref.current.position.z < -150) {
          ref.current.position.z = 150;
          if (Math.random() > 0.5) {
             routine.type = Math.random() > 0.5 ? 'shopper' : 'commuter';
             routine.targetZ = (Math.random() - 0.5) * 80;
             routine.waitTime = 5 + Math.random() * 10;
          } else {
             routine.type = 'stroller';
          }
      }

    } else if (behavior === 'idle_browsing' || behavior === 'idle_waiting') {
      // Relax limbs
      if (leftLeg.current) leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, 0, 0.1);
      if (rightLeg.current) rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, 0, 0.1);
      if (leftArm.current) leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, 0, 0.1);
      if (rightArm.current) rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, 0, 0.1);

      timer.current -= delta;
      if (timer.current <= 0) {
        // Resume walking, maybe change direction
        setBehavior('walking');
        if (Math.random() > 0.5) direction.current *= -1;
        
        // Reset rotation forward/backward
        ref.current.rotation.y = direction.current > 0 ? 0 : Math.PI;
        // Turn this routine into a stroller until they loop
        routine.type = 'stroller';
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
      
      {/* Left Arm (hinged at shoulder) */}
      <group position={[-0.35, 1.3, 0]} ref={leftArm}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
          <meshStandardMaterial color={skinTone} />
        </mesh>
      </group>
      {/* Right Arm */}
      <group position={[0.35, 1.3, 0]} ref={rightArm}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
          <meshStandardMaterial color={skinTone} />
        </mesh>
      </group>

      {/* Left Leg (hinged at hip) */}
      <group position={[-0.15, 0.6, 0]} ref={leftLeg}>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.2]} />
          <meshStandardMaterial color={pantColor} />
        </mesh>
      </group>
      {/* Right Leg */}
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

export default function CityLife({ paused, isMobile }: { paused: boolean, isMobile?: boolean }) {
  const vehiclesCount = isMobile ? 14 : 20;
  const pedsCount = isMobile ? 25 : 40;
  const birdsCount = isMobile ? 10 : 15;
  const cyclistsCount = isMobile ? 5 : 8;

  const vehicles = useMemo(() => {
    return Array.from({ length: vehiclesCount }).map((_, i) => {
      const type = Math.random();
      // Lane Logic:
      // Left Lane (x = -2.5): Moving -z (Away from camera/Forward) -> Speed Negative
      // Right Lane (x = 2.5): Moving +z (Towards camera) -> Speed Positive
      const isRightLane = Math.random() > 0.5;
      const laneX = isRightLane ? 2.5 : -2.5;

      const baseSpeed = 15 + Math.random() * 10;
      const speed = isRightLane ? baseSpeed : -baseSpeed;

      const initialZ = (Math.random() - 0.5) * 300;

      if (type > 0.7) {
        // 30% Auto Rickshaws
        return { type: 'auto', initialZ, speed, laneX };
      } else if (type > 0.5) {
        // 20% Buses
        // Buses need to be slower
        return { type: 'bus', initialZ, speed: speed * 0.7, laneX };
      } else {
        // 50% Cars
        return {
          type: 'car',
          initialZ,
          speed,
          laneX,
          color: ['#ff0000', '#0000ff', '#ffffff', '#333333', '#8B0000'][Math.floor(Math.random() * 5)]
        };
      }
    });
  }, [isMobile, vehiclesCount]);

  const pedestrians = useMemo(() => {
    return Array.from({ length: pedsCount }).map((_, i) => {
      // Spawn on Beach (-15) or Pavement (10)
      const isBeach = Math.random() > 0.4;
      const initialLaneX = isBeach
        ? -15 + (Math.random() - 0.5) * 10
        : 10 + (Math.random() - 0.5) * 8;

      return {
        initialZ: (Math.random() - 0.5) * 200,
        speed: (Math.random() * 1.5 + 1) * (Math.random() > 0.5 ? 1 : -1),
        initialLaneX,
        color: ['#ff5555', '#5555ff', '#55ff55', '#ffff55', '#ff55ff', '#ffffff'][Math.floor(Math.random() * 6)]
      };
    });
  }, [isMobile, pedsCount]);

  const birds = useMemo(() => {
    return Array.from({ length: birdsCount }).map((_, i) => ({
      initialZ: (Math.random() - 0.5) * 300,
      speed: (10 + Math.random() * 5),
      initialX: (Math.random() - 0.5) * 50,
      initialY: 15 + Math.random() * 10
    }));
  }, [isMobile, birdsCount]);

  const cyclists = useMemo(() => {
    return Array.from({ length: cyclistsCount }).map((_, i) => ({
      initialZ: (Math.random() - 0.5) * 200,
      speed: (5 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1),
      laneX: 5.5, // Edge of road/sidewalk
      color: ['#00ffff', '#ff00ff', '#ffff00'][Math.floor(Math.random() * 3)]
    }));
  }, [isMobile, cyclistsCount]);

  return (
    <group>
      {vehicles.map((v, i) => {
        if (v.type === 'auto') return <AutoRickshaw key={`v-${i}`} {...v} paused={paused} isMobile={isMobile} />;
        if (v.type === 'bus') return <MTCBus key={`v-${i}`} {...v} paused={paused} isMobile={isMobile} />;
        return <Car key={`v-${i}`} {...v} paused={paused} isMobile={isMobile} />;
      })}
      {pedestrians.map((ped, i) => {
        // Assign routines randomly
        let routine: Routine = { type: 'stroller' };
        const rand = Math.random();
        if (rand > 0.7) {
          routine = { type: 'shopper', targetZ: 20, waitTime: 5 + Math.random() * 8 }; // Target tea stall at z=20
        } else if (rand > 0.4) {
          routine = { type: 'commuter', targetZ: -40, waitTime: 10 + Math.random() * 10 }; // Target bus stop at z=-40
        }

        return (
          <HumanNPC
            key={`ped-${i}`}
            initialZ={ped.initialZ}
            speed={ped.speed}
            initialLaneX={ped.initialLaneX}
            paused={paused}
            isMobile={isMobile}
            routine={routine}
          />
        );
      })}
      {cyclists.map((cyc, i) => (
        <Cyclist key={`cyc-${i}`} {...cyc} paused={paused} isMobile={isMobile} />
      ))}
      {birds.map((bird, i) => (
        <Bird key={`bird-${i}`} {...bird} paused={paused} isMobile={isMobile} />
      ))}
    </group>
  );
}
