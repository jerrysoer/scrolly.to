"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import { epiphanyQuote, epiphanyInsights } from "@/components/explainers/trader-joes/data/part-1";

export default function EpiphanySection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">07</span>
      </div>

      <SectionWrapper id="epiphany" layout="full-bleed" className="py-12 sm:py-16">
        <div className="slow-zoom">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/st-barts-beach.png"
              alt="A 1960s Caribbean beach scene — a couple and child on the sand, Adirondack chair with a drink in the foreground"
              className="w-full object-cover"
              style={{ aspectRatio: "16/9", objectPosition: "center" }}
            />
          </div>
        </div>

        <PullQuote
          quote={epiphanyQuote}
          attribution="Joe Coulombe"
          variant="editorial"
        />

        <div className="stagger-children mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {epiphanyInsights.map((insight, i) => (
            <div
              key={i}
              className="rounded-xl border p-6"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <span
                className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  backgroundColor: "var(--accent-gold)",
                  color: "var(--bg-primary)",
                }}
              >
                {i + 1}
              </span>
              <p
                className="mt-3 text-sm leading-relaxed sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {insight}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
