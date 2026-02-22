"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// ─── AnimatedCounter ────────────────────────────────────────────────────────

interface AnimatedCounterProps {
  target: number;
  duration?: number; // ms
}

function AnimatedCounter({ target, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start when visible in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // rAF counting loop
  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2">
      <span
        className="stat-hero tabular-nums"
        aria-label={`${target.toLocaleString()} Academy Members`}
      >
        {count.toLocaleString()}
      </span>
      <span
        className="text-sm font-semibold tracking-widest uppercase"
        style={{ color: "rgba(148,163,184,0.9)" }}
      >
        Academy Members
      </span>
    </div>
  );
}

// ─── Branch pills ────────────────────────────────────────────────────────────

const HIGHLIGHT_BRANCHES = [
  { label: "1,302 Actors" },
  { label: "523 Producers" },
  { label: "487 Directors" },
  { label: "842 At-Large" },
] as const;

// ─── HeroSection ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    // SectionWrapper renders the wavy divider above it; for the very first
    // section we want no divider and a full dark background, so we override
    // with a wrapper div that sets the gradient.
    <div
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
      }}
    >
      {/* Subtle noise overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 py-20 max-w-4xl mx-auto gap-10">
        {/* Eyebrow */}
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
          style={{
            color: "rgba(148,163,184,0.8)",
            borderColor: "rgba(148,163,184,0.2)",
            background: "rgba(148,163,184,0.06)",
          }}
        >
          An Interactive Explainer
        </span>

        {/* Headline */}
        <h1
          className="font-extrabold text-white leading-tight tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800 }}
        >
          How the Oscars
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #60a5fa 0%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Actually Work
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-xl leading-relaxed max-w-2xl"
          style={{ color: "rgba(203,213,225,0.9)" }}
        >
          10,820 voters. One preferential ballot. And the most consequential
          campaign season in Hollywood.
        </p>

        {/* Counter */}
        <div
          className="rounded-2xl border px-10 py-8"
          style={{
            background: "rgba(15,23,42,0.6)",
            borderColor: "rgba(148,163,184,0.15)",
            backdropFilter: "blur(12px)",
          }}
        >
          <AnimatedCounter target={10820} duration={2000} />
        </div>

        {/* Branch pills cluster */}
        <div className="flex flex-wrap justify-center gap-2">
          {HIGHLIGHT_BRANCHES.map(({ label }) => (
            <span
              key={label}
              className="text-sm font-medium px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(51,65,85,0.7)",
                color: "rgba(203,213,225,0.85)",
                border: "1px solid rgba(148,163,184,0.15)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-sm font-medium"
          style={{ color: "rgba(148,163,184,0.6)" }}
        >
          Scroll to learn
        </span>
        <ChevronDown
          size={20}
          className="animate-bounce-down"
          style={{ color: "rgba(148,163,184,0.6)" }}
        />
      </div>
    </div>
  );
}
