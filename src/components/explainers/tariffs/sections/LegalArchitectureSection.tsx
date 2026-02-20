"use client";

import { useState } from "react";
import { Shield, Scale, AlertTriangle } from "lucide-react";
import DateStampedChapter from "../shared/DateStampedChapter";
import ExpandableDeepDive from "../shared/ExpandableDeepDive";
import { tariffLaws } from "@/lib/explainers/tariffs";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Scale,
  AlertTriangle,
};

export default function LegalArchitectureSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <DateStampedChapter
      id="legal-architecture"
      date="THE LEGAL FRAMEWORK"
      title="Congress controls tariffs. Except when it doesn't."
    >
      <p className="text-base leading-relaxed text-text-secondary">
        Article I, Section 8 of the Constitution gives Congress &mdash; not the
        president &mdash; the power to &ldquo;lay and collect Taxes, Duties,
        Imposts and Excises.&rdquo; But over the decades, Congress has delegated
        chunks of that authority to the executive branch through specific
        statutes. Three laws matter most.
      </p>

      {/* 3-card responsive grid */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {tariffLaws.map((law) => {
          const Icon = iconMap[law.icon];
          const isIEEPA = law.id === "ieepa";
          const isExpanded = expandedId === law.id;

          return (
            <div
              key={law.id}
              className="rounded-xl border overflow-hidden transition-shadow"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: isIEEPA ? "var(--accent-red)" : "var(--border)",
                borderTopWidth: "3px",
                borderTopColor: law.accentColor,
              }}
            >
              <div className="p-5">
                <div className="flex items-start gap-3">
                  {Icon && (
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: law.accentColor }}
                    />
                  )}
                  <div>
                    <h3 className="font-sans text-base font-bold text-text-primary">
                      {law.name}
                    </h3>
                    <span className="font-mono text-xs text-text-tertiary">
                      {law.year}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {law.summary}
                </p>

                {/* Expand/collapse toggle */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : law.id)
                  }
                  className="mt-4 font-mono text-xs font-medium uppercase tracking-wider transition-colors"
                  style={{ color: law.accentColor }}
                >
                  {isExpanded ? "Collapse" : "Deep dive"}
                </button>
              </div>

              {/* Expandable detail */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isExpanded ? "1fr" : "0fr",
                  transition: "grid-template-rows 350ms ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div
                    className="space-y-3 px-5 pb-5 text-sm"
                    style={{
                      borderTop: "1px solid var(--border)",
                      paddingTop: "1rem",
                    }}
                  >
                    <div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                        When Used
                      </span>
                      <p className="mt-1 leading-relaxed text-text-secondary">
                        {law.whenUsed}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                        Limits
                      </span>
                      <p className="mt-1 leading-relaxed text-text-secondary">
                        {law.limits}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                        Examples
                      </span>
                      <p className="mt-1 leading-relaxed text-text-secondary">
                        {law.examples}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Intel callout */}
      <div className="intel-callout mt-10">
        <p className="callout-label">Key Context</p>
        <p>
          On April 2, 2025 &mdash; dubbed &ldquo;Liberation Day&rdquo; &mdash;
          Trump used IEEPA to impose sweeping tariffs on nearly every trading
          partner. It was the first time any president had used this 1977
          emergency law to levy tariffs, bypassing the investigation and
          review requirements of Sections 232 and 301.
        </p>
      </div>
    </DateStampedChapter>
  );
}
