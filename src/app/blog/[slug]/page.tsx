import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import ReactMarkdown from "react-markdown";
import Contact from "@/components/Contact";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <article className="pt-32 px-6 md:px-12 max-w-4xl mx-auto pb-32">
        <ScrollReveal direction="up" className="mb-16 space-y-6">
          <Link href="/blog" className="text-clay text-xs uppercase tracking-[0.2em] font-bold hover:translate-x-[-4px] transition-transform inline-block">
            ← Back to Archives
          </Link>
          <div className="space-y-4">
             <div className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] text-sand font-bold">
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="w-8 h-[1px] bg-sand/30" />
                <span>By Murshid R.</span>
             </div>
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-espresso leading-[1.1]">
               {post.title}
             </h1>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} className="prose prose-cozy max-w-none">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-serif text-espresso mt-12 mb-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-serif text-espresso mt-10 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-serif text-espresso mt-8 mb-4" {...props} />,
              p: ({node, ...props}) => <p className="text-espresso/80 font-sans font-light leading-[1.8] mb-6 text-lg" {...props} />,
              li: ({node, ...props}) => <li className="text-espresso/80 font-sans font-light leading-[1.8] mb-2 text-lg" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-2 border-clay pl-8 py-2 italic text-clay text-xl font-serif my-12" {...props} />
              ),
              code: ({node, inline, className, children, ...props}: any) => {
                return (
                  <code 
                    className={`${className} ${inline ? 'bg-sand/10 px-2 py-1 rounded text-sm' : 'block bg-espresso text-cream p-6 overflow-x-auto text-sm font-mono my-8'}`} 
                    {...props}
                  >
                    {children}
                  </code>
                )
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </ScrollReveal>
      </article>
      <Contact />
    </main>
  );
}
