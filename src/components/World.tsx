import { useMemo, useRef } from 'react';
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

const ModernBuilding = ({ position, scale, color, isMobile }: { position: [number, number, number], scale: [number, number, number], color: string, isMobile?: boolean, key?: string }) => {
  const [width, height, depth] = scale;
  const hasShop = useMemo(() => Math.random() > 0.4, []); // 60% chance of having a shop

  return (
    <group position={position}>
      <mesh castShadow={!isMobile} receiveShadow={!isMobile}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Roof Elements (Water Tank) - One simplified element */}
      <mesh position={[width / 4, height / 2 + 0.5, 0]}>
        <cylinderGeometry args={[1, 1, 1, isMobile ? 6 : 12]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {hasShop && (
        <Signboard position={[0, -height / 2 + 2, depth / 2 + 0.1]} width={width} isMobile={isMobile} />
      )}
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
            {/* Right Arc */}
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

export default function World({ isMobile, weather }: { isMobile?: boolean, weather?: string }) {
  const roadWidth = 10;
  const roadLength = 300;
  const buildingCount = isMobile ? 45 : 60;
  const isWet = weather === 'RAIN' || weather === 'STORM';

  const buildings = useMemo(() => {
    const items = [];
    for (let i = 0; i < buildingCount; i++) {
      const xOffset = roadWidth / 2 + 20 + Math.random() * 10;
      const zPos = (Math.random() - 0.5) * roadLength;
      const width = 10 + Math.random() * 8;
      const depth = 10 + Math.random() * 8;
      const height = 15 + Math.random() * 30;
      const isHeritage = Math.random() > 0.7;
      const color = isHeritage ? "#7f1d1d" : "#e2e8f0";
      items.push({
        position: [xOffset, height / 2, zPos],
        scale: [width, height, depth],
        color: color,
        isHeritage
      });
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

  return (
    <group>
      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[roadWidth, roadLength]} />
        <meshStandardMaterial color="#111" roughness={isWet ? 0.1 : 0.6} metalness={isWet ? 0.4 : 0} />
      </mesh>

      {/* Road Markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <planeGeometry args={[0.3, roadLength]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isWet ? 0.8 : 1} />
      </mesh>

      {/* Beach Sand */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-roadWidth / 2 - 25, 0.01, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[50, roadLength]} />
        <meshStandardMaterial color={isWet ? "#9a7b4f" : "#e6c288"} roughness={0.9} />
      </mesh>

      {/* Ocean */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-roadWidth / 2 - 75, -0.5, 0]}>
        <planeGeometry args={[50, roadLength]} />
        <meshStandardMaterial color="#006994" roughness={0.1} metalness={0.6} transparent opacity={0.9} />
      </mesh>

      {/* Pavement (Marina Tiled Path) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.1, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[10, roadLength]} />
        <meshStandardMaterial color="#94a3b8" roughness={isWet ? 0.05 : 0.8} metalness={isWet ? 0.3 : 0} />
      </mesh>

      {/* Building Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[40, 0.05, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[50, roadLength]} />
        <meshStandardMaterial color="#64748b" roughness={isWet ? 0.2 : 0.9} />
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
        data.isHeritage ?
          <HeritageBuilding
            key={`h-${i}`}
            position={data.position as [number, number, number]}
            scale={data.scale as [number, number, number]}
            color={data.color}
            isMobile={isMobile}
          /> :
          <ModernBuilding
            key={`m-${i}`}
            position={data.position as [number, number, number]}
            scale={data.scale as [number, number, number]}
            color={data.color}
            isMobile={isMobile}
          />
      ))}

      {/* Iconic Chennai Monuments */}
      <LICBuilding position={[45, 0, 40]} />
      <LICBuilding position={[60, 0, -50]} />

      <NapierBridge position={[30, 0, 80]} />
      <NapierBridge position={[30, 0, -80]} />

      <TeaStall position={[12, 0, 20]} isMobile={isMobile} />
      <BusStop position={[12, 0, -40]} isMobile={isMobile} />

      {/* Palm Trees along the pavement */}
      {Array.from({ length: 10 }).map((_, i) => (
        <PalmTree key={`palm-${i}`} position={[14, 0, -100 + i * 30]} isMobile={isMobile} />
      ))}

      <SundalCart position={[-15, 0, 10]} isMobile={isMobile} />
      <TenderCoconutCart position={[-12, 0, -20]} isMobile={isMobile} />

      <FallenLeaves isMobile={isMobile} />

      {/* Street Lights */}
      {Array.from({ length: 15 }).map((_, i) => {
        const z = -100 + i * 20;
        return (
          <group key={`light-${i}`} position={[roadWidth / 2 + 1, 0, z]}>
            <mesh position={[0, 4, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 8, 6]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            <mesh position={[0, 8, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 1, 6]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            <pointLight position={[-1, 7.8, 0]} intensity={2} distance={15} color="#ffaa00" />
            {/* Light Mesh Glow */}
            <mesh position={[-1, 7.8, 0]}>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshBasicMaterial color="#ffaa00" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
