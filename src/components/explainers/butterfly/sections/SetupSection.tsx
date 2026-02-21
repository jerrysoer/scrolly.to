"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { sizeComparisons } from "@/lib/explainers/butterfly";

export default function SetupSection() {
  const maxSize = Math.max(...sizeComparisons.map((s) => s.size));

  return (
    <SectionWrapper id="the-setup" layout="split-left" stagger>
      {/* Left column — text */}
      <div className="flex flex-col justify-center">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-forest-green">
          Stage 1 — Larva
        </p>

        <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
          The Setup
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          A butterfly&rsquo;s larva — the caterpillar — has exactly one job:{" "}
          <strong className="font-semibold text-text-primary">eat</strong>. From the moment it
          hatches, it consumes leaves almost continuously, growing up to{" "}
          <span className="font-semibold text-forest-green">100 times its hatch weight</span>{" "}
          before triggering metamorphosis.
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          Most caterpillars shed their skin (molt) four or five times as they grow —
          each stage called an <em>instar</em>. They&rsquo;re not just getting bigger;
          they&rsquo;re accumulating the raw material for transformation.
        </p>

        {/* Stat box callout */}
        <div
          className="mt-8 rounded-xl border p-5"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <p className="stat-hero">100x</p>
          <p className="mt-2 font-sans text-sm text-text-secondary">
            weight gain from hatch to chrysalis stage
          </p>
          <p className="mt-1 font-mono text-xs text-text-tertiary">
            Source: University of Arizona
          </p>
        </div>
      </div>

      {/* Right column — true-to-scale size comparison */}
      <div className="flex flex-col justify-center">
        <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          Size comparison — true to scale
        </p>
        <p className="mb-5 font-sans text-xs text-text-tertiary">
          Bar widths are proportional to actual length in mm.
        </p>
        <div className="space-y-4">
          {sizeComparisons.map((item) => {
            const barPct = (item.size / maxSize) * 100;
            // Ensure tiny bars (egg, newborn) are still visible with a min width
            const barWidth = `max(${barPct.toFixed(1)}%, 4px)`;
            return (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-sans text-sm text-text-secondary">{item.label}</span>
                  <span className="font-mono text-xs text-text-tertiary">
                    {item.size}{item.unit}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-bg-secondary">
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{
                      width: barWidth,
                      background:
                        "linear-gradient(90deg, var(--forest-green), var(--warm-amber))",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 font-sans text-xs italic text-text-tertiary">
          A Monarch caterpillar can reach 50mm — nearly the length of an adult&rsquo;s thumb.
        </p>
      </div>
    </SectionWrapper>
  );
}
