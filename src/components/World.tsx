import { useMemo, useRef, useEffect } from 'react';
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

// Building 1: Classic Brownstone
const BuildingOneClassicBrownstone = ({ position }: { position: [number, number, number] }) => {
  const width = 7.5;
  const floors = 5;
  const height = floors * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR;
  const depth = 15;

  return (
    <group position={position}>
      {/* Facade - Red-brown sandstone */}
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>

      {/* Stoop - front steps */}
      <group position={[width/4, 0.15, depth/2 + 0.5]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.2, -i * 0.3]}>
            <boxGeometry args={[2.5, 0.2, 0.4]} />
            <meshStandardMaterial color="#a0522d" />
          </mesh>
        ))}
        {/* Railing */}
        <mesh position={[1.3, 0.8, -0.6]} rotation={[0.5, 0, 0]}>
           <boxGeometry args={[0.05, 0.05, 2.5]} />
           <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[-1.3, 0.8, -0.6]} rotation={[0.5, 0, 0]}>
           <boxGeometry args={[0.05, 0.05, 2.5]} />
           <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      {/* Fire Escape - Zigzag iron */}
      <group position={[-width/4, height/2, depth/2 + 0.1]}>
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} position={[0, i * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR - 2, 0.3]}>
            <boxGeometry args={[2, 0.1, 0.8]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        ))}
        {/* Vertical ladders and rails simulated with box */}
        <mesh position={[0.9, 0, 0.3]}>
           <boxGeometry args={[0.05, height * 0.8, 0.05]} />
           <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      {/* Decorative Cornice */}
      <mesh position={[0, height, 0.2]}>
        <boxGeometry args={[width + 0.2, 0.6, depth + 0.2]} />
        <meshStandardMaterial color="#7a3a0e" />
      </mesh>

      {/* Windows - Sash type */}
      {Array.from({ length: floors }).map((_, f) => (
        <group key={f} position={[0, f * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.6, depth/2 + 0.05]}>
           <mesh position={[-width/4, 0, 0]}>
             <planeGeometry args={[1.2, 1.8]} />
             <meshStandardMaterial color="#111" roughness={0.1} />
           </mesh>
           <mesh position={[width/4, 0, 0]}>
             <planeGeometry args={[1.2, 1.8]} />
             <meshStandardMaterial color="#111" roughness={0.1} />
           </mesh>
           {/* Random AC unit */}
           {f === 2 && (
             <mesh position={[width/4, -0.4, 0.15]}>
               <boxGeometry args={[0.8, 0.6, 0.5]} />
               <meshStandardMaterial color="#cbd5e1" />
             </mesh>
           )}
        </group>
      ))}
    </group>
  );
};

