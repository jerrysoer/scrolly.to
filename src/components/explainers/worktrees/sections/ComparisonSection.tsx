"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { Check, X } from "lucide-react";
import { strategies, type Strategy } from "@/lib/explainers/worktrees";

function ComparisonCard({ strategy, index }: { strategy: Strategy; index: number }) {
  const accentColors = ["var(--git-blue)", "var(--backward-orange)", "var(--accent-purple)"];
  const accent = accentColors[index % accentColors.length];

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderTop: `3px solid ${accent}`,
        borderRadius: "0.625rem",
        background: "var(--bg-card)",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: "1.125rem",
          color: "var(--text-primary)",
          marginBottom: "0.25rem",
        }}
      >
        {strategy.name}
      </h3>
      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
        {strategy.description}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
          fontSize: "0.8125rem",
        }}
      >
        {[
          { label: "Disk usage", value: strategy.diskUsage },
          { label: "Setup time", value: strategy.setupTime },
          { label: "Best for", value: strategy.bestFor },
        ].map(({ label, value }) => (
          <div key={label} style={{ gridColumn: label === "Best for" ? "1 / -1" : "auto" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </span>
            <p style={{ color: "var(--text-primary)", marginTop: "0.125rem", fontFamily: "var(--font-body)" }}>
              {value}
            </p>
          </div>
        ))}
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Shared history
          </span>
          <p style={{ marginTop: "0.125rem" }}>
            {strategy.sharedHistory ? (
              <Check size={14} style={{ color: "var(--correct-green)", display: "inline" }} />
            ) : (
              <X size={14} style={{ color: "var(--backward-orange)", display: "inline" }} />
            )}
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "0.875rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--correct-green)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.375rem",
            }}
          >
            Pros
          </p>
          {strategy.pros.map((pro) => (
            <div key={pro} style={{ display: "flex", gap: "0.375rem", marginBottom: "0.25rem", alignItems: "flex-start" }}>
              <Check size={12} style={{ color: "var(--correct-green)", flexShrink: 0, marginTop: "0.2rem" }} />
              <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                {pro}
              </span>
            </div>
          ))}
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--backward-orange)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.375rem",
            }}
          >
            Cons
          </p>
          {strategy.cons.map((con) => (
            <div key={con} style={{ display: "flex", gap: "0.375rem", marginBottom: "0.25rem", alignItems: "flex-start" }}>
              <X size={12} style={{ color: "var(--backward-orange)", flexShrink: 0, marginTop: "0.2rem" }} />
              <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                {con}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ComparisonSection() {
  return (
    <SectionWrapper id="comparison" layout="full-bleed">
      <div>
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--git-blue)" }}
        >
          05 &mdash; Worktrees vs Clones vs Stash
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          Pick the right tool for the job.
        </h2>
        <p
          className="mt-4 text-base leading-relaxed sm:text-lg"
          style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
        >
          Worktrees aren&apos;t always the answer. Here&apos;s how they compare to the alternatives.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {strategies.map((s, i) => (
          <ComparisonCard key={s.name} strategy={s} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
