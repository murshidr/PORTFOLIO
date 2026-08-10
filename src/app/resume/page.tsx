"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import Contact from "@/components/Contact";
import { Award, GraduationCap, Briefcase, Code, Globe } from "lucide-react";

const skills = {
  "Programming": ["Python", "C++", "C", "Java", "Kotlin", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  "AI & Machine Learning": ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Deep Learning", "CNNs", "LSTMs", "TCNs", "Time-Series Classification", "Feature Engineering", "Model Evaluation"],
  "AI Applications": ["Computer Vision", "NLP", "LLM Applications", "Prompt Engineering", "AI-powered Automation", "Predictive Analytics"],
  "Data & Processing": ["Pandas", "NumPy", "Data Cleaning", "Data Preprocessing", "Feature Engineering", "Sensor/Data Fusion"],
  "Development & Deployment": ["FastAPI", "Flask", "REST APIs", "WebSockets", "Git/GitHub", "Linux/WSL", "SQLite", "PostgreSQL", "Supabase", "Redis", "MATLAB", "Jupyter"],
};

const experience = [
  {
    role: "AI Research Engineer",
    company: "Dr. M.G.R ACS Space Technology Centre, Chennai",
    period: "2024 – Present",
    points: [
      "Developed machine learning workflows for combustion-instability prediction using Python, TCN models, Bayesian Optimization, and sensor-data processing.",
      "Worked with multi-channel real-time sensor data, data fusion, model evaluation, and digital-twin pipelines for aerospace research applications.",
      "Led avionics and flight-software development for an IN-SPACe national rocketry competition, integrating sensors, telemetry, and live visualization."
    ]
  },
  {
    role: "Mathematics & Chemistry Instructor",
    company: "B.L Learning Institute, Chennai",
    period: "2023 – 2024",
    points: [
      "Taught mathematics and chemistry to 50+ students, designed structured problem sets, and supported measurable improvement in student performance."
    ]
  }
];

const education = [
  {
    institution: "Dr. M.G.R Educational and Research Institute, Chennai",
    degree: "B.Tech, Computer Science & Engineering (Data Science & AI)",
    period: "2023 – Present",
    cgpa: "8.60 / 10.00 (Semester 4)",
    trajectory: "7.38 → 7.71 → 8.14 → 8.60"
  }
];

const awards = [
  { title: "Novel Contribution Award", context: "National Conference — CardioTwin-H research" },
  { title: "Student Research & Achievement Award", context: "AUDI FEST 2026" },
  { title: "2nd Place — Paper Presentation", context: "YASSC 2025" },
  { title: "Runner-Up", context: "Promptathon AI Competition (AI: Beyond the Algorithm)" },
  { title: "Selected Team", context: "IN-SPACe Model Rocketry India National Competition" },
  { title: "TiHAN Program Participant", context: "IIT Hyderabad — Autonomous Navigation & Robotics" }
];

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Tamil", level: "Native" },
  { name: "Hindi", level: "Conversational" },
  { name: "German", level: "Basic" }
];

