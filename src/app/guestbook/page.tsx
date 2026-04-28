"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import Contact from "@/components/Contact";
import GuestbookForm from "@/components/GuestbookForm";
import GuestbookList from "@/components/GuestbookList";

export default function GuestbookPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/guestbook");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        {/* Header Section */}
        <ScrollReveal direction="up" className="mb-20">
          <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-4">
            community
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-espresso leading-[0.9]">
            The <br />
            <span className="italic font-light text-clay">Guestbook.</span>
          </h1>
          <p className="mt-8 text-espresso/60 font-light text-lg leading-relaxed max-w-2xl">
            A space for friends, colleagues, and fellow builders to leave a mark. 
            Thank you for being part of this journey.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-20 items-start">
          {/* Sticky Form Section */}
          <div className="lg:sticky lg:top-32">
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-xl font-serif text-espresso mb-8">Leave your mark</h2>
              <GuestbookForm onSuccess={fetchMessages} />
            </ScrollReveal>
          </div>

          {/* Messages List Section */}
          <div className="space-y-12">
            <ScrollReveal direction="up" delay={0.3}>
              <h2 className="text-xl font-serif text-espresso mb-8 border-b border-sand/30 pb-4">
                Recent entries
              </h2>
              {isLoading ? (
                <div className="py-20 text-center animate-pulse">
                   <p className="font-serif italic text-sand text-xl uppercase tracking-widest">Reading the archives...</p>
                </div>
              ) : (
                <GuestbookList messages={messages} />
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
      <Contact />
    </main>
  );
}
