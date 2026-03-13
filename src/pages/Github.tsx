import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { Github as GithubIcon, Star, GitFork, Circle } from 'lucide-react';

export default function Github() {
  const repos = [
    { name: "Combustion-Instability-TCN", stars: 12, forks: 4, lang: "Python", color: "bg-blue-500" },
    { name: "DocuMind-Mental-Health", stars: 8, forks: 2, lang: "Jupyter Notebook", color: "bg-orange-500" },
    { name: "Ground-Station-Dashboard", stars: 15, forks: 5, lang: "Python", color: "bg-blue-500" },
    { name: "Crop-Health-Hyperspectral", stars: 10, forks: 3, lang: "Python", color: "bg-blue-500" },
  ];

  return (
    <PageLayout title="Open Source">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center sticky top-8">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <GithubIcon size={64} />
            </div>
            <h2 className="text-2xl font-bold mb-2">@murshidr</h2>
            <p className="text-gray-400 mb-6">Exploring Space Tech & AI</p>
            <a
              href="https://github.com/murshidr"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Follow on GitHub
            </a>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div>
                <span className="block text-2xl font-bold">15+</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Repositories</span>
              </div>
              <div>
                <span className="block text-2xl font-bold">Active</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Status</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Contribution Graph Simulation */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Contribution Activity
            </h3>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {Array.from({ length: 52 }).map((_, week) => (
                  <div key={week} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, day) => {
                      const level = Math.random();
                      let color = "bg-white/5";
                      if (level > 0.9) color = "bg-green-500";
                      else if (level > 0.7) color = "bg-green-500/70";
                      else if (level > 0.4) color = "bg-green-500/40";

                      return (
                        <div
                          key={day}
                          className={`w-3 h-3 rounded-sm ${color}`}
                          title={`${Math.floor(level * 10)} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pinned Repos */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Featured Repositories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold group-hover:text-blue-400 transition-colors">{repo.name}</span>
                    <div className="px-2 py-1 rounded-full bg-white/5 text-xs border border-white/5">Public</div>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                    Project related to {repo.name.replace(/-/g, ' ')}.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Circle size={10} className={`${repo.color.replace('bg-', 'text-')} fill-current`} />
                      {repo.lang}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} /> {repo.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={12} /> {repo.forks}
                    </div>
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
