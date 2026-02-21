"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" className="min-h-screen flex flex-col justify-center">
      <div className="text-center space-y-6">
        {/* Overline */}
        <p className="text-accent-primary text-sm font-mono uppercase tracking-widest">
          Interactive Explainer
        </p>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-heading font-bold text-text-primary">
          How the Electoral College Works
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          538 electors. 270 to win. The system that decides every US president — explained visually.
        </p>

        {/* Reading time */}
        <p className="text-text-tertiary text-sm font-mono">7 min read</p>

        {/* Hero SVG Illustration */}
        <div className="py-8">
          <svg
            viewBox="0 0 400 300"
            className="w-full max-w-md mx-auto"
            style={{ height: "300px" }}
            role="img"
            aria-labelledby="hero-illustration-title"
          >
            <title id="hero-illustration-title">
              US Capitol dome with radiating stars representing the Electoral College
            </title>

            {/* Radiating circles */}
            <circle
              cx="200"
              cy="150"
              r="120"
              fill="none"
              stroke="var(--accent-tertiary)"
              strokeWidth="1"
              opacity="0.3"
            />
            <circle
              cx="200"
              cy="150"
              r="90"
              fill="none"
              stroke="var(--accent-secondary)"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <circle
              cx="200"
              cy="150"
              r="60"
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="2"
              opacity="0.5"
            />

            {/* Capitol dome base */}
            <rect
              x="140"
              y="180"
              width="120"
              height="80"
              fill="var(--accent-primary)"
              opacity="0.2"
            />

            {/* Dome structure */}
            <path
              d="M 140 180 Q 200 120 260 180"
              fill="var(--accent-primary)"
              opacity="0.3"
            />
            <path
              d="M 160 180 Q 200 140 240 180"
              fill="var(--accent-secondary)"
              opacity="0.4"
            />

            {/* Dome top */}
            <circle
              cx="200"
              cy="150"
              r="30"
              fill="var(--accent-primary)"
              opacity="0.6"
            />

            {/* Flagpole */}
            <rect
              x="197"
              y="100"
              width="6"
              height="50"
              fill="currentColor"
              opacity="0.7"
            />

            {/* Stars scattered around */}
            <g fill="var(--accent-secondary)" opacity="0.7">
              <path
                d="M 80 80 l 5 15 l 16 0 l -13 10 l 5 15 l -13 -10 l -13 10 l 5 -15 l -13 -10 l 16 0 z"
                transform="scale(0.6)"
              />
              <path
                d="M 320 80 l 5 15 l 16 0 l -13 10 l 5 15 l -13 -10 l -13 10 l 5 -15 l -13 -10 l 16 0 z"
                transform="scale(0.6)"
              />
              <path
                d="M 60 220 l 5 15 l 16 0 l -13 10 l 5 15 l -13 -10 l -13 10 l 5 -15 l -13 -10 l 16 0 z"
                transform="scale(0.5)"
              />
              <path
                d="M 340 220 l 5 15 l 16 0 l -13 10 l 5 15 l -13 -10 l -13 10 l 5 -15 l -13 -10 l 16 0 z"
                transform="scale(0.5)"
              />
              <path
                d="M 200 50 l 5 15 l 16 0 l -13 10 l 5 15 l -13 -10 l -13 10 l 5 -15 l -13 -10 l 16 0 z"
                transform="scale(0.7)"
              />
            </g>

            {/* Central star on dome */}
            <path
              d="M 200 150 l 4 12 l 13 0 l -10 8 l 4 12 l -11 -8 l -11 8 l 4 -12 l -10 -8 l 13 0 z"
              fill="var(--accent-tertiary)"
            />
          </svg>
        </div>

        {/* Scroll indicator */}
        <div className="pt-8 flex justify-center">
          <ChevronDown
            className="w-6 h-6 text-accent-primary animate-bounce"
            aria-label="Scroll down to continue"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
