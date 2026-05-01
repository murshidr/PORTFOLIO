"use client";

import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import "easymde/dist/easymde.min.css";

import { useMemo } from "react";
import { uploadBlogImage } from "@/lib/storage";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const editorOptions = useMemo(() => {
    return {
      spellChecker: false,
      status: false,
      placeholder: "Refine your story...",
      minHeight: "500px",
      uploadImage: true,
      imageUploadFunction: async (file: File, onSuccess: (url: string) => void, onError: (err: string) => void) => {
        try {
          const url = await uploadBlogImage(file);
          onSuccess(url);
        } catch (err: any) {
          onError(err.message);
          alert("Upload failed: " + err.message);
        }
      },
      toolbar: [
        "bold", "italic", "heading", "|", 
        "quote", "unordered-list", "ordered-list", "|", 
        "link", "image", "|", 
        "preview", "side-by-side", "fullscreen", "|", 
        "guide"
      ],
    };
  }, []);

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

        <form onSubmit={handleUpdate} className="space-y-12">
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-b border-sand/30 py-4 text-3xl md:text-5xl font-serif text-espresso focus:outline-none focus:border-clay transition-colors"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-transparent border border-sand/30 p-6 text-espresso font-sans font-light focus:outline-none focus:border-clay transition-all min-h-[120px] text-lg leading-relaxed"
            />
          </div>

          <div className="space-y-4 editor-container">
             <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Content</label>
             <SimpleMDE 
               value={content} 
               onChange={setContent}
               options={editorOptions as any}
             />
          </div>

          <div className="flex justify-end items-center space-x-8 pt-8 border-t border-sand/10">
             <button
               type="button"
               onClick={() => router.back()}
               className="text-sand hover:text-espresso text-xs uppercase tracking-[0.2em] font-bold transition-colors"
             >
               Cancel
             </button>
             <button
               type="submit"
               disabled={saving}
               className="bg-espresso text-cream px-16 py-5 font-serif text-xl hover:bg-clay transition-all duration-500 disabled:opacity-50 shadow-xl hover:shadow-clay/20"
             >
               {saving ? "Updating..." : "Update Post"}
             </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .editor-toolbar {
          border: 1px solid var(--border-color) !important;
          border-bottom: none !important;
          border-radius: 0 !important;
          background: var(--surface);
          padding: 10px !important;
          backdrop-filter: blur(10px);
        }
        .editor-toolbar button {
          color: var(--foreground) !important;
          border-radius: 0 !important;
          transition: all 0.3s;
        }
        .editor-toolbar button:hover {
          background: rgba(160, 82, 45, 0.1) !important;
          color: var(--color-clay) !important;
        }
        .editor-toolbar button.active {
          background: var(--foreground) !important;
          color: var(--background) !important;
        }
        .CodeMirror {
          border: 1px solid var(--border-color) !important;
          border-radius: 0 !important;
          background: transparent !important;
          font-family: var(--font-dm-sans), sans-serif !important;
          font-size: 18px !important;
          line-height: 1.8 !important;
          padding: 20px !important;
          color: var(--foreground) !important;
          min-height: 500px !important;
        }
        .CodeMirror-cursor {
          border-left: 2px solid var(--color-clay) !important;
        }
        .editor-preview-side, .editor-preview {
          background: var(--background) !important;
          font-family: var(--font-serif), serif !important;
          color: var(--foreground) !important;
          padding: 40px !important;
          line-height: 1.8 !important;
        }
        .editor-preview h1, .editor-preview h2 {
          font-family: var(--font-serif), serif !important;
          margin-top: 2em;
          margin-bottom: 1em;
        }
      `}</style>
    </main>
  );
}
