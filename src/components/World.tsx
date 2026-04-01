import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const SHOP_NAMES = [
  { en: "Tea Stall", ta: "தேநீர் கடை", color: "#fbbf24" },
  { en: "Juice Corner", ta: "பழச்சாறு", color: "#a3e635" },
  { en: "Hotel Saravana", ta: "சரவணா பவன்", color: "#f87171" },
  { en: "Medical", ta: "மருந்தகம்", color: "#60a5fa" },
  { en: "Bakery", ta: "பேக்கரி", color: "#fb923c" },
  { en: "Textiles", ta: "ஜவுளி", color: "#c084fc" },
  { en: "Electronics", ta: "மின்னணு", color: "#22d3ee" },
  { en: "Provision Store", ta: "மளிகை கடை", color: "#4ade80" }
];

const Signboard = ({ position, width, isMobile }: { position: [number, number, number], width: number, isMobile?: boolean }) => {
  const shop = useMemo(() => SHOP_NAMES[Math.floor(Math.random() * SHOP_NAMES.length)], []);

  return (
    <group position={position}>
      {/* Board Background */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width - 0.5, 1, 0.2]} />
        <meshStandardMaterial color="#1e1e1e" />
      </mesh>
      {/* English Text only - simpler for WebGL */}
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.4}
        color={shop.color}
        anchorX="center"
        anchorY="middle"
      >
        {shop.en}
      </Text>
    </group>
  );
};

const Crosswalk = ({ z }: { z: number }) => (
  <group position={[0, 0.04, z]}>
    {Array.from({ length: 8 }).map((_, i) => (
      <mesh key={i} position={[(i - 3.5) * 2.5, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
    ))}
  </group>
);

// Yellow traffic light hung over intersection
const TrafficLight = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh position={[-4, 0, 0]}><boxGeometry args={[8, 0.12, 0.12]} /><meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} /></mesh>
    <mesh position={[0, -3, 0]}><cylinderGeometry args={[0.08, 0.1, 6, 6]} /><meshStandardMaterial color="#4b5563" metalness={0.7} roughness={0.3} /></mesh>
    <group position={[-7.5, 0, 0]}>
      <mesh><boxGeometry args={[0.5, 1.4, 0.4]} /><meshStandardMaterial color="#111827" /></mesh>
      <mesh position={[0, 0.45, 0.21]}><circleGeometry args={[0.18, 8]} /><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} toneMapped={false} /></mesh>
      <mesh position={[0, 0, 0.21]}><circleGeometry args={[0.18, 8]} /><meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2.5} toneMapped={false} /></mesh>
      <mesh position={[0, -0.45, 0.21]}><circleGeometry args={[0.18, 8]} /><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} toneMapped={false} /></mesh>
    </group>
  </group>
);

const ParkedCar = ({ position, color }: { position: [number, number, number]; color: string }) => (
  <group position={position}>
    <mesh position={[0, 0.45, 0]}><boxGeometry args={[2, 0.9, 4.5]} /><meshStandardMaterial color={color} roughness={0.15} metalness={0.85} /></mesh>
    <mesh position={[0, 1.05, -0.3]}><boxGeometry args={[1.8, 0.6, 2.8]} /><meshStandardMaterial color={color} roughness={0.15} metalness={0.85} /></mesh>
    <mesh position={[0, 1.05, -0.3]}><boxGeometry args={[1.82, 0.5, 2.6]} /><meshStandardMaterial color="#0a0a0a" roughness={0.05} metalness={0.95} /></mesh>
    {([ [1.0, 0, 1.5], [-1.0, 0, 1.5], [1.0, 0, -1.5], [-1.0, 0, -1.5] ] as [number,number,number][]).map((p, i) => (
      <mesh key={i} position={p} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.38, 0.38, 0.25, 8]} /><meshStandardMaterial color="#0f0f0f" /></mesh>
    ))}
  </group>
);

const Cone = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh position={[0, 0.4, 0]}><coneGeometry args={[0.18, 0.8, 6]} /><meshStandardMaterial color="#f97316" roughness={0.6} /></mesh>
    <mesh position={[0, 0.04, 0]}><cylinderGeometry args={[0.22, 0.22, 0.08, 6]} /><meshStandardMaterial color="#1f2937" roughness={0.8} /></mesh>
  </group>
);

