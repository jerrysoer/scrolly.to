"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

function MedicalIllustration() {
  return (
    <svg viewBox="0 0 280 220" className="mx-auto w-full max-w-sm">
      <rect x="60" y="60" width="160" height="100" rx="6" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="2" />
      {[[100, 95, 12], [145, 85, 10], [120, 130, 9]].map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--pr-green)" strokeWidth="2" />
          <circle cx={cx} cy={cy} r={(r as number) / 3} fill="var(--pr-green)" opacity="0.3" />
        </g>
      ))}
      <g>
        <circle cx="180" cy="100" r="14" fill="none" stroke="var(--pr-terracotta)" strokeWidth="2.5" />
        <circle cx="180" cy="100" r="8" fill="var(--pr-terracotta)" opacity="0.15" />
        <text x="180" y="104" textAnchor="middle" fontSize="10" fill="var(--pr-terracotta)" fontWeight="bold">
          ?
        </text>
      </g>
      <g>
        <circle cx="165" cy="140" r="11" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="165" cy="140" r="4" fill="var(--text-tertiary)" opacity="0.2" />
      </g>
      <g>
        <circle cx="210" cy="50" r="20" fill="none" stroke="var(--text-primary)" strokeWidth="2" />
        <line x1="224" y1="64" x2="238" y2="78" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
      </g>
      <text x="140" y="185" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
        Sample Analysis
      </text>
    </svg>
  );
}

export default function MedicalSection() {
  return (
    <SectionWrapper id="medical" tinted>
      <div className="mx-auto max-w-xl">
        <div className="mb-4">
          <span className="pr-body text-sm tracking-[0.2em] uppercase" style={{ color: "var(--text-tertiary)" }}>
            Story 02
          </span>
        </div>
        <h2 className="pr-display text-4xl md:text-5xl mb-6 leading-tight">Cancer Screening</h2>
        <div className="story-card p-6 md:p-10 mb-8">
          <MedicalIllustration />
        </div>
        <div className="space-y-6 pr-body leading-relaxed">
          <p>A pathologist examines a tissue sample. Some cells look normal. Others are ambiguous. One looks suspicious.</p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Flag everything suspicious?</span>{" "}
            Many healthy patients undergo stressful biopsies, sleepless nights waiting for results.
          </p>
          <p>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Only flag the obvious?</span>{" "}
            Early-stage cancers slip through. A treatable disease becomes terminal.
          </p>
        </div>
        <div className="verdict-callout recall mt-10">
          <p className="pr-body text-base" style={{ color: "var(--text-secondary)" }}>
            <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>The verdict:</span> Medical
            screening prioritizes{" "}
            <span style={{ color: "var(--pr-green)", fontWeight: 500 }}>high recall</span> — better to
            investigate 100 false alarms than miss one real cancer.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
