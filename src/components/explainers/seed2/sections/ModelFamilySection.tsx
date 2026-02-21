"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { modelTiers, type ModelTier } from "@/lib/explainers/seed2-models";

type TierId = "pro" | "lite" | "mini";

function DecisionFlowSVG() {
  return (
    <svg
      viewBox="0 0 620 280"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-2xl mx-auto"
      aria-label="Decision flowchart for choosing a Seed2.0 model tier"
    >
      {/* START node */}
      <rect x="220" y="10" width="180" height="44" rx="22" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="310" y="37" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="13" fontWeight="600" fill="var(--text-primary)">
        Start
      </text>

      {/* Arrow: Start -> Q1 */}
      <line x1="310" y1="54" x2="310" y2="78" stroke="var(--forward-blue)" strokeWidth="2" />
      <polygon points="305,74 315,74 310,82" fill="var(--forward-blue)" />

      {/* Q1: Frontier accuracy? */}
      <rect x="140" y="82" width="340" height="44" rx="8" fill="var(--bg-card)" stroke="var(--forward-blue)" strokeWidth="1.5" />
      <text x="310" y="109" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="13" fill="var(--text-primary)">
        Need frontier-level accuracy?
      </text>

      {/* YES branch left from Q1 */}
      <line x1="200" y1="104" x2="90" y2="104" stroke="var(--forward-blue)" strokeWidth="2" />
      <line x1="90" y1="104" x2="90" y2="168" stroke="var(--forward-blue)" strokeWidth="2" />
      <polygon points="85,164 95,164 90,172" fill="var(--forward-blue)" />
      <text x="145" y="97" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="11" fill="var(--forward-blue)" fontWeight="600">
        Yes
      </text>

      {/* NO arrow down from Q1 */}
      <line x1="310" y1="126" x2="310" y2="162" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="4 3" />
      <polygon points="305,158 315,158 310,166" fill="var(--text-tertiary)" />
      <text x="328" y="148" fontFamily="var(--font-dm-sans), sans-serif" fontSize="11" fill="var(--text-tertiary)" fontWeight="600">
        No
      </text>

      {/* PRO result box */}
      <rect x="30" y="172" width="120" height="52" rx="8" fill="var(--forward-blue)" />
      <text x="90" y="194" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="12" fontWeight="700" fill="white">
        Seed2.0 Pro
      </text>
      <text x="90" y="212" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="10" fill="rgba(255,255,255,0.85)">
        $0.47 / $2.57 per 1M
      </text>

      {/* Q2: Balanced cost/performance? */}
      <rect x="140" y="166" width="340" height="44" rx="8" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="310" y="189" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="13" fill="var(--text-primary)">
        Need balanced cost / performance?
      </text>
      <text x="310" y="204" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="10" fill="var(--text-tertiary)">
        (strong quality, lower spend)
      </text>

      {/* YES branch left from Q2 */}
      <line x1="200" y1="188" x2="90" y2="188" stroke="var(--backward-orange)" strokeWidth="2" />
      <line x1="90" y1="210" x2="90" y2="224" stroke="var(--backward-orange)" strokeWidth="2" />
      <polygon points="85,220 95,220 90,228" fill="var(--backward-orange)" />
      <text x="145" y="181" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="11" fill="var(--backward-orange)" fontWeight="600">
        Yes
      </text>

      {/* NO arrow right from Q2 */}
      <line x1="430" y1="188" x2="530" y2="188" stroke="var(--correct-green)" strokeWidth="2" />
      <line x1="530" y1="188" x2="530" y2="224" stroke="var(--correct-green)" strokeWidth="2" />
      <polygon points="525,220 535,220 530,228" fill="var(--correct-green)" />
      <text x="480" y="181" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="11" fill="var(--correct-green)" fontWeight="600">
        No
      </text>

      {/* LITE result box */}
      <rect x="30" y="228" width="120" height="52" rx="8" fill="var(--backward-orange)" />
      <text x="90" y="250" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="12" fontWeight="700" fill="white">
        Seed2.0 Lite
      </text>
      <text x="90" y="268" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="10" fill="rgba(255,255,255,0.85)">
        $0.09 / $0.53 per 1M
      </text>

      {/* MINI result box */}
      <rect x="470" y="228" width="120" height="52" rx="8" fill="var(--correct-green)" />
      <text x="530" y="250" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="12" fontWeight="700" fill="white">
        Seed2.0 Mini
      </text>
      <text x="530" y="268" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="10" fill="rgba(255,255,255,0.85)">
        $0.03 / $0.31 per 1M
      </text>
    </svg>
  );
}

