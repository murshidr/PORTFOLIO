"use client";

import { motion } from "framer-motion";

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface GuestbookListProps {
  messages: Message[];
}

export default function GuestbookList({ messages }: GuestbookListProps) {
  if (messages.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif italic text-sand text-xl">The guestbook is waiting for its first note...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {messages.map((msg, i) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-sand/20 pt-8"
        >
          <div className="grid md:grid-cols-[1fr_3fr] gap-4 md:gap-12 items-start">
            <div className="space-y-1">
              <h3 className="font-serif text-espresso text-lg leading-tight">{msg.name}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">
                {new Date(msg.created_at).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric' 
                })}
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-6 -top-2 text-4xl text-sand/20 font-serif italic">"</span>
              <p className="text-espresso/80 font-light leading-relaxed italic text-lg md:text-xl">
                {msg.message}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
