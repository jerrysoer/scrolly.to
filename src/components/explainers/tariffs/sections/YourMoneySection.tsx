"use client";

import { useEffect, useRef, useState } from "react";
import DateStampedChapter from "../shared/DateStampedChapter";
import MetricPanel from "../shared/MetricPanel";
import { revenueFlows, yourMoneyMetrics } from "@/lib/explainers/tariffs";

export default function YourMoneySection() {
  const flowRef = useRef<HTMLDivElement>(null);
  const [flowVisible, setFlowVisible] = useState(false);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFlowVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sankey layout calculations
  const svgWidth = 800;
  const svgHeight = 320;
  const sourceX = 60;
  const sourceWidth = 160;
  const targetX = 580;
  const targetWidth = 160;
  const totalHeight = 220;
  const sourceY = (svgHeight - totalHeight) / 2;

  // Calculate flow paths
  const flows = revenueFlows.map((flow, i) => {
    const previousHeight = revenueFlows
      .slice(0, i)
      .reduce((acc, f) => acc + (f.width / 100) * totalHeight, 0);
    const flowHeight = (flow.width / 100) * totalHeight;
    const gap = i * 12;

    const y1 = sourceY + previousHeight + gap;
    const y2 = sourceY + previousHeight + flowHeight + gap;

    return {
      ...flow,
      y1,
      y2,
      midY: y1 + flowHeight / 2,
    };
  });

  return (
    <DateStampedChapter
      id="your-money"
      date="THE AFTERMATH"
      title="Billions collected. Now what?"
    >
      <p className="text-base leading-relaxed text-text-secondary">
        Between April 2025 and February 2026, the government collected $133.5
        billion in IEEPA tariff revenue. Those tariffs have now been ruled
        unconstitutional. The money didn&apos;t disappear — but getting it back
        is another story entirely.
      </p>

      <p className="text-base leading-relaxed text-text-secondary">
        Importers who paid the tariffs directly — and who are party to active
        lawsuits — have the strongest claims for refunds. But consumers who
        paid higher prices at the register? The path to recovery is indirect
        at best.
      </p>

      {/* Sankey flow diagram */}
      <div ref={flowRef} className="mt-8">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          Revenue Flow
        </p>

        <div
          className="relative overflow-hidden rounded-xl border"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full"
            aria-label="Sankey diagram showing tariff revenue flows"
            role="img"
          >
            {/* Source node */}
            <rect
              x={sourceX}
              y={sourceY}
              width={sourceWidth}
              height={totalHeight + (flows.length - 1) * 12}
              rx={8}
              fill="var(--accent-amber)"
              opacity={flowVisible ? 0.15 : 0}
              style={{ transition: "opacity 0.6s ease-out" }}
            />
            <text
              x={sourceX + sourceWidth / 2}
              y={sourceY + (totalHeight + (flows.length - 1) * 12) / 2 - 8}
              textAnchor="middle"
              fill="var(--accent-amber)"
              fontSize="14"
              fontFamily="var(--font-jetbrains), monospace"
              fontWeight="700"
              opacity={flowVisible ? 1 : 0}
              style={{ transition: "opacity 0.5s ease-out 0.2s" }}
            >
              $133.5B
            </text>
            <text
              x={sourceX + sourceWidth / 2}
              y={sourceY + (totalHeight + (flows.length - 1) * 12) / 2 + 10}
              textAnchor="middle"
              fill="var(--text-tertiary)"
              fontSize="10"
              fontFamily="var(--font-inter), sans-serif"
              fontWeight="500"
              opacity={flowVisible ? 1 : 0}
              style={{ transition: "opacity 0.5s ease-out 0.3s" }}
            >
              Collected
            </text>

            {/* Flow paths and target nodes */}
            {flows.map((flow, i) => {
              const pathColor = flow.refundable
                ? "var(--accent-blue)"
                : "var(--text-tertiary)";
              const flowHeight = flow.y2 - flow.y1;

              // Bezier curve control points
              const sx = sourceX + sourceWidth;
              const tx = targetX;
              const cpx1 = sx + (tx - sx) * 0.4;
              const cpx2 = sx + (tx - sx) * 0.6;

              const pathD = `
                M ${sx} ${flow.y1}
                C ${cpx1} ${flow.y1}, ${cpx2} ${flow.y1}, ${tx} ${flow.y1}
                L ${tx} ${flow.y2}
                C ${cpx2} ${flow.y2}, ${cpx1} ${flow.y2}, ${sx} ${flow.y2}
                Z
              `;

              return (
                <g key={flow.label}>
                  {/* Flow path */}
                  <path
                    d={pathD}
                    fill={pathColor}
                    opacity={flowVisible ? 0.15 : 0}
                    style={{
                      transition: `opacity 0.8s ease-out ${0.3 + i * 0.2}s`,
                    }}
                  />

                  {/* Animated center line */}
                  <path
                    d={`M ${sx} ${flow.midY} C ${cpx1} ${flow.midY}, ${cpx2} ${flow.midY}, ${tx} ${flow.midY}`}
                    fill="none"
                    stroke={pathColor}
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    opacity={flowVisible ? 0.5 : 0}
                    style={{
                      transition: `opacity 0.6s ease-out ${0.5 + i * 0.2}s`,
                      animation: flowVisible
                        ? "dash-flow 1.5s linear infinite"
                        : "none",
                    }}
                  />

                  {/* Target node */}
                  <rect
                    x={targetX}
                    y={flow.y1}
                    width={targetWidth}
                    height={flowHeight}
                    rx={6}
                    fill={pathColor}
                    opacity={flowVisible ? 0.12 : 0}
                    style={{
                      transition: `opacity 0.6s ease-out ${0.6 + i * 0.2}s`,
                    }}
                  />

                  {/* Target label */}
                  <text
                    x={targetX + targetWidth / 2}
                    y={flow.midY - 6}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontFamily="var(--font-inter), sans-serif"
                    fontWeight="600"
                    opacity={flowVisible ? 1 : 0}
                    style={{
                      transition: `opacity 0.5s ease-out ${0.7 + i * 0.2}s`,
                    }}
                  >
                    {flow.label}
                  </text>
                  <text
                    x={targetX + targetWidth / 2}
                    y={flow.midY + 10}
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains), monospace"
                    opacity={flowVisible ? 0.8 : 0}
                    style={{
                      transition: `opacity 0.5s ease-out ${0.8 + i * 0.2}s`,
                    }}
                  >
                    {flow.amount}
                  </text>
                </g>
              );
            })}

            {/* Legend */}
            <g>
              <line
                x1="280"
                y1="290"
                x2="310"
                y2="290"
                stroke="var(--accent-blue)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <text
                x="318"
                y="294"
                fill="var(--text-tertiary)"
                fontSize="10"
                fontFamily="var(--font-inter), sans-serif"
              >
                Refundable
              </text>
              <line
                x1="420"
                y1="290"
                x2="450"
                y2="290"
                stroke="var(--text-tertiary)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <text
                x="458"
                y="294"
                fill="var(--text-tertiary)"
                fontSize="10"
                fontFamily="var(--font-inter), sans-serif"
              >
                Non-refundable
              </text>
            </g>
          </svg>
        </div>
      </div>

      <MetricPanel metrics={yourMoneyMetrics} title="The Numbers" />

      {/* Kavanaugh dissent quote */}
      <div className="intel-callout mt-8">
        <p className="callout-label">Dissent</p>
        <p className="italic">
          Justice Kavanaugh, in dissent, called the refund process &ldquo;likely
          to be a mess&rdquo; — warning that unwinding billions in collected
          tariffs would create administrative chaos across federal agencies.
        </p>
      </div>

      <p className="mt-6 font-mono text-xs text-text-tertiary opacity-60">
        Source: Yale Budget Lab
      </p>
    </DateStampedChapter>
  );
}
