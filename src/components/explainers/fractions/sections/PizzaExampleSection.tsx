"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function PizzaExampleSection() {
  const [showSlices, setShowSlices] = useState(false);

  const totalSlices = 8;
  const filledSlices = 6; // 3/4 of 8 = 6 slices
  const servingSize = 3; // 3/8 = 3 slices per serving
  const servingCount = filledSlices / servingSize; // = 2

  const sliceAngle = 360 / totalSlices;
  const radius = 120;
  const cx = 160;
  const cy = 160;

  function slicePath(index: number): string {
    const startAngle = (index * sliceAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    return `M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;
  }

  function getSliceColor(index: number): string {
    if (index >= filledSlices) return "var(--border)";
    if (!showSlices) return "var(--pizza-cheese)";
    const serving = Math.floor(index / servingSize);
    return serving === 0 ? "var(--space-blue)" : "var(--amber)";
  }

  return (
    <SectionWrapper id="pizza-example" layout="full-bleed">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 5
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        Pizza Proof
      </h2>

      <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        You have <span className="font-semibold text-amber">&frac34;</span> of a pizza.
        Each serving is <span className="font-semibold text-space-blue">&frac38;</span> of a pizza.
        How many servings do you get?
      </p>

      <div className="mt-8 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
        {/* Pizza SVG */}
        <div className="flex-shrink-0">
          <svg
            viewBox="0 0 320 320"
            className="w-64 h-64 sm:w-72 sm:h-72"
            aria-label="Pizza divided into 8 slices, 6 filled representing 3/4"
          >
            {/* Pizza base */}
            <circle cx={cx} cy={cy} r={radius + 4} fill="var(--pizza-crust)" />
            <circle cx={cx} cy={cy} r={radius} fill="var(--pizza-sauce)" opacity="0.3" />

            {/* Slices */}
            {Array.from({ length: totalSlices }, (_, i) => (
              <path
                key={i}
                d={slicePath(i)}
                fill={getSliceColor(i)}
                stroke="var(--bg-primary)"
                strokeWidth="2"
                opacity={i >= filledSlices ? 0.15 : 0.85}
                style={{ transition: "fill 0.5s ease-out" }}
              />
            ))}

            {/* Serving divider line */}
            {showSlices && (
              <line
                x1={cx}
                y1={cy}
                x2={cx + radius * Math.cos((servingSize * sliceAngle - 90) * (Math.PI / 180))}
                y2={cy + radius * Math.sin((servingSize * sliceAngle - 90) * (Math.PI / 180))}
                stroke="var(--text-primary)"
                strokeWidth="3"
                strokeDasharray="6 4"
                style={{ animation: "fade-in 0.4s ease-out" }}
              />
            )}

            {/* Labels */}
            {showSlices && (
              <>
                <text
                  x={cx - 20}
                  y={cy - 30}
                  fill="white"
                  fontSize="16"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontWeight="700"
                  style={{ animation: "fade-in 0.4s ease-out 0.2s both" }}
                >
                  1
                </text>
                <text
                  x={cx + 30}
                  y={cy + 40}
                  fill="white"
                  fontSize="16"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontWeight="700"
                  style={{ animation: "fade-in 0.4s ease-out 0.4s both" }}
                >
                  2
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Explanation */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-bg-card px-5 py-4">
            <p className="font-mono text-sm text-text-tertiary">The math</p>
            <p className="mt-2 font-mono text-2xl font-bold text-text-primary">
              &frac34; &divide; &frac38; = &frac34; &times; <sup>8</sup>&frasl;<sub>3</sub> = <span className="text-space-blue">{servingCount}</span>
            </p>
          </div>

          <button
            onClick={() => setShowSlices(!showSlices)}
            className="rounded-lg border border-border bg-bg-card px-5 py-2.5 font-sans text-sm font-medium text-text-primary transition-all hover:border-space-blue hover:text-space-blue"
          >
            {showSlices ? "Reset pizza" : "Show servings"}
          </button>

          {showSlices && (
            <div className="space-y-2" style={{ animation: "fade-in 0.4s ease-out" }}>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-space-blue" />
                <span className="font-sans text-sm text-text-secondary">Serving 1 (3 slices = &frac38;)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-amber" />
                <span className="font-sans text-sm text-text-secondary">Serving 2 (3 slices = &frac38;)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded" style={{ backgroundColor: "var(--border)" }} />
                <span className="font-sans text-sm text-text-secondary">Missing (2 slices = &frac14;)</span>
              </div>
            </div>
          )}

          <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary max-w-sm">
            Exactly <span className="font-mono font-bold text-space-blue">2 servings</span> fit.
            The math matches the pizza.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
