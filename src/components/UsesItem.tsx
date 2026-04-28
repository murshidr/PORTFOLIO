"use client";

import { motion } from "framer-motion";

interface UsesItemProps {
  name: string;
  description: string;
  category?: string;
}

export default function UsesItem({ name, description, category }: UsesItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group border-b border-sand/20 py-8 last:border-0"
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 items-baseline">
        <div className="space-y-1">
          {category && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold block mb-2">
              {category}
            </span>
          )}
          <h3 className="font-serif text-xl md:text-2xl text-espresso group-hover:text-clay transition-colors duration-500">
            {name}
          </h3>
        </div>
        <p className="text-espresso/70 font-light leading-relaxed max-w-xl text-lg italic">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
