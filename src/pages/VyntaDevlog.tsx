import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Brain, Code2, Rocket, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VyntaDevlog() {
  return (
    <PageLayout title="Vynta Devlog">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Building an AI Task Scheduler in My Semester Holiday
          </h1>
          <div className="flex items-center gap-4 text-gray-400 font-mono text-sm">
            <span className="flex items-center gap-1"><Calendar size={14} /> March 2026</span>
            <span className="flex items-center gap-1"><Brain size={14} /> Murshid R</span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
          <section>
            <p>
              My semester holiday started and I had zero plans.
            </p>
            <p className="mt-4">
              First few days were fine. Then I started feeling the usual thing — tasks piling up in my head, stuff I kept forgetting, notes scattered across three different apps. I tried Todoist, TickTick, Google Tasks. They all work fine but they all felt the same. You open the app, fill out a form, pick a date, pick a time, pick a priority. By the time you're done setting up the task you could've just done the task.
            </p>
            <p className="mt-4">
              I kept thinking — why can't I just <em>tell</em> it what I need to do and have it figure out the rest.
            </p>
            <p className="mt-4">
              That's when I decided to build Vynta.
            </p>
          </section>

          <hr className="border-white/10" />

          {/* Core Vision */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Rocket className="text-blue-400" /> What I wanted to build
            </h2>
            <p>
              The idea was simple. An Android app where you describe your task in plain English and AI handles the scheduling. No date pickers. No dropdowns. Just type "submit the ML assignment by Thursday" and it figures out the task name, the deadline, the priority — and puts it in your calendar.
            </p>
            <p className="mt-4">
              I also wanted to add an energy level system. Not every task needs the same mental effort. Scheduling a deep focus coding session at 9 PM when you're already tired doesn't make sense. So Low, Medium, and High energy tasks would get slotted into the right parts of your day automatically.
            </p>
            
            <div className="mt-8 rounded-3xl overflow-hidden border border-white/10">
                <img src="/projects/vynta/home.png" alt="Vynta Home Screen" className="w-full" />
            </div>
          </section>

          {/* The Stack */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Code2 className="text-purple-400" /> The Stack
            </h2>
            <p>
              I already knew I wanted Jetpack Compose for the UI. I'd been learning it for a few months and this felt like the right project to go all-in on it. Material 3 for the design system.
            </p>
            <p className="mt-4">
              For the AI part — Groq with Llama 3. I'd used the Groq API before for a previous project (AIDEN, a RAG assistant) and the response speeds are genuinely fast. Fast enough to feel real-time in a mobile app, which matters a lot for UX.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Jetpack Compose", "Llama 3 (Groq)", "Google Calendar API",
                "Room DB", "Kotlin Coroutines", "MVVM"
              ].map(tech => (
                <div key={tech} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center font-mono text-sm">
                  {tech}
                </div>
              ))}
            </div>
          </section>

          {/* Week 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Week 1 — Getting the core working</h2>
            <p>
              The first thing I built was the AI input pipeline. This was the heart of the app so I wanted to get it right before touching anything else.
            </p>
            <p className="mt-4">
              The flow: user types a task description → Retrofit sends it to Groq → Llama 3 parses the natural language and returns structured JSON with task name, date, time, priority, and energy level → app saves it to Room DB and creates a Google Calendar event.
            </p>
            
            <div className="mt-8 rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-4">
                <img src="/projects/vynta/input.png" alt="AI Input Pipeline" className="w-full max-w-sm mx-auto shadow-2xl rounded-2xl" />
                <p className="text-center text-sm text-gray-500 mt-4 italic font-mono">The AI input pipeline in action</p>
            </div>
            
            <p className="mt-8">
              Getting the prompt right took longer than I expected. The first version was too literal — if you said "finish the report" with no date it would just return null for the time field. I had to iterate on the system prompt a few times before it started making smart assumptions, like defaulting to the next available slot in your working hours if no specific time is given.
            </p>
          </section>

          {/* Week 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Week 2 — Building the actual app around it</h2>
            <p>
              This week was all UI and screens.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="space-y-4">
                <p><strong>Home screen</strong> — daily progress bar, focus mode card, date strip, upcoming tasks list. Straightforward but took time to get the layout feeling right.</p>
                <p><strong>History screen</strong> — full log of completed, scheduled, and missed tasks. Added a productivity score at the top showing percentage of tasks finished.</p>
              </div>
              <div className="rounded-3xl overflow-hidden border border-white/10">
                <img src="/projects/vynta/history.png" alt="History Screen" className="w-full" />
              </div>
            </div>
          </section>

          {/* Week 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Bug className="text-red-400" /> Week 3 — Testing, bugs, and reality checks
            </h2>
            <p>
              This is when I found out how many edge cases I'd missed.
            </p>
            <ul className="list-disc list-inside space-y-4 mt-4 text-gray-400">
              <li>The Calendar sync was lagging on first login for some accounts. Workaround for now is sign out and back in.</li>
              <li>Voice input was cutting off early on slower connections. Still investigating this one.</li>
              <li>The AI occasionally misread dates. "Before the weekend" sometimes got interpreted wrong.</li>
            </ul>
            
            <div className="mt-8 rounded-3xl overflow-hidden border border-white/10 max-w-sm mx-auto shadow-2xl">
                <img src="/projects/vynta/settings.png" alt="Settings Screen" className="w-full" />
            </div>
          </section>

          {/* What I'd do differently */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">What I'd do differently</h2>
            <div className="space-y-6 text-sm md:text-base">
              <div>
                <h3 className="text-blue-400 font-bold mb-1">Start the UI earlier.</h3>
                <p>I spent too long on the backend pipeline before touching the screens. In the end, I had to rush some layouts.</p>
              </div>
              <div>
                <h3 className="text-blue-400 font-bold mb-1">Build onboarding first.</h3>
                <p>Right now new users land on the Home screen with no context. A two-screen onboarding would've made a huge difference.</p>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="text-center pb-20">
             <h2 className="text-3xl font-bold text-white mb-4">What's Next</h2>
             <p className="text-gray-400 mb-8 max-w-xl mx-auto">
               Home screen widgets, a streak system for habits, and smarter AI suggestions based on past patterns.
             </p>
             <a 
              href="https://github.com/quantumstack-labs/Vynta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-all transform hover:scale-105 inline-block shadow-lg shadow-blue-500/20"
             >
               Try the Beta
             </a>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