export default function ModelFamilySection() {
  const [activeTab, setActiveTab] = useState<TierId>("pro");

  const activeTier = modelTiers.find((t) => t.id === activeTab) as ModelTier;

  return (
    <SectionWrapper id="model-family">
      {/* Section header */}
      <div className="mb-10">
        <p className="mb-3 font-serif text-base italic text-text-tertiary">
          Like choosing between a sports car, sedan, and scooter &mdash; same manufacturer,
          different price-performance tradeoffs for different needs.
        </p>
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Three Tiers, One Architecture
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-base text-text-secondary sm:text-lg">
          ByteDance ships one coherent model family. Every tier shares the same underlying
          architecture &mdash; but is tuned for a distinct point on the cost-vs-capability curve.
        </p>
      </div>

      {/* Tab buttons */}
      <div className="mb-6 flex gap-2 border-b border-border">
        {modelTiers.map((tier) => {
          const isActive = activeTab === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setActiveTab(tier.id as TierId)}
              className={`
                relative px-5 py-3 font-sans text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-secondary"
                }
              `}
            >
              {tier.name.replace("Seed2.0 ", "")}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-full rounded-t"
                  style={{ backgroundColor: tier.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active tier card */}
      <div
        className="mb-10 overflow-hidden rounded-xl border bg-bg-card transition-all duration-300"
        style={{ borderColor: activeTier.color }}
      >
        {/* Card header */}
        <div
          className="px-6 py-4"
          style={{ backgroundColor: activeTier.color + "18" }}
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3
                className="font-serif text-xl font-semibold"
                style={{ color: activeTier.color }}
              >
                {activeTier.name}
              </h3>
              <p className="mt-0.5 font-sans text-sm italic text-text-secondary">
                {activeTier.tagline}
              </p>
            </div>
            <div className="flex flex-col items-start gap-0.5 sm:items-end">
              <span className="font-sans text-xs text-text-tertiary">Per 1M tokens</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-text-secondary">
                  In:{" "}
                  <span className="font-semibold text-text-primary">
                    {activeTier.inputPer1M}
                  </span>
                </span>
                <span className="text-border">|</span>
                <span className="font-mono text-sm text-text-secondary">
                  Out:{" "}
                  <span className="font-semibold text-text-primary">
                    {activeTier.outputPer1M}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <span className="inline-block rounded-full bg-bg-card px-3 py-1 font-sans text-xs font-medium text-text-secondary">
              Best for: {activeTier.bestFor}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="grid gap-6 px-6 py-5 sm:grid-cols-2">
          {/* Highlights */}
          <div>
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              Highlights
            </p>
            <ul className="flex flex-col gap-2">
              {activeTier.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    style={{ color: activeTier.color }}
                  />
                  <span className="font-sans text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              Use Cases
            </p>
            <ul className="flex flex-col gap-2">
              {activeTier.useCases.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: activeTier.color }}
                  />
                  <span className="font-sans text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Decision flowchart */}
      <div className="mb-8">
        <h3 className="mb-1 font-sans text-base font-semibold text-text-primary">
          Which tier is right for you?
        </h3>
        <p className="mb-5 font-sans text-sm text-text-secondary">
          Follow this decision tree to find your match in under 10 seconds.
        </p>
        <div className="rounded-xl border border-border bg-bg-card p-4 sm:p-6">
          <DecisionFlowSVG />
          <p className="mt-3 text-center font-sans text-xs text-text-tertiary">
            Prices shown are input / output per 1M tokens.
          </p>
        </div>
      </div>

      {/* Why Should I Care? callout */}
      <div className="border-l-2 border-forward-blue pl-4">
        <p className="font-serif text-sm italic leading-relaxed text-text-secondary">
          <span className="font-semibold not-italic text-text-primary">Why should I care?</span>{" "}
          Most AI vendors force you to choose between premium quality and affordable scale &mdash; you
          rarely get both. A tiered family from a single provider means you can mix models
          within one product without changing infrastructure.
        </p>
      </div>
    </SectionWrapper>
  );
}
