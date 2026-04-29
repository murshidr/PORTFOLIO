"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import "easymde/dist/easymde.min.css";

// Dynamic import for the editor to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Auth handled by layout
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug,
        content,
        excerpt,
        is_published: false,
      },
    ]);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <div className="pt-32 px-6 md:px-12 max-w-5xl mx-auto pb-20">
        <ScrollReveal direction="up" className="mb-12">
          <h1 className="text-4xl font-serif text-espresso">New Story</h1>
          <p className="text-sand text-xs uppercase tracking-widest mt-2">Write with intent.</p>
        </ScrollReveal>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Architecture of Quiet Intelligence"
              className="w-full bg-transparent border-b border-sand/30 py-4 text-3xl font-serif text-espresso focus:outline-none focus:border-clay transition-colors placeholder:text-sand/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary of your thoughts..."
              className="w-full bg-transparent border border-sand/30 p-4 text-espresso font-sans font-light focus:outline-none focus:border-clay transition-colors min-h-[100px]"
            />
          </div>

          <div className="space-y-2 prose-cozy">
             <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Content</label>
             <SimpleMDE 
               value={content} 
               onChange={setContent}
               options={{
                 spellChecker: false,
                 status: false,
                 placeholder: "Begin your story...",
                 minHeight: "400px"
               }}
             />
          </div>

          <div className="flex justify-end space-x-6">
             <button
               type="button"
               onClick={() => router.back()}
               className="text-sand hover:text-espresso text-sm uppercase tracking-widest transition-colors"
             >
               Discard
             </button>
             <button
               type="submit"
               disabled={loading}
               className="bg-espresso text-cream px-12 py-4 font-serif text-lg hover:bg-clay transition-colors disabled:opacity-50"
             >
               {loading ? "Saving..." : "Save Draft"}
             </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .editor-toolbar {
          border-color: rgba(200, 168, 130, 0.3) !important;
          border-radius: 0 !important;
          background: rgba(255, 255, 255, 0.3);
        }
        .CodeMirror {
          border-color: rgba(200, 168, 130, 0.3) !important;
          border-radius: 0 !important;
          background: rgba(255, 255, 255, 0.3) !important;
          font-family: var(--font-dm-sans), sans-serif !important;
          font-size: 16px !important;
        }
        .editor-preview-side {
          background: #FDFBF7 !important;
          font-family: var(--font-dm-sans), sans-serif !important;
        }
      `}</style>
    </main>
  );
}
