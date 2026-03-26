import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/stats/visitor-count');
        const data = await res.json();
        if (data.success) {
          setCount(data.count);
          // Show after a small delay for dramatic effect
          setTimeout(() => setIsVisible(true), 2000);
        }
      } catch (err) {
        console.error('Failed to fetch visitor count', err);
      }
    };

    fetchCount();
  }, []);

  if (count === null) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-[100] pointer-events-none"
        >
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-2xl">
            <div className="relative">
              <Users size={14} className="text-blue-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse border border-black" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">
              <span className="text-white">{count.toLocaleString()}</span> People have visited
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
