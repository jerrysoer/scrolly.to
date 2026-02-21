"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const divisorOptions = [
  { label: "\u00BD", value: 0.5, display: "1/2" },
  { label: "\u2153", value: 1 / 3, display: "1/3" },
  { label: "\u00BC", value: 0.25, display: "1/4" },
  { label: "\u2155", value: 0.2, display: "1/5" },
  { label: "\u2159", value: 1 / 6, display: "1/6" },
];

export default function PatternSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dividend = 3;
  const divisor = divisorOptions[selectedIndex];
  const pieceCount = Math.round(dividend / divisor.value);

  const lineWidth = 480;
  const lineY = 50;
  const segWidth = (lineWidth - 20) / pieceCount;

  return (
    <SectionWrapper id="pattern" layout="full-bleed">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 3
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        The Pattern
      </h2>

      <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        When you divide by a <span className="font-semibold text-amber">smaller</span> fraction,
        you get <span className="font-semibold text-space-blue">more</span> pieces.
        Try it: divide {dividend} by different fractions.
      </p>

      {/* Divisor selector */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm text-text-tertiary">{dividend} &divide;</span>
        {divisorOptions.map((opt, i) => (
          <button
            key={opt.display}
            onClick={() => setSelectedIndex(i)}
            className={`rounded-lg border px-4 py-2 font-mono text-sm font-medium transition-all ${
              selectedIndex === i
                ? "border-space-blue bg-space-blue/10 text-space-blue"
                : "border-border bg-bg-card text-text-secondary hover:border-space-blue"
            }`}
          >
            {opt.display}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="mt-6 flex items-center gap-4">
        <div className="rounded-xl border border-border bg-bg-card px-6 py-4">
          <p className="font-mono text-sm text-text-tertiary">
            {dividend} &divide; {divisor.display} =
          </p>
          <p className="mt-1 font-mono text-4xl font-bold text-space-blue">{pieceCount}</p>
          <p className="mt-0.5 font-sans text-xs text-text-tertiary">pieces</p>
        </div>
      </div>

      {/* Number line */}
      <div className="mt-8 overflow-x-auto pb-2 scrollbar-none">
        <svg
          viewBox={`0 0 ${lineWidth + 20} 100`}
          className="w-full max-w-2xl"
          aria-label={`Number line showing ${dividend} divided into ${pieceCount} segments`}
        >
          {/* Main line */}
          <line x1="10" y1={lineY} x2={lineWidth} y2={lineY} stroke="var(--border)" strokeWidth="2" />

          {/* Whole number ticks */}
          {Array.from({ length: dividend + 1 }, (_, i) => {
            const x = 10 + i * (lineWidth - 20) / dividend;
            return (
              <g key={`tick-${i}`}>
                <line x1={x} y1={lineY - 10} x2={x} y2={lineY + 10} stroke="var(--text-primary)" strokeWidth="2" />
                <text x={x} y={lineY + 28} textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontFamily="var(--font-jetbrains), monospace" fontWeight="600">
                  {i}
                </text>
              </g>
            );
          })}

          {/* Segments */}
          {Array.from({ length: Math.min(pieceCount, 30) }, (_, i) => {
            const x = 10 + i * segWidth;
            return (
              <rect
                key={`seg-${i}`}
                x={x + 1}
                y={lineY - 18}
                width={Math.max(segWidth - 2, 2)}
                height={14}
                rx={3}
                fill={i % 2 === 0 ? "var(--space-blue)" : "var(--amber)"}
                opacity={0.65}
                style={{ transition: "all 0.4s ease-out" }}
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-bg-card px-5 py-4 max-w-xl">
        <p className="font-sans text-sm leading-relaxed text-text-secondary">
          <span className="font-semibold text-text-primary">The smaller the divisor, the more pieces you get.</span>{" "}
          This is why dividing by a fraction gives you a <em>bigger</em> number &mdash; not a smaller one.
        </p>
      </div>
    </SectionWrapper>
  );
}
