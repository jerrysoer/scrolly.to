"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

function SearchIllustration() {
  return (
    <svg viewBox="0 0 280 200" className="mx-auto w-full max-w-sm">
      <g>
        <rect x="40" y="30" width="200" height="36" rx="18" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="2" />
        <circle cx="65" cy="48" r="10" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" />
        <line x1="72" y1="55" x2="80" y2="63" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" />
        <line x1="85" y1="48" x2="180" y2="48" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
      </g>
      {[
        [75, "var(--pr-green)", 1.5, "none"],
        [112, "var(--text-tertiary)", 1, "none"],
        [149, "var(--pr-terracotta)", 1, "4 2"],
      ].map(([y, color, sw, dash], i) => (
        <g key={i}>
          <rect
            x="40"
            y={y as number}
            width="200"
            height="32"
            rx="4"
            fill="var(--bg-card)"
            stroke={color as string}
            strokeWidth={sw as number}
            strokeDasharray={dash as string}
          />
          <circle cx="58" cy={(y as number) + 16} r="8" fill={color as string} opacity={0.15 - i * 0.03} />
          <line
            x1="75"
            y1={(y as number) + 10}
            x2={160 - i * 10}
            y2={(y as number) + 10}
            stroke={i === 2 ? "var(--text-tertiary)" : "var(--text-primary)"}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="75"
            y1={(y as number) + 20}
            x2={220 - i * 15}
            y2={(y as number) + 20}
            stroke={i === 2 ? "var(--border)" : "var(--border)"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text x="225" y={(y as number) + 14} fontSize="8" fill={color as string} fontWeight={i === 0 ? "500" : "400"}>
            #{i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function SearchSection() {
  return (
    <SectionWrapper id="search" tinted>
      <div className="mx-auto max-w-xl">
        <div className="mb-4">
          <span className="pr-body text-sm tracking-[0.2em] uppercase" style={{ color: "var(--text-tertiary)" }}>
            Story 06
          </span>
        </div>
        <h2 className="pr-display text-4xl md:text-5xl mb-6 leading-tight">Search Results</h2>
        <div className="story-card p-6 md:p-10 mb-8">
          <SearchIllustration />
        </div>
        <div className="space-y-6 pr-body leading-relaxed">
          <p>
            You search for &ldquo;best Italian restaurant.&rdquo; The algorithm has seconds to rank thousands of
            possibilities.
          </p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Show everything related?</span> Page
            one is cluttered with tangentially relevant results.
          </p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Show only perfect matches?</span>{" "}
            The hidden gem — that tiny family trattoria — never makes the cut.
          </p>
        </div>
        <div className="verdict-callout precision mt-10">
          <p className="pr-body text-base" style={{ color: "var(--text-secondary)" }}>
            <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>The verdict:</span> Search engines
            optimize for{" "}
            <span style={{ color: "var(--pr-terracotta)", fontWeight: 500 }}>precision at the top</span> — the
            first few results must be highly relevant.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
