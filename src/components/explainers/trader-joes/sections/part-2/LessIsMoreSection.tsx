"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { fourTests, oneInOneOutInsight, buyingStrategy } from "@/components/explainers/trader-joes/data/part-2";

export default function LessIsMoreSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">07</span>
      </div>

      <SectionWrapper id="less-is-more" layout="centered">
        <h2
          className="mb-4 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Less is More
        </h2>

        <p
          className="mb-10 text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Joe Coulombe distilled his buying philosophy into four ruthless tests.
          Every product on every shelf had to pass all four — no exceptions, no
          politics, no legacy holds.
        </p>

        {/* 2x2 card grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fourTests.map((test) => (
            <div
              key={test.number}
              className="rounded-xl border p-6 transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <span
                className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  backgroundColor: "var(--accent-gold)",
                  color: "var(--bg-primary)",
                }}
              >
                {test.number}
              </span>
              <h3
                className="mt-3 text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {test.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {test.description}
              </p>
            </div>
          ))}
        </div>

        {/* Intel callout */}
        <div className="intel-callout mt-8">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wider"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--accent-gold)",
            }}
          >
            {oneInOneOutInsight.title}
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {oneInOneOutInsight.description}
          </p>
        </div>

        <p
          className="mt-8 text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {buyingStrategy}
        </p>
      </SectionWrapper>
    </>
  );
}
