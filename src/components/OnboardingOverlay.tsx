import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Move, HelpCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface OnboardingOverlayProps {
  onStart: () => void;
  showInitially: boolean;
}

export default function OnboardingOverlay({ onStart, showInitially }: OnboardingOverlayProps) {
  const [isVisible, setIsVisible] = useState(showInitially);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    setIsVisible(false);
    onStart();
  };

  useEffect(() => {
    if (!showInitially && isVisible) {
      // If we're toggling it back on after starting
      setHasStarted(true);
    }
  }, [isVisible, showInitially]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md font-sans"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="max-w-md w-full bg-gray-900/90 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Close Button (only if already started) */}
            {hasStarted && (
              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
                <HelpCircle className="text-blue-400" size={32} />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Welcome to the Experience
              </h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Take a moment to explore this cinematic space. 
                Interact with the world to discover more about my work.
              </p>

              <div className="grid grid-cols-1 gap-4 w-full mb-8">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Move className="text-purple-400" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-semibold">Rotate Camera</p>
                    <p className="text-gray-500 text-xs">Drag anywhere to look around</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <MousePointer2 className="text-emerald-400" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-semibold">Interact</p>
                    <p className="text-gray-500 text-xs">Click on the character to open the menu</p>
                  </div>
                </div>
              </div>

              {!hasStarted ? (
                <button
                  onClick={handleStart}
                  className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-blue-400 hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                >
                  START EXPERIENCE
                </button>
              ) : (
                <button
                  onClick={() => setIsVisible(false)}
                  className="w-full bg-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
                >
                  GOT IT
                </button>
              )}
            </div>

            {/* Decorative background pulse */}
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
      
      {/* Small Help Trigger button in the bottom corner when overlay is closed */}
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-6 right-6 z-[90] w-12 h-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all shadow-lg group"
          title="Help & Controls"
        >
          <HelpCircle size={24} />
          <span className="absolute right-14 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 uppercase tracking-widest font-mono">
            How to use
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
