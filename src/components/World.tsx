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

// Helper for 3D Windows
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
const BuildingOneClassicBrownstone = ({ position, streetWidth = 7.5 }: { position: [number, number, number], streetWidth?: number }) => {
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

      {/* Floor Bands (Ledges) */}
      {Array.from({ length: floors }).map((_, i) => (
        <mesh key={i} position={[blockDepth/2 + 0.1, i * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR, 0]}>
          <boxGeometry args={[0.2, 0.2, streetWidth + 0.1]} />
          <meshStandardMaterial color="#431407" />
        </mesh>
      ))}

      {/* Stoop */}
      <group position={[blockDepth/2 + 0.5, 0.15, streetWidth/4]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[-i * 0.3, i * 0.2, 0]}>
            <boxGeometry args={[0.4, 0.2, 2.5]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
        ))}
      </group>

      {/* Cornice */}
      <mesh position={[blockDepth/2 + 0.2, height, 0]}>
        <boxGeometry args={[0.6, 0.8, streetWidth + 0.4]} />
        <meshStandardMaterial color="#431407" />
      </mesh>

      {/* 3D Windows */}
      {Array.from({ length: floors }).map((_, f) => (
        <group key={f} position={[blockDepth/2, f * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.8, 0]}>
          <Window3D position={[0.05, 0, -streetWidth/4]} />
          <Window3D position={[0.05, 0, streetWidth/4]} />
        </group>
      ))}
    </group>
  );
};

