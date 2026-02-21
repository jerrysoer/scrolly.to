"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import { heroStats } from "@/components/explainers/trader-joes/data/part-1";

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" layout="full-bleed" stagger={true}>
      {/* Kicker */}
      <p
        className="mb-6 text-xs tracking-[0.2em] uppercase"
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          color: "var(--accent-gold)",
        }}
      >
        Part 1 of 3 &middot; The Unlikely Origin &middot; 12 min read
      </p>

      {/* Main headline */}
      <h1
        className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        The Paradox of Trader Joe&apos;s
      </h1>

      {/* Subheadline */}
      <p
        className="mb-12 max-w-2xl text-lg leading-relaxed sm:text-xl"
        style={{ color: "var(--text-secondary)" }}
      >
        A tiny grocery chain with no ads, no loyalty program, no e-commerce
        &mdash; generating $2,000 per square foot. More than Apple stores. How?
      </p>

      {/* Stat counters row */}
      <div className="flex gap-10 sm:gap-14">
        {heroStats.map((stat) => (
          <div key={stat.label}>
            <CounterAnimation
              target={stat.target}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className="block text-4xl font-bold sm:text-5xl"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                background: "linear-gradient(135deg, var(--accent-navy), var(--accent-gold))",
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
    </SectionWrapper>
  );
}
