import { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// --- CONSTANTS & DIMENSIONS ---
const DIMENSIONS = {
  STREET_WIDTH: 18.3,
  SIDEWALK_WIDTH: 3.6,
  ROAD_WIDTH: 11.1,
  KERB_HEIGHT: 0.15,
  BUILDING_HEIGHT_PER_FLOOR: 3.2,
};

// --- BUILDING COMPONENTS ---

// Helper for 3D Windows
// --- WINDOW INSTANCING SYSTEM ---

export type WindowInstance = {
  matrix: THREE.Matrix4;
  type: 'warm' | 'cool' | 'off';
};

const Window3D = ({ position, width = 1.2, height = 1.8 }: { position: [number, number, number], width?: number, height?: number }) => (
  // position[0] is X (extension), position[1] is Y (up), position[2] is Z (along street)
  <group position={position}>
    {/* Frame */}
    <mesh castShadow>
      <boxGeometry args={[0.2, height + 0.1, width + 0.1]} />
      <meshStandardMaterial color="#2d2d2d" />
    </mesh>
    {/* Glass (Recessed & Dynamic) */}
    <WindowGlass width={width} height={height} />
    {/* Sill */}
    <mesh position={[0.1, -height/2 - 0.05, 0]}>
      <boxGeometry args={[0.2, 0.1, width + 0.2]} />
      <meshStandardMaterial color="#475569" />
    </mesh>
  </group>
);

const WindowGlass = ({ width, height }: { width: number, height: number }) => {
  const [flavor] = useState(() => {
    const r = Math.random();
    if (r > 0.8) return '#fde68a'; // Warm
    if (r > 0.6) return '#bfdbfe'; // TV Blue
    return '#050505'; // Off
  });
  
  return (
    <mesh position={[0.05, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial 
        color={flavor} 
        emissive={flavor !== '#050505' ? flavor : '#000'}
        emissiveIntensity={flavor !== '#050505' ? 0.6 : 0}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

// Building 1: Classic Brownstone
const BuildingOneClassicBrownstone = ({ position, streetWidth = 7.5, registerWindow }: { position: [number, number, number], streetWidth?: number, registerWindow?: (pos: [number, number, number], w: number, h: number) => void }) => {
  const floors = 5;
  const height = floors * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR;
  const blockDepth = 15; // X-axis extension

  return (
    <group position={position}>
      {/* Facade */}
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[blockDepth, height, streetWidth]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.9} />
      </mesh>

      {/* 3D Windows */}
      {Array.from({ length: floors }).map((_, f) => {
        const floorZ = f * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.8;
        if (registerWindow) {
           registerWindow([blockDepth/2 + position[0], floorZ + position[1], -streetWidth/4 + position[2]], 1.2, 1.8);
           registerWindow([blockDepth/2 + position[0], floorZ + position[1], streetWidth/4 + position[2]], 1.2, 1.8);
        }
        return (
          <group key={f} position={[blockDepth/2, floorZ, 0]}>
             {!registerWindow && (
               <>
                 <Window3D position={[0.05, 0, -streetWidth/4]} />
                 <Window3D position={[0.05, 0, streetWidth/4]} />
               </>
             )}
          </group>
        );
      })}
    </group>
  );
};

// Building 2: 1960s Brick Apartment
const BuildingTwoBrickApartment = ({ position, streetWidth = 12, registerWindow }: { position: [number, number, number], streetWidth?: number, registerWindow?: (pos: [number, number, number], w: number, h: number) => void }) => {
  const floors = 8;
  const height = floors * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR;
  const blockDepth = 15;

  return (
    <group position={position}>
      {/* Facade */}
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[blockDepth, height, streetWidth]} />
        <meshStandardMaterial color="#572810" roughness={0.8} />
      </mesh>

      {/* 3D Windows & ACs */}
      {Array.from({ length: floors }).map((_, f) => {
        const floorZ = f * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.8;
        const windowWidth = 1.8;
        if (registerWindow) {
          registerWindow([blockDepth/2 + position[0], floorZ + position[1], -streetWidth/3 + position[2]], windowWidth, 1.8);
          registerWindow([blockDepth/2 + position[0], floorZ + position[1], 0 + position[2]], windowWidth, 1.8);
          registerWindow([blockDepth/2 + position[0], floorZ + position[1], streetWidth/3 + position[2]], windowWidth, 1.8);
        }
        return (
          <group key={f} position={[blockDepth/2, floorZ, 0]}>
            {!registerWindow && [-streetWidth/3, 0, streetWidth/3].map((off, i) => (
              <Window3D key={i} position={[0.05, 0, off]} width={windowWidth} />
            ))}
          </group>
        );
      })}
    </group>
  );
};

// Building 3: Pre-war Limestone
const BuildingThreePreWarLimestone = ({ position, streetWidth = 12, registerWindow }: { position: [number, number, number], streetWidth?: number, registerWindow?: (pos: [number, number, number], w: number, h: number) => void }) => {
  const floors = 6;
  const height = floors * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR;
  const blockDepth = 15;

  return (
    <group position={position}>
      {/* Facade */}
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[blockDepth, height, streetWidth]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
      </mesh>
      
      {/* Windows upper floors */}
      {Array.from({ length: floors - 2 }).map((_, f) => {
        const floorZ = (f + 2) * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.8;
        const windowWidth = 1.6;
        if (registerWindow) {
          registerWindow([blockDepth/2 + position[0], floorZ + position[1], -streetWidth/4 + position[2]], windowWidth, 1.8);
          registerWindow([blockDepth/2 + position[0], floorZ + position[1], 0 + position[2]], windowWidth, 1.8);
          registerWindow([blockDepth/2 + position[0], floorZ + position[1], streetWidth/4 + position[2]], windowWidth, 1.8);
        }
        return (
          <group key={f} position={[blockDepth/2 + 0.15, floorZ, 0]}>
            {!registerWindow && [-streetWidth/4, 0, streetWidth/4].map((off, i) => (
              <Window3D key={i} position={[0, 0, off]} width={windowWidth} />
            ))}
          </group>
        );
      })}
    </group>
  );
};

// Building 4: Converted Industrial
const BuildingFourConvertedIndustrial = ({ position, streetWidth = 15 }: { position: [number, number, number], streetWidth?: number }) => {
  const floors = 5;
  const floorHeight = 4.5;
  const height = floors * floorHeight;
  const blockDepth = 15;

  return (
    <group position={position}>
      {/* Facade */}
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[blockDepth, height, streetWidth]} />
        <meshStandardMaterial color="#450a0a" roughness={1.0} />
      </mesh>

      {/* String Courses (Brick rows) */}
      {Array.from({ length: floors }).map((_, i) => (
        <mesh key={i} position={[blockDepth/2 + 0.1, i * floorHeight, 0]}>
          <boxGeometry args={[0.2, 0.3, streetWidth + 0.1]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}
      
      {/* Rooftop Water Tower */}
      <group position={[0, height + 1, 0]}>
         <mesh position={[0, 1.5, 0]} castShadow>
           <cylinderGeometry args={[2, 2, 3, 12]} />
           <meshStandardMaterial color="#422006" />
         </mesh>
         <mesh position={[0, 3, 0]}>
           <coneGeometry args={[2.2, 1, 12]} />
           <meshStandardMaterial color="#422006" />
         </mesh>
         {/* Legs */}
         {[[-1,0,-1],[1,0,-1],[-1,0,1],[1,0,1]].map((p, i) => (
           <mesh key={i} position={[p[0]*1.2, 0, p[2]*1.2]}>
              <cylinderGeometry args={[0.1, 0.1, 2]} />
              <meshStandardMaterial color="#111" />
           </mesh>
         ))}
      </group>
      
      {/* Large steel frame windows with recessed glass */}
      {Array.from({ length: floors }).map((_, f) => (
        <group key={f} position={[blockDepth/2 + 0.1, f * floorHeight + 2.2, 0]}>
          {[-streetWidth/3, 0, streetWidth/3].map((off, i) => (
             <group key={i} position={[0, 0, off]}>
                <mesh castShadow>
                  <boxGeometry args={[0.2, 3.2, 3.5]} />
                  <meshStandardMaterial color="#0f172a" metalness={0.9} />
                </mesh>
                <mesh position={[0.05, 0, 0]} rotation={[0, Math.PI/2, 0]}>
                  <planeGeometry args={[3, 3]} />
                  <meshStandardMaterial color="#1e293b" roughness={0.1} />
                </mesh>
             </group>
          ))}
        </group>
      ))}
    </group>
  );
};

// Building 5: Far End (Simplified but with windows)
const BuildingFiveFarEnd = ({ position, color, hasGhostSign }: { position: [number, number, number], color: string, hasGhostSign?: boolean }) => {
  const width = 15;
  const height = 40 + Math.random() * 20;
  const depth = 15;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={1} />
      </mesh>
      
      {/* Distant Window Grid */}
      {Array.from({ length: 15 }).map((_, f) => (
        <group key={f} position={[0, f * 4 + 4, depth/2 + 0.1]}>
          {[-5, 0, 5].map((off, i) => (
            <mesh key={i} position={[off, 0, 0]}>
              <planeGeometry args={[2.5, 2]} />
              <meshStandardMaterial color="#0f172a" opacity={0.6} transparent />
            </mesh>
          ))}
        </group>
      ))}

      {hasGhostSign && (
         <group position={[width/2 + 0.1, height * 0.7, 0]}>
            <mesh rotation={[0, Math.PI/2, 0]}>
               <planeGeometry args={[10, 8]} />
               <meshStandardMaterial color="#555" transparent opacity={0.3} />
            </mesh>
            <Text position={[0.01, 0, 0]} rotation={[0, Math.PI/2, 0]} fontSize={1.5} color="#331100" opacity={0.4}>
              OLD ADS
            </Text>
         </group>
      )}
    </group>
  );
};

// --- STREET DETAILS ---

const RoadSteam = ({ position }: { position: [number, number, number] }) => {
  const count = 20;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 2,
      y: Math.random() * 5,
      z: (Math.random() - 0.5) * 2,
      speed: 0.2 + Math.random() * 0.3,
      scale: 0.5 + Math.random() * 1.5
    }));
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      p.y += p.speed * delta * 5;
      if (p.y > 5) p.y = 0;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale * (1 - p.y/5)); // Fade out size
      dummy.rotation.set(Math.sin(state.clock.elapsedTime + i) * 0.1, state.clock.elapsedTime * 0.5, 0);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
       <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
         <planeGeometry args={[1, 1]} />
         <meshStandardMaterial 
           color="#ffffff" 
           transparent 
           opacity={0.15} 
           depthWrite={false} 
           blending={THREE.AdditiveBlending}
           side={THREE.DoubleSide}
         />
       </instancedMesh>
    </group>
  );
};

