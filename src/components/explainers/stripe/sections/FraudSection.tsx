"use client";

import { useState, useMemo } from "react";
import {
  MapPin,
  Fingerprint,
  Repeat,
  Activity,
  Mail,
  MapPinOff,
  Monitor,
  Shield,
} from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import {
  fraudSignals,
  riskThresholds,
  baseRiskScore,
  globalFraudHeatmapData,
} from "@/lib/explainers/stripe-fraud-signals";

const iconMap = {
  MapPin,
  Fingerprint,
  Repeat,
  Activity,
  Mail,
  MapPinOff,
  Monitor,
} as const;

function getRiskLevel(score: number) {
  if (score <= riskThresholds.low.max) return riskThresholds.low;
  if (score <= riskThresholds.medium.max) return riskThresholds.medium;
  return riskThresholds.high;
}

export default function FraudSection() {
  const [activeSignals, setActiveSignals] = useState<Set<string>>(new Set());

  const riskScore = useMemo(() => {
    let score = baseRiskScore;
    activeSignals.forEach((id) => {
      const signal = fraudSignals.find((s) => s.id === id);
      if (signal) score += signal.riskContribution;
    });
    return Math.min(score, 99);
  }, [activeSignals]);

  const riskLevel = getRiskLevel(riskScore);

  const toggleSignal = (id: string) => {
    setActiveSignals((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <SectionWrapper id="fraud">
      <div className="mb-10 sm:mb-14">
        <span className="stripe-section-number">04</span>
        <h2 className="stripe-section-title">Stripe Radar: The Fraud Detective</h2>
        <p className="stripe-section-subtitle">
          Stripe&apos;s ML model analyzes 1,000+ signals on every transaction. Toggle signals below to see how the risk score changes in real time.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Risk Score Gauge */}
        <div
          className="rounded-2xl border p-6 lg:col-span-1"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h3 className="mb-6 text-lg font-semibold flex items-center gap-2" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            <Shield size={18} style={{ color: "var(--stripe-purple)" }} />
            Risk Score
          </h3>

          {/* Circular gauge */}
          <div className="relative mx-auto mb-6 h-48 w-48">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {/* Background arc */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--bg-secondary)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${Math.PI * 84 * 0.75} ${Math.PI * 84 * 0.25}`}
              />
              {/* Score arc */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={riskLevel.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${
                  Math.PI * 84 * 0.75 * (riskScore / 100)
                } ${Math.PI * 84}`}
                style={{
                  transition: "all 0.5s ease-out",
                  filter: `drop-shadow(0 0 6px ${riskLevel.color}66)`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="font-mono text-4xl font-bold transition-colors duration-300"
                style={{ color: riskLevel.color }}
              >
                {riskScore}
              </span>
              <span className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
                / 100
              </span>
            </div>
          </div>

          {/* Risk level label */}
          <div className="text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300"
              style={{
                backgroundColor: `${riskLevel.color}15`,
                color: riskLevel.color,
              }}
            >
              {riskLevel.label}
            </span>
            <p className="mt-3 text-xs" style={{ color: "var(--text-tertiary)" }}>
              {riskScore <= 30
                ? "Transaction would be approved"
                : riskScore <= 60
                ? "Transaction flagged for review"
                : "Transaction would be blocked"}
            </p>
          </div>

          {/* Active signals count */}
          <div
            className="mt-6 rounded-lg p-3 text-center"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <div className="font-mono text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              {activeSignals.size}
            </div>
            <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              of {fraudSignals.length} signals active
            </div>
          </div>
        </div>

        {/* Signal Toggles */}
        <div className="lg:col-span-2 space-y-3">
          {fraudSignals.map((signal) => {
            const IconComponent = iconMap[signal.icon as keyof typeof iconMap];
            const isActive = activeSignals.has(signal.id);
            return (
              <button
                key={signal.id}
                onClick={() => toggleSignal(signal.id)}
                className="flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 hover:scale-[1.005] active:scale-[0.998]"
                style={{
                  backgroundColor: isActive
                    ? "var(--bg-secondary)"
                    : "var(--bg-card)",
                  borderColor: isActive
                    ? "var(--accent-amber)"
                    : "var(--border)",
                }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                  style={{
                    backgroundColor: isActive
                      ? `${riskLevel.color}20`
                      : "var(--bg-secondary)",
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      size={18}
                      style={{
                        color: isActive
                          ? riskLevel.color
                          : "var(--text-tertiary)",
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                      {signal.label}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{
                          color: isActive
                            ? riskLevel.color
                            : "var(--text-tertiary)",
                        }}
                      >
                        +{signal.weight}
                      </span>
                      {/* Toggle switch */}
                      <div
                        className="relative h-5 w-9 rounded-full transition-colors duration-200"
                        style={{
                          backgroundColor: isActive
                            ? "var(--stripe-purple)"
                            : "var(--border)",
                        }}
                      >
                        <div
                          className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-200"
                          style={{
                            transform: isActive
                              ? "translateX(17px)"
                              : "translateX(2px)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                    {signal.description}
                  </p>
                  {isActive && (
                    <p className="mt-2 text-xs leading-relaxed animate-fade-in" style={{ color: "var(--text-secondary)" }}>
                      {signal.details}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global fraud heatmap */}
      <div
        className="mt-8 rounded-2xl border p-6"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <h3 className="mb-6 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
          Global Fraud Rates by Region
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {globalFraudHeatmapData.map((region) => {
            const intensity = Math.min(region.rate / 4.5, 1);
            const hue = 120 - intensity * 120; // Green to red
            return (
              <div
                key={region.region}
                className="rounded-lg p-3 text-center"
                style={{
                  backgroundColor: `hsla(${hue}, 70%, 50%, ${0.08 + intensity * 0.12})`,
                  borderLeft: `3px solid hsla(${hue}, 70%, 50%, ${0.5 + intensity * 0.5})`,
                }}
              >
                <div className="text-xs mb-1 truncate" style={{ color: "var(--text-secondary)" }}>
                  {region.region}
                </div>
                <div
                  className="font-mono text-lg font-bold"
                  style={{
                    color: `hsl(${hue}, 70%, ${intensity > 0.5 ? "50%" : "45%"})`,
                  }}
                >
                  {region.rate}%
                </div>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                  {region.volume} volume
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
