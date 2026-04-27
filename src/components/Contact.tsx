"use client";

import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <ScrollReveal direction="up" delay={0.1}>
        <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-12">
          let's talk.
        </p>
      </ScrollReveal>

      <div className="space-y-24">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="space-y-4">
            <a 
              href="mailto:murshidreyas@gmail.com" 
              className="text-[clamp(32px,6vw,64px)] font-serif text-espresso hover:text-clay transition-colors duration-500 relative group inline-block"
            >
              murshidreyas@gmail.com
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-clay transition-all duration-700 group-hover:w-full" />
            </a>
            <p className="text-sand font-sans text-sm tracking-[0.2em]">+91 8939043919</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end">
          <div className="flex flex-wrap gap-8 md:gap-12">
            {[
              { name: "LinkedIn", href: "https://linkedin.com/in/murshid-r-37088b272" },
              { name: "GitHub", href: "https://github.com/murshidr" },
              { name: "Twitter", href: "https://twitter.com/murshidr" },
              { name: "Resume PDF", href: "/resume.pdf" },
            ].map((link, i) => (
              <ScrollReveal key={link.name} direction="up" delay={0.3 + i * 0.1}>
                <a 
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link.name === "Resume PDF" ? "text-clay font-medium uppercase text-xs tracking-widest border-b border-clay/30 hover:border-clay pb-1 transition-all" : "text-sand hover:text-espresso font-sans text-xs uppercase tracking-widest transition-colors"}
                >
                  {link.name}
                </a>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.6} className="md:text-right">
            <div className="space-y-2 text-[10px] uppercase tracking-[0.2em] text-sand font-medium">
              <p>© {currentYear} Murshid R.</p>
              <p>Built with Next.js & Soul</p>
              <p>Chennai, India</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
}
