"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { budgetComparison } from "@/lib/explainers/moon";

export default function WhyDidWeStopSection() {
  const [showApollo, setShowApollo] = useState(true);
  const data = showApollo ? budgetComparison.apollo : budgetComparison.today;

  return (
    <SectionWrapper id="why-did-we-stop" layout="split-left">
      {/* Left column: text */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          Section 2
        </p>

        <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
          Why Did We Stop?
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
          The Moon missions were never about science. They were about beating the
          Soviets. Once the Cold War competition faded, so did the budget.
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          At its peak, NASA consumed{" "}
          <span className="font-semibold text-amber">4.4% of the federal budget</span>.
          Today it gets less than half a percent &mdash; split across dozens of programs.
        </p>

        <blockquote className="pull-quote mt-8">
          We won the race to the Moon. Then we stopped running.
        </blockquote>
      </div>

      {/* Right column: budget toggle */}
      <div>
        {/* Toggle */}
        <div className="flex gap-2 rounded-lg border border-border bg-bg-secondary p-1">
          <button
            onClick={() => setShowApollo(true)}
            className={`flex-1 rounded-md px-4 py-2.5 font-sans text-sm font-medium transition-all ${
              showApollo
                ? "bg-space-blue text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Apollo Era
          </button>
          <button
            onClick={() => setShowApollo(false)}
            className={`flex-1 rounded-md px-4 py-2.5 font-sans text-sm font-medium transition-all ${
              !showApollo
                ? "bg-space-blue text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            NASA Today
          </button>
        </div>

        {/* Budget display */}
        <div className="mt-6 rounded-xl border border-border bg-bg-card p-6">
          <p className="font-sans text-sm font-semibold text-text-primary">{data.label}</p>

          {/* Bar */}
          <div className="mt-4 h-10 w-full overflow-hidden rounded-full bg-bg-secondary">
            <div
              className="flex h-full items-center justify-end rounded-full px-3 transition-all duration-700 ease-out"
              style={{
                width: `${(data.percentage / 5) * 100}%`,
                backgroundColor: showApollo ? "var(--amber)" : "var(--space-blue)",
                minWidth: "60px",
              }}
            >
              <span className="font-mono text-sm font-bold text-white">
                {data.percentage}%
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-2xl font-bold text-text-primary">
                ${data.dollarsBillions}B
              </p>
              <p className="font-sans text-xs text-text-tertiary">
                Annual budget
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-text-primary">
                {data.percentage}%
              </p>
              <p className="font-sans text-xs text-text-tertiary">
                Of federal spending
              </p>
            </div>
          </div>

          <p className="mt-4 font-sans text-sm text-text-secondary italic">
            {data.context}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
