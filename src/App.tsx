import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import About from './pages/About';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Awards from './pages/Awards';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Github from './pages/Github';
import VyntaDevlog from './pages/VyntaDevlog';
import Devlogs from './pages/Devlogs';
import VisitorCounter from './components/VisitorCounter';
import PageLayout from './components/PageLayout';

const getStyles = (theme: 'light' | 'dark') => ({
  surface: theme === 'dark' ? '#050505' : '#FFFFFF',
  surfaceContainerLow: theme === 'dark' ? '#0e0e0e' : '#F5F5F5',
  surfaceContainerHigh: theme === 'dark' ? '#2a2a2a' : '#E0E0E0',
  surfaceContainerHighest: theme === 'dark' ? '#353534' : '#CCCCCC',
  primary: '#00F2FF',
  onSurface: theme === 'dark' ? '#F5F5F5' : '#313030',
  onSurfaceMuted: theme === 'dark' ? '#888888' : '#666666',
  outline: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
});

function LandingPage({ theme }: { theme: 'light' | 'dark' }) {
  const styles = getStyles(theme);
  return (
    <div style={{ backgroundColor: styles.surface, color: styles.onSurface, minHeight: '100vh' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[40px]" style={{ backgroundColor: theme === 'dark' ? 'rgba(5,5,5,0.80)' : 'rgba(255,255,255,0.80)', borderBottom: `1px solid ${styles.outline}` }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <span className="font-semibold text-lg" style={{ fontFamily: 'Space Grotesk, monospace' }}>MR</span>
          <div className="flex items-center gap-8 text-sm" style={{ fontFamily: 'Space Grotesk, monospace' }}>
            <a href="#manifesto" className="hover:text-[#00F2FF] transition" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.05em' }}>MANIFESTO</a>
            <a href="#projects" className="hover:text-[#00F2FF] transition" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.05em' }}>PROJECTS</a>
            <a href="#trajectory" className="hover:text-[#00F2FF] transition" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.05em' }}>TRAJECTORY</a>
            <a href="#skills" className="hover:text-[#00F2FF] transition" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.05em' }}>SKILLS</a>
            <a href="/devlogs" className="hover:text-[#00F2FF] transition" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.05em' }}>DEVLOGS</a>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <section id="manifesto" className="mb-28 pt-12" style={{ fontFamily: 'Space Grotesk, monospace' }}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="text-5xl lg:text-7xl mb-6 leading-tight" style={{ fontFamily: 'Noto Serif, serif', letterSpacing: '-0.02em', color: styles.onSurface }}>Engineering the<br /><span style={{ color: '#00F2FF' }}>Intersection</span></h1>
              <p className="text-lg mb-8 max-w-xl" style={{ color: styles.onSurfaceMuted, lineHeight: '1.7' }}>B.Tech CSE (Data Science & AI) • Dr. M.G.R Educational and Research Institute, Chennai</p>
              <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: styles.onSurfaceMuted }}>Building production-grade AI applications — from LLM platforms to aerospace prediction systems. Currently researching combustion instability prediction using Temporal Convolutional Networks at Dr. M.G.R ACS Space Technology Centre.</p>
              <div className="flex gap-4">
                <a href="#projects" className="px-8 py-4 text-sm font-medium transition hover:opacity-80" style={{ backgroundColor: '#00F2FF', color: '#050505', fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>VIEW WORK</a>
                <a href="#contact" className="px-8 py-4 text-sm font-medium transition hover:bg-[#00F2FF] hover:text-black" style={{ border: `1px solid ${styles.outline}`, color: styles.onSurface, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>GET IN TOUCH</a>
              </div>
            </div>
            <div className="col-span-4 hidden lg:block">
              <div className="h-64 w-full" style={{ backgroundColor: styles.surfaceContainerLow, border: `1px solid ${styles.outline}` }}>
                <div className="p-6 h-full flex flex-col justify-between">
                  <span className="text-xs" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.1em' }}>COORDINATES</span>
                  <div>
                    <p className="text-2xl" style={{ color: '#00F2FF', fontFamily: 'Space Grotesk, monospace' }}>13.0827° N</p>
                    <p className="text-2xl" style={{ color: '#00F2FF', fontFamily: 'Space Grotesk, monospace' }}>80.2707° E</p>
                  </div>
                  <span className="text-xs" style={{ color: styles.onSurfaceMuted }}>CHENNAI, IN</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="mb-28">
          <h2 className="text-3xl mb-12" style={{ fontFamily: 'Noto Serif, serif', letterSpacing: '-0.02em' }}>Core Artifacts</h2>
          <div className="space-y-4">
            <div className="p-8" style={{ backgroundColor: styles.surfaceContainerLow, border: `1px solid ${styles.outline}` }}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium" style={{ fontFamily: 'Noto Serif, serif' }}>SENTINEL — Execution Intelligence Platform</h3>
                <span className="text-xs px-3 py-1" style={{ backgroundColor: styles.surfaceContainerHighest, color: '#00F2FF', fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.1em' }}>AMD SLINGSHOT 2026</span>
              </div>
              <p className="text-sm mb-6 max-w-3xl" style={{ color: styles.onSurfaceMuted, lineHeight: '1.6' }}>Full-stack LLM platform that extracts delivery commitments from Slack/Gmail, scores slip risk 0-100, and auto-alerts owners before deadlines. Built with React 19, FastAPI, Groq (Llama 3.3 70B), Supabase, and Redis.</p>
              <div className="flex flex-wrap gap-2">
                {['React 19', 'FastAPI', 'Groq', 'Llama 3.3', 'Supabase', 'Redis'].map(tag => (<span key={tag} className="text-xs px-3 py-1.5" style={{ backgroundColor: styles.surfaceContainerHighest, color: styles.onSurfaceMuted, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>{tag.toUpperCase()}</span>))}
              </div>
            </div>
            <div className="p-8" style={{ backgroundColor: styles.surfaceContainerLow, border: `1px solid ${styles.outline}` }}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium" style={{ fontFamily: 'Noto Serif, serif' }}>Vynta — AI Task Scheduler for Android</h3>
                <span className="text-xs px-3 py-1" style={{ backgroundColor: styles.surfaceContainerHighest, color: '#00FF88', fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.1em' }}>IN PRODUCTION</span>
              </div>
              <p className="text-sm mb-6 max-w-3xl" style={{ color: styles.onSurfaceMuted, lineHeight: '1.6' }}>Android app that schedules tasks in plain language based on energy levels and calendar availability. Built with Jetpack Compose, Groq API (Llama 3.3), Google Calendar API, and Room DB.</p>
              <div className="flex flex-wrap gap-2">
                {['Kotlin', 'Jetpack Compose', 'Groq API', 'Google Calendar', 'Room DB'].map(tag => (<span key={tag} className="text-xs px-3 py-1.5" style={{ backgroundColor: styles.surfaceContainerHighest, color: styles.onSurfaceMuted, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>{tag.toUpperCase()}</span>))}
              </div>
            </div>
            <div className="p-8" style={{ backgroundColor: styles.surfaceContainerLow, border: `1px solid ${styles.outline}` }}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium" style={{ fontFamily: 'Noto Serif, serif' }}>AI-Driven Combustion Instability Prediction</h3>
                <span className="text-xs px-3 py-1" style={{ backgroundColor: styles.surfaceContainerHighest, color: '#AA88FF', fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.1em' }}>RESEARCH • 92% ACCURACY</span>
              </div>
              <p className="text-sm mb-6 max-w-3xl" style={{ color: styles.onSurfaceMuted, lineHeight: '1.6' }}>TCN model for early warning in hybrid rocket engines. Outperformed LSTM baselines. Bayesian Optimization reduced manual experimentation by 35%. Awarded 2nd Place at YASSC 2025.</p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'PyTorch', 'TCN', 'Bayesian Optimization', 'Aerospace'].map(tag => (<span key={tag} className="text-xs px-3 py-1.5" style={{ backgroundColor: styles.surfaceContainerHighest, color: styles.onSurfaceMuted, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>{tag.toUpperCase()}</span>))}
              </div>
            </div>
            <a href="/projects" className="block w-full text-center py-6" style={{ border: `1px dashed ${styles.outline}`, color: styles.onSurfaceMuted, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.1em' }}>VIEW ALL PROJECTS →</a>
          </div>
        </section>
        <section id="trajectory" className="mb-28">
          <h2 className="text-3xl mb-12" style={{ fontFamily: 'Noto Serif, serif', letterSpacing: '-0.02em' }}>Trajectory</h2>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6">
              <h3 className="text-xs mb-6" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.1em', fontFamily: 'Space Grotesk, monospace' }}>EXPERIENCE</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-2 h-2 mt-2" style={{ backgroundColor: '#00F2FF' }}></div>
                  <div>
                    <h4 className="font-medium" style={{ fontFamily: 'Space Grotesk, monospace' }}>AI Research Engineer</h4>
                    <p className="text-sm" style={{ color: styles.onSurfaceMuted }}>Dr. M.G.R ACS Space Technology Centre, Chennai</p>
                    <p className="text-xs mt-1" style={{ color: styles.onSurfaceMuted, opacity: 0.6 }}>2024 — Present</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 mt-2" style={{ backgroundColor: styles.onSurfaceMuted }}></div>
                  <div>
                    <h4 className="font-medium" style={{ fontFamily: 'Space Grotesk, monospace' }}>Mathematics & Chemistry Instructor</h4>
                    <p className="text-sm" style={{ color: styles.onSurfaceMuted }}>B.L Learning Institute, Chennai</p>
                    <p className="text-xs mt-1" style={{ color: styles.onSurfaceMuted, opacity: 0.6 }}>2023 — 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h3 className="text-xs mb-6" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.1em', fontFamily: 'Space Grotesk, monospace' }}>EDUCATION</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-2 h-2 mt-2" style={{ backgroundColor: '#00F2FF' }}></div>
                  <div>
                    <h4 className="font-medium" style={{ fontFamily: 'Space Grotesk, monospace' }}>B.Tech — CSE (Data Science & AI)</h4>
                    <p className="text-sm" style={{ color: styles.onSurfaceMuted }}>Dr. M.G.R Educational and Research Institute, Chennai</p>
                    <p className="text-xs mt-1" style={{ color: styles.onSurfaceMuted, opacity: 0.6 }}>2023 — Present • GPA: 8.60/10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 mt-8">
              <h3 className="text-xs mb-6" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.1em', fontFamily: 'Space Grotesk, monospace' }}>RECOGNITION</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4" style={{ backgroundColor: styles.surfaceContainerLow, border: `1px solid ${styles.outline}` }}>
                  <p className="text-sm" style={{ color: styles.onSurface }}>AMD Slingshot Hackathon 2026</p>
                  <p className="text-xs mt-1" style={{ color: styles.onSurfaceMuted }}>SENTINEL Submission</p>
                </div>
                <div className="p-4" style={{ backgroundColor: styles.surfaceContainerLow, border: `1px solid ${styles.outline}` }}>
                  <p className="text-sm" style={{ color: styles.onSurface }}>2nd Place — YASSC 2025</p>
                  <p className="text-xs mt-1" style={{ color: styles.onSurfaceMuted }}>Paper Presentation</p>
                </div>
                <div className="p-4" style={{ backgroundColor: styles.surfaceContainerLow, border: `1px solid ${styles.outline}` }}>
                  <p className="text-sm" style={{ color: styles.onSurface }}>INSPACe Model Rocketry India</p>
                  <p className="text-xs mt-1" style={{ color: styles.onSurfaceMuted }}>Selected Team</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="skills" className="mb-28">
          <h2 className="text-3xl mb-12" style={{ fontFamily: 'Noto Serif, serif', letterSpacing: '-0.02em' }}>Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs mb-4" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.1em', fontFamily: 'Space Grotesk, monospace' }}>AI / ML</h3>
              <div className="flex flex-wrap gap-2">
                {['PyTorch', 'TensorFlow', 'Scikit-learn', 'HuggingFace', 'LangChain', 'Groq API', 'Llama 3.3', 'RAG', 'TCN', 'LSTM', 'CNN'].map(skill => (<span key={skill} className="px-4 py-2 text-sm" style={{ backgroundColor: styles.surfaceContainerHighest, color: styles.onSurfaceMuted, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>{skill.toUpperCase()}</span>))}
              </div>
            </div>
            <div>
              <h3 className="text-xs mb-4" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.1em', fontFamily: 'Space Grotesk, monospace' }}>FULL-STACK</h3>
              <div className="flex flex-wrap gap-2">
                {['React 19', 'Next.js', 'TypeScript', 'FastAPI', 'Flask', 'Node.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vite'].map(skill => (<span key={skill} className="px-4 py-2 text-sm" style={{ backgroundColor: styles.surfaceContainerHighest, color: styles.onSurfaceMuted, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>{skill.toUpperCase()}</span>))}
              </div>
            </div>
            <div>
              <h3 className="text-xs mb-4" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.1em', fontFamily: 'Space Grotesk, monospace' }}>LANGUAGES</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'TypeScript', 'Java', 'Kotlin', 'C++', 'SQL'].map(skill => (<span key={skill} className="px-4 py-2 text-sm" style={{ backgroundColor: styles.surfaceContainerHighest, color: styles.onSurfaceMuted, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>{skill.toUpperCase()}</span>))}
              </div>
            </div>
            <div>
              <h3 className="text-xs mb-4" style={{ color: styles.onSurfaceMuted, letterSpacing: '0.1em', fontFamily: 'Space Grotesk, monospace' }}>TOOLS</h3>
              <div className="flex flex-wrap gap-2">
                {['Git/GitHub', 'Linux/WSL', 'Vercel', 'Render', 'Android Studio', 'Figma', 'Jupyter', 'Postman'].map(skill => (<span key={skill} className="px-4 py-2 text-sm" style={{ backgroundColor: styles.surfaceContainerHighest, color: styles.onSurfaceMuted, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>{skill.toUpperCase()}</span>))}
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="mb-28">
          <h2 className="text-3xl mb-12" style={{ fontFamily: 'Noto Serif, serif', letterSpacing: '-0.02em' }}>Get in Touch</h2>
          <div className="p-10" style={{ backgroundColor: styles.surfaceContainerLow, border: `1px solid ${styles.outline}` }}>
            <p className="text-lg mb-8 max-w-xl" style={{ color: styles.onSurfaceMuted, lineHeight: '1.7' }}>Open to internships in Software Engineering, Applied AI, or ML Engineering.</p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:murshidreyas@gmail.com" className="px-8 py-4 text-sm font-medium" style={{ backgroundColor: '#00F2FF', color: '#050505', fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>MURSHIDREYAS@GMAIL.COM</a>
              <a href="https://linkedin.com/in/murshid-r-37088b272" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-sm font-medium" style={{ border: `1px solid ${styles.outline}`, color: styles.onSurface, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>LINKEDIN</a>
              <a href="https://github.com/murshidr" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-sm font-medium" style={{ border: `1px solid ${styles.outline}`, color: styles.onSurface, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>GITHUB</a>
            </div>
          </div>
        </section>
        <footer className="text-center py-8" style={{ borderTop: `1px solid ${styles.outline}` }}>
          <p className="text-sm" style={{ color: styles.onSurfaceMuted, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }}>© 2026 MURSHID R</p>
        </footer>
      </main>
      <VisitorCounter />
    </div>
  );
}

function AnimatedRoutes({ theme }: { theme: 'light' | 'dark' }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage theme={theme} />} />
        <Route path="/about" element={<PageLayout title="About"><About /></PageLayout>} />
        <Route path="/projects" element={<PageLayout title="Projects"><Projects /></PageLayout>} />
        <Route path="/devlogs" element={<PageLayout title="Devlogs"><Devlogs /></PageLayout>} />
        <Route path="/devlog/vynta" element={<PageLayout title="Vynta Devlog"><VyntaDevlog /></PageLayout>} />
        <Route path="/achievements" element={<PageLayout title="Experience"><Achievements /></PageLayout>} />
        <Route path="/awards" element={<PageLayout title="Awards"><Awards /></PageLayout>} />
        <Route path="/blog" element={<PageLayout title="Blog"><Blog /></PageLayout>} />
        <Route path="/contact" element={<PageLayout title="Contact"><Contact /></PageLayout>} />
        <Route path="/github" element={<PageLayout title="GitHub"><Github /></PageLayout>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const styles = getStyles(theme);
  return (
    <Router>
      <div style={{ backgroundColor: styles.surface, color: styles.onSurface, minHeight: '100vh' }}>
        <button className="fixed top-4 right-4 z-50 px-4 py-2 text-sm font-medium" style={{ backgroundColor: styles.surfaceContainerHigh, color: styles.onSurface, border: `1px solid ${styles.outline}`, fontFamily: 'Space Grotesk, monospace', letterSpacing: '0.05em' }} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
        </button>
        <AnimatedRoutes theme={theme} />
      </div>
    </Router>
  );
}