"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import {
  pricingData,
  calculatorModels,
  calculateMonthlyCost,
  type PricingEntry,
} from "@/lib/explainers/seed2-pricing";

const SLIDER_MIN = 1;
const SLIDER_MAX = 100;
const SLIDER_DEFAULT = 10;

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toFixed(2)}`;
}

function formatMillions(value: number): string {
  return `${value}M`;
}

export default function PricingSection() {
  const [tokenVolume, setTokenVolume] = useState(SLIDER_DEFAULT);

  const seed2ProEntry = calculatorModels.find((m) => m.model === "Seed2.0 Pro")!;
  const seed2ProCost = calculateMonthlyCost(seed2ProEntry, tokenVolume);

  const modelCosts = calculatorModels.map((model) => ({
    ...model,
    cost: calculateMonthlyCost(model, tokenVolume),
  }));

  const maxCost = Math.max(...modelCosts.map((m) => m.cost));

  return (
    <SectionWrapper id="pricing">
      {/* Section header */}
      <div className="mb-10">
        <p className="mb-3 font-serif text-base italic text-text-tertiary">
          It&apos;s like discovering two airlines fly the same route with the same legroom &mdash; but one charges 10x less.
        </p>
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          The Price Gap
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-base text-text-secondary sm:text-lg">
          Frontier-level performance shouldn&apos;t require a frontier-level budget. See how Seed2.0 Pro
          compares to equivalent models &mdash; and how much you&apos;d actually save at real usage volumes.
        </p>
      </div>

      {/* Interactive cost calculator */}
      <div className="mb-10 rounded-xl border border-border bg-bg-card p-6">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="font-sans text-sm font-medium text-text-secondary">
              Monthly token volume
            </label>
            <span className="font-mono text-lg font-semibold text-text-primary">
              {formatMillions(tokenVolume)} tokens
            </span>
          </div>
          <input
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            value={tokenVolume}
            onChange={(e) => setTokenVolume(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex justify-between font-mono text-xs text-text-tertiary">
            <span>{formatMillions(SLIDER_MIN)}</span>
            <span>{formatMillions(SLIDER_MAX)}</span>
          </div>
        </div>

        {/* Cost bars */}
        <div className="flex flex-col gap-4">
          {modelCosts.map((model) => {
            const barWidth = maxCost > 0 ? (model.cost / maxCost) * 100 : 0;
            const isSeed2Pro = model.model === "Seed2.0 Pro";
            const savings =
              !isSeed2Pro && seed2ProCost > 0
                ? Math.round((1 - seed2ProCost / model.cost) * 100)
                : null;

            return (
              <div key={model.model}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: model.color }}
                    />
                    <span
                      className={`font-sans text-sm ${
                        isSeed2Pro
                          ? "font-semibold text-text-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      {model.model}
                    </span>
                    <span className="font-sans text-xs text-text-tertiary">
                      ({model.provider})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {savings !== null && savings > 0 && (
                      <span className="rounded-full bg-correct-green/10 px-2 py-0.5 font-mono text-xs font-semibold text-correct-green">
                        {savings}% cheaper via Seed2.0
                      </span>
                    )}
                    <span
                      className={`font-mono text-sm font-semibold ${
                        isSeed2Pro ? "text-forward-blue" : "text-text-primary"
                      }`}
                    >
                      {formatCurrency(model.cost)}/mo
                    </span>
                  </div>
                </div>
                <div className="h-7 w-full overflow-hidden rounded bg-bg-secondary">
                  <div
                    className="h-full rounded transition-all duration-500 ease-out flex items-center justify-end pr-2"
                    style={{
                      width: `${Math.max(barWidth, 4)}%`,
                      backgroundColor: model.color,
                      opacity: isSeed2Pro ? 1 : 0.7,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 font-sans text-xs text-text-tertiary">
          Calculated assuming 60% input / 40% output token split at published per-million-token rates.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mb-8">
        <h3 className="mb-4 font-sans text-base font-semibold text-text-primary">
          Full Model Pricing Breakdown
        </h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-secondary">
                <th className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Model
                </th>
                <th className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Provider
                </th>
                <th className="px-4 py-3 text-right font-sans text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Input $/1M
                </th>
                <th className="px-4 py-3 text-right font-sans text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Output $/1M
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-bg-card">
              {pricingData.map((entry: PricingEntry) => {
                const isSeed2 = entry.provider === "ByteDance";
                return (
                  <tr
                    key={`${entry.provider}-${entry.model}`}
                    className={`transition-colors ${
                      isSeed2 ? "bg-forward-blue/5" : "hover:bg-bg-secondary"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span
                          className={`font-sans text-sm ${
                            isSeed2
                              ? "font-semibold text-text-primary"
                              : "text-text-secondary"
                          }`}
                        >
                          {entry.model}
                        </span>
                        {isSeed2 && (
                          <span className="rounded bg-forward-blue/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-forward-blue">
                            NEW
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-text-tertiary">
                      {entry.provider}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-text-primary">
                      ${entry.inputPer1M.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-text-primary">
                      ${entry.outputPer1M.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Why Should I Care? callout */}
      <div className="border-l-2 border-forward-blue pl-4">
        <p className="font-serif text-sm italic leading-relaxed text-text-secondary">
          <span className="font-semibold not-italic text-text-primary">Why should I care?</span>{" "}
          If your product makes 50M API calls a month, the difference between Seed2.0 Pro and Claude Opus
          is the difference between a $130k bill and a $1.4M bill. That&apos;s not a rounding error &mdash; it&apos;s
          a hiring decision.
        </p>
      </div>
    </SectionWrapper>
  );
}
