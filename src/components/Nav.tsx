"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import ThemeToggle from "./ThemeToggle";
import Magnetic from "./Magnetic";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Now", href: "/now" },
  { name: "Work", href: "/work" },
  { name: "Blog", href: "/blog" },
  { name: "Guestbook", href: "/guestbook" },
  { name: "Uses", href: "/uses" },
  { name: "Contact", href: "/contact" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled ? "py-4 bg-cream/95 backdrop-blur-sm border-b border-sand/30" : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Magnetic strength={0.2}>
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="M." 
              className="h-8 w-auto invert-0 dark:invert-0 transition-transform duration-500 hover:scale-110" 
            />
          </Link>
        </Magnetic>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Magnetic key={link.name} strength={0.3}>
              <Link
                href={link.href}
                className="text-[13px] font-sans font-normal uppercase tracking-[0.15em] text-espresso hover:text-clay transition-colors relative group py-2 px-4"
              >
                {link.name}
                <span className="absolute -bottom-1 left-4 right-4 h-[1px] bg-clay transition-all duration-300 w-0 group-hover:w-[calc(100%-32px)]" />
              </Link>
            </Magnetic>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Toggle & Theme Toggle */}
        <div className="md:hidden flex items-center space-x-6">
          <ThemeToggle />
          <button
            className="flex flex-col space-y-1.5 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={cn("w-6 h-[1px] bg-espresso transition-all", mobileMenuOpen && "rotate-45 translate-y-2")} />
            <span className={cn("w-6 h-[1px] bg-espresso transition-all", mobileMenuOpen && "opacity-0")} />
            <span className={cn("w-6 h-[1px] bg-espresso transition-all", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-cream z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-serif text-espresso hover:text-clay transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
