"use client";

import ScrollReveal from "./ScrollReveal";
import Link from "next/link";

const posts = [
  {
    title: "AI-Driven Combustion Instability Prediction",
    date: "Sep 2025",
    readTime: "YASSC 2025",
    featured: true,
    excerpt: "Research on using Temporal Convolutional Networks (TCN) to achieve 92% accuracy in predicting instability in hybrid rocket engines, outperforming LSTM baselines."
  },
  {
    title: "Mental State Prediction via Deep Learning",
    date: "2024",
    readTime: "Research Paper",
    featured: false,
  },
  {
    title: "LLM Commitment Extraction Pipelines",
    date: "2026",
    readTime: "Technical Blog",
    featured: false,
  },
];

export default function Writing() {
  const featured = posts.find(p => p.featured);
  const regular = posts.filter(p => !p.featured);

  return (
    <section id="writing" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <ScrollReveal direction="up" delay={0.1}>
        <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-12">
          writing
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Featured Post */}
        {featured && (
          <ScrollReveal direction="up" delay={0.2}>
            <div className="bg-walnut/5 p-8 md:p-12 h-full flex flex-col justify-between group cursor-pointer border border-transparent hover:border-sand/30 transition-all duration-500">
              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs text-sand uppercase tracking-widest font-medium">
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
                <h3 className="text-3xl md:text-4xl text-espresso font-serif leading-tight group-hover:text-clay transition-colors">
                  {featured.title}
                </h3>
                <p className="text-espresso/70 font-sans font-light leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>
              <div className="mt-12">
                <span className="text-clay text-sm uppercase tracking-widest font-medium border-b border-clay/30 pb-1 group-hover:border-clay transition-all">
                  Read article →
                </span>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Regular Posts List */}
        <div className="flex flex-col justify-center space-y-8">
          {regular.map((post, i) => (
            <ScrollReveal key={post.title} direction="up" delay={0.3 + i * 0.1}>
              <div className="group cursor-pointer border-b border-sand/30 pb-8 flex justify-between items-end">
                <div className="space-y-2">
                   <p className="text-[10px] text-sand uppercase tracking-widest font-medium">
                    {post.date} · {post.readTime}
                  </p>
                  <h4 className="text-xl md:text-2xl text-espresso font-serif group-hover:text-clay transition-colors">
                    {post.title}
                  </h4>
                </div>
                <span className="text-clay text-xl opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  →
                </span>
              </div>
            </ScrollReveal>
          ))}
          
          <ScrollReveal direction="up" delay={0.5} className="pt-8">
            <Link href="/writing" className="text-clay text-sm uppercase tracking-widest font-medium border-b border-clay/30 pb-1 hover:border-clay transition-all">
              View all writing →
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
