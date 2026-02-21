"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import BalanceIllustration from "./BalanceIllustration";

export default function ConclusionSection() {
  return (
    <SectionWrapper id="conclusion" tinted room="spacious">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-10">
          <BalanceIllustration threshold={50} />
        </div>
        <h2 className="pr-display text-4xl md:text-5xl mb-8 leading-tight">
          The Fundamental
          <br />
          Tradeoff
        </h2>
        <div className="pr-body text-xl leading-relaxed space-y-6 mb-12" style={{ color: "var(--text-secondary)" }}>
          <p>You cannot maximize both.</p>
          <p>Improving recall usually hurts precision. Improving precision usually hurts recall.</p>
          <p style={{ color: "var(--text-primary)", fontWeight: 500 }}>The art is knowing which matters more.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-left">
          <div
            className="rounded-xl border p-5"
            style={{
              backgroundColor: "color-mix(in srgb, var(--pr-green) 5%, transparent)",
              borderColor: "color-mix(in srgb, var(--pr-green) 20%, transparent)",
            }}
          >
            <div className="pr-body text-base font-medium mb-2" style={{ color: "var(--pr-green)" }}>
              Prioritize Recall
            </div>
            <p className="pr-body text-sm leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
              When missing something is catastrophic: disease, fraud, safety threats
            </p>
          </div>
          <div
            className="rounded-xl border p-5"
            style={{
              backgroundColor: "color-mix(in srgb, var(--pr-terracotta) 5%, transparent)",
              borderColor: "color-mix(in srgb, var(--pr-terracotta) 20%, transparent)",
            }}
          >
            <div className="pr-body text-base font-medium mb-2" style={{ color: "var(--pr-terracotta)" }}>
              Prioritize Precision
            </div>
            <p className="pr-body text-sm leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
              When false alarms are costly: user trust, recommendations, content
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
