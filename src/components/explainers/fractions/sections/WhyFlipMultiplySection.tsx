"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const steps = [
  {
    label: "Start",
    math: "\u00BE \u00F7 \u215C",
    description: "We want to know: how many \u215C-size pieces fit in \u00BE?",
  },
  {
    label: "Rewrite as",
    math: "\u00BE \u00D7 ?",
    description: "We need a number that \"undoes\" \u215C. That number is its reciprocal.",
  },
  {
    label: "Flip the divisor",
    math: "\u215C \u2192 \u2158",
    description: "The reciprocal of 3/8 is 8/3. Flip the numerator and denominator.",
  },
  {
    label: "Multiply",
    math: "\u00BE \u00D7 \u2158",
    description: "Now multiply straight across: numerators together, denominators together.",
  },
  {
    label: "Calculate",
    math: "24 / 12",
    description: "3 \u00D7 8 = 24 on top. 4 \u00D7 3 = 12 on bottom.",
  },
  {
    label: "Simplify",
    math: "= 2",
    description: "24 \u00F7 12 = 2. Exactly 2 pieces of \u215C fit inside \u00BE.",
  },
];

export default function WhyFlipMultiplySection() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <SectionWrapper id="why-flip-multiply" layout="centered">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 4
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        Why Flip &amp; Multiply
      </h2>

      <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        Here&rsquo;s the proof. We&rsquo;ll work through{" "}
        <span className="font-mono font-semibold text-space-blue">&frac34; &divide; &frac38;</span>{" "}
        step by step.
      </p>

      {/* Step display */}
      <div className="mt-10 rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "w-8 bg-space-blue"
                  : i < currentStep
                  ? "w-2.5 bg-space-blue/40"
                  : "w-2.5 bg-border"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Step label */}
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-amber text-center">
          Step {currentStep + 1}: {steps[currentStep].label}
        </p>

        {/* Math display */}
        <div className="mt-4 flex items-center justify-center">
          <p
            className="font-mono text-4xl font-bold text-text-primary sm:text-5xl"
            style={{ animation: "fade-in 0.3s ease-out" }}
            key={currentStep}
          >
            {steps[currentStep].math}
          </p>
        </div>

        {/* Description */}
        <p
          className="mt-5 text-center font-sans text-base leading-relaxed text-text-secondary max-w-md mx-auto"
          key={`desc-${currentStep}`}
          style={{ animation: "fade-in 0.3s ease-out 0.1s both" }}
        >
          {steps[currentStep].description}
        </p>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="rounded-lg border border-border bg-bg-secondary px-4 py-2 font-sans text-sm font-medium text-text-secondary transition-all hover:border-space-blue disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="rounded-lg border border-space-blue bg-space-blue/10 px-4 py-2 font-sans text-sm font-medium text-space-blue transition-all hover:bg-space-blue/20 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next step
          </button>
        </div>
      </div>

      <div className="mt-8 pull-quote max-w-lg">
        <p>
          &ldquo;Flip and multiply&rdquo; isn&rsquo;t a magic trick. It&rsquo;s just a shortcut
          for asking: how many of <em>this</em> fit inside <em>that</em>?
        </p>
      </div>
    </SectionWrapper>
  );
}
