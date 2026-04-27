"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import { Plus, Edit2, Trash2, Globe, Lock } from "lucide-react";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
    }
  }

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPosts(data || []);
    setLoading(false);
  }

  async function togglePublish(id: string, currentStatus: boolean) {
    const { error } = await supabase
      .from("posts")
      .update({ is_published: !currentStatus })
      .eq("id", id);

    if (!error) fetchPosts();
  }

  async function deletePost(id: string) {
    if (confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (!error) fetchPosts();
    }
  }

  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-20">
        <ScrollReveal direction="up" className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-5xl font-serif text-espresso">Studio Dashboard</h1>
            <p className="text-sand text-xs uppercase tracking-widest mt-2">Manage your writing</p>
          </div>
          <Link 
            href="/admin/new" 
            className="bg-clay text-cream px-8 py-4 flex items-center space-x-2 hover:bg-espresso transition-colors group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-serif text-lg">New Post</span>
          </Link>
        </ScrollReveal>

        {loading ? (
          <p className="font-serif italic text-sand">Loading your thoughts...</p>
        ) : (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="border border-dashed border-sand/50 p-20 text-center">
                <p className="text-sand font-light italic">No posts yet. Start writing your story.</p>
              </div>
            ) : (
              posts.map((post) => (
                <ScrollReveal 
                  key={post.id} 
                  direction="up" 
                  className="bg-white/50 border border-sand/20 p-8 flex items-center justify-between group hover:border-clay/30 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif text-espresso group-hover:text-clay transition-colors">{post.title}</h3>
                    <div className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] text-sand">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span className="flex items-center space-x-1">
                        {post.is_published ? (
                          <><Globe size={10} className="text-clay" /> <span className="text-clay">Published</span></>
                        ) : (
                          <><Lock size={10} /> <span>Draft</span></>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => togglePublish(post.id, post.is_published)}
                      className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 hover:text-clay transition-colors"
                    >
                      {post.is_published ? "Unpublish" : "Publish"}
                    </button>
                    <Link href={`/admin/edit/${post.id}`} className="text-sand hover:text-clay transition-colors">
                      <Edit2 size={18} />
                    </Link>
                    <button 
                      onClick={() => deletePost(post.id)}
                      className="text-sand hover:text-clay transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
