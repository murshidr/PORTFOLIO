import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

export default function Awards() {
  const awards = [
    {
      title: "Paper Presentation",
      organization: "YASSC 2025",
      date: "September 2025",
      project: "Combustion Instability",
      rank: "2nd Place",
      color: "from-yellow-500/20 to-yellow-600/5",
      borderColor: "hover:border-yellow-500/50",
      textColor: "text-yellow-500"
    },
    {
      title: "Promptarhon",
      organization: "AI: Beyond the Algorithm",
      date: "May 2025",
      project: "AI Prompting",
      rank: "Runner-Up",
      color: "from-blue-500/20 to-blue-600/5",
      borderColor: "hover:border-blue-500/50",
      textColor: "text-blue-500"
    },
    {
      title: "Research Paper",
      organization: "State YASSC 2025",
      date: "August 2025",
      project: "Regional & State Level",
      rank: "Certificate of Appreciation",
      color: "from-purple-500/20 to-purple-600/5",
      borderColor: "hover:border-purple-500/50",
      textColor: "text-purple-500"
    },
    {
      title: "National Competition",
      organization: "INSPACe Model Rocketry",
      date: "October 2025",
      project: "Mission Management",
      rank: "Selected Team",
      color: "from-green-500/20 to-green-600/5",
      borderColor: "hover:border-green-500/50",
      textColor: "text-green-500"
    },
    {
      title: "TiHAN Program",
      organization: "IIT Hyderabad",
      date: "2024",
      project: "Autonomous Navigation",
      rank: "Participant",
      color: "from-orange-500/20 to-orange-600/5",
      borderColor: "hover:border-orange-500/50",
      textColor: "text-orange-500"
    }
  ];

  return (
    <PageLayout title="Honors & Awards">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {awards.map((award, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br ${award.color} ${award.borderColor} transition-all duration-300`}
          >
            <div className="flex justify-between items-start mb-8">
              <Award size={40} className={`${award.textColor} opacity-80`} />
              <span className="font-mono text-xs text-white/40 border border-white/10 px-2 py-1 rounded-full">{award.date}</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{award.title}</h3>
            <p className="text-white/60 font-mono text-sm mb-6 uppercase tracking-wider">{award.organization}</p>
            
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
              <div>
                <p className="text-xs text-white/40 mb-1">Category</p>
                <p className="font-medium">{award.project}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40 mb-1">Result</p>
                <p className={`font-bold ${award.textColor}`}>{award.rank}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