// Building 2: 1960s Brick Apartment
const BuildingTwoBrickApartment = ({ position, streetWidth = 12 }: { position: [number, number, number], streetWidth?: number }) => {
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
      {Array.from({ length: floors }).map((_, f) => (
        <group key={f} position={[blockDepth/2, f * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.8, 0]}>
          {[-streetWidth/3, 0, streetWidth/3].map((off, i) => (
            <Window3D key={i} position={[0.05, 0, off]} width={1.8} />
          ))}
        </group>
      ))}
      
      {/* Entrance Canopy */}
      <mesh position={[blockDepth/2 + 1.2, 3.2, 0]} castShadow>
        <boxGeometry args={[3, 0.3, 5]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
};

// Building 3: Pre-war Limestone
const BuildingThreePreWarLimestone = ({ position, streetWidth = 12 }: { position: [number, number, number], streetWidth?: number }) => {
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
      
      {/* Horizontal Stone Bands */}
      {Array.from({ length: floors }).map((_, i) => (
        <mesh key={i} position={[blockDepth/2 + 0.1, i * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR, 0]}>
          <boxGeometry args={[0.3, 0.4, streetWidth + 0.2]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      ))}

      {/* Arched windows on 2nd floor */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={i} position={[blockDepth/2 + 0.1, DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.8, (i - 1.5) * (streetWidth/4)]}>
           <Window3D position={[0, 0, 0]} width={streetWidth/5} />
        </group>
      ))}

      {/* Standard windows upper floors */}
      {Array.from({ length: floors - 2 }).map((_, f) => (
        <group key={f} position={[blockDepth/2 + 0.15, (f + 2) * DIMENSIONS.BUILDING_HEIGHT_PER_FLOOR + 1.8, 0]}>
          {[-streetWidth/4, 0, streetWidth/4].map((off, i) => (
            <Window3D key={i} position={[0, 0, off]} width={1.6} />
          ))}
        </group>
      ))}
      
      {/* Doorman Awning */}
      <mesh position={[blockDepth/2 + 2.5, 2.5, 0]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[5, 0.2, 4]} />
        <meshStandardMaterial color="#064e3b" />
      </mesh>
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

const PavementSlabs = ({ width, length, x }: { width: number, length: number, x: number }) => {
  return (
    <group position={[x, 0.1, 0]}>
      {/* Main Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>
      {/* Texture Details */}
      <mesh position={[0, 0.01, -20]} rotation={[-Math.PI / 2, 0, 0.5]}>
         <planeGeometry args={[1, 0.02]} />
         <meshBasicMaterial color="#333" />
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

      {/* Procedural Building Canyon - Left Side (Deterministic) */}
      {useMemo(() => {
        const buildings = [];
        let curZ = -140;
        const spacing = 1.0; 
        let index = 0;
        while (curZ < 140) {
          const type = (index * 7 + 3) % 4; 
          const sWidth = type === 0 ? 7.5 : (type === 3 ? 15 : 12);
          const posZ = curZ + sWidth / 2;
          const blockDepth = 15;
          const posX = -(DIMENSIONS.ROAD_WIDTH / 2 + DIMENSIONS.SIDEWALK_WIDTH + blockDepth / 2);
          
          if (type === 0) buildings.push(<BuildingOneClassicBrownstone key={`l-${index}`} position={[posX, 0, posZ]} streetWidth={sWidth} />);
          else if (type === 1) buildings.push(<BuildingTwoBrickApartment key={`l-${index}`} position={[posX, 0, posZ]} streetWidth={sWidth} />);
          else if (type === 2) buildings.push(<BuildingThreePreWarLimestone key={`l-${index}`} position={[posX, 0, posZ]} streetWidth={sWidth} />);
          else buildings.push(<BuildingFourConvertedIndustrial key={`l-${index}`} position={[posX, 0, posZ]} streetWidth={sWidth} />);
          
          curZ += sWidth + spacing;
          index++;
        }
        return buildings;
      }, [])}

      {/* Procedural Building Canyon - Right Side (Deterministic) */}
      {useMemo(() => {
        const buildings = [];
        let curZ = -140;
        const spacing = 1.0; 
        let index = 0;
        while (curZ < 140) {
          const type = (index * 13 + 5) % 4; 
          const sWidth = type === 0 ? 7.5 : (type === 3 ? 15 : 12);
          const posZ = curZ + sWidth / 2;
          const blockDepth = 15;
          const posX = (DIMENSIONS.ROAD_WIDTH / 2 + DIMENSIONS.SIDEWALK_WIDTH + blockDepth / 2);
          
          // Rotate 180 degrees (Math.PI) so facades face the street
          const rotation = [0, Math.PI, 0] as [number, number, number];
          
          if (type === 0) buildings.push(<group key={`r-${index}`} position={[posX, 0, posZ]} rotation={rotation}><BuildingOneClassicBrownstone position={[0,0,0]} streetWidth={sWidth} /></group>);
          else if (type === 1) buildings.push(<group key={`r-${index}`} position={[posX, 0, posZ]} rotation={rotation}><BuildingTwoBrickApartment position={[0,0,0]} streetWidth={sWidth} /></group>);
          else if (type === 2) buildings.push(<group key={`r-${index}`} position={[posX, 0, posZ]} rotation={rotation}><BuildingThreePreWarLimestone position={[0,0,0]} streetWidth={sWidth} /></group>);
          else buildings.push(<group key={`r-${index}`} position={[posX, 0, posZ]} rotation={rotation}><BuildingFourConvertedIndustrial position={[0,0,0]} streetWidth={sWidth} /></group>);
          
          curZ += sWidth + spacing;
          index++;
        }
        return buildings;
      }, [])}

      {/* Additional Distant Blocks for Verticality */}
      <BuildingFiveFarEnd position={[-(DIMENSIONS.ROAD_WIDTH + 30), 0, 160]} color="#1e293b" />
      <BuildingFiveFarEnd position={[(DIMENSIONS.ROAD_WIDTH + 30), 0, 160]} color="#334155" hasGhostSign />

      {/* Road Details */}
      <mesh position={[2, 0.03, -15]} rotation={[-Math.PI/2, 0, 0]}>
         <planeGeometry args={[3, 4]} />
         <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
      </mesh>
      <mesh position={[-3, 0.03, 10]} rotation={[-Math.PI/2, 0, 0]}>
         <planeGeometry args={[4, 2]} />
         <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      {/* Center Line Patches */}
      <mesh position={[0, 0.04, -50]} rotation={[-Math.PI/2, 0, 0]}>
         <planeGeometry args={[0.2, 5]} />
         <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} />
      </mesh>

      {/* Storm Drain */}
      <mesh position={[DIMENSIONS.ROAD_WIDTH/2 - 0.5, 0.04, 5]} rotation={[-Math.PI/2, 0, 0]}>
         <planeGeometry args={[0.8, 0.5]} />
         <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>

      {/* Trees & Details */}
      {/* Manholes removed as requested */}
      
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
      
      {/* USPS Mailbox (Classic Blue) */}
      <group position={[DIMENSIONS.ROAD_WIDTH/2 + 1.2, 0, -5]}>
         <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[0.6, 1.2, 0.6]} />
            <meshStandardMaterial color="#1e3a8a" />
         </mesh>
         <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
            <meshStandardMaterial color="#1e3a8a" />
         </mesh>
      </group>

      {/* Scaffolding - Common in Manhattan */}
      <group position={[-(DIMENSIONS.ROAD_WIDTH/2 + 2), 0, 15]}>
         {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={i} position={[0, 2.5, i * 4]}>
               <boxGeometry args={[0.1, 5, 0.1]} />
               <meshStandardMaterial color="#94a3b8" />
            </mesh>
         ))}
         <mesh position={[0.5, 5, 6]}><boxGeometry args={[4, 0.1, 16]} /><meshStandardMaterial color="#554433" /></mesh>
      </group>

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