// Building 2: 1960s Brick Apartment
const BuildingTwoBrickApartment = ({ position }: { position: [number, number, number] }) => {
  const width = 12;
  const floors = 8;
  const height = floors * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR;
  const depth = 15;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#572810" roughness={0.8} />
      </mesh>
      
      {/* AC Units in many windows */}
      {Array.from({ length: floors * 3 }).map((_, i) => {
        if (Math.random() > 0.3) {
           const f = Math.floor(i / 3);
           const c = i % 3;
           return (
             <mesh key={i} position={[(c - 1) * 3, f * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.2, depth/2 + 0.25]}>
                <boxGeometry args={[0.7, 0.5, 0.4]} />
                <meshStandardMaterial color="#94a3b8" />
             </mesh>
           );
        }
        return null;
      })}
      
      {/* Entrance Canopy */}
      <mesh position={[0, 3, depth/2 + 1]}>
        <boxGeometry args={[4, 0.2, 2.5]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      
      {/* Scattered Light in Windows */}
      {Array.from({ length: floors * 3 }).map((_, i) => {
        if (Math.random() > 0.6) {
           const f = Math.floor(i / 3);
           const c = i % 3;
           return (
             <mesh key={`light-${i}`} position={[(c - 1) * 3, f * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.8, depth/2 + 0.02]}>
                <planeGeometry args={[1.5, 2]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} toneMapped={false} />
             </mesh>
           );
        }
        return null;
      })}
      
      {/* Satellite Dish on 6th floor */}
      <group position={[width/2, DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR * 5 + 1.5, 2]} rotation={[0, Math.PI/2, -0.4]}>
         <mesh><sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#94a3b8" /></mesh>
         <mesh position={[0, 0.4, 0]}><boxGeometry args={[0.02, 0.8, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
      </group>
      {/* Intercom Panel */}
      <mesh position={[0, 1.2, depth/2 + 0.02]}>
         <boxGeometry args={[0.2, 0.4, 0.05]} />
         <meshStandardMaterial color="#d1d5db" metalness={0.9} />
      </mesh>
    </group>
  );
};

// Building 3: Pre-war Limestone
const BuildingThreePreWarLimestone = ({ position }: { position: [number, number, number] }) => {
  const width = 12;
  const floors = 6;
  const height = floors * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR;
  const depth = 15;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
      </mesh>
      
      {/* Arched windows on 2nd floor */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={i} position={[(i - 1.5) * 2.5, DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.8, depth/2 + 0.1]}>
           <mesh>
             <planeGeometry args={[1.5, 2.5]} />
             <meshStandardMaterial color="#1e293b" />
           </mesh>
           <mesh position={[0, 1.25, 0]}>
             <circleGeometry args={[0.75, 16, 0, Math.PI]} />
             <meshStandardMaterial color="#1e293b" />
           </mesh>
        </group>
      ))}
      
      {/* Doorman Awning */}
      <mesh position={[0, 2.2, depth/2 + 2]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[3, 0.1, 4]} />
        <meshStandardMaterial color="#064e3b" />
      </mesh>
      <group position={[0, 2.2, depth/2 + 4]}>
        <mesh position={[-1.45, -1.1, 0]}>
           <cylinderGeometry args={[0.05, 0.05, 2.2]} />
           <meshStandardMaterial color="#d4d4d8" />
        </mesh>
        <mesh position={[1.45, -1.1, 0]}>
           <cylinderGeometry args={[0.05, 0.05, 2.2]} />
           <meshStandardMaterial color="#d4d4d8" />
        </mesh>
      </group>
    </group>
  );
};

// Building 4: Converted Industrial
const BuildingFourConvertedIndustrial = ({ position }: { position: [number, number, number] }) => {
  const width = 15;
  const floors = 5;
  const floorHeight = 4.5;
  const height = floors * floorHeight;
  const depth = 15;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#7f1d1d" roughness={0.9} />
      </mesh>
      
      {/* Rooftop Water Tower */}
      <group position={[0, height + 1, 0]}>
         <mesh position={[0, 1.5, 0]}>
           <cylinderGeometry args={[2, 2, 3, 12]} />
           <meshStandardMaterial color="#5c4033" />
         </mesh>
         <mesh position={[0, 3, 0]}>
           <coneGeometry args={[2.2, 1, 12]} />
           <meshStandardMaterial color="#5c4033" />
         </mesh>
         {/* Legs */}
         {[[-1,0,-1],[1,0,-1],[-1,0,1],[1,0,1]].map((p, i) => (
           <mesh key={i} position={[p[0]*1.2, 0, p[2]*1.2]}>
              <cylinderGeometry args={[0.1, 0.1, 2]} />
              <meshStandardMaterial color="#333" />
           </mesh>
         ))}
      </group>
      
      {/* Large steel frame windows */}
      {Array.from({ length: floors * 3 }).map((_, i) => {
        const f = Math.floor(i / 3);
        const c = i % 3;
        return (
          <mesh key={i} position={[(c - 1) * 4.5, f * floorHeight + 2.2, depth/2 + 0.05]}>
             <planeGeometry args={[3.2, 3]} />
             <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
        );
      })}
      {/* Bike locked to railing */}
      <group position={[width/2 - 1, 0, depth/2 + 0.5]} rotation={[0, 0.2, 0]}>
         <mesh position={[0, 0.5, 0]}>
            <torusGeometry args={[0.4, 0.05, 8, 16]} />
            <meshStandardMaterial color="#111" />
         </mesh>
         <mesh position={[0, 0.5, 1]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.4, 0.05, 8, 16]} />
            <meshStandardMaterial color="#111" />
         </mesh>
         <mesh position={[0, 0.8, 0.5]}><boxGeometry args={[0.05, 0.8, 1]} /><meshStandardMaterial color="#2563eb" /></mesh>
      </group>
    </group>
  );
};

// Building 5: Far End (Simplified)
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

