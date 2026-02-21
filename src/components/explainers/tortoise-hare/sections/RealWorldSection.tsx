"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RotateCw } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { caseStudies, CaseStudy } from "@/lib/explainers/tortoise-hare-case-studies";

function CaseCard({ study }: { study: CaseStudy }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`th-card-flip ${flipped ? "flipped" : ""} cursor-pointer`}
      style={{ minHeight: "480px" }}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      aria-label={`${study.name} case study. Click to ${flipped ? "see summary" : "reveal data"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped(!flipped);
        }
      }}
    >
      <div className="th-card-flip-inner">
        {/* Front */}
        <div className="th-card-front bg-bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col">
          <div className="flex-1">
            <p className="font-mono text-xs text-accent-purple uppercase tracking-wider mb-3">
              {study.principle}
            </p>
            <h3 className="font-heading text-2xl font-light mb-1">{study.name}</h3>
            <p className="text-sm text-text-tertiary mb-6">{study.tagline}</p>

            <div className="text-center py-8">
              <p className="text-6xl sm:text-7xl font-mono font-bold text-correct-green">
                {study.frontStat}
              </p>
              <p className="text-sm text-text-secondary mt-2">{study.frontDescription}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-text-tertiary text-xs mt-4">
            <RotateCw size={14} />
            <span>Click to reveal the data</span>
          </div>
        </div>

        {/* Back */}
        <div className="th-card-back bg-bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col overflow-auto">
          <h3 className="font-heading text-xl font-light mb-4">{study.title}</h3>

          {/* Data points */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {study.backData.map((d) => (
              <div key={d.label} className="bg-bg-secondary rounded-lg p-3">
                <p className="text-xs text-text-tertiary">{d.label}</p>
                <p className="text-lg font-mono font-semibold text-text-primary">{d.value}</p>
                <p className="text-xs text-text-tertiary mt-0.5">{d.detail}</p>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="h-[120px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={study.chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`grad-${study.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--correct-green)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--correct-green)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
                  stroke="var(--text-tertiary)"
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                  }}
                  formatter={(value: number | undefined) => {
                    const v = value ?? 0;
                    return [
                      study.chartUnit === "$M"
                        ? `$${v.toLocaleString()}M`
                        : study.chartUnit === "x"
                          ? `${v}x`
                          : v.toLocaleString(),
                      study.chartLabel,
                    ];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--correct-green)"
                  fill={`url(#grad-${study.id})`}
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quote */}
          <blockquote className="text-sm italic text-text-secondary border-l-2 border-accent-purple pl-3">
            &ldquo;{study.quote}&rdquo;
            <cite className="block text-xs text-text-tertiary mt-1 not-italic">
              -- {study.quoteAttribution}
            </cite>
          </blockquote>

          <div className="flex items-center justify-center gap-2 text-text-tertiary text-xs mt-4">
            <RotateCw size={14} />
            <span>Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RealWorldSection() {
  return (
    <SectionWrapper id="real-world" tinted className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-purple mb-4">
            Section IV
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light mb-4">
            Real-World Tortoises
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            The tortoise strategy isn&apos;t a fable. It&apos;s how fortunes are built, habits are formed,
            and empires are made. Click each card to reveal the data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <CaseCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
