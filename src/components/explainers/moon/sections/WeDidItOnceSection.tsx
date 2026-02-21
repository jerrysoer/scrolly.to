"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { apolloTimeline } from "@/lib/explainers/moon";

export default function WeDidItOnceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="we-did-it-once" layout="full-bleed">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 1
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        We Did It Once
      </h2>

      <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        Between 1969 and 1972, twelve humans walked on the Moon. They did it with
        an onboard computer that had{" "}
        <span className="font-semibold text-amber">4KB of RAM</span> &mdash;
        your iPhone has 6 billion times more memory.
      </p>

      {/* 4KB callout */}
      <div className="mt-8 inline-flex items-center gap-4 rounded-xl border border-border bg-bg-card px-6 py-4">
        <span className="stat-hero text-4xl sm:text-5xl">4KB</span>
        <div>
          <p className="font-sans text-sm font-semibold text-text-primary">Apollo Guidance Computer</p>
          <p className="font-sans text-xs text-text-tertiary">
            Less memory than a modern thermostat
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mt-12">
        {/* Horizontal line */}
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" aria-hidden="true" />

        <div className="flex gap-0 overflow-x-auto pb-4 scrollbar-none">
          {apolloTimeline.map((item, i) => {
            const isExpanded = expandedIndex === i;
            const isGap = i === 4;
            return (
              <div key={i} className="flex flex-col items-center" style={{ minWidth: isGap ? "80px" : "120px" }}>
                {/* Gap indicator */}
                {isGap && i < apolloTimeline.length - 1 && (
                  <div className="relative flex flex-col items-center">
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                        item.highlight
                          ? "border-space-blue bg-space-blue"
                          : "border-border bg-bg-card hover:border-space-blue"
                      }`}
                    >
                      <span
                        className={`block h-2 w-2 rounded-full ${
                          item.highlight ? "bg-white" : "bg-text-tertiary"
                        }`}
                      />
                    </button>
                    <p className="mt-2 font-mono text-xs font-semibold text-text-primary">
                      {item.year}
                    </p>
                    <p className="mt-0.5 text-center font-sans text-xs text-text-secondary" style={{ maxWidth: "100px" }}>
                      {item.event}
                    </p>
                    {isExpanded && (
                      <div className="mt-2 w-48 rounded-lg border border-border bg-bg-card p-3 text-left shadow-lg">
                        <p className="font-sans text-xs leading-relaxed text-text-secondary">
                          {item.detail}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {!isGap && (
                  <div className="relative flex flex-col items-center">
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                        item.highlight
                          ? "border-space-blue bg-space-blue"
                          : "border-border bg-bg-card hover:border-space-blue"
                      }`}
                    >
                      <span
                        className={`block h-2 w-2 rounded-full ${
                          item.highlight ? "bg-white" : "bg-text-tertiary"
                        }`}
                      />
                    </button>
                    <p className="mt-2 font-mono text-xs font-semibold text-text-primary">
                      {item.year}
                    </p>
                    <p className="mt-0.5 text-center font-sans text-xs text-text-secondary" style={{ maxWidth: "100px" }}>
                      {item.event}
                    </p>
                    {isExpanded && (
                      <div className="mt-2 w-48 rounded-lg border border-border bg-bg-card p-3 text-left shadow-lg">
                        <p className="font-sans text-xs leading-relaxed text-text-secondary">
                          {item.detail}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 50-year gap label */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-amber/30" />
          <span className="font-mono text-xs font-semibold text-amber">
            50-year gap
          </span>
          <div className="h-px flex-1 bg-amber/30" />
        </div>
      </div>
    </SectionWrapper>
  );
}