const PavementSlabs = ({ width, length, x }: { width: number, length: number, x: number }) => {
  const slabSize = 1.5;
  const slabsX = Math.round(width / slabSize);
  const slabsZ = Math.round(length / slabSize);

  return (
    <group position={[x, 0.1, 0]}>
      {/* Main Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>
      {/* Cracks and joints simulated with simple lines if needed, but here we just use the base for performance and add a few specific detailed slabs */}
      <mesh position={[0, 0.01, -20]} rotation={[-Math.PI / 2, 0, 0.5]}>
         <planeGeometry args={[1, 0.02]} />
         <meshBasicMaterial color="#333" />
      </mesh>
    </group>
  );
};

const Manhole = ({ position }: { position: [number, number, number] }) => {
  const steamRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.children.forEach((p, i) => {
        p.position.y += 0.02;
        p.scale.x = p.scale.y = 1 + p.position.y * 2;
        if (p.position.y > 2) {
          p.position.y = 0;
          p.position.x = (Math.random() - 0.5) * 0.2;
          p.position.z = (Math.random() - 0.5) * 0.2;
        }
      });
    }
  });

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#333" roughness={0.4} />
      </mesh>
      <group ref={steamRef} position={[0.6, 0.1, 0]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, Math.random() * 2, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[0.4, 0.4]} />
            <meshStandardMaterial color="#fff" transparent opacity={0.2} depthWrite={false} />
          </mesh>
        ))}
      </group>
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


