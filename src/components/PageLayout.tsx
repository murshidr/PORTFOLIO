import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import VisitorCounter from './VisitorCounter';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-40 overflow-y-auto bg-black/90 backdrop-blur-xl text-white"
    >
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-12 lg:p-16">
        <header className="flex items-center justify-between mb-16 md:mb-24">
          <Link 
            to="/" 
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
          >
            <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="text-sm font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              Return to Portfolio
            </span>
          </Link>

          <Link to="/" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 transition-all">
            <X size={20} />
          </Link>
        </header>
        
        <main>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-16 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/30"
          >
            {title}
          </motion.h1>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {children}
          </motion.div>
        </main>

        <VisitorCounter />
      </div>
    </motion.div>
  );
}
