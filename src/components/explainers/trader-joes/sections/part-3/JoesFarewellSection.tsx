"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import {
  joesFarewellData,
  joesFarewellNarrative,
  joesFarewellQuote,
} from "@/components/explainers/trader-joes/data/part-3";

export default function JoesFarewellSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">07</span>
      </div>

      <SectionWrapper id="joes-farewell" layout="centered">
        {/* Date hero */}
        <p
          className="mb-2 text-center text-4xl font-bold sm:text-6xl md:text-7xl"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            color: "var(--accent-gold)",
          }}
        >
          {joesFarewellData.date}
        </p>
        <p
          className="mb-12 text-center text-sm tracking-wide sm:text-base"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            color: "var(--text-tertiary)",
          }}
        >
          {joesFarewellData.location} · Age {joesFarewellData.age}
        </p>

        {/* Real photograph */}
        <div className="slow-zoom">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/joe-coulombe-nyt.webp"
              alt="Joe Coulombe, founder of Trader Joe's, seated in his garden in Pasadena"
              className="w-full object-cover"
              style={{ aspectRatio: "3/4", objectPosition: "center 20%" }}
            />
          </div>
          <p
            className="mt-2 text-right text-[10px] tracking-wide"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            Photo: The New York Times
          </p>
        </div>

        {/* Narrative paragraphs */}
        <div className="mt-12 space-y-6">
          {joesFarewellNarrative.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed sm:text-lg"
              style={{
                fontFamily: "var(--font-source-serif), Georgia, serif",
                color: "var(--text-secondary)",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Pull quote */}
        <PullQuote
          quote={joesFarewellQuote}
          attribution="Joe Coulombe, Becoming Trader Joe"
          variant="editorial"
        />
      </SectionWrapper>
    </>
  );
}
