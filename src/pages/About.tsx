import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { Code, Palette, Terminal, Cpu, GraduationCap, BookOpen } from 'lucide-react';

export default function About() {
  const skills = [
    { category: "Languages", icon: Code, items: ["Python (Expert)", "C++", "JavaScript", "Java", "C", "SQL", "HTML/CSS"] },
    { category: "AI & ML", icon: Cpu, items: ["Deep Learning", "PyTorch", "TensorFlow", "TCNs", "CNN", "Computer Vision", "NLP", "Bayesian Optimization"] },
    { category: "Specialized", icon: Terminal, items: ["Hybrid Propulsion Analysis", "Real-Time Telemetry", "Digital Twin", "Sensor Fusion", "Hyperspectral Imaging"] },
    { category: "Tools", icon: Palette, items: ["Git/GitHub", "Linux/WSL", "MATLAB", "Flask/FastAPI", "SQLite", "Figma"] }
  ];

  return (
    <PageLayout title="About Me">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="relative aspect-square rounded-3xl overflow-hidden mb-8 border border-white/10">
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold">Murshid R</h3>
                <p className="text-blue-400 font-mono text-sm">Student | AI & Data Science</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-400 font-mono">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Location</span>
                <span className="text-white">Chennai, Tamil Nadu</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Education</span>
                <span className="text-white">B.Tech CSE (Data Science)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Status</span>
                <span className="text-green-400">Student</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-500 rounded-full" />
              Professional Profile
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I am a dedicated student specializing in Computer Science with a deep-rooted passion for Data Science and Artificial Intelligence. My work bridges the gap between complex research and impactful, real-world applications.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              From developing real-time predictive models for aerospace systems to building automated enterprise pipelines, I thrive on solving intricate problems with clean code and innovative data strategies.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Beyond the classroom, I am a continuous learner, constantly exploring the evolving frontiers of Deep Learning and Space Technology, always eager to translate theoretical insights into production-ready solutions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-purple-500 rounded-full" />
              Education
            </h2>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">B.Tech in Computer Science and Engineering</h3>
                  <p className="text-blue-400">Data Science & AI Specialization</p>
                </div>
                <span className="text-sm font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full">2023 -- Present</span>
              </div>
              <p className="text-gray-300 mb-4">Dr. M.G.R Educational and Research Institute, Chennai</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Cumulative GPA: <span className="text-white font-bold">8.60/10.00</span> (Semester 4)</p>
                <p>• Consistent Upward Trajectory: 7.38 (S1) → 7.71 (S2) → 8.14 (S3) → 8.60 (S4)</p>
                <p>• Relevant Coursework: Machine Learning, Deep Learning, Data Structures & Algorithms, Databases, Operating Systems, Computer Networks, Signal Processing</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-green-500 rounded-full" />
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4 text-white">
                    <skill.icon size={20} className="text-gray-400" />
                    <h3 className="font-bold">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(item => (
                      <span key={item} className="px-2 py-1 bg-black/30 rounded text-xs font-mono text-gray-300 border border-white/5">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