const ModernBuilding = ({ position, width, height, color, complexity }: any) => {
  const details = useMemo(() => {
    const items = [];
    const floors = Math.floor(height / 3);
    for (let f = 0; f < floors; f++) {
      if (Math.random() > 0.4) {
        items.push({ 
          type: 'balcony', 
          pos: [0, f * 3 + 1.5, width/2 + 0.1], 
          scale: [width * 0.8, 0.1, 0.4] 
        });
      }
      if (Math.random() > 0.6) {
        items.push({ 
          type: 'ac', 
          pos: [width/4, f * 3 + 2.2, width/2 + 0.05], 
          scale: [0.3, 0.3, 0.3] 
        });
      }
    }
    return items;
  }, [width, height, color]);

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {details.map((d, i) => (
        <mesh key={i} position={d.pos as any} castShadow>
          <boxGeometry args={d.scale as any} />
          <meshStandardMaterial color={d.type === 'balcony' ? color : '#94a3b8'} />
        </mesh>
      ))}
      <mesh position={[0, 0, width / 2 + 0.01]}>
        <planeGeometry args={[width * 0.8, height * 0.9]} />
        <meshStandardMaterial color="#1e293b" emissive="#60a5fa" emissiveIntensity={complexity > 0.7 ? 0.5 : 0.2} roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
};

const HeritageBuilding = ({ position, scale, color, isMobile }: { position: [number, number, number], scale: [number, number, number], color: string, isMobile?: boolean, key?: string }) => {
  const [width, height, depth] = scale;
  const hasShop = useMemo(() => Math.random() > 0.3, []);

  return (
    <group position={position}>
      <mesh castShadow={!isMobile} receiveShadow={!isMobile}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Dome */}
      <group position={[0, height / 2, 0]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[Math.min(width, depth) / 2.5, Math.min(width, depth) / 2.5, 2, isMobile ? 6 : 8]} />
          <meshStandardMaterial color="#fef3c7" />
        </mesh>
        <mesh position={[0, 3, 0]}>
          <sphereGeometry args={[Math.min(width, depth) / 2.2, isMobile ? 8 : 16, isMobile ? 8 : 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#fef3c7" />
        </mesh>
      </group>
      {hasShop && (
        <Signboard position={[0, -height / 2 + 2.5, depth / 2 + 0.1]} width={width} isMobile={isMobile} />
      )}
    </group>
  );
};

const TeaStall = ({ position, isMobile }: { position: [number, number, number], isMobile?: boolean }) => {
  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[0, 1.2, 0]} castShadow={!isMobile}>
        <boxGeometry args={[2.5, 2.4, 2]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

const BusStop = ({ position, isMobile }: { position: [number, number, number], isMobile?: boolean }) => {
  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[0, 3, 0]} castShadow={!isMobile}>
        <boxGeometry args={[4, 0.2, 2.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-1.8, 1.5, -1]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 6]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[1.8, 1.5, -1]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 6]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  );
};

const SundalCart = ({ position, isMobile }: { position: [number, number, number], isMobile?: boolean }) => {
  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      <mesh position={[0, 1, 0]} castShadow={!isMobile}>
        <boxGeometry args={[2, 1, 1.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[1.5, 0.5, 4]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

const TenderCoconutCart = ({ position, isMobile }: { position: [number, number, number], isMobile?: boolean }) => {
  const count = isMobile ? 4 : 8;
  return (
    <group position={position} rotation={[0, Math.random() * Math.PI, 0]}>
      <mesh position={[0, 0.8, 0]} castShadow={!isMobile}>
        <boxGeometry args={[1.8, 0.2, 1]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 1.2, 1.1 + Math.random() * 0.3, (Math.random() - 0.5) * 0.6]}>
          <sphereGeometry args={[0.2, 6, 6]} />
          <meshStandardMaterial color="#84cc16" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const PalmTree = ({ position, isMobile }: { position: [number, number, number], isMobile?: boolean }) => {
  const leafRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (leafRef.current) {
      const time = state.clock.elapsedTime;
      leafRef.current.children.forEach((leaf, i) => {
        // Independent leaf movement using sine waves
        leaf.rotation.x = Math.sin(time + i) * 0.1;
        leaf.rotation.z = Math.cos(time * 0.8 + i) * 0.1;
      });
    }
  });

  return (
    <group position={position}>
      {/* Trunk - slightly bent toward sea */}
      <mesh castShadow position={[0, 4, 0]} rotation={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.3, 0.5, 10, 8]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      
      {/* Leaves */}
      <group ref={leafRef} position={[0.5, 9, 0]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh 
            key={i} 
            rotation={[0, (i * Math.PI) / 4, 0]} 
            position={[0, 0, 0]}
          >
            <group position={[0, 0, 2]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1.5, 4]} />
                <meshStandardMaterial 
                  color="#2d5a27" 
                  side={THREE.DoubleSide} 
                  transparent 
                  opacity={0.9}
                  roughness={0.4}
                />
              </mesh>
            </group>
          </mesh>
        ))}
      </group>
    </group>
  );
};

