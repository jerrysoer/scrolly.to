"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function SameQuestionSection() {
  const [showHalves, setShowHalves] = useState(false);

  const totalWidth = 560;
  const lineY = 60;
  const halfCount = 12;

  return (
    <SectionWrapper id="same-question" layout="split-left">
      {/* Left text */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          Section 2
        </p>

        <h2 className="mt-4 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Same Question
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
          Now try this: <span className="font-mono font-semibold text-space-blue">6 &divide; &frac12;</span>
        </p>

        <div className="mt-4 rounded-xl border border-border bg-bg-card px-5 py-4">
          <p className="font-serif text-lg font-semibold text-text-primary italic">
            &ldquo;How many halves fit inside 6?&rdquo;
          </p>
        </div>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
          Same question as before &mdash; we&rsquo;re still just counting groups.
          But this time each group is only{" "}
          <span className="font-semibold text-amber">&frac12;</span> wide.
        </p>

        <button
          onClick={() => setShowHalves(!showHalves)}
          className="mt-6 rounded-lg border border-border bg-bg-card px-5 py-2.5 font-sans text-sm font-medium text-text-primary transition-all hover:border-space-blue hover:text-space-blue"
        >
          {showHalves ? "Hide halves" : "Count the halves"}
        </button>

        {showHalves && (
          <p
            className="mt-4 font-sans text-sm text-text-secondary"
            style={{ animation: "fade-in 0.4s ease-out" }}
          >
            There are <span className="font-mono font-bold text-space-blue">12 halves</span> in 6. So 6 &divide; &frac12; = <span className="font-mono font-bold text-amber">12</span>.
          </p>
        )}
      </div>

      {/* Right visualization */}
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 580 140" className="w-full max-w-lg" aria-label="Number line from 0 to 6 showing half segments">
          {/* Main number line */}
          <line x1="10" y1={lineY} x2={totalWidth} y2={lineY} stroke="var(--border)" strokeWidth="2" />

          {/* Whole number ticks and labels */}
          {Array.from({ length: 7 }, (_, i) => {
            const x = 10 + i * (totalWidth - 20) / 6;
            return (
              <g key={`whole-${i}`}>
                <line x1={x} y1={lineY - 12} x2={x} y2={lineY + 12} stroke="var(--text-primary)" strokeWidth="2" />
                <text x={x} y={lineY + 30} textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontFamily="var(--font-jetbrains), monospace" fontWeight="600">
                  {i}
                </text>
              </g>
            );
          })}

          {/* Half-unit ticks */}
          {Array.from({ length: 6 }, (_, i) => {
            const x = 10 + (i + 0.5) * (totalWidth - 20) / 6;
            return (
              <line key={`half-${i}`} x1={x} y1={lineY - 6} x2={x} y2={lineY + 6} stroke="var(--text-tertiary)" strokeWidth="1" />
            );
          })}

          {/* Half segments colored */}
          {showHalves &&
            Array.from({ length: halfCount }, (_, i) => {
              const segWidth = (totalWidth - 20) / 12;
              const x = 10 + i * segWidth;
              return (
                <g key={`seg-${i}`}>
                  <rect
                    x={x}
                    y={lineY - 20}
                    width={segWidth}
                    height={16}
                    rx={3}
                    fill={i % 2 === 0 ? "var(--space-blue)" : "var(--amber)"}
                    opacity={0.6}
                    style={{
                      animation: `fade-in 0.3s ease-out ${i * 0.05}s both`,
                    }}
                  />
                  <text
                    x={x + segWidth / 2}
                    y={lineY - 26}
                    textAnchor="middle"
                    fill={i % 2 === 0 ? "var(--space-blue)" : "var(--amber)"}
                    fontSize="10"
                    fontFamily="var(--font-jetbrains), monospace"
                    fontWeight="500"
                    style={{
                      animation: `fade-in 0.3s ease-out ${i * 0.05 + 0.1}s both`,
                    }}
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>
    </SectionWrapper>
  );
}
