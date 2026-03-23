import PageLayout from '../components/PageLayout';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, Brain, Code2, Rocket, Bug, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, ReactNode } from 'react';

export default function VyntaDevlog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <PageLayout title="Vynta Devlog">
      {/* Sticky Progress Bar (Desktop) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 h-64 w-px bg-white/10 hidden lg:block z-50">
        <motion.div 
          className="w-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        />
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-500 vertical-text uppercase tracking-widest">
          Progress
        </div>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto px-4 md:px-8 relative">
        {/* Back Link */}
        <Link 
          to="/devlogs" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Devlogs
        </Link>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-32 text-center lg:text-left relative"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent tracking-tighter">
            Vynta Devlog: <br /> The Story of AI Scheduling
          </h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <span className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 text-gray-300 text-sm font-medium">
              <Calendar size={16} className="text-blue-400" /> March 2026
            </span>
            <span className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 text-gray-300 text-sm font-medium">
              <Brain size={16} className="text-purple-400" /> Murshid R
            </span>
          </div>
        </motion.div>

        {/* Story Content with Glass Containers */}
        <div className="space-y-40 mb-40">
          
          {/* Section: The Problem */}
          <GlassSection>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge text="The Beginning" color="bg-blue-500/20 text-blue-400" />
                <h2 className="text-4xl font-bold text-white mt-4 mb-6 leading-tight">Zero plans and a <br /> cluttered mind.</h2>
                <div className="space-y-4 text-gray-400 text-lg leading-relaxed font-light">
                  <p>Holiday started, and tasks started piling up. Todoist, TickTick, Google Tasks — none felt right. By the time I picked a date and priority, I could've just done the task.</p>
                  <p className="border-l-2 border-blue-500/40 pl-6 italic text-blue-300/80">"Why can't I just tell it what I need to do and have it figure out the rest?"</p>
                </div>
              </div>
              <div className="relative group">
                <ParallaxImage src="/projects/vynta/home.png" alt="Vynta Home" />
              </div>
            </div>
          </GlassSection>

          {/* Section: Week 1 */}
          <GlassSection delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="lg:order-2">
                <Badge text="Week 1" color="bg-purple-500/20 text-purple-400" />
                <h2 className="text-4xl font-bold text-white mt-4 mb-6 leading-tight">Engineering the <br /> AI Engine</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  The heart of Vynta is the AI input pipeline. It's not just a wrapper; it's a smart agent that parses fuzzy dates and energy levels into structured data.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {["Llama 3 (Groq)", "Kotlin Coroutines", "Retrofit", "JSON Parsing"].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                      <CheckCircle2 size={16} className="text-blue-500" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:order-1">
                <ParallaxImage src="/projects/vynta/input.png" alt="AI Input" offset={20} />
              </div>
            </div>
          </GlassSection>

          {/* Section: Week 2 */}
          <GlassSection>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge text="Week 2" color="bg-emerald-500/20 text-emerald-400" />
                <h2 className="text-4xl font-bold text-white mt-4 mb-6">Jetpack Compose <br /> Magic</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  Everything is built with Material 3 and Jetpack Compose. I designed a custom Pill-Dock navigation for the best one-handed speed when inputting tasks.
                </p>
                <div className="space-y-4">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 group-hover:border-blue-500/20 transition-colors">
                    <h4 className="text-white font-bold mb-1">Productivity Score</h4>
                    <p className="text-sm text-gray-500">A dynamic score in the History screen that gamifies task completion.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <ParallaxImage src="/projects/vynta/history.png" alt="History Screen" />
              </div>
            </div>
          </GlassSection>

          {/* Section: Reflections */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Lessons Learned</h3>
              <ul className="space-y-6">
                {[
                  { t: "Start UI Earlier", d: "Spending too long on the backend delayed critical layout testing." },
                  { t: "Fuzzy Logic", d: "Prompt engineering is 80% of the UX in AI products." },
                  { t: "Sync is Hard", d: "Google Calendar token refresh is a masterclass in state management." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div>
                      <h5 className="text-white font-bold">{item.t}</h5>
                      <p className="text-sm text-gray-400">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center text-center text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <Rocket size={48} className="mb-6 animate-bounce" />
              <h3 className="text-3xl font-black mb-4">Want to try Vynta?</h3>
              <p className="text-blue-100 mb-10 max-w-xs text-lg">
                The beta is currently open. Check out the repository for the latest build.
              </p>
              <a 
                href="https://github.com/quantumstack-labs/Vynta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-xl"
              >
                GitHub Repository
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}

function GlassSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.section 
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      className="relative p-8 md:p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4rem] shadow-2xl hover:bg-white/[0.07] transition-colors group"
    >
      {children}
    </motion.section>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${color}`}>
      {text}
    </span>
  );
}

function ParallaxImage({ src, alt, offset = 40 }: { src: string; alt: string, offset?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className="relative rounded-2xl overflow-hidden shadow-2xl perspective-1000">
      <motion.img 
        style={{ y }}
        src={src} 
        alt={alt} 
        className="w-full h-auto scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
}