const Newsstand = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) => (
  <group position={position} rotation={rotation}>
    {/* Base structure */}
    <mesh position={[0, 1.25, 0]} castShadow>
      <boxGeometry args={[3, 2.5, 2]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
    {/* Counter opening */}
    <mesh position={[0, 1.5, 1.01]}>
      <boxGeometry args={[2.5, 1.5, 0.1]} />
      <meshStandardMaterial color="#000" />
    </mesh>
    {/* Awning */}
    <mesh position={[0, 2.5, 1.2]} rotation={[0.3, 0, 0]} castShadow>
      <boxGeometry args={[3.4, 0.1, 1.5]} />
      <meshStandardMaterial color="#1d4ed8" />
    </mesh>
    {/* Magazines/Newspapers (simplified color blocks) */}
    {Array.from({ length: 12 }).map((_, i) => (
      <mesh key={i} position={[(i % 4) * 0.6 - 0.9, 1.2, 1.05]}>
        <boxGeometry args={[0.4, 0.5, 0.05]} />
        <meshStandardMaterial color={['#ef4444', '#fbbf24', '#fff', '#2563eb'][i % 4]} />
      </mesh>
    ))}
  </group>
);


const PavementSlabs = ({ width, length, x }: { width: number, length: number, x: number }) => {
  return (
    <group position={[x, 0.1, 0]}>
      {/* Main Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
    </group>
  );
};

const LondonPlaneTree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 4, 8]} />
        <meshStandardMaterial color="#4b5563" roughness={1} />
      </mesh>
      {/* Tree Guard */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.2, 0.1, 1.2]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1, 0.11, 1]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>
      {/* Bare Branches / Sparse Leaves */}
      <group position={[0, 4, 0]}>
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 1.5, Math.cos(i) * 1.5, Math.sin(i*2)]}>
             <sphereGeometry args={[0.4, 8, 8]} />
             <meshStandardMaterial color="#854d0e" opacity={0.8} transparent />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const StreetSigns = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh position={[0, 2.5, 0]}>
      <cylinderGeometry args={[0.05, 0.05, 5]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
    <mesh position={[0, 4.8, 0.1]} rotation={[0, 0, 0]}>
       <boxGeometry args={[1.2, 0.25, 0.05]} />
       <meshStandardMaterial color="#15803d" />
    </mesh>
    <mesh position={[0.1, 4.8, 0]} rotation={[0, Math.PI/2, 0]}>
       <boxGeometry args={[1.2, 0.25, 0.05]} />
       <meshStandardMaterial color="#15803d" />
    </mesh>
</group>
);

