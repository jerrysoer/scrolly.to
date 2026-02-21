"use client";

import { useMemo } from "react";

function generateParticles(count: number) {
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
  const particles = useMemo(() => generateParticles(80), []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-28 sm:px-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Signal particles background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: "var(--accent-blue)",
              animation: `twinkle ${p.duration} ease-in-out ${p.delay} infinite`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Radial orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--accent-blue)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--accent-amber)", opacity: 0.08 }}
        aria-hidden="true"
      />

      {/* WiFi signal SVG background */}
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
          <title>WiFi signal</title>
          <circle cx="200" cy="300" r="12" fill="var(--accent-blue)" />
          <path d="M140 260 a85 85 0 0 1 120 0" stroke="var(--accent-blue)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M105 225 a135 135 0 0 1 190 0" stroke="var(--accent-blue)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M70 190 a185 185 0 0 1 260 0" stroke="var(--accent-blue)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.4" />
          <path d="M35 155 a235 235 0 0 1 330 0" stroke="var(--accent-blue)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.2" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--accent-blue)", animation: "fade-in 0.6s ease-out 0.1s both" }}
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
          How WiFi{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--accent-blue), var(--accent-amber))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Works
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed sm:text-xl"
          style={{
            color: "var(--text-secondary)",
            animation: "rise-up 0.8s ease-out 0.35s both",
          }}
        >
          WiFi is just invisible radio waves passing through your walls at the
          speed of light. Here&rsquo;s how your router actually turns cat videos
          into waves &mdash; and back again.
        </p>

        <p
          className="mt-3 font-mono text-xs"
          style={{
            color: "var(--text-tertiary)",
            animation: "fade-in 0.6s ease-out 0.45s both",
          }}
        >
          6 min read
        </p>

        {/* Key numbers row */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10"
          style={{ animation: "fade-in 0.6s ease-out 0.55s both" }}
        >
          {[
            { value: "186K", label: "miles per second" },
            { value: "2.4", label: "GHz frequency" },
            { value: "6", label: "min read" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-mono text-3xl font-bold sm:text-4xl"
                style={{ color: "var(--accent-blue)" }}
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
