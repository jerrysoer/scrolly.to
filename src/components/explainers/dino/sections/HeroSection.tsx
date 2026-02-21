"use client";

import { useEffect, useState } from "react";

const stats = [
  { value: "66 million", label: "years ago" },
  { value: "6 miles", label: "wide" },
  { value: "10 billion", label: "\u00D7 Hiroshima" },
];

const dustParticles = Array.from({ length: 20 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 3,
  delay: `${Math.random() * 4}s`,
  duration: `${3 + Math.random() * 4}s`,
  opacity: 0.1 + Math.random() * 0.2,
}));

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
      style={{ backgroundColor: "#0f0e0c" }}
    >
      {/* Dust particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {dustParticles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: "#f59e0b",
              opacity: p.opacity,
              animation: `dust-drift ${p.duration} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Asteroid trail */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="meteor-trail" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {mounted && (
            <g style={{ animation: "meteor 3s ease-in infinite" }}>
              <line
                x1="900"
                y1="100"
                x2="600"
                y2="400"
                stroke="url(#meteor-trail)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <circle cx="600" cy="400" r="8" fill="#fbbf24" filter="url(#glow)" />
              <circle cx="600" cy="400" r="4" fill="#fff" />
            </g>
          )}
        </svg>
      </div>

      {/* Impact glow at center */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className={`relative z-10 mx-auto max-w-3xl text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-amber-400/70">
          Interactive Explainer
        </p>

        <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          How Dinosaurs{" "}
          <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
            Went Extinct
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-serif text-lg leading-relaxed text-gray-400 italic sm:text-xl">
          &ldquo;The asteroid didn&rsquo;t kill the dinosaurs. What happened
          next did.&rdquo;
        </p>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-2xl font-bold text-amber-400 sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <p className="text-xs text-gray-600">Scroll to explore</p>
          <svg
            width="20"
            height="30"
            viewBox="0 0 20 30"
            fill="none"
            className="animate-bounce"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="28"
              rx="9"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <circle cx="10" cy="10" r="3" fill="#f59e0b" />
          </svg>
        </div>
      </div>
    </section>
  );
}
