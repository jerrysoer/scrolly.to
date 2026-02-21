"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { whyItMattersStats } from "@/lib/explainers/butterfly";

export default function PayoffSection() {
  return (
    <SectionWrapper id="the-payoff" layout="centered" tinted stagger>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-forest-green">
        Stage 7 — Adult
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        The Payoff
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
        The adult butterfly that emerges is a completely different organism from the
        caterpillar that entered the chrysalis. Different eyes, different mouthparts,
        different body plan — and wings that enable migration across thousands of miles.
        But here&rsquo;s the question that surprised scientists:
      </p>

      {/* Memory retention callout — aside style */}
      <aside
        className="mt-8 rounded-2xl border p-7"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1"
          style={{ backgroundColor: "var(--accent-purple)", color: "white" }}
        >
          <span className="font-mono text-xs font-bold">New Research — Georgetown 2008</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-text-primary">
          Do butterflies remember being caterpillars?
        </h3>
        <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
          Researchers at Georgetown University trained caterpillars to avoid a specific odor
          using mild electric shocks. After metamorphosis, the adult butterflies{" "}
          <strong className="text-text-primary">still avoided that same odor</strong>. Some
          neural pathways survive the dissolution. Memory can cross metamorphosis.
        </p>
        <p className="mt-3 font-mono text-xs text-text-tertiary">
          Blackiston et al. (2008) &mdash; PLOS ONE
        </p>
      </aside>

      {/* Stats row */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {whyItMattersStats.map((stat) => (
          <div
            key={stat.number}
            className="rounded-xl border p-5 text-center"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <p className="stat-hero">{stat.number}</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-text-secondary">
              {stat.label}
            </p>
            <p className="mt-2 font-mono text-xs text-text-tertiary">
              Source: {stat.source}
            </p>
          </div>
        ))}
      </div>

      {/* Final pull quote */}
      <blockquote className="pull-quote mt-12">
        The butterfly is not a better caterpillar. It&rsquo;s a completely different
        organism that carries the caterpillar&rsquo;s memories. That&rsquo;s perhaps the
        strangest thing in all of biology.
      </blockquote>
    </SectionWrapper>
  );
}