export default function World({ isMobile, weather, timeOfDay }: { isMobile?: boolean, weather?: string, timeOfDay?: number }) {
  const roadLength = 300;
  
  return (
    <group>
      {/* Lights - simplified for this world segment */}
      <ambientLight intensity={0.5} />

      {/* Road - Asphalt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[DIMENSIONS.ROAD_WIDTH, roadLength]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Yellow Center Lines - Faded */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
         <planeGeometry args={[0.1, roadLength]} />
         <meshBasicMaterial color="#a16207" transparent opacity={0.4} />
      </mesh>

      {/* Sidewalks with Curb Details */}
      <PavementSlabs width={DIMENSIONS.SIDEWALK_WIDTH} length={roadLength} x={-(DIMENSIONS.ROAD_WIDTH/2 + DIMENSIONS.SIDEWALK_WIDTH/2)} />
      <PavementSlabs width={DIMENSIONS.SIDEWALK_WIDTH} length={roadLength} x={(DIMENSIONS.ROAD_WIDTH/2 + DIMENSIONS.SIDEWALK_WIDTH/2)} />

      {/* Procedural Building Canyon - Left Side */}
      {useMemo(() => {
        const buildings = [];
        let curZ = -140;
        const spacing = 0.1;
        while (curZ < 140) {
          const type = Math.floor(Math.random() * 4);
          const width = type === 0 ? 7.5 : (type === 3 ? 15 : 12);
          const posZ = curZ + width / 2;
          const posX = -(DIMENSIONS.ROAD_WIDTH / 2 + DIMENSIONS.SIDEWALK_WIDTH + width / 2);
          
          if (type === 0) buildings.push(<BuildingOneClassicBrownstone key={`l-${curZ}`} position={[posX, 0, posZ]} />);
          else if (type === 1) buildings.push(<BuildingTwoBrickApartment key={`l-${curZ}`} position={[posX, 0, posZ]} />);
          else if (type === 2) buildings.push(<BuildingThreePreWarLimestone key={`l-${curZ}`} position={[posX, 0, posZ]} />);
          else buildings.push(<BuildingFourConvertedIndustrial key={`l-${curZ}`} position={[posX, 0, posZ]} />);
          
          curZ += width + spacing;
        }
        return buildings;
      }, [])}

      {/* Procedural Building Canyon - Right Side */}
      {useMemo(() => {
        const buildings = [];
        let curZ = -140;
        const spacing = 0.1;
        while (curZ < 140) {
          const type = Math.floor(Math.random() * 4);
          const width = type === 0 ? 7.5 : (type === 3 ? 15 : 12);
          const posZ = curZ + width / 2;
          const posX = (DIMENSIONS.ROAD_WIDTH / 2 + DIMENSIONS.SIDEWALK_WIDTH + width / 2);
          
          if (type === 0) buildings.push(<BuildingOneClassicBrownstone key={`r-${curZ}`} position={[posX, 0, posZ]} />);
          else if (type === 1) buildings.push(<BuildingTwoBrickApartment key={`r-${curZ}`} position={[posX, 0, posZ]} />);
          else if (type === 2) buildings.push(<BuildingThreePreWarLimestone key={`r-${curZ}`} position={[posX, 0, posZ]} />);
          else buildings.push(<BuildingFourConvertedIndustrial key={`r-${curZ}`} position={[posX, 0, posZ]} />);
          
          curZ += width + spacing;
        }
        return buildings;
      }, [])}

      {/* Additional Distant Blocks for Verticality */}
      <BuildingFiveFarEnd position={[-(DIMENSIONS.ROAD_WIDTH + 30), 0, 160]} color="#1e293b" />
      <BuildingFiveFarEnd position={[(DIMENSIONS.ROAD_WIDTH + 30), 0, 160]} color="#334155" hasGhostSign />

      {/* Road Patches */}
      <mesh position={[2, 0.03, -15]} rotation={[-Math.PI/2, 0, 0]}>
         <planeGeometry args={[3, 4]} />
         <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
      </mesh>
      <mesh position={[-3, 0.03, 10]} rotation={[-Math.PI/2, 0, 0]}>
         <planeGeometry args={[4, 2]} />
         <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>

      {/* Storm Drain */}
      <mesh position={[DIMENSIONS.ROAD_WIDTH/2 - 0.5, 0.04, 5]} rotation={[-Math.PI/2, 0, 0]}>
         <planeGeometry args={[0.8, 0.5]} />
         <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>

      {/* Trees & Details */}
      <Manhole position={[1, 0, -10]} />
      <Manhole position={[-2, 0, 20]} />
      
      {/* London Plane Trees */}
      <LondonPlaneTree position={[-(DIMENSIONS.ROAD_WIDTH/2 + 1), 0, -20]} />
      <LondonPlaneTree position={[(DIMENSIONS.ROAD_WIDTH/2 + 1), 0, -15]} />
      <LondonPlaneTree position={[-(DIMENSIONS.ROAD_WIDTH/2 + 1), 0, 10]} />
      <LondonPlaneTree position={[(DIMENSIONS.ROAD_WIDTH/2 + 1), 0, 25]} />
      
      {/* Fire Hydrants */}
      <group position={[DIMENSIONS.ROAD_WIDTH/2 + 0.5, 0, -25]}>
         <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.15, 0.15, 0.7]} /><meshStandardMaterial color="#dc2626" /></mesh>
      </group>

      <StreetSigns position={[-(DIMENSIONS.ROAD_WIDTH/2 + 0.5), 0, -35]} />
      
      <TrashBags position={[-(DIMENSIONS.ROAD_WIDTH/2 + 2), 0, -5]} />
      <TrashBags position={[(DIMENSIONS.ROAD_WIDTH/2 + 2), 0, 15]} />

      {/* Cinematic Distance Skyline */}
      <group position={[0, 0, 200]}>
         {/* Main Tower with setbacks */}
         <group position={[0, 0, 0]}>
            <mesh position={[0, 40, 0]}><boxGeometry args={[30, 80, 30]} /><meshStandardMaterial color="#1e293b" /></mesh>
            <mesh position={[0, 85, 0]}><boxGeometry args={[20, 30, 20]} /><meshStandardMaterial color="#1e293b" /></mesh>
            <mesh position={[0, 105, 0]}><boxGeometry args={[10, 20, 10]} /><meshStandardMaterial color="#1e293b" /></mesh>
            {/* Comms Mast */}
            <mesh position={[0, 120, 0]}><cylinderGeometry args={[0.2, 0.2, 15]} /><meshStandardMaterial color="#334155" /></mesh>
         </group>
         
         <mesh position={[-45, 35, -10]}><boxGeometry args={[25, 100, 25]} /><meshStandardMaterial color="#0f172a" /></mesh>
         <mesh position={[45, 45, -5]}><boxGeometry args={[28, 120, 28]} /><meshStandardMaterial color="#334155" /></mesh>
         
         {/* Sun Halo Simulation Light */}
         <pointLight position={[0, 100, 10]} intensity={20} color="#fbbf24" distance={100} />
      </group>
    </group>
  );
}
