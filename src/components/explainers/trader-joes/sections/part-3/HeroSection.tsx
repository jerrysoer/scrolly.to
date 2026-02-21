"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import { hero3Stats, successionNarrative } from "@/components/explainers/trader-joes/data/part-3";

export default function HeroSection() {
  return (
    <SectionWrapper id="hero-3" layout="full-bleed" stagger={true}>
      {/* Kicker */}
      <p
        className="mb-6 text-xs tracking-[0.2em] uppercase"
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          color: "var(--accent-gold)",
        }}
      >
        Part 3 of 3 &middot; The Cult Machine &middot; 10 min read
      </p>

      {/* Main headline */}
      <h1
        className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        The Cult Machine
      </h1>

      {/* Subheadline */}
      <p
        className="mb-12 max-w-2xl text-lg leading-relaxed sm:text-xl"
        style={{ color: "var(--text-secondary)" }}
      >
        Joe Coulombe walked away in 1988. The machine he built was just getting
        started.
      </p>

      {/* Hero image */}
      <div className="mb-12 w-full">
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src="/tj-store-evolution.gif"
            alt="Vintage Trader Joe's storefront in Pasadena, CA at golden hour with a baby blue VW Beetle and brown sedan parked out front, palm trees in the background"
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
        <p
          className="mt-2 text-center text-[10px] tracking-wide uppercase"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            color: "var(--text-tertiary)",
            opacity: 0.6,
          }}
        >
          Nanobanana / AI-generated illustration
        </p>
      </div>

      {/* Stat counters row */}
      <div className="flex gap-10 sm:gap-14">
        {hero3Stats.map((stat) => (
          <div key={stat.label}>
            <CounterAnimation
              target={stat.target}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className="block text-4xl font-bold sm:text-5xl"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                background:
                  "linear-gradient(135deg, var(--accent-navy), var(--accent-gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            />
            <span
              className="mt-1 block text-xs tracking-wide uppercase"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Succession narrative */}
      <div className="mt-16 space-y-6">
        {successionNarrative.map((paragraph, i) => (
          <p
            key={i}
            className="max-w-3xl text-base leading-relaxed sm:text-lg"
            style={{
              fontFamily: "var(--font-source-serif), Georgia, serif",
              color: "var(--text-secondary)",
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </SectionWrapper>
  );
}
