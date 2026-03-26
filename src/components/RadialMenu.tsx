import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Award, Star, Github, FileText, Mail, ArrowRight, UserCircle2 } from 'lucide-react';

interface InteractionMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItemsLeft = [
  { label: 'View Profile', icon: User, path: '/about', color: 'text-blue-600' },
  { label: 'Check Experience', icon: Briefcase, path: '/projects', color: 'text-purple-600' },
  { label: 'See Skills', icon: Star, path: '/achievements', color: 'text-blue-400' },
];

const menuItemsRight = [
  { label: 'Devlogs', icon: FileText, path: '/devlogs', color: 'text-emerald-500' },
  { label: 'View Awards', icon: Award, path: '/awards', color: 'text-orange-500' },
  { label: 'GitHub Activity', icon: Github, path: '/github', color: 'text-gray-700', isLive: true },
  { label: 'Contact Me Directly', icon: Mail, path: '/contact', color: 'text-red-500' },
];

export default function RadialMenu({ isOpen, onClose }: InteractionMenuProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none font-sans" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          
          {/* Subtle backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full bg-black/10 backdrop-blur-[2px] pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />

          <motion.div 
            className="relative flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Center Spine Element (Character Info) */}
            <div className="absolute flex flex-col items-center -top-32 pointer-events-none">
              <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center mb-2 shadow-lg bg-black/20 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
              <div className="mt-2 text-center text-white drop-shadow-md">
                <p className="text-xs text-white/80 font-medium">Student</p>
                <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
                  <img src="/logo.svg" className="w-5 h-5" alt="Logo" />
                  Murshid R
                  <span className="bg-white text-black p-0.5 rounded text-[10px]">
                    <UserCircle2 size={12} />
                  </span>
                </h2>
              </div>
            </div>

            {/* Left Branching Items */}
            <div className="absolute right-[40px] md:right-[80px] flex flex-col gap-3 md:gap-4 items-end pointer-events-auto z-10">
              {menuItemsLeft.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="flex items-center gap-3 group relative cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.path);
                    onClose();
                  }}
                >
                  <div className="bg-white/95 backdrop-blur-md text-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-1.5 md:gap-2 hover:bg-white hover:scale-105 transition-all border border-black/5 whitespace-nowrap overflow-hidden relative group/btn">
                    <item.icon size={14} className={`md:w-4 md:h-4 ${item.color}`} />
                    <span className="font-semibold text-[11px] md:text-[13px]">{item.label}</span>
                    {(item as any).isLive && (
                      <span className="flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded-full bg-green-500/10 text-[8px] font-black text-green-600 uppercase tracking-tighter border border-green-500/20">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                  {/* Branch Line */}
                  <div className="w-6 md:w-12 h-px bg-blue-300/60 shadow-[0_0_5px_rgba(59,130,246,0.5)] group-hover:bg-blue-400/80 transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* Center Vertical Divider Line */}
            <div className="h-48 w-px bg-blue-300/40 shadow-[0_0_8px_rgba(59,130,246,0.4)] rounded-full relative pointer-events-none" />

            {/* Right Branching Items */}
            <div className="absolute left-[40px] md:left-[80px] flex flex-col gap-3 md:gap-4 items-start pointer-events-auto z-10">

              {menuItemsRight.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.15 }}
                  className="flex items-center gap-3 group relative cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.path);
                    onClose();
                  }}
                >
                  {/* Branch Line */}
                  <div className="w-6 md:w-12 h-px bg-blue-300/60 shadow-[0_0_5px_rgba(59,130,246,0.5)] group-hover:bg-blue-400/80 transition-colors" />
                  <div className="bg-white/95 backdrop-blur-md text-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-1.5 md:gap-2 hover:bg-white hover:scale-105 transition-all border border-black/5 whitespace-nowrap">
                    <item.icon size={14} className={`md:w-4 md:h-4 ${item.color}`} />
                    <span className="font-semibold text-[11px] md:text-[13px]">{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
