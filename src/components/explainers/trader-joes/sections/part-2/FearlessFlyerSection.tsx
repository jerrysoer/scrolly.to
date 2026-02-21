"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import { flyerQuote, flyerInsights } from "@/components/explainers/trader-joes/data/part-2";

export default function FearlessFlyerSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">05</span>
      </div>

      <SectionWrapper id="fearless-flyer" layout="full-bleed" className="py-32 sm:py-44">
        <div className="slow-zoom">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/fearless-flyer.png"
              alt="A vintage Fearless Flyer newsletter with Victorian woodcut illustrations and whimsical product descriptions"
              className="w-full object-cover"
              style={{ aspectRatio: "16/9", objectPosition: "center" }}
            />
          </div>
        </div>

        <PullQuote
          quote={flyerQuote}
          attribution="The New York Times"
          variant="editorial"
        />

        <div className="stagger-children mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {flyerInsights.map((insight, i) => (
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
              <h3
                className="mt-3 text-sm font-semibold sm:text-base"
                style={{ color: "var(--text-primary)" }}
              >
                {insight.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
