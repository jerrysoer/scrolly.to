"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

interface F1ScoreSectionProps {
  f1Score: number;
  recall: number;
  precision: number;
}

export default function F1ScoreSection({ f1Score, recall, precision }: F1ScoreSectionProps) {
  return (
    <SectionWrapper id="f1-score" tinted>
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="pr-body text-sm tracking-[0.2em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
            Bonus Concept
          </p>
          <h2 className="pr-display text-4xl md:text-5xl mb-4">The F1 Score</h2>
          <p className="pr-body text-lg" style={{ color: "var(--text-tertiary)" }}>
            When you need a single number that balances both
          </p>
        </div>

        <div className="story-card p-6 md:p-10">
          <div className="mb-8 text-center">
            <div className="pr-display text-6xl md:text-7xl" style={{ color: "var(--text-primary)" }}>
              {f1Score}%
            </div>
            <div className="pr-body mt-2 text-lg" style={{ color: "var(--text-tertiary)" }}>
              Current F1 Score
            </div>
          </div>

          <div className="mb-8 text-center text-2xl md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
            F1 = 2 &times;{" "}
            <span style={{ color: "var(--pr-terracotta)" }}>(P &times; R)</span> /{" "}
            <span style={{ color: "var(--text-tertiary)" }}>(P + R)</span>
          </div>

          <div
            className="rounded-xl border p-5 mb-6"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <h4 className="pr-body font-medium mb-2" style={{ color: "var(--text-primary)" }}>
              Harmonic Mean
            </h4>
            <p className="pr-body text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The F1 score is the <em>harmonic mean</em> of precision and recall. Unlike the regular average, it
              penalizes extreme imbalances. If either precision or recall is very low, F1 will be low too.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: "color-mix(in srgb, var(--pr-green) 5%, transparent)" }}
            >
              <div className="pr-display text-2xl" style={{ color: "var(--pr-green)" }}>
                {recall}%
              </div>
              <div className="pr-body text-sm" style={{ color: "var(--text-tertiary)" }}>Recall</div>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <div className="pr-display text-2xl" style={{ color: "var(--text-primary)" }}>
                {f1Score}%
              </div>
              <div className="pr-body text-sm" style={{ color: "var(--text-tertiary)" }}>F1</div>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: "color-mix(in srgb, var(--pr-terracotta) 5%, transparent)" }}
            >
              <div className="pr-display text-2xl" style={{ color: "var(--pr-terracotta)" }}>
                {precision}%
              </div>
              <div className="pr-body text-sm" style={{ color: "var(--text-tertiary)" }}>Precision</div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
