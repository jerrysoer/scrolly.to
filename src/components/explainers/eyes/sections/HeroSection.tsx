"use client";

import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
    >
      {/* Background organic blob */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--bg-secondary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
        {/* Hero SVG illustration */}
        <div
          className="w-full max-w-[300px] animate-fade-in"
          style={{ animationDelay: "0ms" }}
        >
          <EyeSVG />
        </div>

        {/* Overline */}
        <p
          className="font-mono text-xs uppercase tracking-widest text-forward-blue animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          Interactive Explainer
        </p>

        {/* Main headline */}
        <h1
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          How Your Eye Sees Color
        </h1>

        {/* Hook subtitle */}
        <p
          className="font-serif text-lg sm:text-xl italic text-text-secondary max-w-md animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          Color doesn&rsquo;t exist in the world. Your brain invents it.
        </p>

        {/* Reading time */}
        <p
          className="font-sans text-sm text-text-tertiary animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          ~6 min read
        </p>

        {/* CTA card with glow micro-interaction */}
        <div
          className="mt-2 inline-flex items-center gap-2 rounded-xl border border-border bg-bg-card px-5 py-3 font-sans text-sm text-text-secondary cursor-default transition-all duration-200 hover:ring-2 hover:ring-forward-blue/20 animate-fade-in"
          style={{ animationDelay: "500ms" }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full bg-forward-blue opacity-80"
          />
          Scroll to explore
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-tertiary">
        <span className="font-sans text-xs tracking-wide uppercase">Scroll</span>
        <ChevronDown
          className="w-5 h-5 animate-bounce"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function EyeSVG() {
  return (
    <svg
      viewBox="0 0 400 200"
      width="100%"
      role="img"
      aria-labelledby="eye-svg-title"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <title id="eye-svg-title">
        A stylized eye with a rainbow spectrum passing through the pupil and
        cone cells in the retina
      </title>

      <defs>
        {/* Rainbow gradient for the light beam */}
        <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.9" />
          <stop offset="17%"  stopColor="#f97316" stopOpacity="0.9" />
          <stop offset="34%"  stopColor="#facc15" stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#22c55e" stopOpacity="0.9" />
          <stop offset="67%"  stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="84%"  stopColor="#8b5cf6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
        </linearGradient>

        {/* Soft glow filter for cone dots */}
        <filter id="coneGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clipping path — almond eye shape */}
        <clipPath id="eyeClip">
          <path d="M 30,100 Q 110,40 200,100 Q 290,160 370,100 Q 290,40 200,100 Q 110,160 30,100 Z" />
        </clipPath>

        {/* Soft gradient for iris shading */}
        <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="var(--forward-blue)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0.12" />
        </radialGradient>

        {/* Pupil gradient */}
        <radialGradient id="pupilGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%"   stopColor="#444" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#000" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* ── Outer eye shape (sclera fill) ────────────────────────── */}
      <path
        d="M 30,100 Q 110,40 200,100 Q 290,160 370,100 Q 290,40 200,100 Q 110,160 30,100 Z"
        fill="var(--bg-card)"
        stroke="none"
      />

      {/* ── Iris ─────────────────────────────────────────────────── */}
      <circle cx="200" cy="100" r="46" fill="url(#irisGrad)" />
      <circle
        cx="200"
        cy="100"
        r="46"
        fill="none"
        stroke="var(--forward-blue)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      {/* Iris texture rings */}
      <circle
        cx="200"
        cy="100"
        r="36"
        fill="none"
        stroke="var(--forward-blue)"
        strokeOpacity="0.15"
        strokeWidth="1"
      />
      <circle
        cx="200"
        cy="100"
        r="26"
        fill="none"
        stroke="var(--accent-purple)"
        strokeOpacity="0.1"
        strokeWidth="1"
      />

      {/* ── Pupil ────────────────────────────────────────────────── */}
      <circle cx="200" cy="100" r="22" fill="url(#pupilGrad)" />

      {/* ── Rainbow light beam entering from left ────────────────── */}
      {/* The beam is a tapered path that narrows as it enters the pupil */}
      <path
        d="M 0,82 Q 60,88 130,96 L 130,104 Q 60,112 0,118 Z"
        fill="url(#rainbowGrad)"
        opacity="0.72"
      />

      {/* Beam overlap clipped inside the eye for immersion */}
      <g clipPath="url(#eyeClip)">
        <path
          d="M 0,82 Q 80,90 178,98 L 178,102 Q 80,110 0,118 Z"
          fill="url(#rainbowGrad)"
          opacity="0.55"
        />
      </g>

      {/* ── Retina cone dots (R / G / B) ─────────────────────────── */}
      {/* Positioned in the right (retina) side of the eye interior */}
      <g filter="url(#coneGlow)">
        {/* Red cone */}
        <circle
          cx="278"
          cy="90"
          r="6"
          fill="var(--cone-red)"
          opacity="0.9"
        />
        {/* Green cone */}
        <circle
          cx="295"
          cy="103"
          r="6"
          fill="var(--cone-green)"
          opacity="0.9"
        />
        {/* Blue cone */}
        <circle
          cx="278"
          cy="116"
          r="6"
          fill="var(--cone-blue)"
          opacity="0.9"
        />
      </g>

      {/* Tiny cone labels */}
      <text
        x="289"
        y="87"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="8"
        fill="var(--text-tertiary)"
        opacity="0.7"
      >
        R
      </text>
      <text
        x="306"
        y="107"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="8"
        fill="var(--text-tertiary)"
        opacity="0.7"
      >
        G
      </text>
      <text
        x="289"
        y="127"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="8"
        fill="var(--text-tertiary)"
        opacity="0.7"
      >
        B
      </text>

      {/* ── Light reflection highlight ────────────────────────────── */}
      <ellipse
        cx="182"
        cy="82"
        rx="8"
        ry="5"
        fill="white"
        opacity="0.45"
        transform="rotate(-20 182 82)"
      />

      {/* ── Eye outline (almond shape, drawn last for crispness) ──── */}
      <path
        d="M 30,100 Q 110,40 200,100 Q 290,160 370,100"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M 30,100 Q 110,160 200,100 Q 290,40 370,100"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* ── Subtle lash hints at corners ─────────────────────────── */}
      <line
        x1="30"
        y1="100"
        x2="18"
        y2="95"
        stroke="var(--text-tertiary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="370"
        y1="100"
        x2="382"
        y2="95"
        stroke="var(--text-tertiary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
