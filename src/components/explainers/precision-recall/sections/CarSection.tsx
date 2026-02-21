"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

function CarIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="mx-auto w-full max-w-sm">
      <rect x="0" y="140" width="300" height="60" fill="var(--bg-secondary)" />
      <line x1="0" y1="170" x2="300" y2="170" stroke="var(--border)" strokeWidth="2" strokeDasharray="20 10" />
      <g>
        <path d="M50 130 L70 130 L85 110 L130 110 L140 130 L170 130 L170 145 L50 145 Z" fill="var(--text-primary)" />
        <circle cx="75" cy="145" r="10" fill="var(--text-primary)" />
        <circle cx="75" cy="145" r="5" fill="var(--bg-primary)" />
        <circle cx="145" cy="145" r="10" fill="var(--text-primary)" />
        <circle cx="145" cy="145" r="5" fill="var(--bg-primary)" />
      </g>
      <g>
        <path d="M160 120 L240 80 L240 140 Z" fill="var(--pr-green)" opacity="0.15" />
        <line x1="160" y1="120" x2="240" y2="110" stroke="var(--pr-green)" strokeWidth="1" strokeDasharray="4 3" />
      </g>
      <g>
        <circle cx="230" cy="105" r="8" fill="none" stroke="var(--text-primary)" strokeWidth="2" />
        <line x1="230" y1="113" x2="230" y2="135" stroke="var(--text-primary)" strokeWidth="2" />
        <line x1="230" y1="120" x2="220" y2="128" stroke="var(--text-primary)" strokeWidth="2" />
        <line x1="230" y1="120" x2="240" y2="128" stroke="var(--text-primary)" strokeWidth="2" />
        <line x1="230" y1="135" x2="222" y2="150" stroke="var(--text-primary)" strokeWidth="2" />
        <line x1="230" y1="135" x2="238" y2="150" stroke="var(--text-primary)" strokeWidth="2" />
      </g>
      <rect x="210" y="85" width="45" height="70" rx="4" fill="none" stroke="var(--pr-green)" strokeWidth="2" />
      <text x="232" y="78" textAnchor="middle" fontSize="9" fill="var(--pr-green)" fontWeight="500">
        DETECT
      </text>
      <g>
        <ellipse cx="270" cy="145" rx="12" ry="15" fill="var(--text-tertiary)" opacity="0.4" />
        <rect x="258" y="120" width="24" height="25" rx="2" fill="none" stroke="var(--pr-terracotta)" strokeWidth="1.5" strokeDasharray="3 2" />
      </g>
    </svg>
  );
}

export default function CarSection() {
  return (
    <SectionWrapper id="car">
      <div className="mx-auto max-w-xl">
        <div className="mb-4">
          <span className="pr-body text-sm tracking-[0.2em] uppercase" style={{ color: "var(--text-tertiary)" }}>
            Story 03
          </span>
        </div>
        <h2 className="pr-display text-4xl md:text-5xl mb-6 leading-tight">The Self-Driving Car</h2>
        <div className="story-card p-6 md:p-10 mb-8">
          <CarIllustration />
        </div>
        <div className="space-y-6 pr-body leading-relaxed">
          <p>
            The car&apos;s sensors scan the road ahead. A shape appears. Is it a pedestrian? A shadow? A plastic
            bag?
          </p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Brake for everything?</span> The car
            jerks to a halt at every shadow, every bird, every plastic bag. Passengers get whiplash.
          </p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Only brake for certainties?</span>{" "}
            One real pedestrian gets classified as a false positive. Unthinkable.
          </p>
        </div>
        <div className="verdict-callout recall mt-10">
          <p className="pr-body text-base" style={{ color: "var(--text-secondary)" }}>
            <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>The verdict:</span> Autonomous
            vehicles demand{" "}
            <span style={{ color: "var(--pr-green)", fontWeight: 500 }}>extremely high recall</span> for
            pedestrian detection — even if it means some false brakes.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
