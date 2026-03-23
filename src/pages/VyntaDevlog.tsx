import PageLayout from '../components/PageLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Brain, Rocket, Bug, Terminal, ChevronRight, Settings, Type, Sun, Moon, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type Theme = 'dark' | 'sepia' | 'black';
type FontSize = 'base' | 'lg' | 'xl';
type FontStyle = 'sans' | 'mono' | 'serif';

export default function VyntaDevlog() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [fontSize, setFontSize] = useState<FontSize>('lg');
  const [fontStyle, setFontStyle] = useState<FontStyle>('sans');
  const [showSettings, setShowSettings] = useState(false);

  const getThemeClasses = () => {
    switch (theme) {
      case 'sepia': return 'bg-[#f4ecd8] text-[#5b4636]';
      case 'black': return 'bg-black text-gray-300';
      default: return 'bg-transparent text-gray-300';
    }
  };

  const getFontClasses = () => {
    switch (fontStyle) {
      case 'mono': return 'font-mono tracking-tight';
      case 'serif': return 'font-serif tracking-normal';
      default: return 'font-sans tracking-tight';
    }
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'base': return 'text-base sm:text-lg';
      case 'xl': return 'text-xl sm:text-2xl lg:text-3xl';
      default: return 'text-lg sm:text-xl lg:text-2xl';
    }
  };

  return (
    <PageLayout title="Vynta Devlog">
      {/* Reader Settings Floating Button */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSettings(!showSettings)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-500 transition-colors"
        >
          <Settings size={24} className={showSettings ? 'rotate-90' : ''} />
        </motion.button>

        <AnimatePresence>
          {showSettings && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-64 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-3xl text-white"
            >
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400 font-black mb-4">Reading Settings</h4>
              
              {/* Font Size Row */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2">Text Size</span>
                <div className="flex bg-black/20 rounded-xl p-1 gap-1">
                  {(['base', 'lg', 'xl'] as FontSize[]).map(size => (
                    <button 
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${fontSize === size ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
                    >
                      {size === 'base' ? 'S' : size === 'lg' ? 'M' : 'L'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Row */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2">Theme</span>
                <div className="flex bg-black/20 rounded-xl p-1 gap-1">
                  {(['dark', 'sepia', 'black'] as Theme[]).map(t => (
                    <button 
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${theme === t ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Style Row */}
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2">Typeface</span>
                <div className="flex bg-black/20 rounded-xl p-1 gap-1">
                  {(['sans', 'mono', 'serif'] as FontStyle[]).map(f => (
                    <button 
                      key={f}
                      onClick={() => setFontStyle(f)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${fontStyle === f ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`transition-colors duration-500 min-h-screen ${getThemeClasses()}`}>
        <article className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 transition-all duration-300 ${getFontClasses()}`}>
          {/* Back Navigation */}
          <Link 
            to="/devlogs" 
            className={`inline-flex items-center gap-2 transition-colors mb-16 group text-sm font-medium ${theme === 'sepia' ? 'text-brown-800' : 'text-blue-400/80 hover:text-blue-400'}`}
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>

          {/* Hero Header */}
          <header className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 text-blue-500 font-mono text-xs mb-6 tracking-[0.2em] uppercase">
                <span className="w-8 h-[1px] bg-blue-500/50" />
                Development Journal
              </div>
              <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1] ${theme === 'sepia' ? 'text-[#3d2f24]' : 'text-white'}`}>
                Building an AI Task Scheduler <br className="hidden sm:block" /> 
                <span className={`text-transparent bg-clip-text ${theme === 'sepia' ? 'bg-gradient-to-r from-amber-800 to-amber-950' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}>
                  in my semester holiday.
                </span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 text-gray-500 font-medium text-sm border-t border-black/5 pt-8">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-blue-500" />
                  March 2026
                </div>
                <div className="flex items-center gap-2">
                  <Brain size={14} className="text-purple-500" />
                  Murshid R
                </div>
              </div>
            </motion.div>
          </header>

          {/* Body Content */}
          <div className={`space-y-32 transition-all duration-300 ${getFontSizeClasses()}`}>
            
            {/* Intro Section */}
            <section className="max-w-3xl mx-auto leading-relaxed">
              <p className={`font-light first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-500 ${theme === 'sepia' ? 'text-[#5b4636]' : 'text-gray-300'}`}>
                My semester holiday started and I had zero plans. Tasks piling up in my head, stuff I kept forgetting, notes scattered across apps. I needed something smarter, something that actually understood *how* I worked. By the time I set up a task in most apps, I could've just done it.
              </p>
              <p className="mt-6 opacity-80">
                That's when I decided to build Vynta.
              </p>
            </section>

            {/* Section 01: The Vision */}
            <section className="relative">
              <div className="max-w-3xl mx-auto mb-16">
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-4 ${theme === 'sepia' ? 'text-[#3d2f24]' : 'text-white'}`}>
                  <span className="text-blue-500 text-sm font-mono tracking-widest uppercase">Chapter 01</span>
                  The Vision for Instant Scheduling
                </h2>
                <p className="opacity-80 leading-relaxed">
                  The idea was simple. An Android app where you describe your task in plain English and AI handles the scheduling. Just type "submit the ML assignment by Thursday" and it figures out the rest.
                </p>
              </div>
              {/* Centered Constrained Image */}
              <div className="max-w-xl mx-auto rounded-3xl overflow-hidden border border-black/5 bg-black/5 p-2 mb-10 shadow-2xl">
                <img 
                  src="/projects/vynta/home.png" 
                  alt="Vynta Home Screen" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </section>

            {/* Section 02: The Engine */}
            <section className="max-w-3xl mx-auto">
              <h2 className={`text-3xl font-bold mb-8 flex items-center gap-4 ${theme === 'sepia' ? 'text-[#3d2f24]' : 'text-white'}`}>
                <span className="text-purple-500 text-sm font-mono tracking-widest uppercase">Chapter 02</span>
                Engineering the Pipeline
              </h2>
              <p className="opacity-80 leading-relaxed mb-12">
                The AI input pipeline was the heart of the app. User types a task description → Retrofit sends it to Groq → Llama 3 parses the natural language and returns structured JSON with task name, date, time, and priority.
              </p>
              
              {/* Editorial Image: Input */}
              <div className="max-w-lg mx-auto rounded-3xl overflow-hidden border border-black/5 bg-black/5 p-2 shadow-2xl mb-12">
                <img src="/projects/vynta/input.png" alt="AI Input Flow" className="w-full h-auto rounded-2xl" />
                <div className="p-4 text-center text-[10px] text-gray-500 font-mono uppercase tracking-widest">Natural Language Processing Pipeline</div>
              </div>
            </section>

            {/* Section 03: The Experience */}
            <section className="max-w-3xl mx-auto">
              <h2 className={`text-3xl font-bold mb-8 flex items-center gap-4 ${theme === 'sepia' ? 'text-[#3d2f24]' : 'text-white'}`}>
                <span className="text-emerald-500 text-sm font-mono tracking-widest uppercase">Chapter 03</span>
                Crafting the Flow
              </h2>
              <p className="opacity-80 leading-relaxed mb-12">
                Everything is built with Material 3 and Jetpack Compose. I designed a custom Pill-Dock navigation for the best one-handed speed. The History screen features a productivity score that gamifies task completion.
              </p>
              
              {/* Editorial Image: History */}
              <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-black/5 bg-black/5 p-2 shadow-2xl mb-12">
                <img src="/projects/vynta/history.png" alt="History and Productivity" className="w-full h-auto rounded-2xl" />
              </div>
            </section>

            {/* Section 04: Stability */}
            <section className="max-w-3xl mx-auto">
              <h2 className={`text-3xl font-bold mb-8 flex items-center gap-4 ${theme === 'sepia' ? 'text-[#3d2f24]' : 'text-white'}`}>
                <span className="text-red-500 text-sm font-mono tracking-widest uppercase">Chapter 04</span>
                Design Systems & Stability
              </h2>
              
              {/* Editorial Image: Settings/System */}
              <div className="max-w-md mx-auto rounded-3xl overflow-hidden border border-black/5 bg-black/5 p-2 shadow-2xl mb-12">
                <img src="/projects/vynta/settings.png" alt="Settings and Configuration" className="w-full h-auto rounded-2xl" />
              </div>

              <div className={`p-8 rounded-2xl mb-10 border-l-4 border-blue-500 ${theme === 'sepia' ? 'bg-[#ebe3cf]' : 'bg-white/5'}`}>
                <div className="flex items-center gap-3 text-blue-500 text-xs font-mono uppercase mb-4 tracking-widest">
                  <Terminal size={14} /> Critical Lessons
                </div>
                <ul className="space-y-4 text-sm font-medium list-none">
                  <li className="flex items-start gap-4">
                     <Bug className="text-red-500 mt-1 shrink-0" size={14} /> 
                     <div>
                       <span className={`block font-bold mb-0.5 ${theme === 'sepia' ? 'text-[#3d2f24]' : 'text-white'}`}>Prompt Engineering is 80%</span>
                       It's the most critical UX component in AI products.
                     </div>
                  </li>
                  <li className="flex items-start gap-4">
                     <Rocket className="text-blue-500 mt-1 shrink-0" size={14} /> 
                     <div>
                       <span className={`block font-bold mb-0.5 ${theme === 'sepia' ? 'text-[#3d2f24]' : 'text-white'}`}>One-Handed Navigation</span>
                       Mobile apps should prioritize reachability for core actions.
                     </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Conclusion */}
            <section className="max-w-3xl mx-auto pt-20 border-t border-black/5 text-center px-4">
              <h2 className={`text-3xl font-bold mb-6 tracking-tighter ${theme === 'sepia' ? 'text-[#3d2f24]' : 'text-white'}`}>Want to help me test it?</h2>
              <p className="opacity-80 leading-relaxed mb-12">
                Vynta is still a project in progress. Since it's built during my holidays, there are definitely bugs to squash. If you're interested in productivity tools, I'd love for you to try the beta and give me some feedback.
              </p>
              
              <a 
                href="https://github.com/quantumstack-labs/Vynta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all transform hover:-translate-y-1 shadow-2xl shadow-blue-600/20"
              >
                Join the Beta Testing <ChevronRight size={20} />
              </a>
            </section>

          </div>
        </article>
      </div>
    </PageLayout>
  );
}
