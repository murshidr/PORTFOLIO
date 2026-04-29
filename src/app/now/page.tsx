"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import Contact from "@/components/Contact";
import NowSection from "@/components/NowSection";

import { supabase } from "@/lib/supabase";

export default function NowPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: json, error } = await supabase
          .from("now_content")
          .select("*")
          .single();
          
        if (error && error.code !== "PGRST116") throw error;
        setData(json);
      } catch (err) {
        console.error("Failed to fetch Now content:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <ScrollReveal direction="up" className="mb-24">
          <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-4">
            Presence
          </p>
          <h1 className="text-5xl md:text-8xl font-serif text-espresso leading-[0.8] mb-8">
            Now.
          </h1>
          {data?.last_updated && (
            <p className="text-sand text-[10px] uppercase tracking-[0.2em] font-bold">
              Last updated: {new Date(data.last_updated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          )}
          <p className="mt-12 text-espresso/60 font-light text-lg leading-relaxed max-w-xl italic">
            This is a "Now" page. It’s not a resume or a blog—it’s a snapshot of what I’m focused on in this exact moment of my life. Inspired by Derek Sivers.
          </p>
        </ScrollReveal>

        {loading ? (
          <div className="py-20 animate-pulse">
            <p className="font-serif italic text-sand text-xl">Capturing the moment...</p>
          </div>
        ) : (
          <div className="space-y-32">
            <NowSection title="Building" content={data?.building} delay={0.1} />
            <NowSection title="Studying" content={data?.studying} delay={0.2} />
            <NowSection title="Looking for" content={data?.looking_for} delay={0.3} />
            <NowSection title="Thinking about" content={data?.thinking_about} delay={0.4} />
          </div>
        )}
      </div>
      <Contact />
    </main>
  );
}
