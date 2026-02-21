"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { imaginalDiscs } from "@/lib/explainers/butterfly";

export default function RebuildingSection() {
  return (
    <SectionWrapper id="rebuilding" layout="split-left" stagger>
      {/* Left column — text */}
      <div className="flex flex-col justify-center">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-forest-green">
          Stage 5 — Reconstruction
        </p>

        <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
          Rebuilding
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          The imaginal discs were sitting dormant inside the caterpillar since it hatched
          from the egg. Now, using the protein soup as raw material, each disc activates
          and expands into a specific adult body part.
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          This is not random growth. Each disc has a pre-determined identity. Wing discs
          become wings. Eye discs become compound eyes. The genetic instructions were
          always there — waiting for this moment.
        </p>

        <div
          className="mt-8 rounded-xl border p-5"
          style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary mb-3">
            The blueprint was written at egg-laying
          </p>
          <p className="font-sans text-sm leading-relaxed text-text-secondary">
            Imaginal discs are present from the very first days of the egg stage —
            long before the caterpillar even hatches. The butterfly&rsquo;s body plan
            coexists inside the larva the entire time.
          </p>
        </div>
      </div>

      {/* Right column — imaginal disc grid */}
      <div className="flex flex-col justify-center">
        <p className="mb-5 font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          Imaginal disc map
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {imaginalDiscs.map((disc) => (
            <div
              key={disc.name}
              className="rounded-xl border p-4 transition-all duration-200 hover:ring-2 hover:shadow-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
                  style={{ backgroundColor: disc.color }}
                >
                  {disc.count}
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold text-text-primary truncate">
                    {disc.name}
                  </p>
                  <p className="font-mono text-xs text-text-tertiary">{disc.location}</p>
                </div>
              </div>
              <p className="mt-3 font-sans text-xs leading-relaxed text-text-secondary">
                Becomes:{" "}
                <span className="font-semibold" style={{ color: disc.color }}>
                  {disc.becomes}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Wing formation callout */}
        <div
          className="mt-6 rounded-xl border-l-4 py-3 pl-4 pr-4"
          style={{ borderColor: "var(--forest-green)", backgroundColor: "var(--bg-secondary)" }}
        >
          <p className="font-sans text-sm leading-relaxed text-text-secondary">
            <strong className="text-text-primary">Wing formation</strong> is the most
            visually dramatic — flat disc cells fold into a multilayered structure, then
            inflate during emergence. The intricate wing patterns are pre-encoded in the
            disc cells.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
