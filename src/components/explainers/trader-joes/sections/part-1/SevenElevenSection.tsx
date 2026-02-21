"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import TimelineStepper from "@/components/explainers/trader-joes/shared/TimelineStepper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import { sevenElevenTimeline } from "@/components/explainers/trader-joes/data/part-1";

export default function SevenElevenSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">03</span>
      </div>

      <SectionWrapper id="seven-eleven" layout="centered" tinted={true}>
      {/* Headline */}
      <h2
        className="mb-6 text-3xl font-bold leading-tight sm:text-4xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        The Franchise Juggernaut
      </h2>

      {/* Intro paragraphs */}
      <p
        className="mb-4 text-base leading-relaxed sm:text-lg"
        style={{ color: "var(--text-secondary)" }}
      >
        While Joe Coulombe was running six scrappy Pronto Markets in Los Angeles,
        a quiet revolution was reshaping American retail from Dallas, Texas. The
        convenience store was becoming the fastest-growing format in the country
        &mdash; and one company was writing the playbook.
      </p>
      <p
        className="mb-4 text-base leading-relaxed sm:text-lg"
        style={{ color: "var(--text-secondary)" }}
      >
        7-Eleven didn&apos;t just popularize the convenience store &mdash; they
        industrialized it. Standardized layouts, franchise economics, and
        ruthless expansion turned corner stores into a coast-to-coast empire. By
        the time they hit Southern California, the message to small operators was
        clear: adapt or die.
      </p>
      <p
        className="mb-8 text-base leading-relaxed sm:text-lg"
        style={{ color: "var(--text-secondary)" }}
      >
        For Joe, the timeline below wasn&apos;t history &mdash; it was a
        countdown clock. Every milestone 7-Eleven hit made his Pronto stores
        less viable.
      </p>

      {/* Timeline */}
      <TimelineStepper steps={sevenElevenTimeline} />

      {/* Stat box */}
      <div
        className="mt-12 rounded-lg border p-8 text-center"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <CounterAnimation
          target={398}
          suffix=" stores"
          className="block text-4xl font-bold sm:text-5xl"
        />
        <p
          className="mt-3 text-sm tracking-wide uppercase"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            color: "var(--text-tertiary)",
          }}
        >
          7-Eleven stores by 1962
        </p>
      </div>
    </SectionWrapper>
    </>
  );
}