const FallenLeaves = ({ isMobile }: { isMobile?: boolean }) => {
  const leafCount = isMobile ? 50 : 300;
  const roadWidth = 10;
  const roadLength = 300;

  const leaves = useMemo(() => {
    const items = [];
    for (let i = 0; i < leafCount; i++) {
      const isSidewalk = Math.random() > 0.3;
      let x, y, z;
      if (isSidewalk) {
        x = (roadWidth / 2) + Math.random() * 10;
        y = 0.11;
      } else {
        x = (roadWidth / 2) - Math.random() * 2;
        y = 0.03;
      }
      z = (Math.random() - 0.5) * roadLength;
      const scale = 0.1 + Math.random() * 0.1;
      const rotation = [Math.PI / 2, 0, Math.random() * Math.PI];
      const color = Math.random() > 0.5 ? "#a0522d" : (Math.random() > 0.5 ? "#cd853f" : "#8b4513");
      items.push({ position: [x, y, z], rotation, scale, color });
    }
    return items;
  }, [isMobile]);

  return (
    <group>
      {leaves.map((leaf, i) => (
        <mesh
          key={`leaf-${i}`}
          position={leaf.position as [number, number, number]}
          rotation={leaf.rotation as [number, number, number]}
          scale={[leaf.scale, leaf.scale, leaf.scale]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color={leaf.color} side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

// --- CHENNAI MONUMENTS ---

const LICBuilding = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Main Structure - Light Grey Tall Block */}
      <mesh castShadow receiveShadow position={[0, 25, 0]}>
        <boxGeometry args={[15, 50, 15]} />
        <meshStandardMaterial color="#d1d5db" roughness={0.6} />
      </mesh>
      
      {/* Front Blue Glass Facade */}
      <mesh position={[0, 25, 7.6]}>
        <boxGeometry args={[14, 48, 0.1]} />
        <meshStandardMaterial color="#60a5fa" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Side Horizontal Slat Details typical of LIC */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`lic-slat-${i}`} position={[0, 5 + i * 3, 7.65]}>
          <boxGeometry args={[14.2, 0.5, 0.2]} />
          <meshStandardMaterial color="#9ca3af" roughness={0.8} />
        </mesh>
      ))}

      {/* LIC Signage on top */}
      <group position={[0, 52, 7.5]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6, 3, 0.5]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        <Text position={[0, 0, 0.3]} fontSize={2} color="#ffffff" anchorX="center" anchorY="middle">
          LIC
        </Text>
      </group>
    </group>
  );
};

