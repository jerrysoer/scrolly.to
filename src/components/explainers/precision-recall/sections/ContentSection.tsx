"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

function ContentIllustration() {
  return (
    <svg viewBox="0 0 280 200" className="mx-auto w-full max-w-sm">
      <g>
        <rect x="90" y="20" width="100" height="170" rx="12" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" />
        <rect x="95" y="35" width="90" height="140" rx="4" fill="var(--bg-primary)" />
        <rect x="120" y="23" width="40" height="8" rx="4" fill="var(--text-primary)" />
      </g>
      <g>
        <rect x="100" y="42" width="80" height="35" rx="3" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1" />
        <line x1="108" y1="52" x2="150" y2="52" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
        <line x1="108" y1="62" x2="172" y2="62" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="108" y1="70" x2="160" y2="70" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g>
        <rect x="100" y="82" width="80" height="35" rx="3" fill="var(--bg-card)" stroke="var(--pr-terracotta)" strokeWidth="1.5" />
        <line x1="108" y1="92" x2="145" y2="92" stroke="var(--pr-terracotta)" strokeWidth="2" strokeLinecap="round" />
        <line x1="108" y1="102" x2="172" y2="102" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="155" y="88" width="20" height="12" rx="2" fill="var(--pr-terracotta)" opacity="0.2" />
        <text x="165" y="97" textAnchor="middle" fontSize="7" fill="var(--pr-terracotta)" fontWeight="bold">
          FLAG
        </text>
      </g>
      <g>
        <rect x="100" y="122" width="80" height="35" rx="3" fill="var(--bg-card)" stroke="var(--pr-green)" strokeWidth="1" />
        <line x1="108" y1="132" x2="155" y2="132" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
        <line x1="108" y1="142" x2="172" y2="142" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="170" cy="132" r="6" fill="var(--pr-green)" opacity="0.2" />
        <path d="M167 132 L169 134 L174 129" stroke="var(--pr-green)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function ContentSection() {
  return (
    <SectionWrapper id="content">
      <div className="mx-auto max-w-xl">
        <div className="mb-4">
          <span className="pr-body text-sm tracking-[0.2em] uppercase" style={{ color: "var(--text-tertiary)" }}>
            Story 05
          </span>
        </div>
        <h2 className="pr-display text-4xl md:text-5xl mb-6 leading-tight">Content Moderation</h2>
        <div className="story-card p-6 md:p-10 mb-8">
          <ContentIllustration />
        </div>
        <div className="space-y-6 pr-body leading-relaxed">
          <p>Millions of posts flood the platform every hour. Some are news. Some are hate speech disguised as satire.</p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Remove aggressively?</span>{" "}
            Legitimate journalism and political dissent get caught. Outcry over censorship.
          </p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Remove cautiously?</span> Harmful
            content spreads. Misinformation goes viral.
          </p>
        </div>
        <div className="verdict-callout precision mt-10">
          <p className="pr-body text-base" style={{ color: "var(--text-secondary)" }}>
            <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>The verdict:</span> Platforms often
            lean toward{" "}
            <span style={{ color: "var(--pr-terracotta)", fontWeight: 500 }}>higher precision</span> for
            borderline content, using human reviewers for edge cases.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
