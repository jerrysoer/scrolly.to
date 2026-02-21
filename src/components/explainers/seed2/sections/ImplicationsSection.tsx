"use client";

import { useState } from "react";
import { Rocket, Scale, TrendingDown, LucideIcon } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { scenarios, takeawayStats } from "@/lib/explainers/seed2-implications";

const ICON_MAP: Record<string, LucideIcon> = {
  Rocket,
  Scale,
  TrendingDown,
};

export default function ImplicationsSection() {
  const [activeTab, setActiveTab] = useState("building");

  const activeScenario = scenarios.find((s) => s.id === activeTab) ?? scenarios[0];

  return (
    <SectionWrapper id="implications">
      {/* Section header */}
      <div className="mb-10">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          What This Means For You
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-base text-text-secondary sm:text-lg">
          Three scenarios. Practical next steps.
        </p>
      </div>

      {/* Tab selector */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-border">
        {scenarios.map((scenario) => {
          const Icon = ICON_MAP[scenario.icon] ?? Rocket;
          const isActive = scenario.id === activeTab;

          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`
                relative flex items-center gap-2 px-4 pb-3 pt-2
                font-sans text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "text-forward-blue"
                    : "text-text-tertiary hover:text-text-secondary"
                }
              `}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{scenario.title}</span>
              {/* Active indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-forward-blue" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active scenario recommendations */}
      <div className="mb-10 rounded-xl border border-border bg-bg-card p-6">
        <div className="mb-5 flex items-center gap-3">
          {(() => {
            const Icon = ICON_MAP[activeScenario.icon] ?? Rocket;
            return <Icon className="h-5 w-5 flex-shrink-0 text-forward-blue" />;
          })()}
          <h3 className="font-serif text-lg font-semibold text-text-primary">
            {activeScenario.title}
          </h3>
        </div>

        <ol className="flex flex-col gap-4">
          {activeScenario.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-4">
              {/* Numbered circle */}
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-forward-blue/15 font-mono text-xs font-semibold text-forward-blue">
                {index + 1}
              </span>
              <p className="font-sans text-sm leading-relaxed text-text-secondary">
                {rec}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Takeaway stat pills */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {takeawayStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-bg-card p-5 text-center"
          >
            <p className="font-mono text-3xl font-bold text-forward-blue">
              {stat.value}
            </p>
            <p className="mt-1 font-sans text-sm font-semibold text-text-primary">
              {stat.label}
            </p>
            <p className="mt-1 font-sans text-xs leading-relaxed text-text-tertiary">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
