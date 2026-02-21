"use client";

import { useState, useMemo } from "react";
import { DollarSign, Building2, Network, Zap } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { calculateFees, feeStructure, settlementTimeline } from "@/lib/explainers/stripe-fees";

export default function SettlementSection() {
  const [amount, setAmount] = useState(100);
  const fees = useMemo(() => calculateFees(amount), [amount]);

  const barSegments = [
    {
      label: "Interchange",
      value: fees.interchange,
      color: "var(--forward-blue)",
      icon: Building2,
    },
    {
      label: "Network",
      value: fees.networkAssessment,
      color: "var(--accent-purple)",
      icon: Network,
    },
    {
      label: "Stripe",
      value: fees.stripeFee,
      color: "var(--stripe-purple)",
      icon: Zap,
    },
    {
      label: "Merchant",
      value: fees.merchantReceives,
      color: "var(--correct-green)",
      icon: DollarSign,
    },
  ];

  return (
    <SectionWrapper id="settlement">
      <div className="mb-10 sm:mb-14">
        <span className="stripe-section-number">05</span>
        <h2 className="stripe-section-title">Settlement: Following the Money</h2>
        <p className="stripe-section-subtitle">
          Where does your $100 actually go? Adjust the payment amount and watch the fee breakdown update in real time.
        </p>
      </div>

      {/* Amount slider */}
      <div
        className="mb-8 rounded-2xl border p-6 sm:p-8"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <label className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Payment Amount
          </label>
          <div className="flex items-baseline gap-1">
            <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>$</span>
            <span
              className="font-mono text-3xl font-bold"
              style={{ color: "var(--stripe-purple)" }}
            >
              {amount.toFixed(2)}
            </span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="1000"
          step="1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--stripe-purple) 0%, var(--stripe-purple) ${
              (amount / 1000) * 100
            }%, var(--bg-secondary) ${(amount / 1000) * 100}%, var(--bg-secondary) 100%)`,
          }}
          aria-label="Adjust payment amount"
        />
        <div className="flex justify-between mt-2 text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
          <span>$1</span>
          <span>$500</span>
          <span>$1,000</span>
        </div>
      </div>

      {/* Sankey-style bar */}
      <div
        className="mb-8 rounded-2xl border p-6 sm:p-8"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <h3 className="mb-6 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
          Where the Money Goes
        </h3>

        {/* Horizontal stacked bar */}
        <div className="mb-6 flex h-12 sm:h-16 overflow-hidden rounded-xl">
          {barSegments.map((segment) => {
            const widthPercent = (segment.value / amount) * 100;
            return (
              <div
                key={segment.label}
                className="relative flex items-center justify-center transition-all duration-500 first:rounded-l-xl last:rounded-r-xl overflow-hidden"
                style={{
                  width: `${Math.max(widthPercent, 2)}%`,
                  backgroundColor: segment.color,
                  minWidth: widthPercent > 0 ? "24px" : "0",
                }}
                title={`${segment.label}: $${segment.value.toFixed(2)}`}
              >
                {widthPercent > 8 && (
                  <span className="text-white text-xs sm:text-sm font-mono font-medium truncate px-2">
                    ${segment.value.toFixed(2)}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {barSegments.map((segment) => {
            const percentage = ((segment.value / amount) * 100).toFixed(1);
            return (
              <div key={segment.label} className="flex items-start gap-3">
                <div
                  className="mt-1 h-3 w-3 shrink-0 rounded-sm"
                  style={{ backgroundColor: segment.color }}
                />
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {segment.label}
                  </div>
                  <div className="font-mono text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    ${segment.value.toFixed(2)}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    {percentage}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fee breakdown detail */}
        <div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h3 className="mb-4 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Fee Breakdown
          </h3>
          <div className="space-y-4">
            {feeStructure.map((fee) => (
              <div key={fee.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {fee.label}
                  </span>
                  <span className="font-mono text-sm" style={{ color: "var(--text-secondary)" }}>
                    {fee.percentage}%{" "}
                    {fee.fixedCents > 0 && `+ ${fee.fixedCents}\u00A2`}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                  {fee.description}
                </p>
              </div>
            ))}
            <div
              className="rounded-lg p-3 mt-4"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Total Processing Fee
                </span>
                <span className="font-mono text-sm font-bold" style={{ color: "var(--stripe-purple)" }}>
                  2.9% + 30\u00A2
                </span>
              </div>
              <p className="mt-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                Stripe&apos;s standard pricing. Volume discounts available for businesses
                processing $100K+/month.
              </p>
            </div>
          </div>
        </div>

        {/* Settlement timeline */}
        <div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h3 className="mb-4 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Settlement Timeline
          </h3>
          <div className="space-y-0">
            {settlementTimeline.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="h-3 w-3 rounded-full border-2"
                    style={{
                      borderColor: "var(--forward-blue)",
                      backgroundColor:
                        i === settlementTimeline.length - 1
                          ? "var(--correct-green)"
                          : "var(--bg-card)",
                    }}
                  />
                  {i < settlementTimeline.length - 1 && (
                    <div
                      className="h-full w-0.5 min-h-[32px]"
                      style={{
                        backgroundColor: "var(--border)",
                      }}
                    />
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs font-bold" style={{ color: "var(--forward-blue)" }}>
                      {step.day}
                    </span>
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {step.label}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
