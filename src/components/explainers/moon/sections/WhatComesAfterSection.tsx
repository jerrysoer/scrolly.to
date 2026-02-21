"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function WhatComesAfterSection() {
  return (
    <SectionWrapper id="what-comes-after" layout="full-bleed">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 8
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        What Comes After
      </h2>

      <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        The Moon isn&rsquo;t the destination. It&rsquo;s practice. Everything we
        learn about living on the Moon &mdash; building habitats, extracting
        resources, keeping humans alive &mdash; is rehearsal for Mars.
      </p>

      {/* Distance scale */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-bg-card p-6 sm:p-10">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary mb-8">
          Distance from Earth (not to scale)
        </p>

        <div className="relative">
          {/* Scale line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />

          <div className="flex items-start justify-between">
            {/* Earth */}
            <div className="relative flex flex-col items-center" style={{ width: "80px" }}>
              <svg viewBox="0 0 48 48" className="h-16 w-16" aria-label="Earth">
                <title>Earth</title>
                <circle cx="24" cy="24" r="20" fill="var(--space-blue)" opacity="0.6" />
                <path d="M14 16 Q20 12 28 18 Q32 24 26 30 Q18 32 14 26 Z" fill="var(--success-green)" opacity="0.5" />
                <path d="M30 14 Q36 18 34 22 Q30 18 30 14 Z" fill="var(--success-green)" opacity="0.4" />
              </svg>
              <p className="mt-2 font-mono text-xs font-bold text-space-blue">Earth</p>
              <p className="font-sans text-xs text-text-tertiary">Home</p>
            </div>

            {/* Moon - positioned at ~15% of the way */}
            <div className="relative flex flex-col items-center" style={{ width: "80px" }}>
              <svg viewBox="0 0 40 40" className="h-12 w-12" aria-label="Moon">
                <title>Moon</title>
                <circle cx="20" cy="20" r="16" fill="var(--lunar-silver)" opacity="0.5" />
                <circle cx="14" cy="16" r="3" fill="var(--text-tertiary)" opacity="0.2" />
                <circle cx="24" cy="14" r="2" fill="var(--text-tertiary)" opacity="0.15" />
                <circle cx="18" cy="24" r="2.5" fill="var(--text-tertiary)" opacity="0.18" />
              </svg>
              <p className="mt-2 font-mono text-xs font-bold text-text-primary">Moon</p>
              <p className="font-sans text-xs text-text-tertiary">3 days</p>
              <p className="font-mono text-xs text-space-blue mt-0.5">238,900 mi</p>
            </div>

            {/* Mars - at the end */}
            <div className="relative flex flex-col items-center" style={{ width: "80px" }}>
              <svg viewBox="0 0 44 44" className="h-14 w-14" aria-label="Mars">
                <title>Mars</title>
                <circle cx="22" cy="22" r="18" fill="var(--amber)" opacity="0.5" />
                <circle cx="16" cy="18" r="3" fill="var(--amber)" opacity="0.3" />
                <path d="M28 14 Q32 18 30 24" stroke="var(--amber)" strokeWidth="1" fill="none" opacity="0.3" />
                <circle cx="24" cy="28" r="2" fill="var(--amber)" opacity="0.25" />
              </svg>
              <p className="mt-2 font-mono text-xs font-bold text-amber">Mars</p>
              <p className="font-sans text-xs text-text-tertiary">9 months</p>
              <p className="font-mono text-xs text-amber mt-0.5">140M mi</p>
            </div>
          </div>

          {/* Travel time labels on the line */}
          <div className="mt-6 flex justify-around">
            <div className="text-center">
              <span className="inline-block rounded-full bg-space-blue/10 px-3 py-1 font-mono text-xs text-space-blue">
                3 days &rarr;
              </span>
            </div>
            <div className="text-center">
              <span className="inline-block rounded-full bg-amber/10 px-3 py-1 font-mono text-xs text-amber">
                ~9 months &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* 586x callout */}
        <div className="mt-8 text-center">
          <p className="stat-hero text-5xl sm:text-6xl">586x</p>
          <p className="mt-2 font-sans text-sm text-text-secondary">
            Mars is 586 times farther than the Moon
          </p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="pull-quote mx-auto mt-10 max-w-2xl">
        The Moon is close enough to rescue a crew in days. Mars isn&rsquo;t.
        That&rsquo;s why we practice on the Moon first.
      </blockquote>
    </SectionWrapper>
  );
}
