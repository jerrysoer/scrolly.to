"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { chrysalisStages } from "@/lib/explainers/butterfly";

export default function ChrysalisSection() {
  const [activeStep, setActiveStep] = useState(0);

  const active = chrysalisStages[activeStep];

  return (
    <SectionWrapper id="chrysalis" layout="split-right">
      {/* Left column — stepper content */}
      <div className="flex flex-col justify-center">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-forest-green">
          Stage 3 — Pupa
        </p>

        <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
          The Chrysalis
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
          Building the chrysalis is not passive. It&rsquo;s a four-step process that takes hours
          to complete. The caterpillar engineers its own transformation chamber from the
          outside in.
        </p>

        {/* Step selector */}
        <div className="mt-8 space-y-3">
          {chrysalisStages.map((stage, i) => (
            <button
              key={stage.step}
              onClick={() => setActiveStep(i)}
              className={`w-full rounded-xl border p-4 text-left transition-all duration-200 hover:ring-2 hover:ring-forest-green/30 ${
                activeStep === i
                  ? "border-forest-green bg-bg-secondary"
                  : "border-border bg-bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors ${
                    activeStep === i
                      ? "bg-forest-green text-white"
                      : "bg-bg-secondary text-text-tertiary"
                  }`}
                >
                  {stage.step}
                </span>
                <span
                  className={`font-sans text-sm font-semibold transition-colors ${
                    activeStep === i ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {stage.title}
                </span>
                <span className="ml-auto font-mono text-xs text-text-tertiary">
                  {stage.duration}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right column — active stage detail */}
      <div className="flex flex-col justify-center">
        <div
          className="rounded-2xl border p-8 transition-all duration-300"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          {/* Visual placeholder for chrysalis stage */}
          <div
            className="flex h-48 items-center justify-center rounded-xl"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <svg viewBox="0 0 120 120" className="h-32 w-32" aria-label={`${active.title} stage`}>
              {activeStep === 0 && (
                /* Silk pad — branch with anchor */
                <g>
                  <line x1="20" y1="30" x2="100" y2="30" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
                  <ellipse cx="60" cy="30" rx="8" ry="5" fill="var(--warm-amber)" opacity="0.8" />
                  <text x="60" y="85" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="serif">silk anchor</text>
                </g>
              )}
              {activeStep === 1 && (
                /* J-hang shape */
                <g>
                  <line x1="60" y1="10" x2="60" y2="35" stroke="var(--warm-amber)" strokeWidth="2" />
                  <ellipse cx="60" cy="55" rx="10" ry="22" fill="var(--forest-green)" opacity="0.7" />
                  <ellipse cx="55" cy="75" rx="7" ry="4" fill="var(--forest-green)" opacity="0.5" />
                  <text x="60" y="105" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="serif">J-hang</text>
                </g>
              )}
              {activeStep === 2 && (
                /* Split skin revealing chrysalis */
                <g>
                  <ellipse cx="60" cy="58" rx="12" ry="28" fill="var(--warm-amber)" opacity="0.3" />
                  <path d="M48 30 Q60 25 72 30 L74 55 Q60 50 46 55 Z" fill="var(--golden)" opacity="0.5" />
                  <ellipse cx="60" cy="62" rx="11" ry="24" fill="var(--forest-green)" opacity="0.75" />
                  <text x="60" y="105" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="serif">skin splitting</text>
                </g>
              )}
              {activeStep === 3 && (
                /* Hardened chrysalis */
                <g>
                  <ellipse cx="60" cy="58" rx="13" ry="30" fill="var(--forest-green)" opacity="0.85" style={{ animation: "heartbeat-pulse 2.4s ease-in-out infinite" }} />
                  <ellipse cx="60" cy="32" rx="8" ry="7" fill="var(--golden)" opacity="0.7" />
                  <line x1="60" y1="25" x2="60" y2="15" stroke="var(--warm-amber)" strokeWidth="2" />
                  <text x="60" y="105" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="serif">hardened</text>
                </g>
              )}
            </svg>
          </div>

          {/* Stage description */}
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5 font-mono text-xs font-bold text-white"
                style={{ backgroundColor: "var(--forest-green)" }}
              >
                Step {active.step}
              </span>
              <span className="font-mono text-xs text-text-tertiary">{active.duration}</span>
            </div>
            <h3 className="mt-3 font-serif text-2xl font-bold text-text-primary">
              {active.title}
            </h3>
            <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
              {active.description}
            </p>
            <div
              className="mt-4 rounded-lg border-l-2 pl-4 py-2"
              style={{ borderColor: "var(--warm-amber)" }}
            >
              <p className="font-serif text-sm italic text-text-tertiary">
                &ldquo;{active.analogy}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
