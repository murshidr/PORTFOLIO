import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import Contact from "@/components/Contact";
import UsesItem from "@/components/UsesItem";

const hardware = [
  { name: "Lenovo LOQ", description: "A reliable daily driver that keeps up with every build and every experiment." },
  { name: "Google Pixel 9a", description: "I looovvvveeeee Google Pixel. The pure intent behind its design is unmatched." },
];

const development = [
  { name: "VS Code & Cursor", description: "The workspace where ideas turn into reality. Paired with the Abyss theme for that deep focus." },
  { name: "Antigravity", description: "My intelligent companion in the coding trenches. Theme: Abyss." },
  { name: "Brave Browser", description: "Clean, fast, and focused. Keeping the noise out while I explore the web." },
  { name: "Apple Music", description: "Without this, I'm not alive. The rhythm that drives my creative flow." },
  { name: "NotebookLM", description: "My personal research assistant for synthesizing complex thoughts." },
];

const audio = [
  { name: "Wired JBL Earbuds", description: "The reliability of a wired connection. No charging needed, just pure sound." },
];

export default function UsesPage() {
  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <ScrollReveal direction="up" className="mb-20">
          <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-4">
            essentials
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-espresso leading-[0.9]">
            The <br />
            <span className="italic font-light text-clay">Toolbox.</span>
          </h1>
          <p className="mt-8 text-espresso/60 font-light text-lg leading-relaxed max-w-2xl">
            A living collection of the hardware, software, and tools I rely on to build quiet, intelligent things.
          </p>
        </ScrollReveal>

        <section className="space-y-24">
          {/* Hardware Section */}
          <ScrollReveal direction="up">
            <h2 className="text-sm font-sans font-bold uppercase tracking-[0.3em] text-sand border-b border-sand/20 pb-4 mb-8">
              Hardware
            </h2>
            <div className="space-y-4">
              {hardware.map((item) => (
                <UsesItem key={item.name} name={item.name} description={item.description} />
              ))}
            </div>
          </ScrollReveal>

          {/* Development Section */}
          <ScrollReveal direction="up">
            <h2 className="text-sm font-sans font-bold uppercase tracking-[0.3em] text-sand border-b border-sand/20 pb-4 mb-8">
              Development & Productivity
            </h2>
            <div className="space-y-4">
              {development.map((item) => (
                <UsesItem key={item.name} name={item.name} description={item.description} />
              ))}
            </div>
          </ScrollReveal>

          {/* Audio Section */}
          <ScrollReveal direction="up">
            <h2 className="text-sm font-sans font-bold uppercase tracking-[0.3em] text-sand border-b border-sand/20 pb-4 mb-8">
              Audio
            </h2>
            <div className="space-y-4">
              {audio.map((item) => (
                <UsesItem key={item.name} name={item.name} description={item.description} />
              ))}
            </div>
          </ScrollReveal>
        </section>
      </div>
      <Contact />
    </main>
  );
}
