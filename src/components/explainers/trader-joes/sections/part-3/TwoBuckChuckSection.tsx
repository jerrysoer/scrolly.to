"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import {
  twoBuckChuckData,
  twoBuckChuckNarrative,
  twoBuckChuckQuote,
} from "@/components/explainers/trader-joes/data/part-3";

export default function TwoBuckChuckSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">03</span>
      </div>

      <SectionWrapper id="two-buck-chuck" layout="full-bleed">
        {/* Hero image */}
        <div className="mb-12 w-full">
          <div
            className="relative overflow-hidden rounded-xl"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src="/generated/tj-two-buck-chuck-evolution.gif"
              alt="Charles Shaw wine bottle on wooden background with $1.99 price tag"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)",
              }}
              aria-hidden="true"
            />
          </div>
          <p
            className="mt-2 text-center text-[10px] tracking-wide uppercase"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
              opacity: 0.6,
            }}
          >
            Nanobanana / AI-generated illustration
          </p>
        </div>

        {/* Two large stat counters */}
        <div className="stagger-children mb-12 flex flex-wrap justify-center gap-12 sm:gap-20">
          {/* $1.99 — static text since it's a price */}
          <div className="text-center">
            <span
              className="block text-5xl font-bold sm:text-7xl"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                background:
                  "linear-gradient(135deg, var(--accent-navy), var(--accent-gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              ${twoBuckChuckData.debutPrice}
            </span>
            <span
              className="mt-2 block text-xs tracking-wide uppercase"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              Per bottle at debut
            </span>
          </div>

          {/* 1B+ bottles sold — animated counter */}
          <div className="text-center">
            <CounterAnimation
              target={1}
              suffix="B+"
              className="block text-5xl font-bold sm:text-7xl"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                background:
                  "linear-gradient(135deg, var(--accent-navy), var(--accent-gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            />
            <span
              className="mt-2 block text-xs tracking-wide uppercase"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              Bottles sold
            </span>
          </div>
        </div>

        {/* Narrative paragraphs */}
        <div className="mx-auto max-w-3xl space-y-6">
          {twoBuckChuckNarrative.map((paragraph, i) => (
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

        {/* Editorial PullQuote */}
        <PullQuote
          quote={twoBuckChuckQuote}
          attribution="Wine industry observer"
          variant="editorial"
        />

        {/* Stat callout: $27K → $1B+ */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <div
            className="rounded-xl border p-6 text-center"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <p
              className="text-3xl font-bold sm:text-4xl"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-gold)",
              }}
            >
              ${twoBuckChuckData.brandPurchasePrice.toLocaleString()}
            </p>
            <p
              className="mt-2 text-xs tracking-wide uppercase"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              Brand purchase price
            </p>
          </div>

          <span
            className="text-3xl"
            style={{ color: "var(--accent-gold)", opacity: 0.6 }}
            aria-hidden="true"
          >
            &rarr;
          </span>

          <div
            className="rounded-xl border p-6 text-center"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <p
              className="text-3xl font-bold sm:text-4xl"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-navy)",
              }}
            >
              $1B+
            </p>
            <p
              className="mt-2 text-xs tracking-wide uppercase"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              In retail sales
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
