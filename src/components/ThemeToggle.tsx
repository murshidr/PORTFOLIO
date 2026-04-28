"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full hover:bg-sand/10 transition-colors group focus:outline-none"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 90,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-espresso"
        >
          <Moon size={18} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -90,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-espresso"
        >
          <Sun size={18} strokeWidth={1.5} />
        </motion.div>
      </div>
      
      {/* Subtle hover ring */}
      <span className="absolute inset-0 rounded-full border border-clay/0 group-hover:border-clay/20 transition-all duration-500 scale-110 group-hover:scale-100" />
    </button>
  );
}
