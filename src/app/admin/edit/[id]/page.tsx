"use client";

import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setExcerpt(data.excerpt || "");
    }
    setLoading(false);
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        slug,
        content,
        excerpt,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      setSaving(false);
    } else {
      router.push("/admin");
    }
  };

  if (loading) return <div className="bg-cream min-h-screen flex items-center justify-center font-serif italic text-sand">Loading...</div>;

  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <div className="pt-32 px-6 md:px-12 max-w-5xl mx-auto pb-20">
        <ScrollReveal direction="up" className="mb-12">
          <h1 className="text-4xl font-serif text-espresso">Edit Story</h1>
          <p className="text-sand text-xs uppercase tracking-widest mt-2">Refine your thoughts.</p>
        </ScrollReveal>

        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-b border-sand/30 py-4 text-3xl font-serif text-espresso focus:outline-none focus:border-clay transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-transparent border border-sand/30 p-4 text-espresso font-sans font-light focus:outline-none focus:border-clay transition-colors min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
             <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Content</label>
             <SimpleMDE 
               value={content} 
               onChange={setContent}
               options={{
                 spellChecker: false,
                 status: false,
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
               Cancel
             </button>
             <button
               type="submit"
               disabled={saving}
               className="bg-espresso text-cream px-12 py-4 font-serif text-lg hover:bg-clay transition-colors disabled:opacity-50"
             >
               {saving ? "Updating..." : "Update Post"}
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
      `}</style>
    </main>
  );
}
