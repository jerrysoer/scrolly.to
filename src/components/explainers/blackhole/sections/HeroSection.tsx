"use client";

import { useMemo } from "react";

function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2,
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 4}s`,
  }));
}

export default function HeroSection() {
  const stars = useMemo(() => generateStars(100), []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-28 sm:px-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Star particles background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              backgroundColor: "var(--space-blue)",
              animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Gravitational glow orbs */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-8 blur-3xl"
        style={{ backgroundColor: "var(--space-blue)", opacity: 0.08 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: "var(--redshift)", opacity: 0.05 }}
        aria-hidden="true"
      />

      {/* Black hole silhouette SVG with gravitational lensing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "min(70vw, 500px)",
            maxHeight: "70vh",
            opacity: 0.12,
            animation: "gravitational-lens 8s ease-in-out infinite",
          }}
        >
          <title>Black hole silhouette</title>
          <defs>
            <radialGradient id="bhGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="1" />
              <stop offset="40%" stopColor="var(--deep-space)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--space-blue)" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          {/* Accretion disk glow */}
          <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="var(--space-blue)" strokeWidth="2" opacity="0.4" />
          <ellipse cx="200" cy="200" rx="160" ry="50" fill="none" stroke="var(--redshift)" strokeWidth="1.5" opacity="0.3" />
          <ellipse cx="200" cy="200" rx="140" ry="40" fill="none" stroke="var(--amber)" strokeWidth="1" opacity="0.2" />
          {/* Event horizon */}
          <circle cx="200" cy="200" r="70" fill="url(#bhGrad)" />
          <circle cx="200" cy="200" r="50" fill="#000000" opacity="0.9" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--space-blue)", animation: "fade-in 0.6s ease-out 0.1s both" }}
        >
          scrolly.to &mdash; Interactive Explainer
        </p>

        <h1
          className="mt-6 font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
          style={{
            color: "var(--text-primary)",
            animation: "rise-up 0.8s ease-out 0.2s both",
          }}
        >
          Fall Into a Black{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--deep-space), var(--space-blue))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hole
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed sm:text-xl"
          style={{
            color: "var(--text-secondary)",
            animation: "rise-up 0.8s ease-out 0.35s both",
          }}
        >
          If you fell into a black hole, you&rsquo;d be fine. The problem is everyone
          else&rsquo;s perspective.
        </p>

        <p
          className="mt-3 font-mono text-xs"
          style={{
            color: "var(--text-tertiary)",
            animation: "fade-in 0.6s ease-out 0.45s both",
          }}
        >
          10 min read
        </p>

        {/* Key numbers row */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10"
          style={{ animation: "fade-in 0.6s ease-out 0.55s both" }}
        >
          {[
            { value: "0", label: "escape possible" },
            { value: "\u221E", label: "density at center" },
            { value: "10", label: "min read" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-mono text-3xl font-bold sm:text-4xl"
                style={{ color: "var(--space-blue)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 font-sans text-sm" style={{ color: "var(--text-tertiary)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{ animation: "fade-in 0.6s ease-out 0.7s both" }}
        >
          <p className="font-sans text-sm" style={{ color: "var(--text-tertiary)" }}>
            Scroll to explore
          </p>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            style={{ color: "var(--text-tertiary)", animation: "float 2s ease-in-out infinite" }}
            aria-hidden="true"
          >
            <path
              d="M10 4v12M5 11l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
