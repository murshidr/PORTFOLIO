import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Move, HelpCircle, X } from 'lucide-react';
import { useState } from 'react';

interface OnboardingOverlayProps {
  onStart: () => void; // Keeps original signature for compatibility
  showInitially: boolean;
}

export default function OnboardingOverlay({ showInitially }: OnboardingOverlayProps) {
  const [isVisible, setIsVisible] = useState(showInitially);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed top-6 left-6 z-[100] flex flex-col gap-2 font-sans max-w-[280px]"
        >
          {/* Subtle Instruction Bar */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden group">
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 p-1 text-white/30 hover:text-white transition-colors"
              title="Dismiss"
            >
              <X size={14} />
            </button>

            <div className="flex items-center gap-3 mb-3">
               <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <HelpCircle className="text-blue-400" size={16} />
              </div>
              <h3 className="text-xs font-bold text-white/90 uppercase tracking-widest">
                Navigation Guide
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Move className="text-white/60" size={12} />
                </div>
                <p className="text-[10px] text-gray-400 font-medium leading-tight">
                  <span className="text-white">Drag</span> to explore environment
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <MousePointer2 className="text-white/60" size={12} />
                </div>
                <p className="text-[10px] text-gray-400 font-medium leading-tight">
                  <span className="text-white">Click</span> character to interact
                </p>
              </div>
            </div>

            {/* Subtle progress/accent line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          </div>

          {/* Mobile optimization: Move hint slightly or simplify? 
              This layout works well on mobile top-left. */}
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-6 right-6 z-[90] w-10 h-10 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all shadow-lg group"
          title="Show Controls"
        >
          <HelpCircle size={20} />
          <span className="absolute right-12 bg-black/80 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 uppercase tracking-widest font-mono">
            How to use
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
