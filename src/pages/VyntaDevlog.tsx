import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Brain, Code2, Rocket, Bug, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VyntaDevlog() {
  return (
    <PageLayout title="Vynta Devlog">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center lg:text-left max-w-4xl lg:max-w-none"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Building an AI Task Scheduler <br className="hidden lg:block" /> in My Semester Holiday
          </h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-400 font-mono text-sm">
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Calendar size={14} className="text-blue-400" /> March 2026
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Brain size={14} className="text-purple-400" /> Murshid R
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Clock size={14} className="text-emerald-400" /> 8 Min Read
            </span>
          </div>
        </motion.div>

        {/* Intro */}
        <div className="mb-24 max-w-4xl lg:max-w-none">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic">
                "My semester holiday started and I had zero plans. Tasks piling up in my head, notes scattered across apps — I needed something smarter."
              </p>
            </div>
          </div>
        </div>

        {/* Sections staggered */}
        <div className="space-y-32 mb-32">
          
          {/* What I wanted to build */}
          <section className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Rocket className="text-blue-400" w-8 h-8 /> What I wanted to build
              </h2>
              <p className="text-gray-400 leading-relaxed space-y-4">
                The idea was simple. An Android app where you describe your task in plain English and AI handles the scheduling. No date pickers. No dropdowns. Just type "submit the ML assignment by Thursday" and it figures out the task name, the deadline, the priority — and puts it in your calendar.
              </p>
              <p className="mt-6 text-gray-400">
                I also wanted to add an energy level system. Scheduling a deep focus coding session when you're already tired doesn't make sense. Low, Medium, and High energy tasks would get slotted into the right parts of your day automatically.
              </p>
            </div>
            <div className="order-1 lg:order-2 group">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform group-hover:scale-[1.02] duration-500">
                <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors z-10" />
                <img src="/projects/vynta/home.png" alt="Vynta Home Screen" className="w-full h-auto" />
              </div>
            </div>
          </section>

          {/* Core Pipeline Week 1 */}
          <section className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="group">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-6 bg-white/5 transform transition-transform group-hover:scale-[1.02] duration-500">
                <img src="/projects/vynta/input.png" alt="AI Input Pipeline" className="w-full h-auto rounded-2xl" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Week 1 — The AI Pipeline</h2>
              <p className="text-gray-400 leading-relaxed">
                The AI input pipeline was the heart of the app. User types a task description → Retrofit sends it to Groq → Llama 3 parses the natural language and returns structured JSON with task name, date, time, priority, and energy level.
              </p>
              <p className="mt-6 text-gray-400">
                Getting the prompt right took longer than expected. I had to iterate on the system prompt several times before it started making smart assumptions, like defaulting to the next available slot in your working hours if no specific time is given.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Llama 3", "Groq API", "Structured JSON", "System Prompts"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-500/10 text-blue-300 text-xs font-mono rounded-full border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Building Screens Week 2 */}
          <section className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-white mb-6">Week 2 — Crafting the Experience</h2>
              <div className="space-y-6 text-gray-400">
                <p>
                  <strong className="text-white block mb-1">Home screen</strong> Straightforward layout with daily progress, focus cards, and an upcoming task strip.
                </p>
                <p>
                  <strong className="text-white block mb-1">History screen</strong> Full log with a productivity score showing the percentage of tasks finished.
                </p>
                <p>
                  <strong className="text-white block mb-1">Pill Dock Navigation</strong> Minimal two-button dock designed for one-handed use.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 group">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform group-hover:scale-[1.02] duration-500">
                <img src="/projects/vynta/history.png" alt="History Screen" className="w-full h-auto" />
              </div>
            </div>
          </section>

          {/* Reality Check Week 3 */}
          <section className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="group">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform group-hover:scale-[1.02] duration-500">
                <img src="/projects/vynta/settings.png" alt="Settings Screen" className="w-full h-auto" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Bug className="text-red-400" /> Week 3 — Reality Checks
              </h2>
              <ul className="space-y-6 text-gray-400 list-none">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-400/20 border border-red-400/30 flex items-center justify-center text-[10px] text-red-400">01</div>
                  <p>Calendar sync lagging for new accounts due to token refresh timing.</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-400/20 border border-red-400/30 flex items-center justify-center text-[10px] text-red-400">02</div>
                  <p>Voice input cutting off on slow connections — still debugging.</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-400/20 border border-red-400/30 flex items-center justify-center text-[10px] text-red-400">03</div>
                  <p>AI misreading fuzzy dates like "before the weekend".</p>
                </li>
              </ul>
            </div>
          </section>

        </div>

        {/* Final Reflections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-32">
          <div className="p-10 bg-white/5 border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-6">What I'd do differently</h3>
            <ul className="space-y-4 text-gray-400 list-disc list-inside">
              <li>Start the UI earlier — backend took too long.</li>
              <li>Build onboarding flow from the start.</li>
              <li>Focus more on prompt engineering in Week 1.</li>
            </ul>
          </div>
          <div className="p-10 border border-blue-500/20 bg-blue-500/5 rounded-3xl flex flex-col justify-center items-center text-center">
             <h3 className="text-2xl font-bold text-white mb-4">The Result</h3>
             <p className="text-gray-400 mb-8 max-w-sm">
               Final project shipped with full AI scheduling, Calendar sync, and a premium Jetpack Compose dark UI.
             </p>
             <a 
              href="https://github.com/quantumstack-labs/Vynta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20"
             >
               Try the Beta
             </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
