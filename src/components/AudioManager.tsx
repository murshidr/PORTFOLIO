import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const AUDIO_FILES = {
  ocean: 'https://assets.mixkit.co/active_storage/sfx/2513/2513-preview.mp3', // Representative URLs - should ideally be local
  rain: 'https://assets.mixkit.co/active_storage/sfx/2514/2514-preview.mp3',
  birds: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
  templeBell: 'https://assets.mixkit.co/active_storage/sfx/2516/2516-preview.mp3'
};

export default function AudioManager({ weather }: { weather: string }) {
  const { camera } = useThree();
  const listener = useRef(new THREE.AudioListener());
  const ambientSound = useRef<THREE.Audio | null>(null);
  const rainSound = useRef<THREE.Audio | null>(null);

  useEffect(() => {
    camera.add(listener.current);
    const audioLoader = new THREE.AudioLoader();

    // Ocean Base
    const ocean = new THREE.Audio(listener.current);
    audioLoader.load(AUDIO_FILES.ocean, (buffer) => {
      ocean.setBuffer(buffer);
      ocean.setLoop(true);
      ocean.setVolume(0.4);
      ocean.play();
    });
    ambientSound.current = ocean;

    // Background Atmosphere (Crows/Life)
    const atmosphere = new THREE.Audio(listener.current);
    audioLoader.load('https://assets.mixkit.co/active_storage/sfx/2517/2517-preview.mp3', (buffer) => {
      atmosphere.setBuffer(buffer);
      atmosphere.setLoop(true);
      atmosphere.setVolume(0.1);
      atmosphere.play();
    });

    // Rain Layer
    const rain = new THREE.Audio(listener.current);
    audioLoader.load(AUDIO_FILES.rain, (buffer) => {
      rain.setBuffer(buffer);
      rain.setLoop(true);
      rain.setVolume(0);
      rain.play();
    });
    rainSound.current = rain;

    return () => {
      camera.remove(listener.current);
      ocean.stop();
      rain.stop();
    };
  }, [camera]);

  useEffect(() => {
    if (rainSound.current) {
      const isRaining = weather === 'RAIN' || weather === 'STORM';
      rainSound.current.setVolume(isRaining ? 0.6 : 0);
    }
    if (ambientSound.current) {
      ambientSound.current.setVolume(weather === 'STORM' ? 0.2 : 0.4);
    }
  }, [weather]);

  return null;
}
