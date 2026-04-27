import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import Contact from "@/components/Contact";

export const revalidate = 60; // Revalidate every minute

export default async function BlogListing() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <ScrollReveal direction="up" className="mb-20">
          <p className="font-serif italic text-sm text-clay uppercase tracking-[0.15em] mb-4">
            journal
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-espresso leading-[0.9]">
            The Cozy <br />
            <span className="italic font-light text-clay">Archives.</span>
          </h1>
        </ScrollReveal>

        <div className="space-y-32">
          {posts && posts.length > 0 ? (
            posts.map((post, i) => (
              <ScrollReveal key={post.id} direction="up" delay={0.1 * i}>
                <Link href={`/blog/${post.slug}`} className="group grid md:grid-cols-[1fr_2fr] gap-12 items-start border-t border-sand/30 pt-12">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                    <p className="text-sand text-[10px] uppercase tracking-widest italic">Research · AI</p>
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-serif text-espresso group-hover:text-clay transition-colors duration-500 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-espresso/70 font-light leading-relaxed max-w-2xl">
                      {post.excerpt || "Reading between the lines of code and intent."}
                    </p>
                    <div className="inline-block text-clay text-xs uppercase tracking-widest font-bold border-b border-clay/30 pb-1 group-hover:border-clay transition-all">
                      Read full story →
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))
          ) : (
            <div className="border-t border-sand/30 pt-12">
               <p className="font-serif italic text-sand text-xl">The archives are quiet for now...</p>
            </div>
          )}
        </div>
      </div>
      <Contact />
    </main>
  );
}
