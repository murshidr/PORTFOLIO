import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Briefcase, Award } from 'lucide-react';

export default function Achievements() {
  const milestones = [
    {
      year: "2024-Present",
      title: "Payload & Propellant Chemist",
      company: "Dr. M.G.R ACS Space Technology Centre",
      description: "Conducting detailed combustion behavior analyses on hybrid propellant systems. Engineering payload integration workflows for CubeSat missions.",
      icon: Briefcase,
      color: "text-blue-400"
    },
    {
      year: "2025",
      title: "2nd Place - Paper Presentation",
      company: "YASSC 2025 (Mechanical Dept)",
      description: "Awarded for research on AI-Driven Prediction of Combustion Instability.",
      icon: Trophy,
      color: "text-yellow-400"
    },
    {
      year: "2025",
      title: "Selected Team - National Competition",
      company: "INSPACe Model Rocketry India",
      description: "Enabled team to conduct real-time mission management via custom Ground Station software.",
      icon: Star,
      color: "text-purple-400"
    },
    {
      year: "2025",
      title: "Runner-Up - Promptarhon",
      company: "AI: Beyond the Algorithm Competition",
      description: "Recognized for excellence in AI prompting and application.",
      icon: Zap,
      color: "text-green-400"
    },
    {
      year: "2024",
      title: "TiHAN Program Participant",
      company: "IIT Hyderabad",
      description: "Autonomous Navigation & Robotics Programme.",
      icon: Award,
      color: "text-orange-400"
    },
    {
      year: "2023-2024",
      title: "Mathematics & Chemistry Instructor",
      company: "B.L Learning Institute",
      description: "Taught 50+ students, improving performance by 15-20% through personalized instruction.",
      icon: Briefcase,
      color: "text-pink-400"
    }
  ];

  return (
    <PageLayout title="Experience & Milestones">
      <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12 md:space-y-16 py-8">
        {milestones.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-16"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full bg-black border-2 border-white/20 flex items-center justify-center ${item.color}`}>
              <div className="w-2 h-2 rounded-full bg-current" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="md:w-36 shrink-0">
                <span className={`text-lg font-bold font-mono ${item.color} opacity-80`}>{item.year}</span>
              </div>
              
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-colors flex-1 w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm font-mono text-gray-400 uppercase tracking-wider">{item.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
