import ScrollReveal from "./ScrollReveal";

interface NowSectionProps {
  title: string;
  content: string;
  delay?: number;
}

export default function NowSection({ title, content, delay = 0 }: NowSectionProps) {
  if (!content) return null;

  return (
    <ScrollReveal direction="up" delay={delay} className="border-t border-sand/20 pt-12">
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
        <h2 className="text-3xl md:text-5xl font-serif text-espresso leading-tight">
          {title}
        </h2>
        <div className="space-y-6">
          <p className="text-espresso/80 font-light text-xl md:text-2xl leading-relaxed italic max-w-2xl">
            {content}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
