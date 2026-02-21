"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { dollarComparison } from "@/lib/explainers/money";

export default function PaperTrickSection() {
  const [mode, setMode] = useState<"gold" | "fiat">("gold");
  const data = mode === "gold" ? dollarComparison.goldBacked : dollarComparison.fiat;

  return (
    <SectionWrapper id="paper-trick" layout="full-bleed">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
        Section 4
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        The Paper Trick
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
        Carrying gold is heavy and dangerous. So governments said: &ldquo;Leave your gold
        with us. We&rsquo;ll give you paper that represents it.&rdquo; The paper was a
        promise. Then, on August 15, 1971, the promise was broken.
      </p>

      {/* Toggle */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-xl border border-border bg-bg-card p-1">
          <button
            onClick={() => setMode("gold")}
            className={`rounded-lg px-5 py-2.5 font-sans text-sm font-medium transition-all duration-200 ${
              mode === "gold"
                ? "bg-gold text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Gold-Backed Dollar
          </button>
          <button
            onClick={() => setMode("fiat")}
            className={`rounded-lg px-5 py-2.5 font-sans text-sm font-medium transition-all duration-200 ${
              mode === "fiat"
                ? "bg-money-green text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Modern Fiat Dollar
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div
        className="mt-8 rounded-2xl border border-border bg-bg-card p-8 sm:p-10"
        key={mode}
        style={{ animation: "fade-in 0.4s ease-out both" }}
      >
        {/* Visual chain */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
          {/* Dollar bill */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 80 50" className="h-12 w-20 sm:h-16 sm:w-24">
              <rect x="2" y="2" width="76" height="46" rx="4" fill={mode === "gold" ? "var(--gold)" : "var(--money-green)"} opacity="0.2" stroke={mode === "gold" ? "var(--gold)" : "var(--money-green)"} strokeWidth="1.5" />
              <text x="40" y="32" textAnchor="middle" fontSize="20" fill={mode === "gold" ? "var(--gold)" : "var(--money-green)"} fontFamily="Georgia, serif" fontWeight="bold">$</text>
            </svg>
            <p className="mt-2 font-sans text-xs text-text-tertiary">Paper</p>
          </div>

          {/* Arrow */}
          <svg viewBox="0 0 40 20" className="h-5 w-10 text-text-tertiary">
            <path d="M0 10 L30 10 M25 5 L30 10 L25 15" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Middle: vault or trust */}
          <div className="flex flex-col items-center">
            {mode === "gold" ? (
              <svg viewBox="0 0 80 60" className="h-14 w-20 sm:h-16 sm:w-24">
                <rect x="10" y="10" width="60" height="45" rx="4" fill="var(--text-tertiary)" opacity="0.2" stroke="var(--text-tertiary)" strokeWidth="1.5" />
                <circle cx="40" cy="32" r="8" fill="none" stroke="var(--gold)" strokeWidth="2" />
                <line x1="40" y1="28" x2="40" y2="36" stroke="var(--gold)" strokeWidth="1.5" />
                <line x1="36" y1="32" x2="44" y2="32" stroke="var(--gold)" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 80 60" className="h-14 w-20 sm:h-16 sm:w-24">
                <circle cx="40" cy="30" r="20" fill="var(--money-green)" opacity="0.15" />
                <text x="40" y="28" textAnchor="middle" fontSize="10" fill="var(--money-green)" fontFamily="sans-serif" fontWeight="600">TRUST</text>
                <text x="40" y="40" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)" fontFamily="sans-serif">US GOV</text>
              </svg>
            )}
            <p className="mt-2 font-sans text-xs text-text-tertiary">
              {mode === "gold" ? "Vault" : "Trust"}
            </p>
          </div>

          {/* Arrow */}
          <svg viewBox="0 0 40 20" className="h-5 w-10 text-text-tertiary">
            <path d="M0 10 L30 10 M25 5 L30 10 L25 15" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* End: gold or nothing */}
          <div className="flex flex-col items-center">
            {mode === "gold" ? (
              <svg viewBox="0 0 60 60" className="h-12 w-12 sm:h-16 sm:w-16">
                <circle cx="30" cy="30" r="22" fill="var(--gold)" opacity="0.7" />
                <text x="30" y="36" textAnchor="middle" fontSize="16" fill="var(--bg-card)" fontFamily="Georgia, serif" fontWeight="bold">Au</text>
              </svg>
            ) : (
              <svg viewBox="0 0 60 60" className="h-12 w-12 sm:h-16 sm:w-16">
                <circle cx="30" cy="30" r="22" fill="var(--border)" opacity="0.3" strokeDasharray="4 4" stroke="var(--text-tertiary)" strokeWidth="1.5" />
                <text x="30" y="35" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)" fontFamily="sans-serif">?</text>
              </svg>
            )}
            <p className="mt-2 font-sans text-xs text-text-tertiary">
              {mode === "gold" ? "Gold" : "Nothing"}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          {[
            { label: "Backing", value: data.backing },
            { label: "Trust model", value: data.trust },
            { label: "Supply limit", value: data.limit },
            { label: "Weakness", value: data.weakness },
          ].map((row) => (
            <div key={row.label} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <p className="font-sans text-sm font-semibold text-text-primary sm:w-32 sm:shrink-0">
                {row.label}
              </p>
              <p className="font-sans text-sm text-text-secondary">{row.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nixon Shock callout */}
      <div className="mt-8 rounded-xl border-l-4 border-l-inflation-red bg-bg-card p-6 border border-border">
        <p className="font-sans text-sm font-semibold text-inflation-red">
          The Nixon Shock &mdash; August 15, 1971
        </p>
        <p className="mt-2 font-sans text-sm text-text-secondary">
          President Nixon announced the US would no longer convert dollars to gold at a fixed
          rate. He said it was &ldquo;temporary.&rdquo; It&rsquo;s been 55 years. Every
          dollar in your wallet is now backed by nothing but a promise.
        </p>
      </div>
    </SectionWrapper>
  );
}
