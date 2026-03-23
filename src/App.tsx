import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Scene from './components/Scene';
import LoadingScreen from './components/LoadingScreen';
import About from './pages/About';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Awards from './pages/Awards';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Github from './pages/Github';
import VyntaDevlog from './pages/VyntaDevlog';
import Devlogs from './pages/Devlogs';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<div />} /> {/* Home is just the scene */}
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/devlogs" element={<Devlogs />} />
        <Route path="/devlog/vynta" element={<VyntaDevlog />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/github" element={<Github />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <div className="relative w-full h-screen overflow-hidden text-white font-sans">
        <AnimatePresence>
          {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
        </AnimatePresence>
        
        {!loading && (
          <>
            <Scene />
            <AnimatedRoutes />
          </>
        )}
      </div>
    </Router>
  );
}
