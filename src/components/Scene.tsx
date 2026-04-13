import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Environment, Stars, Cloud, Sky, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Character from './Character';
import CameraFlyIn from './CameraFlyIn';
import RadialMenu from './RadialMenu';
import World from './World';
import CityLife from './CityLife';
import OnboardingOverlay from './OnboardingOverlay';
import AudioManager from './AudioManager';
import { useLocation } from 'react-router-dom';
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

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

// --- WEATHER & ATMOSPHERE ENGINE ---
export type WeatherState = 'CLEAR' | 'CLOUDY' | 'OVERCAST' | 'RAIN' | 'STORM' | 'MISTY';

const WEATHER_CONFIG: Record<WeatherState, any> = {
  CLEAR: { sky: '#38bdf8', fog: '#e0f2fe', light: '#ffffff', intensity: 1.5, fogDensity: 0.008 },
  CLOUDY: { sky: '#94a3b8', fog: '#cbd5e1', light: '#f1f5f9', intensity: 1.0, fogDensity: 0.012 },
  OVERCAST: { sky: '#64748b', fog: '#94a3b8', light: '#94a3b8', intensity: 0.6, fogDensity: 0.015 },
  RAIN: { sky: '#475569', fog: '#64748b', light: '#94a3b8', intensity: 0.4, fogDensity: 0.025 },
  STORM: { sky: '#1e293b', fog: '#334155', light: '#64748b', intensity: 0.3, fogDensity: 0.035 },
  MISTY: { sky: '#cbd5e1', fog: '#e2e8f0', light: '#f1f5f9', intensity: 0.8, fogDensity: 0.045 },
};

