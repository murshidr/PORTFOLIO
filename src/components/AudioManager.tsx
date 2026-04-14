import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const AUDIO_FILES = {
  ocean: 'https://assets.mixkit.co/active_storage/sfx/2513/2513-preview.mp3', // Representative URLs - should ideally be local
  rain: 'https://assets.mixkit.co/active_storage/sfx/2514/2514-preview.mp3',
  birds: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
  templeBell: 'https://assets.mixkit.co/active_storage/sfx/2516/2516-preview.mp3'
};

export default function AudioManager() {
  const { camera } = useThree();
  const listener = useRef(new THREE.AudioListener());
  const ambientSound = useRef<THREE.Audio | null>(null);

  useEffect(() => {
    camera.add(listener.current);
    const audioLoader = new THREE.AudioLoader();

    // Manhattan Traffic Base
    const traffic = new THREE.Audio(listener.current);
    audioLoader.load('https://www.soundjay.com/ambient/sounds/city-street-1.mp3', (buffer) => {
      traffic.setBuffer(buffer);
      traffic.setLoop(true);
      traffic.setVolume(0.15);
      traffic.play();
    });

    // Distant Siren / Emergency Environment
    const siren = new THREE.Audio(listener.current);
    audioLoader.load('https://www.soundjay.com/transportation/sounds/emergency-siren-1.mp3', (buffer) => {
      siren.setBuffer(buffer);
      siren.setLoop(true);
      siren.setVolume(0.02); // Very distant
      siren.play();
    });

    return () => {
      camera.remove(listener.current);
      traffic.stop();
      siren.stop();
    };
  }, [camera]);

  return null;
}
