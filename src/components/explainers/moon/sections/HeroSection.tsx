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
  const stars = useMemo(() => generateStars(80), []);

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

      {/* Radial orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--space-blue)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--amber)", opacity: 0.08 }}
        aria-hidden="true"
      />

      {/* Moon silhouette SVG */}
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
            opacity: 0.06,
          }}
        >
          <title>Moon silhouette</title>
          <defs>
            <radialGradient id="moonGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="var(--lunar-silver)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--space-blue)" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="180" fill="url(#moonGrad)" />
          {/* Craters */}
          <circle cx="150" cy="160" r="30" fill="var(--space-blue)" opacity="0.2" />
          <circle cx="240" cy="130" r="18" fill="var(--space-blue)" opacity="0.15" />
          <circle cx="180" cy="240" r="25" fill="var(--space-blue)" opacity="0.18" />
          <circle cx="270" cy="220" r="14" fill="var(--space-blue)" opacity="0.12" />
          <circle cx="120" cy="260" r="20" fill="var(--space-blue)" opacity="0.16" />
          <circle cx="220" cy="280" r="12" fill="var(--space-blue)" opacity="0.1" />
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
          Going Back to the{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--space-blue), var(--amber))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Moon
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed sm:text-xl"
          style={{
            color: "var(--text-secondary)",
            animation: "rise-up 0.8s ease-out 0.35s both",
          }}
        >
          We went to the Moon 50 years ago with less computing power than your
          calculator. Here&rsquo;s why going back is harder &mdash; and way more
          ambitious.
        </p>

        <p
          className="mt-3 font-mono text-xs"
          style={{
            color: "var(--text-tertiary)",
            animation: "fade-in 0.6s ease-out 0.45s both",
          }}
        >
          8 min read
        </p>

        {/* Key numbers row */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10"
          style={{ animation: "fade-in 0.6s ease-out 0.55s both" }}
        >
          {[
            { value: "50", label: "years since last visit" },
            { value: "6", label: "Apollo landings" },
            { value: "238,900", label: "miles to the Moon" },
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
