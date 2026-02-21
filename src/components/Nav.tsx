"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="/" className="font-serif text-xl tracking-tight text-text">
            scrolly.to
          </a>

          <div className="flex items-center gap-6">
            {/* Desktop navigation links */}
            <a
              href="/explore"
              className="hidden text-sm text-text-muted transition-colors hover:text-text sm:block"
            >
              Explore
            </a>
            <a
              href="/learn"
              className="hidden text-sm text-text-muted transition-colors hover:text-text sm:block"
            >
              Learn
            </a>

            {/* GitHub icon (always visible) */}
            <a
              href="https://github.com/jerrysoer/scrolly.to"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-text"
              aria-label="GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
            </a>

            {/* Get updates button (desktop) */}
            <a
              href="#waitlist"
              className="hidden rounded-full bg-green px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:block"
            >
              Get updates
            </a>

            {/* Hamburger menu (mobile only) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="block text-text-muted transition-colors hover:text-text sm:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
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
            className="fixed right-0 top-0 z-[101] h-full w-64 bg-bg shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <div className="flex h-14 items-center justify-end px-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-text-muted transition-colors hover:text-text"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu links */}
            <nav className="flex flex-col gap-1 px-4">
              <a
                href="/explore"
                className="rounded-lg px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-bg-secondary"
                onClick={() => setMenuOpen(false)}
              >
                Explore
              </a>
              <a
                href="/learn"
                className="rounded-lg px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-bg-secondary"
                onClick={() => setMenuOpen(false)}
              >
                Learn
              </a>
              <a
                href="https://github.com/jerrysoer/scrolly.to"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-bg-secondary"
              >
                GitHub ↗
              </a>
              <a
                href="#waitlist"
                className="mt-2 rounded-lg bg-green px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
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
