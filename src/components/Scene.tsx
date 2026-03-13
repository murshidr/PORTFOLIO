import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Environment, Stars, Cloud, Sky, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Character from './Character';
import CameraFlyIn from './CameraFlyIn';
import RadialMenu from './RadialMenu';
import World from './World';
import CityLife from './CityLife';
import { useLocation } from 'react-router-dom';

// --- WEATHER SYSTEM ---
const Rain = () => {
  const count = 5000;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = Math.random() * 100;
      const z = (Math.random() - 0.5) * 200;
      const speed = 0.5 + Math.random() * 0.5;
      temp.push({ x, y, z, speed });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      particle.y -= particle.speed * delta * 50; // Rain fall speed
      if (particle.y < 0) particle.y = 100; // Reset to top
      
      dummy.position.set(particle.x, particle.y, particle.z);
      // Slight slant for wind
      dummy.rotation.z = -0.1;
      dummy.scale.set(0.05, 1.5, 0.05); // Long thin raindrops
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.02, 0.02, 1, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
    </instancedMesh>
  );
};

// --- DAY/NIGHT CYCLE MANAGER ---
const EnvironmentManager = ({ isRaining }: { isRaining: boolean }) => {
  // Time ranges from 0 to 24
  const [timeOfDay, setTimeOfDay] = useState(12); // Start at noon
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const colorObj = useMemo(() => new THREE.Color(), []);
  const { scene } = useThree();

  useFrame((state, delta) => {
    // Advance time (1 game hour every 10 real seconds = 0.1 hrs/sec)
    setTimeOfDay((prev) => (prev + delta * 0.1) % 24);

    // Calculate light properties based on timeOfDay
    // 0 = midnight, 6 = dawn, 12 = noon, 18 = dusk
    
    // Sun position (arch overhead)
    const angle = ((timeOfDay - 6) / 24) * Math.PI * 2;
    if (lightRef.current) {
      lightRef.current.position.x = Math.cos(angle) * 100;
      lightRef.current.position.y = Math.sin(angle) * 100;
      lightRef.current.position.z = Math.sin(angle) * 50; // slight offset
      
      // Light intensity dips at night
      const intensityScale = Math.max(0.1, Math.sin(angle));
      lightRef.current.intensity = isRaining ? intensityScale * 0.5 : intensityScale * 1.5;
    }

    // Colors
    let skyColor = '#ff9966'; // Default warm
    let fogColor = '#ff9966';
    let lightColor = '#ffaa00';

    if (timeOfDay >= 0 && timeOfDay < 5) {
      // Night
      skyColor = '#020617';
      fogColor = '#0f172a';
      lightColor = '#e2e8f0'; // moon light
    } else if (timeOfDay >= 5 && timeOfDay < 8) {
      // Dawn transition
      skyColor = '#fdba74';
      fogColor = '#fed7aa';
      lightColor = '#fb923c';
    } else if (timeOfDay >= 8 && timeOfDay < 17) {
      // Day
      skyColor = isRaining ? '#64748b' : '#38bdf8';
      fogColor = isRaining ? '#94a3b8' : '#e0f2fe';
      lightColor = isRaining ? '#cbd5e1' : '#ffffff';
    } else if (timeOfDay >= 17 && timeOfDay < 20) {
      // Dusk transition
      skyColor = '#f43f5e';
      fogColor = '#fda4af';
      lightColor = '#fb7185';
    } else {
      // Night
      skyColor = '#020617';
      fogColor = '#0f172a';
      lightColor = '#e2e8f0';
    }

    // Smoothly interpolate scene background and fog
    scene.background = colorObj.set(skyColor).clone();
    scene.fog = new THREE.FogExp2(fogColor, isRaining ? 0.02 : 0.008);
    
    if (lightRef.current) {
        lightRef.current.color.set(lightColor);
    }
  });

  const isNight = timeOfDay > 19 || timeOfDay < 5;
  const isMobile = window.innerWidth < 768;

  return (
    <>
      <ambientLight intensity={isNight ? 0.2 : (isRaining ? 0.4 : 0.8)} />
      <directionalLight
        ref={lightRef}
        castShadow
        intensity={1.5}
        shadow-mapSize={isMobile ? [512, 512] : [1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={200}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.0001}
      />
      
      {/* Stars only visible at night */}
      {isNight && !isRaining && <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />}
      {!isNight && !isRaining && <Sky sunPosition={[Math.cos(((timeOfDay - 6) / 24) * Math.PI * 2) * 100, Math.sin(((timeOfDay - 6) / 24) * Math.PI * 2) * 100, Math.sin(((timeOfDay - 6) / 24) * Math.PI * 2) * 50]} turbidity={8} rayleigh={3} />}
    </>
  );
};

export default function Scene() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cameraLanded, setCameraLanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    console.log("Scene mounted. Performance mode:", isMobile ? "Mobile" : "Desktop");
  }, [isMobile]);

  // Reset menu state when navigating away from home, or if we are back at home
  useEffect(() => {
    if (location.pathname !== '/') {
      setMenuOpen(false);
    }
  }, [location]);

  // Memoize the landing handler to prevent re-triggering the fly-in effect
  const handleLanded = useCallback(() => {
    console.log("Camera landed!");
    setCameraLanded(true);
  }, []);

  // Fallback: Force landed state after 6 seconds if animation fails
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!cameraLanded) {
        console.log("Force landing camera (fallback)");
        setCameraLanded(true);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [cameraLanded]);

  const handleCharacterClick = useCallback(() => {
    if (cameraLanded) {
      setMenuOpen((prev) => !prev);
    }
  }, [cameraLanded]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 font-sans">
      {/* Weather UI Toggle */}
      {cameraLanded && location.pathname === '/' && (
        <div className="absolute top-6 right-6 z-40">
          <button 
            onClick={() => setIsRaining(!isRaining)}
            className="bg-black/40 text-white px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 text-xs font-bold hover:bg-white/20 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
          >
            {isRaining ? '☀️ Stop Rain' : '🌧️ Start Rain'}
          </button>
        </div>
      )}

      <Canvas 
        shadows="basic" // Keep basic shadows on mobile for better visuals
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Cap DPR on mobile to save pixels
        gl={{ antialias: true, powerPreference: "high-performance" }} // Antialias on for quality
        camera={{ position: [0, 50, 50], fov: 45 }}
      >
        {/* Dynamic Environment replaces static colors */}
        <EnvironmentManager isRaining={isRaining} />
        {isRaining && <Rain />}
        
        {/* Controls for easier interaction */}
        <OrbitControls 
          makeDefault // This is crucial for accessing controls via useThree state.controls
          enableZoom={cameraLanded} 
          enablePan={cameraLanded}
          maxPolarAngle={Math.PI / 2 - 0.05} 
          minPolarAngle={0}
          target={[7.5, 1.5, 0]} // Target the sidewalk character
        />

        {/* Core Scene Elements */}
        <group position={[0, -1, 0]}>
          <World isMobile={isMobile} />
          <CityLife paused={menuOpen} isMobile={isMobile} />
          
          {/* Character on Sidewalk (x=7.5) */}
          <group position={[7.5, 0, 0]}>
            <Character 
              onClick={handleCharacterClick} 
              isMenuOpen={menuOpen}
              onCloseMenu={() => setMenuOpen(false)}
            />
          </group>
        </group>

        <CameraFlyIn onLanded={handleLanded} />

        {/* Atmospheric Elements - Conditional Rendering */}
        <Suspense fallback={null}>
          <Cloud opacity={0.6} speed={0.2} bounds={[40, 10, 20]} segments={30} position={[0, 20, -30]} color="#ffccaa" />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay for Menu (Rendered OUTSIDE canvas for pure DOM interaction) */}
      {cameraLanded && location.pathname === '/' && menuOpen && (
        <RadialMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
      
      {!cameraLanded && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 text-sm animate-pulse font-mono tracking-widest pointer-events-none">
          INITIALIZING ENVIRONMENT...
        </div>
      )}
    </div>
  );
}
