"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, RefreshCw } from "lucide-react";

export default function NowEditor() {
  const [content, setContent] = useState({
    building: "",
    studying: "",
    looking_for: "",
    thinking_about: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      const res = await fetch("/api/now");
      const data = await res.json();
      if (data) {
        setContent({
          building: data.building || "",
          studying: data.studying || "",
          looking_for: data.looking_for || "",
          thinking_about: data.thinking_about || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch Now content:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!res.ok) throw new Error("Failed to save");
      
      setMessage({ type: "success", text: "Now page updated successfully." });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: "Error saving changes." });
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) return <p className="font-serif italic text-sand">Loading editor...</p>;

  return (
    <div className="bg-white/50 border border-sand/20 p-8 space-y-8">
      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Building</label>
          <textarea
            value={content.building}
            onChange={(e) => setContent({ ...content, building: e.target.value })}
            className="w-full bg-cream/50 border border-sand/20 p-4 font-serif text-espresso focus:border-clay outline-none transition-colors h-24 resize-none"
            placeholder="What projects are consuming your headspace?"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Studying</label>
          <textarea
            value={content.studying}
            onChange={(e) => setContent({ ...content, studying: e.target.value })}
            className="w-full bg-cream/50 border border-sand/20 p-4 font-serif text-espresso focus:border-clay outline-none transition-colors h-24 resize-none"
            placeholder="What are you learning or reading?"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Looking For</label>
          <textarea
            value={content.looking_for}
            onChange={(e) => setContent({ ...content, looking_for: e.target.value })}
            className="w-full bg-cream/50 border border-sand/20 p-4 font-serif text-espresso focus:border-clay outline-none transition-colors h-24 resize-none"
            placeholder="Any specific opportunities you are seeking?"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">Thinking About</label>
          <textarea
            value={content.thinking_about}
            onChange={(e) => setContent({ ...content, thinking_about: e.target.value })}
            className="w-full bg-cream/50 border border-sand/20 p-4 font-serif text-espresso focus:border-clay outline-none transition-colors h-24 resize-none"
            placeholder="A question or direction you are considering..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-sand/10">
        {message && (
          <p className={`text-xs uppercase tracking-widest font-bold ${message.type === "success" ? "text-clay" : "text-red-500"}`}>
            {message.text}
          </p>
        )}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="ml-auto bg-espresso text-cream px-8 py-3 flex items-center space-x-2 hover:bg-clay transition-colors disabled:opacity-50 group"
        >
          {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
          <span className="font-serif text-lg">{isSaving ? "Saving..." : "Update Now Page"}</span>
        </button>
      </div>
    </div>
  );
}