const TrashBags = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {Array.from({ length: 4 }).map((_, i) => (
      <mesh key={i} position={[(i % 2) * 0.4, 0.3, Math.floor(i / 2) * 0.4]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#000" roughness={0.2} />
      </mesh>
    ))}
  </group>
);


function FireEscape({ position, floors, side = 1 }: { position: [number, number, number], floors: number, side?: number }) {
  return (
    <group position={position}>
      {Array.from({ length: floors }).map((_, i) => (
        <group key={i} position={[0, i * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.5, 0]}>
          {/* Balcony */}
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.1, 3]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          {/* Railings */}
          <mesh position={[0.4, 0.5, 0]}>
            <boxGeometry args={[0.05, 1, 3]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <mesh position={[0, 0.5, 1.5]}>
            <boxGeometry args={[0.8, 1, 0.05]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <mesh position={[0, 0.5, -1.5]}>
            <boxGeometry args={[0.8, 1, 0.05]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          {/* Ladder (to floor above) */}
          {i < floors - 1 && (
            <mesh position={[-0.2, DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR/2, 1.2]} rotation={[0.4, 0, 0]}>
              <boxGeometry args={[0.1, DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1, 0.1]} />
              <meshStandardMaterial color="#222" />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}



const WindowInstancer = ({ windows }: { windows: { position: [number, number, number], width: number, height: number }[] }) => {
  const frameMesh = useRef<THREE.InstancedMesh>(null);
  const sillMesh = useRef<THREE.InstancedMesh>(null);
  const glassWarmMesh = useRef<THREE.InstancedMesh>(null);
  const glassCoolMesh = useRef<THREE.InstancedMesh>(null);
  const glassOffMesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!frameMesh.current || !windows.length) return;
    
    // Matrix for Frames & Sills
    windows.forEach((win, i) => {
      // Frame
      dummy.position.set(win.position[0], win.position[1], win.position[2]);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      frameMesh.current!.setMatrixAt(i, dummy.matrix);
      
      // Sill
      dummy.position.set(win.position[0] + 0.1, win.position[1] - win.height/2 - 0.05, win.position[2]);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      sillMesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    // Sort and Place Glass
    let warmIdx = 0, coolIdx = 0, offIdx = 0;
    windows.forEach((win) => {
      dummy.position.set(win.position[0] + 0.05, win.position[1], win.position[2]);
      dummy.updateMatrix();
      const r = Math.random();
      if (r > 0.8) {
        glassWarmMesh.current?.setMatrixAt(warmIdx++, dummy.matrix);
      } else if (r > 0.6) {
        glassCoolMesh.current?.setMatrixAt(coolIdx++, dummy.matrix);
      } else {
        glassOffMesh.current?.setMatrixAt(offIdx++, dummy.matrix);
      }
    });

    frameMesh.current.instanceMatrix.needsUpdate = true;
    sillMesh.current.instanceMatrix.needsUpdate = true;
    if (glassWarmMesh.current) glassWarmMesh.current.instanceMatrix.needsUpdate = true;
    if (glassCoolMesh.current) glassCoolMesh.current.instanceMatrix.needsUpdate = true;
    if (glassOffMesh.current) glassOffMesh.current.instanceMatrix.needsUpdate = true;
  }, [windows]);

  return (
    <group>
      <instancedMesh ref={frameMesh} args={[undefined, undefined, windows.length]} castShadow>
        <boxGeometry args={[0.2, 1.9, 1.3]} />
        <meshStandardMaterial color="#2d2d2d" />
      </instancedMesh>
      <instancedMesh ref={sillMesh} args={[undefined, undefined, windows.length]} castShadow>
        <boxGeometry args={[0.2, 0.1, 1.4]} />
        <meshStandardMaterial color="#475569" />
      </instancedMesh>
      <instancedMesh ref={glassWarmMesh} args={[undefined, undefined, windows.length]}>
        <planeGeometry args={[1.2, 1.8]} />
        <meshStandardMaterial color="#fde68a" emissive="#fde68a" emissiveIntensity={0.6} roughness={0.1} metalness={0.8} />
      </instancedMesh>
      <instancedMesh ref={glassCoolMesh} args={[undefined, undefined, windows.length]}>
        <planeGeometry args={[1.2, 1.8]} />
        <meshStandardMaterial color="#bfdbfe" emissive="#bfdbfe" emissiveIntensity={0.6} roughness={0.1} metalness={0.8} />
      </instancedMesh>
      <instancedMesh ref={glassOffMesh} args={[undefined, undefined, windows.length]}>
        <planeGeometry args={[1.2, 1.8]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
      </instancedMesh>
    </group>
  );
};


export default function World({ isMobile, timeOfDay }: { isMobile: boolean, timeOfDay: number }) {
  const roadLength = 1000;
  const buildRange = 480; 
  const secondaryOffset = 30; 
  const windowRegistry = useRef<{ position: [number, number, number], width: number, height: number }[]>([]);

  const { leftBuildings, rightBuildings } = useMemo(() => {
    windowRegistry.current = [];
    const reg = (pos: [number, number, number], width: number, height: number) => {
        windowRegistry.current.push({ position: pos, width, height });
    };

    const left = [];
    let curZ = -buildRange;
    let index = 0;
    while (curZ < buildRange) {
      if (Math.abs(curZ % 200) < 15 && curZ !== -buildRange) {
        curZ += 30; 
        continue;
      }
      const type = (index * 7 + 3) % 4; 
      const sWidth = type === 0 ? 7.5 : (type === 3 ? 15 : 12);
      const posZ = curZ + sWidth / 2;
      const blockDepth = 15;
      const posX = -(DIMENSIONS.ROAD_WIDTH / 2 + DIMENSIONS.SIDEWALK_WIDTH + blockDepth / 2);
      
      if (type === 0) left.push(<BuildingOneClassicBrownstone key={`l-${index}`} position={[posX, 0, posZ]} streetWidth={sWidth} registerWindow={reg} />);
      else if (type === 1) left.push(
        <group key={`l-${index}`} position={[posX, 0, posZ]}>
           <BuildingTwoBrickApartment position={[0, 0, 0]} streetWidth={sWidth} registerWindow={reg} />
           {!isMobile && <FireEscape position={[blockDepth/2 + 0.4, 0, 0]} floors={7} />}
        </group>
      );
      else if (type === 2) left.push(<BuildingThreePreWarLimestone key={`l-${index}`} position={[posX, 0, posZ]} streetWidth={sWidth} registerWindow={reg} />);
      else left.push(
        <group key={`l-${index}`} position={[posX, 0, posZ]}>
           <BuildingFourConvertedIndustrial position={[0,0,0]} streetWidth={sWidth} />
           {!isMobile && <FireEscape position={[blockDepth/2 + 0.4, 0, sWidth/4]} floors={4} />}
        </group>
      );
      if (!isMobile || index % 3 === 0) {
         left.push(<BuildingFiveFarEnd key={`ls-${index}`} position={[posX - secondaryOffset, 0, posZ]} color={index % 2 === 0 ? "#111" : "#222"} />);
      }
      curZ += sWidth + 1.0;
      index++;
    }

    const right = [];
    curZ = -buildRange;
    index = 0;
    while (curZ < buildRange) {
       if (Math.abs(curZ % 200) < 15 && curZ !== -buildRange) {
        curZ += 30;
        continue;
      }
      const type = (index * 13 + 5) % 4; 
      const sWidth = type === 0 ? 7.5 : (type === 3 ? 15 : 12);
      const posZ = curZ + sWidth / 2;
      const blockDepth = 15;
      const posX = (DIMENSIONS.ROAD_WIDTH / 2 + DIMENSIONS.SIDEWALK_WIDTH + blockDepth / 2);
      const rotation = [0, Math.PI, 0] as [number, number, number];
      
      if (type === 0) right.push(<group key={`r-${index}`} position={[posX, 0, posZ]} rotation={rotation}><BuildingOneClassicBrownstone position={[0,0,0]} streetWidth={sWidth} registerWindow={reg} /></group>);
      else if (type === 1) right.push(<group key={`r-${index}`} position={[posX, 0, posZ]} rotation={rotation}><BuildingTwoBrickApartment position={[0,0,0]} streetWidth={sWidth} registerWindow={reg} /></group>);
      else if (type === 2) right.push(<group key={`r-${index}`} position={[posX, 0, posZ]} rotation={rotation}><BuildingThreePreWarLimestone position={[0,0,0]} streetWidth={sWidth} registerWindow={reg} /></group>);
      else right.push(
        <group key={`r-${index}`} position={[posX, 0, posZ]} rotation={rotation}>
           <BuildingFourConvertedIndustrial position={[0,0,0]} streetWidth={sWidth} />
           {!isMobile && <FireEscape position={[blockDepth/2 + 0.4, 0, -sWidth/4]} floors={4} />}
        </group>
      );
      if (!isMobile || index % 3 === 1) {
         right.push(<BuildingFiveFarEnd key={`rs-${index}`} position={[posX + secondaryOffset, 0, posZ]} color={index % 2 === 1 ? "#111" : "#222"} />);
      }
      curZ += sWidth + 1.0;
      index++;
    }
    return { leftBuildings: left, rightBuildings: right };
  }, [isMobile]);

  return (
    <group>
      <ambientLight intensity={0.5} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[DIMENSIONS.ROAD_WIDTH, roadLength]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.1} />
      </mesh>
      
      <PavementSlabs width={DIMENSIONS.SIDEWALK_WIDTH} length={roadLength} x={-(DIMENSIONS.ROAD_WIDTH/2 + DIMENSIONS.SIDEWALK_WIDTH/2)} />
      <PavementSlabs width={DIMENSIONS.SIDEWALK_WIDTH} length={roadLength} x={(DIMENSIONS.ROAD_WIDTH/2 + DIMENSIONS.SIDEWALK_WIDTH/2)} />

      <RoadSteam position={[2, 0.05, -50]} />
      <RoadSteam position={[-3, 0.05, 120]} />
      <RoadSteam position={[1, 0.05, 350]} />
      {!isMobile && <RoadSteam position={[-2, 0.05, -280]} />}

      {leftBuildings}
      {rightBuildings}
      
      <WindowInstancer windows={windowRegistry.current} />

      <Newsstand position={[-(DIMENSIONS.ROAD_WIDTH/2 + 2), 0, -80]} rotation={[0, Math.PI/2, 0]} />
      <Newsstand position={[(DIMENSIONS.ROAD_WIDTH/2 + 2), 0, 200]} rotation={[0, -Math.PI/2, 0]} />

      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[0, 0.025, -450 + i * 150]} rotation={[-Math.PI/2, 0, Math.PI/2]}>
          <planeGeometry args={[15, 150]} />
          <meshStandardMaterial color="#1f2937" roughness={0.5} />
        </mesh>
      ))}

      <group position={[0, 0, 550]}>
         <group position={[0, 0, 0]}>
            <mesh position={[0, 40, 0]}><boxGeometry args={[30, 80, 30]} /><meshStandardMaterial color="#1e293b" /></mesh>
            <mesh position={[0, 85, 0]}><boxGeometry args={[20, 30, 20]} /><meshStandardMaterial color="#1e293b" /></mesh>
            <mesh position={[0, 105, 0]}><boxGeometry args={[10, 20, 10]} /><meshStandardMaterial color="#1e293b" /></mesh>
            <mesh position={[0, 120, 0]}><cylinderGeometry args={[0.2, 0.2, 15]} /><meshStandardMaterial color="#334155" /></mesh>
         </group>
         <mesh position={[-45, 35, -10]}><boxGeometry args={[25, 100, 25]} /><meshStandardMaterial color="#0f172a" /></mesh>
         <mesh position={[45, 45, -5]}><boxGeometry args={[28, 120, 28]} /><meshStandardMaterial color="#334155" /></mesh>
      </group>

      {Array.from({ length: 12 }).map((_, i) => (
        <group key={i}>
          <LondonPlaneTree position={[-(DIMENSIONS.ROAD_WIDTH/2 + 1), 0, -450 + i * 80]} />
          <LondonPlaneTree position={[(DIMENSIONS.ROAD_WIDTH/2 + 1), 0, -400 + i * 80]} />
        </group>
      ))}
      
      <StreetSigns position={[-(DIMENSIONS.ROAD_WIDTH/2 + 0.5), 0, -35]} />
      <StreetSigns position={[(DIMENSIONS.ROAD_WIDTH/2 + 0.5), 0, 115]} />
      <StreetSigns position={[-(DIMENSIONS.ROAD_WIDTH/2 + 0.5), 0, 315]} />

      <group position={[DIMENSIONS.ROAD_WIDTH/2 + 1.2, 0, -5]}>
         <mesh position={[0, 0.6, 0]} castShadow><boxGeometry args={[0.6, 1.2, 0.6]} /><meshStandardMaterial color="#1e3a8a" /></mesh>
         <mesh position={[0, 1.2, 0]}><sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} /><meshStandardMaterial color="#1e3a8a" /></mesh>
      </group>
      <group position={[-(DIMENSIONS.ROAD_WIDTH/2 + 1.2), 0, 250]}>
         <mesh position={[0, 0.6, 0]} castShadow><boxGeometry args={[0.6, 1.2, 0.6]} /><meshStandardMaterial color="#1e3a8a" /></mesh>
         <mesh position={[0, 1.2, 0]}><sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} /><meshStandardMaterial color="#1e3a8a" /></mesh>
      </group>

      <group position={[-(DIMENSIONS.ROAD_WIDTH/2 + 2.5), 0, 150]}>
         {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[0, 2.5, i * 4]}><boxGeometry args={[0.1, 5, 0.1]} /><meshStandardMaterial color="#94a3b8" /></mesh>
         ))}
         <mesh position={[0.5, 5, 14]}><boxGeometry args={[4, 0.1, 32]} /><meshStandardMaterial color="#554433" /></mesh>
      </group>

      <TrashBags position={[-(DIMENSIONS.ROAD_WIDTH/2 + 2), 0, -5]} />
      <TrashBags position={[(DIMENSIONS.ROAD_WIDTH/2 + 2), 0, 15]} />
      <TrashBags position={[-(DIMENSIONS.ROAD_WIDTH/2 + 2.5), 0, 420]} />
    </group>
  );
}
