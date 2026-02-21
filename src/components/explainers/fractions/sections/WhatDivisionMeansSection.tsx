"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function WhatDivisionMeansSection() {
  const [showGroups, setShowGroups] = useState(false);

  const dots = Array.from({ length: 12 }, (_, i) => i);

  return (
    <SectionWrapper id="what-division-means" layout="centered">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 1
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        What Division Means
      </h2>

      <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        Before we divide fractions, let&rsquo;s remember what division actually means.{" "}
        <span className="font-semibold text-space-blue">12 &divide; 3</span> asks
        one simple question:
      </p>

      <div className="mt-6 rounded-xl border border-border bg-bg-card px-6 py-5">
        <p className="font-serif text-xl font-semibold text-text-primary italic">
          &ldquo;How many groups of 3 fit inside 12?&rdquo;
        </p>
      </div>

      {/* Dot visualization */}
      <div className="mt-10 flex flex-col items-center gap-6">
        <svg viewBox="0 0 400 120" className="w-full max-w-md" aria-label="12 dots divided into 4 groups of 3">
          {dots.map((i) => {
            const group = Math.floor(i / 3);
            const posInGroup = i % 3;
            const groupColors = [
              "var(--space-blue)",
              "var(--amber)",
              "var(--space-blue)",
              "var(--amber)",
            ];

            const baseX = 30 + i * 30;
            const groupedX = 25 + group * 100 + posInGroup * 30;
            const x = showGroups ? groupedX : baseX;

            return (
              <circle
                key={i}
                cx={x}
                cy={60}
                r={12}
                fill={showGroups ? groupColors[group] : "var(--text-tertiary)"}
                opacity={showGroups ? 0.9 : 0.5}
                style={{ transition: "all 0.6s ease-out" }}
              />
            );
          })}

          {/* Group brackets */}
          {showGroups &&
            [0, 1, 2, 3].map((g) => (
              <g key={g}>
                <rect
                  x={8 + g * 100}
                  y={30}
                  width={82}
                  height={60}
                  rx={8}
                  fill="none"
                  stroke={g % 2 === 0 ? "var(--space-blue)" : "var(--amber)"}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  opacity={0.5}
                />
                <text
                  x={49 + g * 100}
                  y={112}
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  fontSize="12"
                  fontFamily="var(--font-jetbrains), monospace"
                >
                  {g + 1}
                </text>
              </g>
            ))}
        </svg>

        <button
          onClick={() => setShowGroups(!showGroups)}
          className="rounded-lg border border-border bg-bg-card px-5 py-2.5 font-sans text-sm font-medium text-text-primary transition-all hover:border-space-blue hover:text-space-blue"
        >
          {showGroups ? "Reset dots" : "Group into 3s"}
        </button>

        {showGroups && (
          <p className="font-sans text-sm text-text-secondary" style={{ animation: "fade-in 0.4s ease-out" }}>
            <span className="font-mono font-bold text-space-blue">4 groups</span> of 3 fit inside 12. So 12 &divide; 3 = <span className="font-mono font-bold text-amber">4</span>.
          </p>
        )}
      </div>

      <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        Division is just counting groups. Keep that idea &mdash; it&rsquo;s the key to understanding
        everything that follows.
      </p>
    </SectionWrapper>
  );
}
