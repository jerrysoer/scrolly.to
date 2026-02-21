"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import BalanceIllustration from "./BalanceIllustration";

interface InteractiveSectionProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
  metrics: { recall: number; precision: number };
}

export default function InteractiveSection({
  threshold,
  onThresholdChange,
  metrics,
}: InteractiveSectionProps) {
  return (
    <SectionWrapper id="interactive">
      <div className="mx-auto max-w-xl">
        <div className="mb-12 text-center">
          <p className="pr-body text-sm tracking-[0.2em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
            Interactive
          </p>
          <h2 className="pr-display text-4xl md:text-5xl mb-4">Feel the Tradeoff</h2>
          <p className="pr-body text-lg" style={{ color: "var(--text-tertiary)" }}>
            Drag the slider to shift the balance
          </p>
        </div>

        <div className="story-card p-6 md:p-10 mb-8">
          <div className="mb-10">
            <BalanceIllustration threshold={threshold} />
          </div>
          <div className="mb-8">
            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={(e) => onThresholdChange(Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-3 flex justify-between pr-body text-sm" style={{ color: "var(--text-tertiary)" }}>
              <span>&larr; High Recall</span>
              <span>High Precision &rarr;</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div
              className="rounded-xl border p-4 text-center md:p-6"
              style={{
                backgroundColor: "color-mix(in srgb, var(--pr-green) 5%, transparent)",
                borderColor: "color-mix(in srgb, var(--pr-green) 20%, transparent)",
              }}
            >
              <div className="pr-display text-4xl md:text-5xl" style={{ color: "var(--pr-green)" }}>
                {metrics.recall}%
              </div>
              <div className="pr-body mt-1 text-base" style={{ color: "var(--text-tertiary)" }}>Recall</div>
              <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ backgroundColor: "var(--bg-secondary)" }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${metrics.recall}%`, backgroundColor: "var(--pr-green)" }}
                />
              </div>
            </div>
            <div
              className="rounded-xl border p-4 text-center md:p-6"
              style={{
                backgroundColor: "color-mix(in srgb, var(--pr-terracotta) 5%, transparent)",
                borderColor: "color-mix(in srgb, var(--pr-terracotta) 20%, transparent)",
              }}
            >
              <div className="pr-display text-4xl md:text-5xl" style={{ color: "var(--pr-terracotta)" }}>
                {metrics.precision}%
              </div>
              <div className="pr-body mt-1 text-base" style={{ color: "var(--text-tertiary)" }}>Precision</div>
              <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ backgroundColor: "var(--bg-secondary)" }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${metrics.precision}%`, backgroundColor: "var(--pr-terracotta)" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-xl border p-5 transition-all duration-500"
          style={{
            backgroundColor:
              threshold < 50
                ? "color-mix(in srgb, var(--pr-green) 5%, transparent)"
                : "color-mix(in srgb, var(--pr-terracotta) 5%, transparent)",
            borderColor:
              threshold < 50
                ? "color-mix(in srgb, var(--pr-green) 20%, transparent)"
                : "color-mix(in srgb, var(--pr-terracotta) 20%, transparent)",
          }}
        >
          {threshold < 50 ? (
            <div className="pr-body text-base" style={{ color: "var(--text-secondary)" }}>
              <span style={{ fontWeight: 500, color: "var(--pr-green)" }}>High Recall Mode</span>
              <p className="mt-2">Casting a wide net. You catch almost everything, but some false alarms slip in.</p>
            </div>
          ) : (
            <div className="pr-body text-base" style={{ color: "var(--text-secondary)" }}>
              <span style={{ fontWeight: 500, color: "var(--pr-terracotta)" }}>High Precision Mode</span>
              <p className="mt-2">Taking careful aim. What you catch is accurate, but some targets slip away.</p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
