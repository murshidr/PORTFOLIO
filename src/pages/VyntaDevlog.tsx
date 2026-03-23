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
        <div className="space-y-32 prose prose-invert prose-blue max-w-none">
          
          {/* Intro Section */}
          <section className="max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-500">
              My semester holiday started and I had zero plans. Tasks piling up in my head, stuff I kept forgetting, notes scattered across apps. I needed something smarter, something that actually understood *how* I worked. By the time I set up a task in most apps, I could've just done it.
            </p>
            <p className="text-gray-400 mt-6 text-lg">
              That's when I decided to build Vynta.
            </p>
          </section>

          {/* Section 01: The Vision */}
          <section className="relative">
            <div className="max-w-2xl mx-auto mb-16 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-6 flex flex-col lg:flex-row lg:items-center gap-4">
                <span className="text-blue-500 text-sm font-mono tracking-widest uppercase">Chapter 01</span>
                The Vision for Instant Scheduling
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                The idea was simple. An Android app where you describe your task in plain English and AI handles the scheduling. Just type "submit the ML assignment by Thursday" and it figures out the rest.
              </p>
            </div>
            {/* Centered Constrained Image */}
            <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-3xl bg-white/5 p-2 mb-10">
              <img 
                src="/projects/vynta/home.png" 
                alt="Vynta Home Screen" 
                className="w-full h-auto rounded-2xl"
              />
              <p className="text-center text-xs text-gray-500 mt-4 font-mono uppercase tracking-widest italic">Main interface: Clean, Focused, Actionable.</p>
            </div>
          </section>

          {/* Section 02: The Engine */}
          <section className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
              <span className="text-purple-500 text-sm font-mono tracking-widest uppercase">Chapter 02</span>
              Engineering the Pipeline
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              The AI input pipeline was the heart of the app. User types a task description → Retrofit sends it to Groq → Llama 3 parses the natural language and returns structured JSON with task name, date, time, and priority.
            </p>
            
            {/* Editorial Image: Input */}
            <div className="lg:-mx-20 rounded-3xl overflow-hidden border border-white/5 bg-white/5 p-2 shadow-2xl mb-12">
              <img src="/projects/vynta/input.png" alt="AI Input Flow" className="w-full h-auto rounded-2xl" />
              <div className="p-4 text-center text-xs text-gray-600 font-medium">Natural Language Processing: Parsing fuzzy dates into structured calendar events.</div>
            </div>
          </section>

          {/* Section 03: The Experience */}
          <section className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
              <span className="text-emerald-500 text-sm font-mono tracking-widest uppercase">Chapter 03</span>
              Crafting the Flow
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              Everything is built with Material 3 and Jetpack Compose. I designed a custom Pill-Dock navigation for the best one-handed speed. The History screen features a productivity score that gamifies task completion.
            </p>
            
            {/* Editorial Image: History */}
            <div className="lg:-mx-32 rounded-3xl overflow-hidden border border-white/5 bg-white/5 p-2 shadow-2xl mb-12">
              <img src="/projects/vynta/history.png" alt="History and Productivity" className="w-full h-auto rounded-2xl" />
              <div className="p-4 text-center text-xs text-gray-600 font-medium">History View: Tracking daily wins and productivity trends.</div>
            </div>
          </section>

          {/* Section 04: Stability */}
          <section className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
              <span className="text-red-500 text-sm font-mono tracking-widest uppercase">Chapter 04</span>
              Design Systems & Stability
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Building for real-world chaos meant dealing with fuzzy data and API latency. I used a dark-themed design system to reduce eye strain and keep the focus on the content.
            </p>
            
            {/* Editorial Image: Settings/System */}
            <div className="max-w-xl mx-auto rounded-3xl overflow-hidden border border-white/5 bg-white/5 p-2 shadow-2xl mb-12">
              <img src="/projects/vynta/settings.png" alt="Settings and Configuration" className="w-full h-auto rounded-2xl" />
              <div className="p-4 text-center text-xs text-gray-600 font-medium">System Configuration: Modular and easy to navigate.</div>
            </div>

            <div className="bg-white/5 border-l-4 border-blue-500 p-8 rounded-r-2xl mb-10">
              <div className="flex items-center gap-3 text-blue-400 text-xs font-mono uppercase mb-4 tracking-widest">
                <Terminal size={14} /> Critical Lessons
              </div>
              <ul className="space-y-4 text-sm text-gray-400 font-medium list-none">
                <li className="flex items-start gap-3">
                   <Bug className="text-red-500 mt-1 shrink-0" size={14} /> 
                   <div>
                     <span className="text-white block font-bold mb-0.5">Prompt Engineering is 80%</span>
                     It's the most critical UX component in AI products.
                   </div>
                </li>
                <li className="flex items-start gap-3">
                   <Rocket className="text-blue-500 mt-1 shrink-0" size={14} /> 
                   <div>
                     <span className="text-white block font-bold mb-0.5">One-Handed Navigation</span>
                     Mobile apps should prioritize reachability for core actions.
                   </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Conclusion */}
          <section className="max-w-2xl mx-auto pt-20 border-t border-white/5 text-center">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tighter">The Outcome</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              Final project shipped with full AI scheduling, Calendar sync, and a premium Jetpack Compose dark UI. It's Currently being tested by 50+ beta users.
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
