"use client";

import { useState, useMemo } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { signals, calculateVideoScore } from "@/lib/explainers/tiktok-signals";
import {
  Clock,
  RotateCcw,
  Share2,
  MessageCircle,
  Heart,
  UserPlus,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  RotateCcw,
  Share2,
  MessageCircle,
  Heart,
  UserPlus,
};

export default function SignalsSection() {
  const [weights, setWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(signals.map((s) => [s.id, s.weight]))
  );
  const [expandedSignal, setExpandedSignal] = useState<string | null>(null);

  const score = useMemo(() => calculateVideoScore(weights), [weights]);

  const updateWeight = (id: string, value: number) => {
    setWeights((prev) => ({ ...prev, [id]: value }));
  };

  const getScoreColor = (s: number) => {
    if (s >= 75) return "text-correct-green";
    if (s >= 50) return "text-accent-amber";
    if (s >= 25) return "text-backward-orange";
    return "text-text-tertiary";
  };

  const getBarWidth = (value: number) => `${value}%`;

  return (
    <SectionWrapper id="signals">
      <div className="text-center mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-forward-blue mb-3">
          Section 02
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Your Every Move, Measured
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          TikTok tracks six key interaction signals — each weighted differently.
          Watch time dwarfs everything else. Drag the sliders to see how changing
          signal weights affects a video&apos;s recommendation score.
        </p>
      </div>

      {/* Score display */}
      <div className="mb-10 text-center">
        <div className="inline-flex flex-col items-center rounded-2xl border border-border bg-bg-card px-8 py-6 shadow-sm">
          <span className="font-sans text-sm text-text-tertiary mb-1">
            Video Recommendation Score
          </span>
          <span className={`font-mono text-5xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="font-sans text-xs text-text-tertiary mt-1">
            out of 100
          </span>
        </div>
      </div>

      {/* Signal sliders */}
      <div className="space-y-4">
        {signals.map((signal) => {
          const Icon = iconMap[signal.icon];
          const isExpanded = expandedSignal === signal.id;
          return (
            <div
              key={signal.id}
              className="rounded-xl border border-border bg-bg-card p-5 transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `color-mix(in srgb, ${signal.color} 15%, transparent)` }}
                >
                  {Icon && <span style={{ color: signal.color }}><Icon className="h-5 w-5" /></span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() =>
                        setExpandedSignal(isExpanded ? null : signal.id)
                      }
                      className="font-sans text-sm font-semibold text-text-primary hover:text-forward-blue transition-colors text-left"
                    >
                      {signal.name}
                    </button>
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: signal.color }}
                    >
                      {weights[signal.id]}
                    </span>
                  </div>
                  {/* Slider with bar */}
                  <div className="relative">
                    <div className="h-1.5 rounded-full bg-bg-secondary overflow-hidden mb-1">
                      <div
                        className="h-full rounded-full transition-all duration-200"
                        style={{
                          width: getBarWidth(weights[signal.id]),
                          backgroundColor: signal.color,
                        }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={weights[signal.id]}
                      onChange={(e) =>
                        updateWeight(signal.id, Number(e.target.value))
                      }
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                      style={{ height: "20px", top: "-6px" }}
                      aria-label={`${signal.name} weight`}
                    />
                  </div>
                </div>
              </div>
              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-4 pl-14 animate-slide-up">
                  <p className="font-sans text-sm text-text-secondary leading-relaxed mb-3">
                    {signal.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {signal.examples.map((ex, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-border bg-bg-secondary px-3 py-1 font-sans text-xs text-text-secondary"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reset button */}
      <div className="mt-6 text-center">
        <button
          onClick={() =>
            setWeights(Object.fromEntries(signals.map((s) => [s.id, s.weight])))
          }
          className="font-sans text-sm text-text-tertiary hover:text-forward-blue transition-colors underline underline-offset-2"
        >
          Reset to default weights
        </button>
      </div>
    </SectionWrapper>
  );
}