const EnvironmentManager = ({ 
  weather, 
  timeSpeed = 0.005, 
  timeOfDay, 
  setTimeOfDay 
}: { 
  weather: WeatherState, 
  timeSpeed?: number, 
  timeOfDay: number, 
  setTimeOfDay: (v: number | ((prev: number) => number)) => void 
}) => {
  const [cloudDimmness, setCloudDimmness] = useState(1);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const colorObj = useMemo(() => new THREE.Color(), []);
  const { scene } = useThree();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOfDay(prev => {
        const next = prev + 0.01; // Cycle speed
        if (next > 24) return 0; 
        return next;
      });
    }, 500); 

    // Cloud Pass (Simulate cloud covering sun)
    const cloudTimer = setInterval(() => {
      setCloudDimmness(0.5);
      setTimeout(() => setCloudDimmness(1), 8000);
    }, 45000);

    return () => {
      clearInterval(timer);
      clearInterval(cloudTimer);
    };
  }, []);

  useFrame((state, delta) => {
    // Solar trajectory (Simplified 24h)
    const angle = ((timeOfDay - 6) / 24) * Math.PI * 2;
    const sunX = Math.cos(angle) * 150;
    const sunY = Math.sin(angle) * 150;
    const sunZ = Math.sin(angle * 0.5) * 50;

    if (lightRef.current) {
      lightRef.current.position.set(sunX, sunY, sunZ);
      const intensity = Math.max(0, Math.sin(angle)) * 1.5 * cloudDimmness;
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, intensity, 0.05);
    }

    // Dynamic 24h Atmosphere Mapping
    let targetSky, targetLight;
    if (timeOfDay >= 5 && timeOfDay < 7.5) { // Early Morning Golden Hour
        targetSky = '#fde68a'; targetLight = '#fbbf24'; // Warm gold
    } else if (timeOfDay >= 7.5 && timeOfDay < 17) { // Day
        targetSky = '#38bdf8'; targetLight = '#ffffff';
    } else if (timeOfDay >= 17 && timeOfDay < 19) { // Sunset
        targetSky = '#f43f5e'; targetLight = '#fb923c';
    } else if (timeOfDay >= 19 && timeOfDay < 21) { // Dusk
        targetSky = '#1e3a8a'; targetLight = '#475569';
    } else { // Night
        targetSky = '#020617'; targetLight = '#1e293b';
    }

    scene.background = colorObj.set(targetSky).clone();
    scene.fog = new THREE.FogExp2(targetSky, 0.012);
    
    if (lightRef.current) lightRef.current.color.lerp(colorObj.set(targetLight), 0.05);
  });

  const isNight = timeOfDay > 19 || timeOfDay < 5;
  const isMobile = window.innerWidth < 768;

  return (
    <>
      <ambientLight intensity={isNight ? 0.08 : 0.25} />
      <directionalLight
        ref={lightRef}
        castShadow
        shadow-mapSize={isMobile ? [512, 512] : [1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-camera-left={-150}
        shadow-camera-right={150}
        shadow-camera-top={150}
        shadow-camera-bottom={-150}
        shadow-bias={-0.0005}
      />
      
      {/* Stars and Sky dynamics */}
      {isNight && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
      {!isNight && (
        <Sky 
          sunPosition={[Math.cos(((timeOfDay - 6) / 24) * Math.PI * 2) * 100, Math.sin(((timeOfDay - 6) / 24) * Math.PI * 2) * 100, 0]} 
          turbidity={weather === 'MISTY' ? 20 : 6} 
          rayleigh={weather === 'CLEAR' ? 1.5 : 0.8}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />
      )}
    </>
  );
};

export default function Scene() {
  const [timeOfDay, setTimeOfDay] = useState(6.75); // 6:45 AM — early morning golden hour
  const [menuOpen, setMenuOpen] = useState(false);
  const [cameraLanded, setCameraLanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [weather, setWeather] = useState<WeatherState>('CLEAR');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const weatherCycle: WeatherState[] = ['CLEAR', 'CLOUDY', 'MISTY', 'RAIN', 'STORM'];
  const nextWeather = () => {
    const currentIndex = weatherCycle.indexOf(weather);
    setWeather(weatherCycle[(currentIndex + 1) % weatherCycle.length]);
  };

  useEffect(() => {
    console.log("Scene mounted. Weather:", weather);
  }, [weather]);

  // Reset menu state when navigating away from home
  useEffect(() => {
    if (location.pathname !== '/') {
      setMenuOpen(false);
    }
  }, [location]);

  const handleLanded = useCallback(() => {
    console.log("Camera landed!");
    setCameraLanded(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!cameraLanded) setCameraLanded(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, [cameraLanded]);

  const handleCharacterClick = useCallback(() => {
    if (cameraLanded) setMenuOpen((prev) => !prev);
  }, [cameraLanded]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 font-sans">
      <Canvas 
        shadows="soft" 
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
        camera={{ position: [0, 50, 50], fov: 45 }}
        performance={{ min: 0.5 }}
      >
        <fog attach="fog" args={['#2563eb', 60, 250]} /> {/* Cool blue morning fog */}
        <EnvironmentManager weather={weather} timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay} />
        {(weather === 'RAIN' || weather === 'STORM') && <Rain />}
        
        <OrbitControls 
          makeDefault 
          target={[0, 1.5, 0]} 
        />

        <group position={[0, -1, 0]}>
          <World isMobile={isMobile} weather={weather} timeOfDay={timeOfDay} />
          <CityLife paused={menuOpen} isMobile={isMobile} weather={weather} />
          
          <group position={[0, 0, 0]}>
            <Character 
              onClick={handleCharacterClick} 
              isMenuOpen={menuOpen}
              onCloseMenu={() => setMenuOpen(false)}
            />
          </group>
        </group>

        <CameraFlyIn onLanded={handleLanded} />
        <AudioManager weather={weather} />

        {/* Cinematic Post-Processing */}
        <EffectComposer>
          <Bloom 
            intensity={weather === 'CLEAR' ? 0.25 : 0.15} 
            luminanceThreshold={0.95} 
            luminanceSmoothing={0.05} 
            mipmapBlur 
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <Noise opacity={0.03} />
          {weather === 'STORM' && <ChromaticAberration offset={new THREE.Vector2(0.004, 0.004)} />}
        </EffectComposer>

        <Suspense fallback={null}>
          <Cloud opacity={0.4} speed={0.2} bounds={[40, 10, 20]} segments={20} position={[0, 20, -30]} color={weather === 'CLEAR' ? "#fff" : "#64748b"} />
          <Environment preset="city" background={false} />
        </Suspense>
      </Canvas>
      
      {cameraLanded && location.pathname === '/' && menuOpen && (
        <RadialMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
      
      {!cameraLanded && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 text-sm animate-pulse font-mono tracking-widest pointer-events-none uppercase">
          Initializing Environment — {weather}
        </div>
      )}

      {location.pathname === '/' && (
        <OnboardingOverlay 
          showInitially={showOnboarding} 
          onStart={() => setShowOnboarding(false)} 
        />
      )}

      {/* Advanced Weather Controller */}
      {cameraLanded && location.pathname === '/' && (
        <div className="absolute top-6 right-6 z-50 flex flex-col gap-2 scale-90 md:scale-100 origin-top-right">
          <button 
            onClick={nextWeather}
            className="bg-black/40 text-white px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 text-xs font-bold hover:bg-white/20 hover:scale-105 transition-all shadow-lg flex items-center gap-2 group"
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">Weather:</span>
            <span className="text-yellow-400">{weather}</span>
          </button>
        </div>
      )}
    </div>
  );
}
