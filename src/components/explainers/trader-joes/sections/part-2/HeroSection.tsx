"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import { hero2Stats } from "@/components/explainers/trader-joes/data/part-2";

export default function HeroSection() {
  return (
    <SectionWrapper id="hero-2" layout="full-bleed" stagger={true}>
      {/* Kicker */}
      <p
        className="mb-6 text-xs tracking-[0.2em] uppercase"
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          color: "var(--accent-gold)",
        }}
      >
        Part 2 of 3 &middot; The Aldi Paradox &middot; 10 min read
      </p>

      {/* Main headline */}
      <h1
        className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        The Aldi Paradox
      </h1>

      {/* Subheadline */}
      <p
        className="mb-12 max-w-2xl text-lg leading-relaxed sm:text-xl"
        style={{ color: "var(--text-secondary)" }}
      >
        The world&apos;s most secretive family bought the world&apos;s quirkiest
        grocery brand. And the best thing they did was&hellip; nothing.
      </p>

      {/* Hero diptych — two separate images composed in CSS */}
      <div className="mb-12 w-full">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          {/* Aldi side — B&W */}
          <div className="relative overflow-hidden rounded-l-xl sm:rounded-l-xl rounded-t-xl sm:rounded-tr-none">
            <img
              src="/generated/aldi-interior-bw-final.png"
              alt="Grainy black and white photograph of a sparse West German discount grocery store interior, 1974 — harsh fluorescent light, plain shelves, a woman examining a price tag"
              className="h-full w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <p
              className="absolute bottom-3 left-3 rounded px-2 py-1 text-[10px] font-medium tracking-wide uppercase"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "rgba(255,255,255,0.85)",
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
              }}
            >
              Essen, West Germany &middot; 1974
            </p>
          </div>
          {/* TJ's side — Kodachrome */}
          <div className="relative overflow-hidden rounded-r-xl sm:rounded-r-xl rounded-b-xl sm:rounded-bl-none">
            <img
              src="/generated/tjs-exterior-kodachrome-final.png"
              alt="Kodachrome photograph of a small California grocery storefront at dusk, 1977 — warm glow from inside, cedar shingle awning, palm tree, beat-up Datsun at curb"
              className="h-full w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <p
              className="absolute bottom-3 right-3 rounded px-2 py-1 text-[10px] font-medium tracking-wide uppercase"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "rgba(255,255,255,0.85)",
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
              }}
            >
              Pasadena, California &middot; 1977
            </p>
          </div>
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
        {hero2Stats.map((stat) => (
          <div key={stat.label}>
            {stat.target === 0 ? (
              <span
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
              >
                0
              </span>
            ) : (
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
            )}
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
