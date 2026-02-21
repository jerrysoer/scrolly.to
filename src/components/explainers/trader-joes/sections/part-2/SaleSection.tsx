"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import {
  saleNarrative,
  saleContractInsight,
  saleRegretQuote,
  saleData,
} from "@/components/explainers/trader-joes/data/part-2";

export default function SaleSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">03</span>
      </div>

      <SectionWrapper id="sale" layout="centered" tinted={true}>
        <h2
          className="mb-4 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          The Reluctant Sale
        </h2>

        {saleNarrative.map((paragraph, i) => (
          <p
            key={i}
            className="mb-6 text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {paragraph}
          </p>
        ))}

        {/* Counter: 3x book value */}
        <div className="my-10 flex justify-center">
          <div className="text-center">
            <CounterAnimation
              target={saleData.bookValueMultiple}
              suffix="×"
              className="text-5xl font-bold sm:text-6xl"
              style={{ color: "var(--accent-gold)" }}
            />
            <p
              className="mt-2 text-sm uppercase tracking-wide"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              book value &middot; {saleData.storeCount} stores &middot;{" "}
              {saleData.year}
            </p>
          </div>
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
            {saleContractInsight.title}
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {saleContractInsight.description}
          </p>
        </div>

        <PullQuote
          quote={saleRegretQuote}
          attribution="Joe Coulombe, Becoming Trader Joe"
        />
      </SectionWrapper>
    </>
  );
}
