"use client";

import StickyDiagram from "@/components/explainers/trader-joes/shared/StickyDiagram";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import {
  reckoningSteps,
  tensionTimelineData,
  reckoningQuote,
} from "@/components/explainers/trader-joes/data/part-3";

function TensionTimeline({ activeStepIndex }: { activeStepIndex: number }) {
  const barMaxWidth = 130;
  const rowHeight = 40;
  const startY = 20;
  const labelX = 8;
  const barX = 55;

  return (
    <div className="sticky top-24 w-full" style={{ height: "min(500px, 60vh)" }}>
      <svg
        viewBox="0 0 220 200"
        className="w-full rounded-xl"
        style={{ backgroundColor: "var(--bg-secondary)", height: "100%", aspectRatio: "220/200" }}
        aria-label="Tension timeline showing escalating controversies from 2020 to 2023"
      >
        {/* Header */}
        <text
          x="110"
          y="12"
          textAnchor="middle"
          style={{
            fontSize: "5px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: "var(--text-tertiary)",
            letterSpacing: "0.05em",
          }}
        >
          TENSION INDEX
        </text>

        {tensionTimelineData.map((event, i) => {
          const y = startY + i * rowHeight;
          const isActive = activeStepIndex === i;
          const barWidth = (event.severity / 100) * barMaxWidth;

          // Color interpolation: gold (severity ~60) to red (severity ~90)
          const severityNormalized = Math.max(
            0,
            Math.min(1, (event.severity - 50) / 50)
          );
          const barColor =
            severityNormalized > 0.6
              ? "var(--accent-red)"
              : "var(--accent-gold)";

          return (
            <g
              key={`${event.year}-${event.label}`}
              opacity={isActive ? 1 : 0.35}
              style={{ transition: "all 0.7s ease-out" }}
            >
              {/* Year label */}
              <text
                x={labelX}
                y={y + 18}
                style={{
                  fontSize: "6px",
                  fontFamily: "var(--font-dm-mono), monospace",
                  fill: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                  fontWeight: isActive ? 700 : 400,
                  transition: "all 0.7s ease-out",
                }}
              >
                {event.year}
              </text>

              {/* Background track */}
              <rect
                x={barX}
                y={y + 10}
                width={barMaxWidth}
                height="14"
                rx="2"
                fill="var(--border)"
                fillOpacity="0.15"
              />

              {/* Severity bar */}
              <rect
                x={barX}
                y={y + 10}
                width={isActive ? barWidth : barWidth * 0.7}
                height="14"
                rx="2"
                fill={barColor}
                fillOpacity={isActive ? 0.35 : 0.12}
                stroke={barColor}
                strokeWidth={isActive ? "0.8" : "0.3"}
                style={{ transition: "all 0.7s ease-out" }}
              />

              {/* Event label */}
              <text
                x={barX + barMaxWidth + 6}
                y={y + 20}
                style={{
                  fontSize: "4.5px",
                  fontFamily: "var(--font-dm-mono), monospace",
                  fill: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.7s ease-out",
                }}
              >
                {event.label}
              </text>

              {/* Severity number on bar */}
              <text
                x={barX + (isActive ? barWidth : barWidth * 0.7) - 4}
                y={y + 20}
                textAnchor="end"
                style={{
                  fontSize: "4px",
                  fontFamily: "var(--font-dm-mono), monospace",
                  fill: isActive ? barColor : "var(--text-tertiary)",
                  fontWeight: 700,
                  opacity: isActive ? 1 : 0.5,
                  transition: "all 0.7s ease-out",
                }}
              >
                {event.severity}
              </text>
            </g>
          );
        })}

        {/* Bottom annotation */}
        <text
          x="110"
          y="192"
          textAnchor="middle"
          style={{
            fontSize: "4px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: "var(--text-tertiary)",
            opacity: 0.5,
          }}
        >
          Higher severity = greater institutional pressure
        </text>
      </svg>
    </div>
  );
}

export default function ReckoningSection() {
  const steps = reckoningSteps.map((step) => ({
    id: step.id,
    content: (
      <p
        className="text-base leading-relaxed sm:text-lg"
        style={{ color: "var(--text-secondary)" }}
      >
        {step.content}
      </p>
    ),
  }));

  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">06</span>
      </div>

      <StickyDiagram
        id="reckoning"
        visualSide="right"
        steps={steps}
        renderVisual={(activeStepIndex) => (
          <TensionTimeline activeStepIndex={activeStepIndex} />
        )}
      />

      {/* Pull quote */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <PullQuote
          quote={reckoningQuote}
          attribution="Trader Joe's official statement"
          variant="standard"
        />
      </div>
    </>
  );
}
