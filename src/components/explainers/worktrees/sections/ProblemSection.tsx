"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { Check, X } from "lucide-react";

export default function ProblemSection() {
  return (
    <SectionWrapper id="problem" layout="centered-card">
      <div>
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--git-blue)" }}
        >
          01 &mdash; The Problem
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          You&rsquo;re mid-feature. Production is on fire.
        </h2>
        <p
          className="mt-4 text-base leading-relaxed sm:text-lg"
          style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
        >
          The classic git workflow forces a painful choice: stash your work-in-progress,
          risk losing context, or open a second clone that doubles your disk usage. There&rsquo;s a better way.
        </p>
      </div>

      {/* Stat-box callout */}
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
          padding: "1.5rem",
          background: "color-mix(in srgb, var(--backward-orange) 8%, transparent)",
          borderRadius: "0.75rem",
          border: "1px solid color-mix(in srgb, var(--backward-orange) 20%, transparent)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "3rem",
            fontWeight: 700,
            color: "var(--backward-orange)",
            lineHeight: 1,
          }}
        >
          23 min
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          Average time to regain deep focus after a context switch
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-tertiary)", marginTop: "0.25rem" }}>
          University of California, Irvine study
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        {[
          {
            icon: <X size={20} style={{ color: "var(--backward-orange)" }} />,
            title: "The stash shuffle",
            description:
              "git stash, switch branch, fix bug, stash pop, resolve conflicts, lose 20 minutes of mental context. Repeat forever.",
            bg: "color-mix(in srgb, var(--backward-orange) 8%, transparent)",
            border: "color-mix(in srgb, var(--backward-orange) 20%, transparent)",
          },
          {
            icon: <X size={20} style={{ color: "var(--backward-orange)" }} />,
            title: "The double-clone",
            description:
              "Clone the repo again to a second folder. Now you have 2x disk usage, 2x node_modules, and two independent git histories drifting apart.",
            bg: "color-mix(in srgb, var(--backward-orange) 8%, transparent)",
            border: "color-mix(in srgb, var(--backward-orange) 20%, transparent)",
          },
          {
            icon: <Check size={20} style={{ color: "var(--correct-green)" }} />,
            title: "Git worktrees",
            description:
              "Create a new working directory in under a second. Check out any branch. Share the same git objects. Zero network, zero stashing, zero lost context.",
            bg: "color-mix(in srgb, var(--correct-green) 8%, transparent)",
            border: "color-mix(in srgb, var(--correct-green) 20%, transparent)",
          },
        ].map(({ icon, title, description, bg, border }) => (
          <div
            key={title}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: "0.625rem",
              padding: "1.25rem",
            }}
          >
            <div style={{ marginBottom: "0.625rem" }}>{icon}</div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "1rem",
                color: "var(--text-primary)",
                marginBottom: "0.375rem",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                lineHeight: 1.6,
              }}
            >
              {description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
