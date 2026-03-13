import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 500); // Wait a bit before unmounting
          return 100;
        }
        return prev + 2; // Simulate loading
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6"
      >
        <img src="/logo.svg" className="w-16 h-16" alt="Logo" />
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-widest mb-8 font-mono text-blue-400"
      >
        MURSHID R
      </motion.h1>
      
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-xs text-gray-500 font-mono">
        INITIALIZING ENVIRONMENT... {progress}%
      </p>
    </motion.div>
  );
}
