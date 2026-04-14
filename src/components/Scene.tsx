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
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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

// --- ENVIRONMENT & ATMOSPHERE ENGINE ---

const EnvironmentManager = ({ 
  timeOfDay, 
  setTimeOfDay 
}: { 
  timeOfDay: number, 
  setTimeOfDay: (v: number | ((prev: number) => number)) => void 
}) => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const colorObj = useMemo(() => new THREE.Color(), []);
  const { scene } = useThree();

  useEffect(() => {
    // Stop the automatic cycle when the user has manual control via slider
    const timer = setInterval(() => {
      setTimeOfDay(prev => {
        const next = prev + 0.005; // Very slow natural drift
        if (next > 24) return 0; 
        return next;
      });
    }, 1000); 

    return () => clearInterval(timer);
  }, []);

  useFrame((state, delta) => {
    // Solar trajectory (Simplified 24h)
    const angle = ((timeOfDay - 6) / 24) * Math.PI * 2;
    const sunX = Math.cos(angle) * 150;
    const sunY = Math.sin(angle) * 150;
    const sunZ = Math.sin(angle * 0.5) * 50;

    if (lightRef.current) {
      lightRef.current.position.set(sunX, sunY, sunZ);
      const intensity = Math.max(0, Math.sin(angle)) * 1.5;
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
    scene.fog = new THREE.FogExp2(targetSky, 0.005); // Reduced density from 0.012
    
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
        shadow-mapSize={isMobile ? [512, 512] : [2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-camera-left={-150}
        shadow-camera-right={150}
        shadow-camera-top={150}
        shadow-camera-bottom={-150}
        shadow-bias={-0.001}
      />
      
      {/* Stars and Sky dynamics */}
      {isNight && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
      {!isNight && (
        <Sky 
          sunPosition={[Math.cos(((timeOfDay - 6) / 24) * Math.PI * 2) * 100, Math.sin(((timeOfDay - 6) / 24) * Math.PI * 2) * 100, 0]} 
          turbidity={6} 
          rayleigh={1.5}
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

  // Reset menu state when navigating away from home
  useEffect(() => {
    if (location.pathname !== '/') {
      setMenuOpen(false);
    }
  }, [location]);

  const [isTimeExpanded, setIsTimeExpanded] = useState(false);

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

  const formatTime = (t: number) => {
    const hours = Math.floor(t % 24);
    const minutes = Math.floor((t % 1) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

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
        <EnvironmentManager timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay} />
        
        <OrbitControls 
          makeDefault 
          target={[7.35, 1.5, 0]} 
        />

        <group position={[0, 0, 0]}>
          <World isMobile={isMobile} timeOfDay={timeOfDay} />
          <CityLife paused={menuOpen || !cameraLanded} isMobile={isMobile} />
          
          <group position={[0, 0, 0]}>
            <Character 
              onClick={handleCharacterClick} 
              isMenuOpen={menuOpen}
              onCloseMenu={() => setMenuOpen(false)}
              isWalking={cameraLanded && !menuOpen}
            />
          </group>
        </group>

        <CameraFlyIn onLanded={handleLanded} />
        <AudioManager />

        {/* Cinematic Post-Processing */}
        <EffectComposer disableNormalPass>
          <Bloom 
            intensity={0.4} 
            luminanceThreshold={0.9} 
            luminanceSmoothing={0.1} 
            mipmapBlur 
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.001, 0.001)} 
          />
          <Vignette eskil={false} offset={0.1} darkness={isMobile ? 0.4 : 0.7} />
          <Noise opacity={0.02} />
        </EffectComposer>

        <Suspense fallback={null}>
          <Cloud opacity={0.4} speed={0.2} bounds={[40, 10, 20]} segments={20} position={[0, 20, -30]} color="#fff" />
          <Environment preset="city" background={false} />
        </Suspense>
      </Canvas>
      
      {cameraLanded && location.pathname === '/' && menuOpen && (
        <RadialMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
      
      {!cameraLanded && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 text-sm animate-pulse font-mono tracking-widest pointer-events-none uppercase">
          Initializing Environment
        </div>
      )}

      {location.pathname === '/' && (
        <OnboardingOverlay 
          showInitially={showOnboarding} 
          onStart={() => setShowOnboarding(false)} 
        />
      )}

      {/* Day/Night System Controller (Collapsible & Responsive) */}
      {cameraLanded && location.pathname === '/' && (
        <div 
          className="absolute top-6 right-6 z-50 flex flex-col gap-2 origin-top-right"
        >
          <AnimatePresence mode="popLayout">
            {!isTimeExpanded ? (
               <motion.button
                 key="pill"
                 layoutId="time-system-container"
                 onClick={() => setIsTimeExpanded(true)}
                 className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-2xl overflow-hidden flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 transition-colors group"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               >
                 <motion.div layout className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                 <motion.span layout className="text-xs font-mono text-white/80 group-hover:text-white transition-colors">
                   {formatTime(timeOfDay)}
                 </motion.span>
                 <motion.span layout className="text-[10px] text-white/30 font-bold uppercase tracking-wider">System</motion.span>
               </motion.button>
            ) : (
              <motion.div 
                key="panel"
                layoutId="time-system-container"
                className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl overflow-hidden min-w-[240px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <motion.span layout className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Atmospheric Control</motion.span>
                  <button 
                    onClick={() => setIsTimeExpanded(false)}
                    className="p-1 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="mb-4">
                   <motion.div layout className="text-3xl font-mono text-blue-400 mb-2">{formatTime(timeOfDay)}</motion.div>
                   <input 
                    type="range" 
                    min="0" 
                    max="24" 
                    step="0.1" 
                    value={timeOfDay} 
                    onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                  />
                </div>
                <motion.div layout className="flex justify-between text-[8px] text-white/30 font-bold uppercase tracking-tighter">
                  <span>Dawn</span>
                  <span>Noon</span>
                  <span>Dusk</span>
                  <span>Night</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
