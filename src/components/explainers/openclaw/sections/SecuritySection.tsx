"use client";

import { useState, useEffect, useRef } from "react";
import { ShieldAlert, AlertTriangle, Info } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { securityIssues, attackSurface } from "@/lib/explainers/openclaw-security";

/* --- Severity badge --- */

const severityConfig = {
  critical: {
    bg: "bg-accent-red/15",
    text: "text-accent-red",
    border: "border-accent-red/30",
    icon: ShieldAlert,
  },
  high: {
    bg: "bg-backward-orange/15",
    text: "text-backward-orange",
    border: "border-backward-orange/30",
    icon: AlertTriangle,
  },
  medium: {
    bg: "bg-accent-amber/15",
    text: "text-accent-amber",
    border: "border-accent-amber/30",
    icon: Info,
  },
} as const;

function SeverityBadge({ severity }: { severity: "critical" | "high" | "medium" }) {
  const cfg = severityConfig[severity];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs uppercase tracking-wide ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <Icon size={12} aria-hidden="true" />
      {severity}
    </span>
  );
}

/* --- CVSS score bar --- */

function CvssBar({ score }: { score: number }) {
  const color =
    score > 8
      ? "var(--accent-red)"
      : score > 6
        ? "var(--backward-orange)"
        : "var(--accent-amber)";

  return (
    <div className="mt-2 flex items-center gap-2">
      <span className="font-mono text-xs text-text-tertiary">CVSS</span>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
          style={{ width: `${(score / 10) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-mono text-xs font-semibold" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

/* --- Attack surface bar (animates in) --- */

function RiskBar({
  area,
  risk,
  description,
  visible,
}: {
  area: string;
  risk: number;
  description: string;
  visible: boolean;
}) {
  const color =
    risk > 85
      ? "var(--accent-red)"
      : risk > 70
        ? "var(--backward-orange)"
        : "var(--accent-amber)";

  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="font-sans text-sm font-semibold text-text-primary">
          {area}
        </span>
        <span className="font-mono text-xs font-semibold" style={{ color }}>
          {risk}%
        </span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-border/50">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: visible ? `${risk}%` : "0%",
            backgroundColor: color,
            transition: "width 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        />
      </div>
      <p className="mt-1 font-sans text-xs leading-relaxed text-text-tertiary">
        {description}
      </p>
    </div>
  );
}

/* --- SecuritySection --- */

export default function SecuritySection() {
  const [barsVisible, setBarsVisible] = useState(false);
  const barSectionRef = useRef<HTMLDivElement>(null);

  /* Observe the attack-surface section and trigger bar animation */
  useEffect(() => {
    const el = barSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="security">
      {/* Section header */}
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-red mb-3">
          Section 05
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Security Dilemma
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          An always-on AI agent with full system access is incredibly
          powerful&nbsp;&mdash; and incredibly dangerous.
        </p>
      </div>

      {/* Everyday analogy */}
      <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-base italic leading-relaxed text-text-tertiary sm:text-lg">
        Imagine giving your house keys, car keys, bank login, and email
        password to the smartest intern who ever lived&nbsp;&mdash; but who
        sometimes does exactly what strangers tell them to.
      </p>

      {/* CVE cards grid */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {securityIssues.map((issue) => (
          <div
            key={issue.id}
            className="group rounded-xl border border-border bg-bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-red/5"
          >
            {/* Severity + CVE */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <SeverityBadge severity={issue.severity} />
              {issue.cve && (
                <span className="font-mono text-xs text-text-tertiary">
                  {issue.cve}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-sans text-base font-semibold text-text-primary sm:text-lg">
              {issue.title}
            </h3>

            {/* Description */}
            <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
              {issue.description}
            </p>

            {/* CVSS bar */}
            {issue.cvss !== undefined && <CvssBar score={issue.cvss} />}
          </div>
        ))}
      </div>

      {/* Attack surface visualization */}
      <div ref={barSectionRef} className="mt-20">
        <h3 className="mb-2 text-center font-serif text-xl font-bold text-text-primary sm:text-2xl">
          Attack Surface Map
        </h3>
        <p className="mb-10 text-center font-sans text-sm text-text-tertiary">
          Risk assessment of each entry point into the agent
        </p>

        <div className="mx-auto max-w-xl">
          {[...attackSurface]
            .sort((a, b) => b.risk - a.risk)
            .map((surface) => (
              <RiskBar
                key={surface.area}
                area={surface.area}
                risk={surface.risk}
                description={surface.description}
                visible={barsVisible}
              />
            ))}
        </div>
      </div>

      {/* The quote */}
      <blockquote className="mx-auto mt-20 max-w-2xl border-l-4 border-accent-red/40 pl-6">
        <p className="font-serif text-xl italic leading-relaxed text-text-primary sm:text-2xl">
          &ldquo;If you can&rsquo;t understand how to run a command line, this
          is far too dangerous of a project for you to use safely.&rdquo;
        </p>
        <footer className="mt-3 font-sans text-sm text-text-tertiary">
          &mdash; OpenClaw maintainer
        </footer>
      </blockquote>

      {/* Why care? callout */}
      <div className="why-care mt-16 font-serif text-base sm:text-lg">
        This is the fundamental tension of AI agents: the more power you give
        them, the more damage they can do when things go wrong.
      </div>
    </SectionWrapper>
  );
}