export default function ResumePage() {
  return (
    <main className="bg-cream min-h-screen text-espresso">
      <Nav />
      
      <div className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-sand/30 pb-12 mb-20 gap-8">
            <div className="space-y-3">
              <p className="font-serif italic text-sm text-clay uppercase tracking-[0.3em]">Curriculum Vitae</p>
              <h1 className="text-6xl md:text-8xl font-serif font-light leading-none">Murshid R.</h1>
              <p className="text-sand font-sans text-xs uppercase tracking-[0.2em] font-bold mt-4">
                AI Research Engineer · Applied Systems · Space Tech & Data Science
              </p>
            </div>
            <div className="text-right space-y-1 text-xs uppercase tracking-widest text-espresso/70 font-sans">
              <p>Chennai, Tamil Nadu, India</p>
              <p className="text-clay font-medium">murshidreyas@gmail.com</p>
              <p>+91 8939043919</p>
              <div className="pt-2 flex justify-end space-x-4">
                <a href="https://github.com/murshidr" target="_blank" rel="noopener noreferrer" className="hover:text-clay transition-colors">GitHub</a>
                <span>·</span>
                <a href="https://linkedin.com/in/murshid-r-37088b272" target="_blank" rel="noopener noreferrer" className="hover:text-clay transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* The Summary Narrative */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">01. Executive Summary</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed text-balance">
                B.Tech Computer Science & Engineering (Data Science & AI) student with hands-on experience building applied AI and machine learning systems using Python, PyTorch, TensorFlow, computer vision, NLP, and LLM-based applications.
              </p>
              <p className="text-espresso/75 font-light leading-relaxed">
                Experienced in developing end-to-end ML pipelines, working with real-world data, feature engineering, model evaluation, and deploying AI-powered applications. Interested in Document Intelligence, OCR, NLP, and LLM-driven automation with a strong focus on practical AI solutions.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* The Track Record (Experience) */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">02. Experience</h2>
          </ScrollReveal>
          <div className="space-y-16">
            {experience.map((exp, i) => (
              <ScrollReveal key={i} direction="up" delay={0.1 + i * 0.1}>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-sand/15 pb-4">
                    <div>
                      <h3 className="text-2xl font-serif text-espresso">{exp.role}</h3>
                      <p className="text-clay text-xs uppercase tracking-widest mt-1 font-semibold">{exp.company}</p>
                    </div>
                    <p className="text-sand text-[11px] uppercase tracking-widest font-bold bg-sand/10 px-3 py-1 rounded-full">{exp.period}</p>
                  </div>
                  <ul className="space-y-3">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-espresso/80 font-light leading-relaxed flex items-start text-sm">
                        <span className="text-clay mr-3 font-serif">/</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Selected AI/ML Projects Summary */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">03. AI/ML Engineering Projects</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "AI Automation SaaS", desc: "Quantumstacks Lab — End-to-end task workflow platform with Groq API summaries & OAuth.", tag: "Groq API · OAuth" },
                { name: "CarbonCut Waste AI", desc: "CNN image recognition achieving 94% accuracy across 6+ waste categorization classes.", tag: "CNN · TensorFlow" },
                { name: "DocuMind Time-Series", desc: "Deep learning time-series classification addressing severe class imbalance.", tag: "LSTM · PyTorch" },
                { name: "Crop Health Analytics", desc: "Hyperspectral image processing pipeline & ML ensemble achieving 89% accuracy.", tag: "Random Forest · SVM" },
                { name: "CardioTwin-H Digital Twin", desc: "AI-driven cardiovascular digital twin combining ML risk prediction & explainability.", tag: "Novel Contribution Award" },
                { name: "SENTINEL Platform", desc: "AMD Slingshot Hackathon 2026 — Full-stack LLM commitment extraction & risk scoring.", tag: "React 19 · Llama 3.3" },
                { name: "Vynta v2.0 Android", desc: "AI task scheduler mapping natural language to Google Calendar based on daily energy levels.", tag: "Kotlin · Room DB" },
              ].map((proj) => (
                <div key={proj.name} className="p-6 bg-surface/30 border border-sand/20 rounded-xl hover:border-clay/40 transition-colors">
                  <span className="text-[9px] uppercase tracking-widest text-clay font-bold">{proj.tag}</span>
                  <h4 className="text-lg font-serif text-espresso mt-1 mb-2">{proj.name}</h4>
                  <p className="text-xs text-espresso/70 font-light leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Education & Academic Progression */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">04. Education & Academic Progression</h2>
          </ScrollReveal>
          <div className="space-y-12">
            {education.map((edu, i) => (
              <ScrollReveal key={i} direction="up" delay={0.1}>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-sand/15 pb-4">
                    <div>
                      <h3 className="text-2xl font-serif text-espresso">{edu.institution}</h3>
                      <p className="text-clay text-xs uppercase tracking-widest mt-1 font-semibold">{edu.degree}</p>
                    </div>
                    <p className="text-sand text-[11px] uppercase tracking-widest font-bold bg-sand/10 px-3 py-1 rounded-full">{edu.period}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="p-4 bg-cream border border-sand/20 rounded-lg">
                      <p className="text-[10px] uppercase tracking-widest text-sand font-bold">Cumulative GPA (Semester 4)</p>
                      <p className="text-2xl font-serif text-espresso font-semibold mt-1">{edu.cgpa}</p>
                    </div>
                    <div className="p-4 bg-cream border border-sand/20 rounded-lg">
                      <p className="text-[10px] uppercase tracking-widest text-sand font-bold">Academic Progression Trajectory</p>
                      <p className="text-lg font-serif text-clay font-medium mt-1">{edu.trajectory}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Awards & Achievements */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">05. Awards & Recognition</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {awards.map((award, i) => (
                <div key={i} className="p-5 bg-cream border border-sand/20 rounded-xl hover:border-clay/40 transition-colors flex items-start space-x-4">
                  <Award className="text-clay shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-sans font-bold text-espresso uppercase tracking-wider">{award.title}</h4>
                    <p className="text-xs text-espresso/70 font-light mt-1">{award.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Technical Toolkit */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">06. Technical Skills</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {Object.entries(skills).map(([category, items], i) => (
              <ScrollReveal key={category} direction="up" delay={0.05 + i * 0.05}>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold mb-3 border-b border-sand/20 pb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="text-espresso/80 text-[11px] font-sans bg-sand/10 px-2.5 py-1 rounded-md border border-sand/15 hover:border-clay/30 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
          <ScrollReveal direction="up" className="md:border-r border-sand/20">
            <h2 className="text-xs font-serif italic text-clay uppercase tracking-[0.2em]">07. Languages</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap gap-6">
              {languages.map((lang) => (
                <div key={lang.name} className="px-6 py-4 bg-cream border border-sand/20 rounded-xl text-center">
                  <p className="text-base font-serif text-espresso font-medium">{lang.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-clay font-semibold mt-1">{lang.level}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Download Action */}
        <ScrollReveal direction="up" className="border-t border-sand/30 pt-20 pb-32 text-center">
          <p className="font-serif italic text-sm text-sand uppercase tracking-[0.2em] mb-8">Need a physical copy?</p>
          <Magnetic strength={0.3}>
            <a 
              href="/resume/Murshid_ATS_Resume_v4.docx" 
              download
              className="inline-flex items-center space-x-4 bg-espresso text-cream px-12 py-6 rounded-full group hover:bg-clay transition-colors duration-500"
            >
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Download Full Resume (ATS Docx)</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform duration-500">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </Magnetic>
        </ScrollReveal>
      </div>

      <Contact />
    </main>
  );
}

