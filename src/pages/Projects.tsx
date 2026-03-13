import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Rocket, Brain, Leaf, Activity } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "Smart Attendance System",
      description: "A robust desktop application built with Python and CustomTkinter. Features a dual-mode architecture (Admin/Terminal), automated late arrival calculations, and local SQLite data security. Replaces paper logs with a premium dark-mode interface.",
      tags: ["Python", "CustomTkinter", "SQLite", "Pandas"],
      image: "/project_attendance.png",
      link: "#",
      github: "#",
      icon: Activity
    },
    {
      title: "Enterprise Data Automation Pipeline",
      description: "A fully automated self-service pipeline that transforms fragmented CSV exports into production-ready analytical dashboards. Features automated validation, vectorized cleaning with Pandas, and interactive Streamlit BI visualizations.",
      tags: ["Python", "Pandas", "Streamlit", "Plotly"],
      image: "/project_crop_1773207382747.png", // Using an existing image as placeholder for now due to quota
      link: "#",
      github: "#",
      icon: Rocket
    },
    {
      title: "Combustion Instability Prediction",
      description: "Developed Temporal Convolutional Network (TCN) achieving 92% accuracy in real-time combustion instability prediction for hybrid rocket engines. Outperformed baseline LSTM methods.",
      tags: ["Python", "PyTorch", "TCN", "Aerospace"],
      image: "/project_rocket_1773207239835.png",
      link: "#",
      github: "#",
      icon: Rocket
    },
    {
      title: "DocuMind",
      description: "Proactive Mental State Prediction using Deep Learning. Implemented Stacked LSTM architecture to predict mental health states from social media metrics with 81% recall.",
      tags: ["TensorFlow", "LSTM", "Mental Health", "Data Science"],
      image: "/project_documind_1773207253811.png",
      link: "#",
      github: "#",
      icon: Brain
    },
    {
      title: "Ground Station Dashboard",
      description: "Production-grade telemetry dashboard processing live data from 8+ sensor channels at 1000 Hz with <100ms latency. Used for INSPACe Model Rocketry Competition.",
      tags: ["Python", "Flask", "WebSockets", "Real-Time"],
      image: "/project_dashboard_1773207288657.png",
      link: "#",
      github: "#",
      icon: Activity
    },
    {
      title: "CarbonCut",
      description: "AI-Powered Sustainability & Waste Management system. CNN-based image recognition for waste classification (94% accuracy) and CO2 emission estimation.",
      tags: ["TensorFlow", "React", "Firebase", "Sustainability"],
      image: "/project_carboncut_1773207304682.png",
      link: "#",
      github: "#",
      icon: Leaf
    },
    {
      title: "AIDEN AI",
      description: "Intelligent Mental Health & Academic Assistant. Conversational AI combining mood detection and adaptive academic guidance.",
      tags: ["Transformers", "NLP", "Flask", "SQLite"],
      image: "/project_aiden_1773207330650.png",
      link: "#",
      github: "#",
      icon: Brain
    },
    {
      title: "Crop Health Monitoring",
      description: "Hyperspectral AI Analytics for automated crop health assessment. Machine learning ensemble (Random Forest + SVM) for disease prediction.",
      tags: ["Scikit-learn", "OpenCV", "Hyperspectral", "AgriTech"],
      image: "/project_crop_1773207382747.png",
      link: "#",
      github: "#",
      icon: Leaf
    }
  ];

  return (
    <PageLayout title="Projects & Research">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 hover:bg-white/10 transition-all duration-500 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30"
          >
            {/* Image Container */}
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <a href={project.github} className="p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                  <Github size={18} />
                </a>
                <a href={project.link} className="p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                  <ExternalLink size={18} />
                </a>
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <div className="p-2 bg-blue-500/20 backdrop-blur-md rounded-lg border border-blue-500/30 text-blue-300">
                  <project.icon size={20} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 relative z-20">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 group-hover:border-blue-500/30 group-hover:text-blue-300 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
