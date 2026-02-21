"use client";

import { useState, type ReactNode } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { goldSteps } from "@/lib/explainers/money";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stepIcons: Record<string, ReactNode> = {
  nugget: (
    <svg viewBox="0 0 120 120" className="h-28 w-28 sm:h-36 sm:w-36">
      <defs>
        <radialGradient id="goldGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>
      <path d="M30 80 Q20 60 35 45 Q50 25 75 30 Q95 35 100 55 Q105 75 85 85 Q65 95 45 90 Z" fill="url(#goldGrad)" />
      <path d="M45 65 Q55 55 70 58" fill="none" stroke="#fef3c7" strokeWidth="2" opacity="0.5" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 120 120" className="h-28 w-28 sm:h-36 sm:w-36">
      <line x1="60" y1="20" x2="60" y2="100" stroke="var(--text-tertiary)" strokeWidth="3" />
      <line x1="20" y1="45" x2="100" y2="45" stroke="var(--text-tertiary)" strokeWidth="3" />
      <line x1="60" y1="20" x2="60" y2="45" stroke="var(--text-tertiary)" strokeWidth="4" />
      <path d="M15 45 L25 75 L45 75 Z" fill="var(--gold)" opacity="0.7" />
      <path d="M75 45 L85 75 L105 75 Z" fill="var(--gold)" opacity="0.7" />
      <circle cx="30" cy="65" r="5" fill="var(--gold)" />
      <rect x="60" y="95" width="20" height="5" rx="2" fill="var(--text-tertiary)" transform="translate(-10,0)" />
    </svg>
  ),
  stamp: (
    <svg viewBox="0 0 120 120" className="h-28 w-28 sm:h-36 sm:w-36">
      <circle cx="60" cy="60" r="40" fill="var(--gold)" opacity="0.8" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="var(--bg-card)" strokeWidth="2" opacity="0.4" />
      <text x="60" y="55" textAnchor="middle" fontSize="14" fill="var(--bg-card)" fontFamily="Georgia, serif" fontWeight="bold" opacity="0.7">REX</text>
      <text x="60" y="75" textAnchor="middle" fontSize="20" fill="var(--bg-card)" fontFamily="Georgia, serif" fontWeight="bold">I</text>
      <path d="M35 85 Q60 95 85 85" fill="none" stroke="var(--bg-card)" strokeWidth="1.5" opacity="0.4" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 120 120" className="h-28 w-28 sm:h-36 sm:w-36">
      <circle cx="60" cy="60" r="40" fill="var(--gold)" opacity="0.3" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="var(--gold)" strokeWidth="2" />
      <ellipse cx="60" cy="60" rx="20" ry="40" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="60" x2="100" y2="60" stroke="var(--gold)" strokeWidth="1.5" opacity="0.6" />
      <path d="M25 40 Q60 35 95 40" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.4" />
      <path d="M25 80 Q60 85 95 80" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.4" />
      {/* Coins around */}
      <circle cx="20" cy="30" r="6" fill="var(--gold)" opacity="0.5" />
      <circle cx="95" cy="85" r="5" fill="var(--gold)" opacity="0.4" />
      <circle cx="100" cy="35" r="4" fill="var(--gold)" opacity="0.3" />
    </svg>
  ),
};

export default function GoldAndCoinsSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = goldSteps[currentStep];

  return (
    <SectionWrapper id="gold-and-coins" layout="centered">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
        Section 3
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        From Gold to Coins
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
        Gold won the &ldquo;money competition&rdquo; for thousands of years. But raw gold
        had a problem: how do you know it&rsquo;s real? The solution created the first
        governments.
      </p>

      {/* Step-through visualization */}
      <div className="mt-10 rounded-2xl border border-border bg-bg-card p-8 sm:p-10">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {goldSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep ? "w-8 bg-gold" : "w-2 bg-border hover:bg-text-tertiary"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="flex justify-center" style={{ animation: "fade-in 0.4s ease-out both" }} key={currentStep}>
          {stepIcons[step.icon]}
        </div>

        {/* Step content */}
        <div className="mt-6 text-center" key={`text-${currentStep}`} style={{ animation: "slide-up 0.4s ease-out both" }}>
          <p className="font-mono text-sm font-medium text-gold">
            Step {step.step} of {goldSteps.length}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            {step.title}
          </h3>
          <p className="mx-auto mt-3 max-w-lg font-sans text-base leading-relaxed text-text-secondary">
            {step.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary transition-all hover:border-gold disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous step"
          >
            <ChevronLeft className="h-5 w-5 text-text-primary" />
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(goldSteps.length - 1, currentStep + 1))}
            disabled={currentStep === goldSteps.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary transition-all hover:border-gold disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next step"
          >
            <ChevronRight className="h-5 w-5 text-text-primary" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
