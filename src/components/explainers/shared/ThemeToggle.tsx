"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useExplainer } from "./ExplainerContext";

interface ThemeToggleProps {
  scopeName?: string;
  themeKey?: string;
}

export default function ThemeToggle({ scopeName: propScope, themeKey: propKey }: ThemeToggleProps) {
  const context = useExplainer();
  const scopeName = propScope ?? context.scopeName;
  const themeKey = propKey ?? context.themeKey;

  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (!themeKey || !scopeName) return;
    const stored = localStorage.getItem(themeKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? (stored as "light" | "dark") : prefersDark ? "dark" : "light";
    setTheme(initial);
    document.querySelector(`[data-scope="${scopeName}"]`)?.setAttribute("data-theme", initial);
  }, [themeKey, scopeName]);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.querySelector(`[data-scope="${scopeName}"]`)?.setAttribute("data-theme", next);
    localStorage.setItem(themeKey, next);
  };

  return (
    <button
      onClick={toggle}
      className="fixed right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
      style={{
        top: "60px", // Position below PartNav on mobile
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
