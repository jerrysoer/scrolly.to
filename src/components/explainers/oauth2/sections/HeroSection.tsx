"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Full-bleed background — video with static poster fallback */}
      {!prefersReducedMotion ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/explainers/oauth2/generated/hero-poster.png"
          className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
          aria-hidden="true"
        >
          {/* Video sources — will gracefully fall back to poster if missing */}
          <source src="/explainers/oauth2/generated/hero-bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/explainers/oauth2/generated/hero-poster.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
          loading="eager"
          decoding="async"
        />
      )}

      {/* Cinematic gradient overlays — multiple layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--bg-primary)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {/* Film grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Overline */}
          <span
            className="inline-block text-white/50 tracking-[0.3em] text-[11px] font-semibold uppercase mb-10"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Interactive Explainer
          </span>

          {/* Title — cinematic scale */}
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-[7rem] font-bold text-white leading-[0.92] mb-10 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How OAuth 2.0
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Actually Works
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-white/55 max-w-xl mx-auto leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The protocol behind every &ldquo;Sign in with Google&rdquo; button
            — from password sharing to token-based authorization.
          </p>

          {/* Metadata line */}
          <div
            className="flex items-center justify-center gap-4 text-white/30 text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span>8 min read</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Interactive</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease-out 1.8s",
        }}
      >
        <span
          className="text-white/25 text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-white/25 animate-bounce" />
      </div>
    </section>
  );
}
