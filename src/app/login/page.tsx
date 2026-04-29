"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="relative bg-cream min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center px-6">
        <ScrollReveal direction="up" className="w-full max-w-md">
          <div className="bg-surface backdrop-blur-sm border border-border-theme p-12 space-y-8 shadow-sm">
            <div className="space-y-2">
              <h1 className="text-3xl font-serif text-espresso">Studio Login</h1>
              <p className="text-sand text-xs uppercase tracking-widest">Entry for Murshid R.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-sand font-bold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-cream/20 border border-border-theme p-4 text-espresso font-sans text-sm focus:outline-none focus:border-clay transition-colors"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-sand font-bold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-cream/20 border border-border-theme p-4 text-espresso font-sans text-sm focus:outline-none focus:border-clay transition-colors"
                  required
                />
              </div>

              {error && (
                <p className="text-clay text-xs italic">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-espresso text-cream py-4 font-serif text-lg hover:bg-clay transition-colors disabled:opacity-50"
              >
                {loading ? "Opening..." : "Enter Studio"}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
