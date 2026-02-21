"use client";

import { useState } from "react";
import {
  Lightbulb,
  Mail,
  Globe,
  FileText,
  BookOpen,
  Code2,
  BarChart2,
  Landmark,
  Quote,
  ShieldAlert,
} from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { trustCheckItems, type RichTrustCheckItem } from "@/lib/explainers/hallucinate";

// ─── Icon lookup ───────────────────────────────────────────────────────────────

function UseCaseIcon({ name, size = 20 }: { name: string; size?: number }) {
  const props = { size, "aria-hidden": true as const };
  switch (name) {
    case "Lightbulb":
      return <Lightbulb {...props} />;
    case "Mail":
      return <Mail {...props} />;
    case "Globe":
      return <Globe {...props} />;
    case "FileText":
      return <FileText {...props} />;
    case "BookOpen":
      return <BookOpen {...props} />;
    case "Code2":
      return <Code2 {...props} />;
    case "BarChart2":
      return <BarChart2 {...props} />;
    case "Landmark":
      return <Landmark {...props} />;
    case "Quote":
      return <Quote {...props} />;
    case "ShieldAlert":
      return <ShieldAlert {...props} />;
    default:
      return <FileText {...props} />;
  }
}

// ─── Risk config ───────────────────────────────────────────────────────────────

const riskConfig: Record<
  RichTrustCheckItem["riskLevel"],
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    barColor: string;
  }
> = {
  safe: {
    label: "Safe",
    color: "var(--verified-green)",
    bgColor: "rgba(34, 197, 94, 0.12)",
    borderColor: "var(--verified-green)",
    barColor: "var(--verified-green)",
  },
  verify: {
    label: "Verify First",
    color: "var(--accent-amber)",
    bgColor: "rgba(245, 158, 11, 0.12)",
    borderColor: "var(--accent-amber)",
    barColor: "var(--accent-amber)",
  },
  dangerous: {
    label: "Dangerous",
    color: "var(--hallucination-red)",
    bgColor: "rgba(239, 68, 68, 0.12)",
    borderColor: "var(--hallucination-red)",
    barColor: "var(--hallucination-red)",
  },
};

// ─── Use-case card ────────────────────────────────────────────────────────────

function UseCaseCard({
  item,
  selected,
  onSelect,
}: {
  item: RichTrustCheckItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const risk = riskConfig[item.riskLevel];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${item.useCase}: ${item.riskLevel} risk`}
      className="rounded-xl border cursor-pointer transition-all flex flex-col"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: selected ? risk.borderColor : "var(--border)",
        boxShadow: selected ? `0 0 0 2px ${risk.borderColor}` : "none",
        minHeight: "auto",
      }}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Card header — always visible */}
      <div className="p-4 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: selected ? risk.bgColor : "var(--bg-secondary)",
            color: selected ? risk.color : "var(--text-tertiary)",
            transition: "background-color 0.2s, color 0.2s",
          }}
          aria-hidden="true"
        >
          <UseCaseIcon name={item.icon ?? ""} size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-sans text-sm font-semibold leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {item.useCase}
          </p>
          <p
            className="font-sans text-xs leading-relaxed mt-0.5 line-clamp-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {item.description.split(".")[0]}.
          </p>
        </div>
      </div>

      {/* Expanded details */}
      {selected && (
        <div
          className="px-4 pb-4 pt-0 border-t flex flex-col gap-3"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Risk level badge */}
          <div className="flex items-center gap-3 pt-3">
            <span
              className="font-mono text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md"
              style={{
                backgroundColor: risk.bgColor,
                color: risk.color,
              }}
            >
              {risk.label}
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-tertiary)" }}
            >
              Risk score: {item.riskScore}/10
            </span>
          </div>

          {/* Risk bar */}
          <div>
            <div
              className="h-2 w-full rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--bg-secondary)" }}
              role="meter"
              aria-valuenow={item.riskScore}
              aria-valuemin={1}
              aria-valuemax={10}
              aria-label={`Risk score ${item.riskScore} out of 10`}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(item.riskScore / 10) * 100}%`,
                  backgroundColor: risk.barColor,
                  transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
            <div
              className="flex justify-between mt-1 font-mono text-[10px]"
              style={{ color: "var(--text-tertiary)" }}
              aria-hidden="true"
            >
              <span>Low risk</span>
              <span>High risk</span>
            </div>
          </div>

          {/* Advice */}
          <p
            className="font-sans text-xs leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {item.advice}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function WhatYouShouldDoSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <SectionWrapper id="what-you-should-do" layout="full-bleed">
      <div
        className="w-full px-4 py-16 sm:py-24"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--forward-blue)" }}
            >
              Section 09
            </p>
            <h2
              className="font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              What You Should Do Right Now
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Practical rules for using AI safely in your daily work. Tap a use
              case to see its risk level and advice.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-8">
            {(
              [
                { key: "safe", label: "Safe" },
                { key: "verify", label: "Verify First" },
                { key: "dangerous", label: "Dangerous" },
              ] as const
            ).map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: riskConfig[key].color }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Grid of use-case cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {trustCheckItems.map((item) => (
              <UseCaseCard
                key={item.id}
                item={item}
                selected={selectedId === item.id}
                onSelect={() => handleSelect(item.id)}
              />
            ))}
          </div>

          {/* Summary rule */}
          <div className="mt-14 text-center">
            <p
              className="mx-auto max-w-2xl font-serif text-xl sm:text-2xl italic leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              &ldquo;When in doubt: Use AI for thinking, not for facts. Use it
              for drafting, not as a source of truth. And always, always
              verify.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
