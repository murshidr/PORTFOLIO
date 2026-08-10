"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const skills = {
  "Programming": ["Python", "C++", "C", "Java", "Kotlin", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  "AI & Machine Learning": ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Deep Learning", "CNNs", "LSTMs", "TCNs", "Time-Series Classification"],
  "AI Applications": ["Computer Vision", "NLP", "LLM Applications", "Prompt Engineering", "AI-powered Automation", "Predictive Analytics"],
  "Data & Processing": ["Pandas", "NumPy", "Data Cleaning", "Data Preprocessing", "Feature Engineering", "Sensor/Data Fusion"],
  "Development & Deployment": ["FastAPI", "Flask", "REST APIs", "WebSockets", "Git/GitHub", "Linux/WSL", "SQLite", "PostgreSQL", "Supabase", "Redis", "MATLAB"],
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

export default function DetailedAbout() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-40 space-y-48">
      {/* Intro Section */}
      <section className="grid md:grid-cols-[1.5fr_1fr] gap-24 items-start relative">
         <div className="absolute -left-12 -top-12 text-[12rem] font-serif font-light text-sand/10 pointer-events-none select-none hidden md:block">
            01
         </div>
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-[1px] bg-clay" />
              <span className="text-label text-clay">The Story</span>
            </div>
            <h2 className="text-editorial-h2 text-espresso">
              AI Research Engineer <br />
              <span className="text-editorial-display text-clay">Applied Systems & Data Science.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 pt-8">
               <p className="text-xl font-light text-espresso leading-relaxed">
                  B.Tech CS (Data Science & AI) student at Dr. M.G.R Educational and Research Institute (CGPA 8.60/10.00) with hands-on experience building applied AI, machine learning, and deep learning systems.
               </p>
               <p className="text-espresso/70 font-light leading-relaxed">
                  Experienced across aerospace TCN models, computer vision, NLP, and LLM-powered applications like SENTINEL and Quantumstacks Lab SaaS. Focused on Document Intelligence, OCR, and practical AI solutions that turn complex data into intent.
               </p>
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.3}>
          <div className="relative group">
            <div className="absolute inset-0 border border-sand/30 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
            <div className="relative aspect-[3/4] overflow-hidden grayscale contrast-125 bg-espresso">
              <Image
                src="/profile.jpeg"
                alt="Murshid R."
                fill
                className="object-cover transition-all duration-1000 scale-110 group-hover:scale-100 opacity-90 group-hover:opacity-100"
                priority
              />
            </div>
             <p className="text-label text-sand mt-8 text-right">Portrait / 2024</p>
          </div>
        </ScrollReveal>
      </section>

      {/* Experience Section */}
      <section className="relative">
         <div className="absolute -right-12 -top-12 text-[12rem] font-serif font-light text-sand/10 pointer-events-none select-none hidden md:block">
            02
         </div>
        <div className="space-y-16">
          <ScrollReveal direction="up">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-[1px] bg-clay" />
              <span className="text-label text-clay">Experience</span>
            </div>
          </ScrollReveal>
          <div className="space-y-32">
            {experience.map((exp, i) => (
              <ScrollReveal key={i} direction="up" delay={0.2}>
                <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-start border-t border-sand/20 pt-12">
                  <div>
                    <h3 className="text-3xl font-serif text-espresso leading-tight">{exp.role}</h3>
                    <p className="text-sand text-[10px] uppercase tracking-[0.2em] mt-3 font-bold">{exp.company}</p>
                    <p className="text-sand text-[10px] mt-2 italic">{exp.period}</p>
                  </div>
                  <ul className="space-y-6">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-espresso/80 font-light leading-relaxed flex items-start text-lg">
                        <span className="text-clay mr-6 font-serif">/</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="relative">
        <ScrollReveal direction="up" className="space-y-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-[1px] bg-clay" />
            <span className="text-label text-clay">The Toolkit</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {Object.entries(skills).map(([category, items], i) => (
              <div key={category} className="space-y-8">
                <h4 className="text-label text-sand border-b border-sand/20 pb-4">{category}</h4>
                <ul className="space-y-3">
                  {items.map(item => (
                    <li key={item} className="text-espresso font-light text-sm hover:text-clay transition-colors duration-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

