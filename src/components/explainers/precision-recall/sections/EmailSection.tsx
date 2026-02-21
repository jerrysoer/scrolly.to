"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

function EmailIllustration() {
  return (
    <svg viewBox="0 0 280 200" className="mx-auto w-full max-w-sm">
      <rect x="40" y="30" width="200" height="140" rx="8" fill="none" stroke="var(--border)" strokeWidth="2" />
      <text x="140" y="22" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)" fontWeight="500">
        INBOX
      </text>
      {[0, 1, 2].map((i) => (
        <g key={`good-${i}`}>
          <rect x={55 + i * 8} y={50 + i * 25} width="100" height="32" rx="4" fill="var(--bg-primary)" stroke="var(--pr-green)" strokeWidth="1.5" />
          <line x1={65 + i * 8} y1={62 + i * 25} x2={95 + i * 8} y2={62 + i * 25} stroke="var(--pr-green)" strokeWidth="2" strokeLinecap="round" />
          <line x1={65 + i * 8} y1={72 + i * 25} x2={140 + i * 8} y2={72 + i * 25} stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={147 + i * 8} cy={66 + i * 25} r="4" fill="var(--pr-green)" opacity="0.3" />
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={`spam-${i}`}>
          <rect x={155 + i * 12} y={60 + i * 35} width="70" height="32" rx="4" fill="var(--bg-primary)" stroke="var(--pr-terracotta)" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1={165 + i * 12} y1={72 + i * 35} x2={185 + i * 12} y2={72 + i * 35} stroke="var(--pr-terracotta)" strokeWidth="2" strokeLinecap="round" />
          <line x1={165 + i * 12} y1={82 + i * 35} x2={210 + i * 12} y2={82 + i * 35} stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
          <text x={210 + i * 12} y={76 + i * 35} fontSize="8" fill="var(--pr-terracotta)">!</text>
        </g>
      ))}
      <path d="M140 175 L120 185 L160 185 Z" fill="none" stroke="var(--text-primary)" strokeWidth="1.5" />
    </svg>
  );
}

export default function EmailSection() {
  return (
    <SectionWrapper id="email">
      <div className="mx-auto max-w-xl">
        <div className="mb-4">
          <span className="pr-body text-sm tracking-[0.2em] uppercase" style={{ color: "var(--text-tertiary)" }}>
            Story 01
          </span>
        </div>
        <h2 className="pr-display text-4xl md:text-5xl mb-6 leading-tight">The Spam Filter</h2>
        <div className="story-card p-6 md:p-10 mb-8">
          <EmailIllustration />
        </div>
        <div className="space-y-6 pr-body leading-relaxed">
          <p>Your email filter faces an impossible choice every second. Hundreds of messages arrive, some important, some junk.</p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Too strict?</span> Important emails
            from your boss end up in spam. You miss the meeting invite. Awkward.
          </p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Too loose?</span> Nigerian princes
            flood your inbox. You waste time deleting garbage.
          </p>
        </div>
        <div className="verdict-callout precision mt-10">
          <p className="pr-body text-base" style={{ color: "var(--text-secondary)" }}>
            <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>The verdict:</span> Most email
            filters lean toward{" "}
            <span style={{ color: "var(--pr-terracotta)", fontWeight: 500 }}>high precision</span> — they&apos;d
            rather let some spam through than block a real email.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
