"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const techGroups = [
  {
    category: "AI & Deep Learning",
    skills: ["PyTorch", "TensorFlow", "Keras", "Llama 3.3", "Groq API"],
    color: "bg-clay"
  },
  {
    category: "Applications & Web",
    skills: ["FastAPI", "Flask", "React 19", "TypeScript", "Supabase"],
    color: "bg-walnut"
  },
  {
    category: "Languages & Core",
    skills: ["Python", "C++", "Kotlin", "Pandas", "Scikit-learn"],
    color: "bg-sand"
  }
];

export default function TechRadar() {
  return (
    <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden relative">
      <ScrollReveal direction="up">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-8 h-[1px] bg-clay" />
            <span className="text-label text-clay">Technical DNA</span>
            <div className="w-8 h-[1px] bg-clay" />
          </div>
          <h2 className="text-editorial-h2 text-espresso">The Stack.</h2>
        </div>
      </ScrollReveal>

      <div className="relative h-[600px] flex items-center justify-center">
        {/* Central Core */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-64 bg-clay/5 rounded-full blur-3xl pointer-events-none"
        />

        {/* Orbiting Tech Groups */}
        {techGroups.map((group, groupIdx) => (
          <div key={group.category} className="absolute inset-0 flex items-center justify-center">
             {group.skills.map((skill, skillIdx) => {
                const angle = (skillIdx / group.skills.length) * 2 * Math.PI + (groupIdx * 1);
                const radius = 150 + groupIdx * 80;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{ 
                      x: [x, x + 10, x],
                      y: [y, y - 10, y],
                    }}
                    transition={{ 
                      duration: 5 + skillIdx,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: groupIdx * 0.2 + skillIdx * 0.1
                    }}
                    className="absolute cursor-default group"
                  >
                    <div className="relative">
                       <span className={`px-4 py-2 rounded-full border border-sand/20 bg-cream/80 backdrop-blur-sm text-[10px] uppercase tracking-widest text-espresso font-medium shadow-sm group-hover:border-clay group-hover:text-clay transition-colors duration-500`}>
                        {skill}
                      </span>
                      <div className={`absolute -inset-1 ${group.color}/5 blur-md rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                  </motion.div>
                );
             })}
          </div>
        ))}

        {/* Labels for Categories */}
        <div className="absolute bottom-0 flex gap-12 justify-center w-full">
           {techGroups.map((group) => (
             <div key={group.category} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${group.color}`} />
                <span className="text-[10px] uppercase tracking-widest text-sand font-bold">{group.category}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
