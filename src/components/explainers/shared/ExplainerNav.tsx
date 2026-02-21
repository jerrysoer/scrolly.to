"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface ExplainerNavProps {
  section: "learn" | "explore";
}

export function ExplainerNav({ section }: ExplainerNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show nav if at top OR scrolling up
  const isVisible = scrollY < 300 || scrollDirection === "up";

  // Close menu on navigation
  useEffect(() => {
    const handleNavigation = () => setMenuOpen(false);
    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const sectionLabel = section === "learn" ? "Learn" : "Explore";
  const sectionUrl = `/${section}`;

  return (
    <>
      {/* Main navigation bar */}
      <nav
        className={`fixed left-0 right-0 top-0 z-40 border-b transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          borderColor: "var(--border)",
          backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 pr-16">
          {/* Left: Back link */}
          <a
            href={sectionUrl}
            className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--text-primary)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">{sectionLabel}</span>
          </a>

          {/* Center: Wordmark (desktop only) */}
          <a
            href="/"
            className="hidden font-serif text-xl tracking-tight sm:block"
            style={{ color: "var(--text-primary)" }}
          >
            scrolly.to
          </a>

          {/* Right: Hamburger menu (with space for ThemeToggle) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="transition-opacity hover:opacity-70"
            style={{ color: "var(--text-primary)" }}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[100] bg-black/50"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div
            className="fixed right-0 top-0 z-[101] h-full w-64 shadow-xl transition-transform"
            style={{
              backgroundColor: "var(--bg-primary)",
              transform: "translateX(0)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <div className="flex h-14 items-center justify-end px-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="transition-opacity hover:opacity-70"
                style={{ color: "var(--text-primary)" }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu links */}
            <nav className="flex flex-col gap-1 px-4">
              <a
                href="/explore"
                className="rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                style={{
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => setMenuOpen(false)}
              >
                Explore
              </a>
              <a
                href="/learn"
                className="rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                style={{
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => setMenuOpen(false)}
              >
                Learn
              </a>
              <a
                href="https://github.com/jerrysoer/scrolly.to"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                style={{
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                GitHub ↗
              </a>
              <a
                href="/#waitlist"
                className="mt-2 rounded-lg px-4 py-3 text-sm font-medium transition-opacity"
                style={{
                  backgroundColor: "var(--accent-green)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
                onClick={() => setMenuOpen(false)}
              >
                Get updates
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
