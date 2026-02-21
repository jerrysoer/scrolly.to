"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import {
  Terminal,
  Siren,
  GitPullRequest,
  FlaskConical,
  Beaker,
} from "lucide-react";
import { workflows, type Workflow } from "@/lib/explainers/worktrees";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Siren,
  GitPullRequest,
  FlaskConical,
  Beaker,
};

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const [activeStep, setActiveStep] = useState(0);
  const Icon = iconMap[workflow.icon] || Terminal;

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "0.625rem",
        background: "var(--bg-card)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          gap: "0.875rem",
          alignItems: "flex-start",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "0.5rem",
            background: "color-mix(in srgb, var(--git-blue) 12%, transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={20} style={{ color: "var(--git-blue)" }} />
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "1rem",
              color: "var(--text-primary)",
            }}
          >
            {workflow.title}
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              marginTop: "0.25rem",
            }}
          >
            {workflow.scenario}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="workflow-grid">
        {/* Steps */}
        <div style={{ padding: "1rem", borderRight: "1px solid var(--border)" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.625rem",
            }}
          >
            Steps
          </p>
          {workflow.steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              style={{
                width: "100%",
                display: "flex",
                gap: "0.625rem",
                alignItems: "flex-start",
                background: activeStep === i ? "color-mix(in srgb, var(--git-blue) 8%, transparent)" : "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.375rem 0.5rem",
                borderRadius: "0.375rem",
                textAlign: "left",
                marginBottom: "0.125rem",
                minHeight: "44px",
              }}
            >
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: `2px solid ${activeStep === i ? "var(--git-blue)" : "var(--border)"}`,
                  background: activeStep === i ? "var(--git-blue)" : "transparent",
                  color: activeStep === i ? "#fff" : "var(--text-tertiary)",
                  fontSize: "0.625rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.1rem",
                  transition: "all 0.2s",
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: activeStep === i ? "var(--text-primary)" : "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.45,
                  transition: "color 0.2s",
                }}
              >
                {step}
              </span>
            </button>
          ))}
        </div>

        {/* Commands */}
        <div style={{ padding: "1rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.625rem",
            }}
          >
            Command
          </p>
          <div className="terminal-bg" style={{ padding: "0.75rem 1rem", minHeight: "80px" }}>
            <code
              style={{
                fontSize: "0.8125rem",
                display: "block",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              <span style={{ color: "#6A9955" }}>$ </span>
              <span style={{ color: "#9CDCFE" }}>{workflow.commands[activeStep]}</span>
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkflowsSection() {
  return (
    <SectionWrapper id="workflows" layout="centered-card">
      <div>
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--git-blue)" }}
        >
          06 &mdash; Workflows
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          Real-world worktree patterns.
        </h2>
        <p
          className="mt-4 text-base leading-relaxed sm:text-lg"
          style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
        >
          Four battle-tested workflows where git worktrees save the day. Click steps to see the relevant command.
        </p>
      </div>

      {/* Pull-quote callout */}
      <div style={{ textAlign: "center", margin: "2rem auto", maxWidth: "520px" }}>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            fontSize: "1.25rem",
            color: "var(--text-primary)",
            lineHeight: 1.5,
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "1.25rem 0",
          }}
        >
          &ldquo;Worktrees turn a serial workflow into a parallel one &mdash; the productivity gain
          compounds every time you avoid a context switch.&rdquo;
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {workflows.map((wf) => (
          <WorkflowCard key={wf.id} workflow={wf} />
        ))}
      </div>
    </SectionWrapper>
  );
}
