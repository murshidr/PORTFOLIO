import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Brain, Rocket, Bug, Terminal, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VyntaDevlog() {
  return (
    <PageLayout title="Vynta Devlog">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Back Navigation */}
        <Link 
          to="/devlogs" 
          className="inline-flex items-center gap-2 text-blue-400/80 hover:text-blue-400 transition-colors mb-16 group text-sm font-medium"
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
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              Building an AI Task Scheduler <br className="hidden sm:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                in my semester holiday.
              </span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 text-gray-500 font-medium text-sm border-t border-white/5 pt-8">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-blue-500" />
                March 2026
              </div>
              <div className="flex items-center gap-2">
                <Brain size={14} className="text-purple-500" />
                Murshid R
              </div>
              <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                8 min read
              </div>
            </div>
          </motion.div>
        </header>

        {/* Body Content */}
        <div className="space-y-20 prose prose-invert prose-blue max-w-none">
          
          {/* Intro Section */}
          <section className="max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-500">
              My semester holiday started and I had zero plans. Tasks piling up in my head, stuff I kept forgetting, notes scattered across apps. I needed something smarter, something that actually understood *how* I worked. By the time I set up a task in most apps, I could've just done it.
            </p>
            <p className="text-gray-400 mt-6 text-lg">
              That's when I decided to build Vynta.
            </p>
          </section>

          {/* The Vision - Breaking Margin on Desktop */}
          <section className="relative">
            <div className="max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="text-blue-500 text-sm font-mono tracking-widest">01</span>
                The Vision
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                The idea was simple. An Android app where you describe your task in plain English and AI handles the scheduling. No date pickers. No dropdowns. Just type "submit the ML assignment by Thursday" and it figures out the rest.
              </p>
            </div>
            {/* Editorial Image */}
            <div className="lg:-mx-24 rounded-3xl overflow-hidden border border-white/10 shadow-3xl group mb-20 bg-white/5 p-2 transition-all hover:border-blue-500/20">
              <img 
                src="/projects/vynta/home.png" 
                alt="Vynta Interface" 
                className="w-full h-auto rounded-2xl transform transition-transform group-hover:scale-[1.01] duration-700"
              />
            </div>
          </section>

          {/* Week 1 - The AI Pipeline */}
          <section className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
              <span className="text-purple-500 text-sm font-mono tracking-widest">02</span>
              Week 1 — The AI Pipeline
            </h2>
            <div className="bg-white/5 border-l-4 border-blue-500 p-8 rounded-r-2xl mb-10">
              <div className="flex items-center gap-3 text-blue-400 text-xs font-mono uppercase mb-4 tracking-widest">
                <Terminal size={14} /> Core Tech Stack
              </div>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-400 font-medium">
                <li className="flex items-center gap-2"><ChevronRight size={12} className="text-blue-500" /> Groq (Llama 3)</li>
                <li className="flex items-center gap-2"><ChevronRight size={12} className="text-blue-500" /> Jetpack Compose</li>
                <li className="flex items-center gap-2"><ChevronRight size={12} className="text-blue-500" /> Room Database</li>
                <li className="flex items-center gap-2"><ChevronRight size={12} className="text-blue-500" /> Google Calendar API</li>
              </ul>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              The AI input pipeline was the heart of the app. User types a task description → Retrofit sends it to Groq → Llama 3 parses the natural language and returns structured JSON with task name, date, time, and priority.
            </p>
            <p className="text-gray-400 mt-6 text-lg leading-relaxed">
              Getting the prompt right took longer than expected. I had to iterate on the system prompt several times before it started making smart assumptions, like defaulting to the next available slot in your working hours if no specific time is given.
            </p>
          </section>

          {/* Editorial Image 2 */}
          <section className="lg:-mx-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/5 p-2 shadow-2xl">
              <img src="/projects/vynta/input.png" alt="AI Input Flow" className="w-full h-auto rounded-xl" />
            </div>
            <div className="text-gray-400 pr-8">
              <h3 className="text-2xl font-bold text-white mb-4">Crafting the UX</h3>
              <p className="leading-relaxed">
                Everything was built to stay out of the user's way. The "Pill Dock" navigation was designed specifically for one-handed use during quick inputs. History and progress screens provide immediate feedback without cluttering the main focus area.
              </p>
            </div>
          </section>

          {/* Reality Check */}
          <section className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
              <span className="text-red-500 text-sm font-mono tracking-widest">03</span>
              Reality Checks
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Not everything was smooth sailing. Building for real-world chaos meant dealing with fuzzy data and API latency.
            </p>
            <div className="space-y-6">
              <div className="flex gap-6 group">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 font-mono text-sm group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all">
                  <Bug size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Calendar Sync Lag</h4>
                  <p className="text-gray-500 text-sm">Token refresh timings caused initial sync delays. Solved by implementing a dual-trigger background sync.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 font-mono text-sm group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                  <Rocket size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Voice Input Latency</h4>
                  <p className="text-gray-500 text-sm">Cutoffs on slow connections were mitigated by local buffering before API handoff.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion / Link */}
          <section className="max-w-2xl mx-auto pt-20 border-t border-white/5 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">The Outcome</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              Final project shipped with full AI scheduling, Calendar sync, and a premium Jetpack Compose dark UI. It's currently in open beta.
            </p>
            
            <a 
              href="https://github.com/quantumstack-labs/Vynta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all transform hover:-translate-y-1 shadow-2xl shadow-blue-600/20"
            >
              Check Repository <ChevronRight size={20} />
            </a>
          </section>

        </div>
      </article>
    </PageLayout>
  );
}
