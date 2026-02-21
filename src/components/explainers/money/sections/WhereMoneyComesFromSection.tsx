"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { moneyCreationSteps } from "@/lib/explainers/money";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

export default function WhereMoneyComesFromSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <SectionWrapper id="where-money-comes-from" layout="full-bleed">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
        Section 5
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        Where Money Comes From
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
        Here&rsquo;s what most people get wrong: banks don&rsquo;t lend out other
        people&rsquo;s savings. When you get a mortgage, the bank doesn&rsquo;t move money
        from a vault. It creates brand new money by typing numbers into a computer.
      </p>

      {/* Step animation */}
      <div className="mt-10 space-y-4">
        {moneyCreationSteps.map((step, i) => (
          <button
            key={step.step}
            onClick={() => setActiveStep(i)}
            className={`w-full text-left rounded-xl border p-6 transition-all duration-300 ${
              i === activeStep
                ? "border-money-green bg-bg-card shadow-md"
                : i <= activeStep
                ? "border-border bg-bg-card opacity-80"
                : "border-border bg-bg-secondary opacity-50"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Step number */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold transition-all duration-300 ${
                  i <= activeStep ? "bg-money-green text-white" : "bg-bg-secondary text-text-tertiary"
                }`}
              >
                {step.step}
              </div>

              <div className="flex-1">
                <p className="font-sans text-base font-semibold text-text-primary">
                  {step.title}
                </p>
                <p
                  className={`mt-1 font-sans text-sm leading-relaxed text-text-secondary transition-all duration-300 ${
                    i === activeStep ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {step.description}
                </p>
                {i === activeStep && (
                  <p
                    className="mt-2 inline-block rounded-md bg-bg-secondary px-3 py-1 font-mono text-xs text-money-green"
                    style={{ animation: "fade-in 0.3s ease-out 0.2s both" }}
                  >
                    {step.detail}
                  </p>
                )}
              </div>

              {/* Visual indicator for step 3 */}
              {i === 2 && i === activeStep && (
                <div
                  className="hidden sm:flex items-center gap-1"
                  style={{ animation: "fade-in 0.4s ease-out 0.3s both" }}
                >
                  <svg viewBox="0 0 100 40" className="h-8 w-24">
                    <rect x="5" y="5" width="90" height="30" rx="4" fill="var(--money-green)" opacity="0.15" stroke="var(--money-green)" strokeWidth="1" />
                    <text x="50" y="25" textAnchor="middle" fontSize="12" fill="var(--money-green)" fontFamily="monospace" fontWeight="bold">+$300,000</text>
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Key stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <p className="stat-hero" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>97%</p>
          <p className="mt-2 font-sans text-sm text-text-secondary">
            of all money in circulation was created by commercial banks through lending &mdash; not
            printed by government mints.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <p className="font-mono text-lg font-bold text-inflation-red">2008</p>
          <p className="mt-2 font-sans text-sm text-text-secondary">
            Banks created too much money through bad mortgage loans. When borrowers defaulted, the
            system nearly collapsed. The{" "}
            <JargonTerm
              term="global financial crisis"
              definition="A worldwide banking panic triggered by the collapse of the US housing market. Banks had created trillions in loans that borrowers couldn't repay."
            />{" "}
            was the result.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
