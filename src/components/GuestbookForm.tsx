"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GuestbookFormProps {
  onSuccess: () => void;
}

export default function GuestbookForm({ onSuccess }: GuestbookFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
      setName("");
      setMessage("");
      onSuccess();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-sand/10 border border-sand/20 p-8 rounded-sm backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="py-12 text-center space-y-4"
          >
            <p className="font-serif italic text-2xl text-clay">Thank you for your kind words.</p>
            <p className="text-espresso/60 text-sm uppercase tracking-widest">Your message has been added.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold block">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-b border-sand/30 py-2 focus:border-clay outline-none transition-colors text-espresso font-serif text-lg placeholder:text-sand/50 placeholder:italic"
                placeholder="How should I call you?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold block">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full bg-transparent border-b border-sand/30 py-2 focus:border-clay outline-none transition-colors text-espresso font-serif text-lg placeholder:text-sand/50 placeholder:italic resize-none"
                placeholder="Share your thoughts or feedback..."
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-sans tracking-wide">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center space-x-4 text-clay text-sm uppercase tracking-widest font-bold disabled:opacity-50"
            >
              <span>{isSubmitting ? "Sending..." : "Leave a Note"}</span>
              <div className="w-12 h-[1px] bg-clay group-hover:w-20 transition-all duration-500" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
