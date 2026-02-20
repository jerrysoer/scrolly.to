"use client";

import { useEffect, useRef, useState } from "react";
import DateStampedChapter from "../shared/DateStampedChapter";
import MetricPanel from "../shared/MetricPanel";
import { shoeCostBreakdown, supplyChainMetrics } from "@/lib/explainers/tariffs";

export default function SupplyChainSection() {
  const barsRef = useRef<HTMLDivElement>(null);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const total = shoeCostBreakdown.reduce((sum, layer) => sum + layer.amount, 0);

  return (
    <DateStampedChapter
      id="supply-chain"
      date="FOLLOW THE MONEY"
      title="The cost doesn't stop at the border."
    >
      <p className="text-base leading-relaxed text-text-secondary">
        A tariff is just the first domino. Once the importer pays it, the cost
        cascades downstream &mdash; through distributors, retailers, and
        finally to the consumer. Here&apos;s how a $60 pair of sneakers becomes
        $85.
      </p>

      {/* Waterfall bars */}
      <div ref={barsRef} className="mt-10 space-y-3">
        {shoeCostBreakdown.map((layer, i) => {
          const widthPercent = (layer.amount / total) * 100;
          return (
            <div key={layer.label} className="flex items-center gap-4">
              <span className="w-28 shrink-0 text-right font-mono text-xs font-medium text-text-tertiary sm:w-36">
                {layer.label}
              </span>
              <div className="relative flex-1">
                <div
                  className="flex h-8 items-center rounded-md px-3"
                  style={{
                    width: barsVisible ? `${widthPercent}%` : "0%",
                    backgroundColor: layer.color,
                    transition: `width 0.8s ease-out ${i * 0.15}s`,
                    minWidth: barsVisible ? "2.5rem" : 0,
                  }}
                >
                  <span className="font-mono text-xs font-bold text-white">
                    ${layer.amount}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-side comparison pills */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span
          className="rounded-full px-5 py-2 font-mono text-sm font-bold"
          style={{
            backgroundColor: "color-mix(in srgb, var(--accent-blue) 15%, var(--bg-card))",
            color: "var(--accent-blue)",
            border: "1px solid var(--accent-blue)",
          }}
        >
          Pre-tariff: $60
        </span>
        <span className="text-text-tertiary">&rarr;</span>
        <span
          className="rounded-full px-5 py-2 font-mono text-sm font-bold"
          style={{
            backgroundColor: "color-mix(in srgb, var(--accent-red) 15%, var(--bg-card))",
            color: "var(--accent-red)",
            border: "1px solid var(--accent-red)",
          }}
        >
          Post-tariff: $85
        </span>
      </div>

      {/* Metrics */}
      <div className="mt-10">
        <MetricPanel metrics={supplyChainMetrics} />
      </div>

      {/* Intel callout */}
      <div className="intel-callout mt-10">
        <p className="callout-label">Source</p>
        <p>
          A 2025 paper from the Federal Reserve Bank of New York found that US
          firms and consumers bore roughly 90% of the economic burden of
          Trump&apos;s tariffs. Foreign exporters absorbed about 10%.
        </p>
      </div>
    </DateStampedChapter>
  );
}
