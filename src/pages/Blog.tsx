import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      date: "March 15, 2024",
      title: "The Future of WebGL in Web Design",
      excerpt: "As devices become more powerful, the barrier to entry for immersive 3D experiences on the web is lowering. Here's why I think 2024 is the year of the 'Cinematic Web'.",
      readTime: "5 min read",
      tags: ["WebGL", "Design", "Future"],
      color: "hover:text-blue-400"
    },
    {
      date: "February 2, 2024",
      title: "Mastering React Three Fiber",
      excerpt: "A deep dive into performance optimization techniques for R3F scenes. From instancing to texture compression, here's how to keep your FPS high.",
      readTime: "12 min read",
      tags: ["React", "Three.js", "Performance"],
      color: "hover:text-purple-400"
    },
    {
      date: "January 10, 2024",
      title: "Why I Switched to Tailwind CSS",
      excerpt: "I used to be a CSS-in-JS purist. Here is how utility-first CSS changed my workflow and why I'm never going back.",
      readTime: "8 min read",
      tags: ["CSS", "Tailwind", "DX"],
      color: "hover:text-teal-400"
    }
  ];

  return (
    <PageLayout title="Thoughts & Articles">
      <div className="space-y-16">
        {posts.map((post, index) => (
          <motion.article 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group border-b border-white/10 pb-12 last:border-0"
          >
            <div className="flex flex-col md:flex-row gap-6 md:items-baseline mb-4">
              <span className="font-mono text-sm text-gray-500">{post.date}</span>
              <div className="flex items-center gap-4 text-xs font-mono text-gray-600">
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                <span className="flex items-center gap-1"><Tag size={12} /> {post.tags[0]}</span>
              </div>
            </div>
            
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 transition-colors cursor-pointer ${post.color}`}>
              {post.title}
            </h2>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mb-8">
              {post.excerpt}
            </p>
            
            <a href="#" className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
              Read Article <ArrowRight size={18} />
            </a>
          </motion.article>
        ))}
      </div>
    </PageLayout>
  );
}
