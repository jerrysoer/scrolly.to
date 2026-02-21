"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

function FraudIllustration() {
  return (
    <svg viewBox="0 0 280 200" className="mx-auto w-full max-w-sm">
      <g>
        <rect x="60" y="50" width="160" height="100" rx="10" fill="var(--text-primary)" />
        <rect x="60" y="75" width="160" height="25" fill="var(--text-secondary)" opacity="0.3" />
        <rect x="75" y="115" width="50" height="8" rx="2" fill="var(--text-tertiary)" opacity="0.5" />
        <rect x="75" y="128" width="80" height="6" rx="2" fill="var(--text-tertiary)" opacity="0.3" />
        <rect x="80" y="58" width="25" height="18" rx="3" fill="var(--border)" />
        <line x1="85" y1="62" x2="100" y2="62" stroke="var(--text-tertiary)" strokeWidth="1" />
        <line x1="85" y1="67" x2="100" y2="67" stroke="var(--text-tertiary)" strokeWidth="1" />
        <line x1="85" y1="72" x2="100" y2="72" stroke="var(--text-tertiary)" strokeWidth="1" />
      </g>
      <g>
        <circle cx="180" cy="65" r="12" fill="none" stroke="var(--pr-green)" strokeWidth="2" />
        <path d="M176 65 L179 68 L186 61" stroke="var(--pr-green)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g>
        <circle cx="200" cy="40" r="15" fill="var(--pr-terracotta)" opacity="0.15" />
        <circle cx="200" cy="40" r="10" fill="none" stroke="var(--pr-terracotta)" strokeWidth="2" />
        <text x="200" y="44" textAnchor="middle" fontSize="12" fill="var(--pr-terracotta)" fontWeight="bold">
          !
        </text>
      </g>
      <g>
        <path d="M140 160 Q140 175 160 175 L200 175" stroke="var(--border)" strokeWidth="1.5" fill="none" />
        <text x="180" y="188" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">
          $847.32
        </text>
      </g>
    </svg>
  );
}

export default function FraudSection() {
  return (
    <SectionWrapper id="fraud" tinted>
      <div className="mx-auto max-w-xl">
        <div className="mb-4">
          <span className="pr-body text-sm tracking-[0.2em] uppercase" style={{ color: "var(--text-tertiary)" }}>
            Story 04
          </span>
        </div>
        <h2 className="pr-display text-4xl md:text-5xl mb-6 leading-tight">Fraud Detection</h2>
        <div className="story-card p-6 md:p-10 mb-8">
          <FraudIllustration />
        </div>
        <div className="space-y-6 pr-body leading-relaxed">
          <p>
            A transaction hits the system. $847 at an electronics store in a city you&apos;ve never visited.
            Fraud? Or vacation?
          </p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Block suspicious transactions?</span>{" "}
            Your legitimate purchase gets declined. Embarrassing at checkout.
          </p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Let more through?</span> Fraudsters
            drain accounts. Customers lose trust.
          </p>
        </div>
        <div className="verdict-callout balanced mt-10">
          <p className="pr-body text-base" style={{ color: "var(--text-secondary)" }}>
            <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>The verdict:</span> Banks try to{" "}
            <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>balance both</span> — using
            sophisticated models that weigh transaction patterns.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
