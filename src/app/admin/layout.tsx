"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAuthenticated(false);
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  // While checking, show a cinematic loading state
  if (isAuthenticated === null) {
    return (
      <main className="bg-cream min-h-screen flex items-center justify-center">
        <Nav />
        <div className="text-center space-y-4">
          <div className="w-12 h-[1px] bg-clay mx-auto animate-pulse" />
          <p className="font-serif italic text-sand text-lg tracking-widest uppercase animate-pulse">
            Verifying identity...
          </p>
        </div>
      </main>
    );
  }

  // If not authenticated, the useEffect will handle redirect, 
  // but we return null here to prevent flashing content
  if (isAuthenticated === false) {
    return null;
  }

  return <>{children}</>;
}
