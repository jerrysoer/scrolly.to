"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated race scene SVG */}
      <div
        className={`relative w-full max-w-3xl mx-auto mb-12 ${mounted ? "th-animate-fade-in" : "opacity-0"}`}
      >
        <svg viewBox="0 0 800 200" className="w-full" aria-hidden="true">
          {/* Track */}
          <rect x="50" y="140" width="700" height="4" rx="2" fill="var(--border)" />

          {/* Start line */}
          <line x1="80" y1="120" x2="80" y2="160" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="4 4" />
          <text x="80" y="115" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="var(--font-mono)">
            START
          </text>

          {/* Finish line */}
          <line x1="720" y1="120" x2="720" y2="160" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="4 4" />
          <text x="720" y="115" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="var(--font-mono)">
            FINISH
          </text>

          {/* Tortoise */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;580,0"
              dur="12s"
              repeatCount="indefinite"
            />
            <ellipse cx="100" cy="130" rx="22" ry="16" fill="var(--correct-green)" opacity="0.9" />
            <ellipse cx="100" cy="130" rx="18" ry="12" fill="none" stroke="var(--correct-green)" strokeWidth="1" opacity="0.5" />
            <circle cx="120" cy="134" r="6" fill="var(--correct-green)" opacity="0.8" />
            <circle cx="123" cy="132" r="1.5" fill="var(--bg-primary)" />
            <rect x="88" y="140" width="4" height="6" rx="2" fill="var(--correct-green)" opacity="0.7" />
            <rect x="108" y="140" width="4" height="6" rx="2" fill="var(--correct-green)" opacity="0.7" />
          </g>

          {/* Hare */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;400,0;400,0;400,0;580,0"
              dur="12s"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
            />
            <ellipse cx="100" cy="128" rx="18" ry="12" fill="var(--backward-orange)" opacity="0.9" />
            <circle cx="118" cy="122" r="8" fill="var(--backward-orange)" opacity="0.85" />
            <ellipse cx="112" cy="106" rx="3" ry="10" fill="var(--backward-orange)" opacity="0.8" transform="rotate(-10 112 106)" />
            <ellipse cx="120" cy="106" rx="3" ry="10" fill="var(--backward-orange)" opacity="0.8" transform="rotate(5 120 106)" />
            <circle cx="122" cy="120" r="2" fill="var(--bg-primary)" />
            <rect x="88" y="136" width="4" height="8" rx="2" fill="var(--backward-orange)" opacity="0.7" />
            <rect x="106" y="136" width="4" height="8" rx="2" fill="var(--backward-orange)" opacity="0.7" />
            <text x="130" y="110" fontSize="10" fill="var(--text-tertiary)" opacity="0">
              &#x1F4A4;
              <animate attributeName="opacity" values="0;0;1;1;0" dur="12s" keyTimes="0;0.25;0.35;0.7;0.75" repeatCount="indefinite" />
            </text>
          </g>
        </svg>
      </div>

      {/* Title block */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <p
          className={`font-mono text-sm tracking-[0.2em] uppercase text-text-tertiary mb-6 ${
            mounted ? "th-animate-rise-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          An Interactive Fable
        </p>

        <h1
          className={`font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight mb-8 ${
            mounted ? "th-animate-rise-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          <span className="block">The Tortoise</span>
          <span className="block italic text-text-secondary">&amp; the Hare</span>
        </h1>

        <p
          className={`font-body text-lg sm:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed ${
            mounted ? "th-animate-rise-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          What a 2,500-year-old fable teaches us about compounding, consistency,
          and the myth of talent.
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#race-simulation"
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors ${
          mounted ? "th-animate-rise-up" : "opacity-0"
        }`}
        style={{ animationDelay: "1s" }}
        aria-label="Scroll to first section"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="th-animate-float" />
      </a>
    </section>
  );
}
