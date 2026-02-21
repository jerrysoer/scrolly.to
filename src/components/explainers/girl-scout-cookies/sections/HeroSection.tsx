"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" layout="centered-card" className="min-h-screen flex items-center">
      <div className="text-center">
        {/* Reading time estimate */}
        <p className="text-sm text-[var(--color-text-tertiary)] mb-6 uppercase tracking-wide">
          3 min read
        </p>

        {/* Main title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-8 leading-tight">
          The Girl Scout Cookie Empire
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-[var(--color-text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed">
          How a century-old bake sale turned into a $800 million business teaching millions of girls entrepreneurship.
        </p>

        {/* Cookie emoji decoration */}
        <div className="flex justify-center gap-4 text-6xl mb-8">
          🍪
        </div>

        {/* Scroll hint */}
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-[var(--color-text-tertiary)]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </SectionWrapper>
  );
}
