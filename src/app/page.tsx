import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import DetailedAbout from "@/components/DetailedAbout";
import Contact from "@/components/Contact";

const techStack = [
  "PyTorch", "Llama 3.3", "Groq", "FastAPI", "React 19", "TensorFlow", "Space Tech AI", "RAG Systems", "Agentic Workflows"
];

export default function Home() {
  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <Hero />
      
      {/* Manifesto Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-32">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <p className="text-sm font-serif italic text-clay uppercase tracking-[0.2em]">
              manifesto
            </p>
            <div className="space-y-12">
              <h2 className="text-3xl md:text-5xl font-serif text-espresso leading-tight font-light text-balance">
                In a world of noise, I build for the <span className="italic">quiet.</span> Systems that don't just process data, but understand intent.
              </h2>
              <div className="flex flex-wrap gap-8">
                <Link href="/work" className="group flex items-center space-x-3 text-clay text-sm uppercase tracking-widest font-medium">
                  <span>Explore Projects</span>
                  <span className="w-8 h-[1px] bg-clay group-hover:w-12 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Integrated About Section */}
      <section className="bg-sand/5">
        <DetailedAbout />
      </section>

      {/* Blog Teaser Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-32 border-t border-sand/20">
        <ScrollReveal direction="up" className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xl">
            <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-4">
              journal
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-espresso leading-tight mb-8">
              Thoughts on AI, <br />
              <span className="italic">Space & Intent.</span>
            </h2>
            <Link href="/blog" className="group flex items-center space-x-4 text-clay text-sm uppercase tracking-widest font-bold">
              <span>View the Archives</span>
              <div className="w-12 h-[1px] bg-clay group-hover:w-20 transition-all duration-500" />
            </Link>
          </div>
          <div className="flex-1 md:text-right">
             <p className="text-espresso/60 font-light text-lg leading-relaxed italic max-w-sm ml-auto">
               "We don't just build systems; we curate experiences that feel like quiet, intelligent extensions of ourselves."
             </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Tech Marquee */}
      <section className="py-24 border-t border-sand/20 overflow-hidden bg-walnut/[0.02]">
        <div className="flex whitespace-nowrap animate-pulse-slow">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex space-x-12 px-6 items-center">
              {techStack.map((tech) => (
                <span key={tech} className="text-sand font-sans text-[10px] uppercase tracking-[0.3em] font-medium">
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