const NapierBridge = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Bridge Road Base */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[40, 0.5, 12]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      
      {/* Iconic White Arches */}
      {Array.from({ length: 6 }).map((_, i) => {
        const xPos = -16.5 + i * 6.6;
        return (
          <group key={`arch-${i}`}>
            {/* Left Arc */}
            <mesh position={[xPos, 1.25, -5.5]} rotation={[0, 0, 0]}>
              <torusGeometry args={[3.3, 0.4, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            <mesh position={[xPos, 1.25, 5.5]} rotation={[0, 0, 0]}>
              <torusGeometry args={[3.3, 0.4, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const StreetLights = ({ count, isNight }: { count: number, isNight: boolean }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
        dummy.position.set(12, 0, (i - count/2) * 50);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 6]} />
        <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} />
      </instancedMesh>
      {isNight && Array.from({ length: count }).map((_, i) => (
        <group key={i} position={[12, 5.8, (i - count/2) * 50]}>
           <mesh>
             <sphereGeometry args={[0.22]} />
             <meshStandardMaterial color="#fcd34d" emissive="#f59e0b" emissiveIntensity={4} toneMapped={false} />
           </mesh>
           <pointLight intensity={3} distance={30} color="#fcd34d" decay={2} />
        </group>
      ))}
    </group>
  );
};

export default function World({ isMobile, weather, timeOfDay }: { isMobile?: boolean, weather?: string, timeOfDay?: number }) {
  const roadWidth = 20;
  const roadLength = 300;
  const buildingCount = isMobile ? 30 : 60;
  const isWet = weather === 'RAIN' || weather === 'STORM';

  const buildings = useMemo(() => {
    const items = [];
    // Manhattan-style warm brick & limestone buildings — flush with sidewalk curb
    // Right side: sidewalk ends at x=20, so building inner face at 20.
    for (let i = 0; i < buildingCount / 2; i++) {
        const width = 10 + Math.random() * 12;
        const height = 20 + Math.random() * 120; // range from low-rise to skyscraper
        const xOffset = 20 + width / 2; // Fixed: pushed back to 20 so character at 17.5 doesn't clip
        const zPos = (Math.random() - 0.5) * roadLength;
        const depth = width * 0.7;
        // Warm Manhattan palette: brick, limestone, brownstone, glass towers
        const color = [
          '#b45309', // brownstone
          '#92400e', // dark brick
          '#d97706', // warm brick
          '#a16207', // terracotta
          '#78350f', // dark brownstone
          '#c4b5a0', // limestone
          '#e8d5b7', // beige stone
          '#f5f0e8', // light stone
          '#475569', // modern glass (taller buildings)
          '#334155', // dark glass tower
        ][Math.floor(Math.random() * 10)];
        items.push({ position: [xOffset, height / 2, zPos], scale: [width, height, depth], color });
    }
    // Left side: sidewalk ends at x=-20
    for (let i = 0; i < buildingCount / 2; i++) {
        const width = 10 + Math.random() * 12;
        const height = 20 + Math.random() * 120;
        const xOffset = -(20 + width / 2); // Fixed from -10 to -20
        const zPos = (Math.random() - 0.5) * roadLength;
        const depth = width * 0.7;
        const color = [
          '#b45309', '#92400e', '#d97706', '#a16207', '#78350f',
          '#c4b5a0', '#e8d5b7', '#475569', '#334155', '#1e3a5f'
        ][Math.floor(Math.random() * 10)];
        items.push({ position: [xOffset, height / 2, zPos], scale: [width, height, depth], color });
    }
    return items.sort((a, b) => a.position[2] - b.position[2]);
  }, [isMobile, buildingCount]);

  const windowInstances = useMemo(() => {
    const frameData: THREE.Matrix4[] = [];
    const glassData: THREE.Matrix4[] = [];
    
    const floorHeight = 3;
    const windowWidth = 1.5;
    const windowHeight = 1.8;
    const gap = 0.8;

    buildings.forEach((b: any) => {
      if (b.isHeritage) return;
      const [width, height, depth] = b.scale;
      const floors = Math.floor(height / floorHeight);
      const cols = Math.floor(width / (windowWidth + gap));
      const drawLimit = isMobile ? Math.min(floors, 4) : floors;

      for (let f = 1; f < drawLimit; f++) {
        for (let c = 0; c < cols; c++) {
          const xPos = b.position[0] - width / 2 + (width / (cols + 1)) * (c + 1);
          const yPos = b.position[1] - height / 2 + f * floorHeight;
          const zPos = b.position[2] + depth / 2 + 0.05;

          const matrix = new THREE.Matrix4();
          matrix.setPosition(new THREE.Vector3(xPos, yPos, zPos));
          frameData.push(matrix);

          const glassMatrix = matrix.clone();
          glassMatrix.setPosition(new THREE.Vector3(xPos, yPos, zPos + 0.01));
          glassData.push(glassMatrix);
        }
      }
    });
    return { frameData, glassData };
  }, [buildings, isMobile]);

  const frameRef = useRef<THREE.InstancedMesh>(null);
  const glassRef = useRef<THREE.InstancedMesh>(null);

  useFrame(() => {
    if (frameRef.current && windowInstances.frameData.length > 0) {
      windowInstances.frameData.forEach((matrix, i) => frameRef.current!.setMatrixAt(i, matrix));
      frameRef.current.instanceMatrix.needsUpdate = true;
    }
    if (glassRef.current && windowInstances.glassData.length > 0) {
      windowInstances.glassData.forEach((matrix, i) => glassRef.current!.setMatrixAt(i, matrix));
      glassRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const isNight = timeOfDay ? (timeOfDay > 18.5 || timeOfDay < 5.5) : false;

  return (
    <group>
      {/* Lights */}
      <StreetLights count={10} isNight={isNight} />

      {/* Asphalt road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[roadWidth, roadLength]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Pavement/Sidewalks */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[17.5, 0.1, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[15, roadLength]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-20, 0.1, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[15, roadLength]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Road Markings - Double Center Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.03, 0]}>
        <planeGeometry args={[0.2, roadLength]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isWet ? 0.8 : 1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.2, 0.03, 0]}>
        <planeGeometry args={[0.2, roadLength]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isWet ? 0.8 : 1} />
      </mesh>

      {/* Lane Separators (Dashed) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.03, 0]}>
        <planeGeometry args={[0.1, roadLength]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0.03, 0]}>
        <planeGeometry args={[0.1, roadLength]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* Crosswalks at major nodes */}
      <Crosswalk z={-80} />
      <Crosswalk z={0} />
      <Crosswalk z={80} />

      {/* Building Ground Pads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[45, 0.05, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[55, roadLength]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-45, 0.05, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[55, roadLength]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Optimized Windows */}
      <instancedMesh ref={frameRef} args={[undefined, undefined, windowInstances.frameData.length]}>
        <boxGeometry args={[1.5, 1.8, 0.1]} />
        <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.5} />
      </instancedMesh>
      <instancedMesh ref={glassRef} args={[undefined, undefined, windowInstances.glassData.length]}>
        <planeGeometry args={[1.3, 1.6]} />
        <meshStandardMaterial color="#93c5fd" roughness={0.1} metalness={0.9} transparent opacity={0.7} />
      </instancedMesh>

      {buildings.map((data, i) => (
          <ModernBuilding
            key={`m-${i}`}
            position={data.position as [number, number, number]}
            width={data.scale[0]}
            height={data.scale[1]}
            color={data.color}
            complexity={Math.random()}
          />
      ))}


      {/* --- MANHATTAN STREET PROPS --- */}

      {/* Yellow Traffic Lights at intersections */}
      <TrafficLight position={[17.5, 5, -80]} />
      <TrafficLight position={[17.5, 5, 0]} />
      <TrafficLight position={[17.5, 5, 80]} />

      {/* Parked cars along right curb */}
      {Array.from({ length: isMobile ? 4 : 10 }).map((_, i) => (
        <ParkedCar
          key={`pcar-${i}`}
          position={[9.5, 0, -130 + i * 28]}
          color={['#111', '#1e293b', '#0f172a', '#1c1917', '#18181b'][i % 5]}
        />
      ))}

      {/* Orange Construction Cones near crosswalks */}
      {[-80, 0, 80].flatMap((z, j) => (
        [0, 2, 4].map((dz, k) => (
          <Cone key={`cone-${j}-${k}`} position={[7, 0, z + dz]} />
        ))
      ))}

      <FallenLeaves isMobile={isMobile} />

      {/* NYC Fire Hydrants — right sidewalk every 30 units */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={`hydrant-${i}`} position={[17, 0, -105 + i * 30]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 0.6, 8]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 0.15, 8]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* NYC Park Benches — both sides */}
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={`bench-r-${i}`} position={[16, 0, -60 + i * 30]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.8, 0.08, 0.5]} />
            <meshStandardMaterial color="#92400e" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.2, -0.2]}>
            <boxGeometry args={[1.8, 0.4, 0.08]} />
            <meshStandardMaterial color="#92400e" roughness={0.9} />
          </mesh>
          <mesh position={[-0.85, 0.2, 0]}>
            <boxGeometry args={[0.08, 0.4, 0.5]} />
            <meshStandardMaterial color="#78350f" roughness={1.0} />
          </mesh>
          <mesh position={[0.85, 0.2, 0]}>
            <boxGeometry args={[0.08, 0.4, 0.5]} />
            <meshStandardMaterial color="#78350f" roughness={1.0} />
          </mesh>
        </group>
      ))}

      {/* NYC Street Sign Poles */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={`sign-${i}`} position={[17.5, 0, -90 + i * 60]}>
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 5, 6]} />
            <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 4.8, 0]} rotation={[0, Math.PI / 4 * i, 0]}>
            <boxGeometry args={[1.2, 0.3, 0.06]} />
            <meshStandardMaterial color="#1d4ed8" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* NYC Sidewalk Trees (Ginkgo Style) — right side every 25 units */}
      {!isMobile && Array.from({ length: 10 }).map((_, i) => (
        <group key={`tree-r-${i}`} position={[15.5, 0, -112 + i * 25]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 3, 6]} />
            <meshStandardMaterial color="#57534e" roughness={1.0} />
          </mesh>
          <mesh position={[0, 3.5, 0]}>
            <sphereGeometry args={[1.2, 6, 5]} />
            <meshStandardMaterial color="#166534" roughness={0.9} />
          </mesh>
          <mesh position={[0.4, 3.2, 0.3]}>
            <sphereGeometry args={[0.8, 5, 4]} />
            <meshStandardMaterial color="#15803d" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Left side trees */}
      {!isMobile && Array.from({ length: 10 }).map((_, i) => (
        <group key={`tree-l-${i}`} position={[-12, 0, -100 + i * 25]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 3, 6]} />
            <meshStandardMaterial color="#57534e" roughness={1.0} />
          </mesh>
          <mesh position={[0, 3.5, 0]}>
            <sphereGeometry args={[1.2, 6, 5]} />
            <meshStandardMaterial color="#166534" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
