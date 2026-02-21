"use client";

import { ChevronDown } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import BalanceIllustration from "./BalanceIllustration";

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" room="spacious">
      <div className="mx-auto max-w-lg text-center">
        <p
          className="pr-body text-sm tracking-[0.3em] uppercase mb-8"
          style={{ color: "var(--text-tertiary)" }}
        >
          An Interactive Essay
        </p>
        <h1 className="pr-display text-5xl md:text-7xl leading-tight mb-8">
          The Art of
          <br />
          <em>Precision</em> &amp; <em>Recall</em>
        </h1>
        <div className="mb-12">
          <BalanceIllustration threshold={50} />
        </div>
        <p
          className="pr-body text-xl leading-relaxed mb-12"
          style={{ color: "var(--text-secondary)" }}
        >
          Every prediction system makes a fundamental choice: cast a wide net,
          or aim with precision.
        </p>
        <a
          href="#email"
          className="inline-flex flex-col items-center gap-2"
          style={{ color: "var(--text-tertiary)" }}
          aria-label="Scroll to first section"
        >
          <span className="pr-body text-base">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </SectionWrapper>
  );
}
