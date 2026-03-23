import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, Calendar, Clock } from 'lucide-react';

const devlogs = [
  {
    title: "Vynta",
    subtitle: "Building an AI Task Scheduler in My Semester Holiday",
    description: "A deep dive into building an AI-powered productivity app using Llama 3, Jetpack Compose, and the Google Calendar API.",
    date: "March 2026",
    readTime: "8 min read",
    image: "/projects/vynta/home.png",
    path: "/devlog/vynta",
    icon: Brain,
    color: "from-blue-500/20 to-purple-500/20",
    borderColor: "border-blue-500/30"
  }
];

export default function Devlogs() {
  return (
    <PageLayout title="Development Logs">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {devlogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={log.path}
                className="group relative flex flex-col md:flex-row bg-white/5 hover:bg-white/10 transition-all duration-500 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30"
              >
                {/* Image Section */}
                <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                  <img 
                    src={log.image} 
                    alt={log.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                     <div className={`p-3 rounded-2xl bg-gradient-to-br ${log.color} backdrop-blur-md border ${log.borderColor}`}>
                        <log.icon size={24} className="text-white" />
                     </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {log.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {log.readTime}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {log.title}
                  </h3>
                  <p className="text-blue-300/80 font-medium mb-4 text-lg italic">
                    {log.subtitle}
                  </p>
                  <p className="text-gray-400 mb-8 line-clamp-2">
                    {log.description}
                  </p>

                  <div className="flex items-center gap-2 text-blue-400 font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                    Read Story <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
