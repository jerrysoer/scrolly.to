"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { recoveryTimeline } from "@/lib/explainers/extinction";

export default function SlowRecoverySection() {
  return (
    <SectionWrapper id="slow-recovery" className="section-tinted">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-firestorm">
        Section 6
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
        The Slow Recovery
      </h2>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        The nuclear winter lasted about two years. But full ecosystem recovery
        took 10 million years. In the aftermath, mammals inherited an empty
        world &mdash; and rapidly evolved to fill it.
      </p>

      {/* Horizontal timeline */}
      <div className="mt-12 overflow-x-auto pb-4">
        <div className="relative min-w-[600px]">
          {/* Timeline line */}
          <div className="absolute left-0 right-0 top-12 h-0.5 bg-border" />
          <div
            className="absolute left-0 top-12 h-0.5"
            style={{
              width: "100%",
              background:
                "linear-gradient(90deg, var(--firestorm-hot), var(--firestorm), var(--winter-blue), var(--life-green))",
              opacity: 0.5,
            }}
          />

          {/* Timeline items */}
          <div className="grid grid-cols-4 gap-4">
            {recoveryTimeline.map((item, index) => (
              <div key={item.yearsAgo} className="flex flex-col items-center">
                {/* Marker */}
                <div
                  className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2"
                  style={{
                    borderColor: item.color,
                    backgroundColor: `color-mix(in srgb, ${item.color} 8%, var(--bg-card))`,
                  }}
                >
                  <p
                    className="font-mono text-xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.yearsAgo}
                  </p>
                  <p className="text-[9px] text-text-tertiary">years ago</p>
                </div>

                {/* Content */}
                <div className="mt-6 text-center">
                  <p className="font-sans text-sm font-semibold text-text-primary">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>

                {/* Arrow between items */}
                {index < recoveryTimeline.length - 1 && (
                  <div className="absolute top-12 hidden" aria-hidden="true">
                    <svg width="20" height="12" viewBox="0 0 20 12">
                      <path
                        d="M0 6 L16 6 M12 2 L16 6 L12 10"
                        stroke="var(--border)"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Callout */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <p className="stat-hero">10M</p>
          <p className="mt-1 text-sm text-text-secondary">
            years for ecosystems to fully recover
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <p className="font-serif text-lg font-semibold text-text-primary italic">
            &ldquo;Mammals inherited an empty world. And they filled it with
            whales, bats, elephants, primates &mdash; and eventually, us.&rdquo;
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
