"use client";

import ScrollySection from "./ScrollySection";
import { pipelineSteps, labVsProduction, productionStats } from "@/lib/explainers/seed2-production";

// Extra context copy keyed by pipeline step id
const stepContext: Record<string, string> = {
  query:
    "Every interaction with Doubao \u2014 text, voice, image, video \u2014 enters as a raw user query. The system must handle hundreds of languages, typos, code snippets, and mixed modalities without degrading.",
  routing:
    "Not every query needs the full Pro model. A fast routing layer dispatches lightweight requests to Seed2.0 Mini and heavier reasoning tasks to Seed2.0 Pro \u2014 shaving latency and cost across billions of calls.",
  inference:
    "The core inference pass runs on optimized GPU clusters tuned specifically for Seed2.0\u2019s architecture. Hardware-software co-optimization means milliseconds matter at this scale.",
  safety:
    "A separate safety pipeline inspects outputs before delivery. At Doubao\u2019s volume, even a 0.001% failure rate affects thousands of users \u2014 so this layer is non-negotiable.",
  response:
    "The final response reaches the end user in real time. End-to-end latency targets are measured in hundreds of milliseconds \u2014 not seconds \u2014 to keep Doubao competitive with human-speed conversation.",
};

// SVG pipeline diagram component
function PipelineDiagram({ activeStep }: { activeStep: number }) {
  const boxWidth = 200;
  const boxHeight = 44;
  const boxX = 20;
  const gap = 20;
  const arrowLen = gap;
  const totalSteps = pipelineSteps.length;
  const svgHeight = totalSteps * boxHeight + (totalSteps - 1) * gap + totalSteps * arrowLen + 24;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 font-sans text-xs font-medium uppercase tracking-wider text-text-tertiary">
        Production Pipeline
      </p>
      <svg
        viewBox={`0 0 ${boxWidth + boxX * 2} ${svgHeight}`}
        className="w-full max-w-xs"
        aria-label="Seed2.0 production pipeline diagram"
      >
        {pipelineSteps.map((step, i) => {
          const isActive = i === activeStep;
          const y = i * (boxHeight + gap + arrowLen) + 12;
          const arrowY = y + boxHeight;
          const arrowCenterX = boxX + boxWidth / 2;

          return (
            <g key={step.id}>
              {/* Arrow connector between steps */}
              {i < totalSteps - 1 && (
                <g>
                  <line
                    x1={arrowCenterX}
                    y1={arrowY}
                    x2={arrowCenterX}
                    y2={arrowY + arrowLen - 6}
                    strokeWidth={isActive || i + 1 === activeStep ? 2 : 1.5}
                    stroke={
                      isActive || i + 1 === activeStep
                        ? "var(--forward-blue)"
                        : "var(--border)"
                    }
                    className="transition-all duration-300"
                  />
                  {/* Arrow head */}
                  <polygon
                    points={`${arrowCenterX - 5},${arrowY + arrowLen - 8} ${arrowCenterX + 5},${arrowY + arrowLen - 8} ${arrowCenterX},${arrowY + arrowLen - 2}`}
                    fill={
                      isActive || i + 1 === activeStep
                        ? "var(--forward-blue)"
                        : "var(--border)"
                    }
                    className="transition-all duration-300"
                  />
                </g>
              )}

              {/* Step box */}
              <rect
                x={boxX}
                y={y}
                width={boxWidth}
                height={boxHeight}
                rx={8}
                ry={8}
                fill={isActive ? "var(--forward-blue)" : "var(--bg-secondary)"}
                stroke={isActive ? "var(--forward-blue)" : "var(--border)"}
                strokeWidth={isActive ? 0 : 1}
                className="transition-all duration-300"
              />

              {/* Step label */}
              <text
                x={boxX + boxWidth / 2}
                y={y + boxHeight / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={13}
                fontFamily="var(--font-dm-sans), sans-serif"
                fontWeight={isActive ? 600 : 400}
                fill={isActive ? "white" : "var(--text-secondary)"}
                className="transition-all duration-300"
              >
                {step.label}
              </text>

              {/* Step number badge */}
              <circle
                cx={boxX + 16}
                cy={y + boxHeight / 2}
                r={9}
                fill={isActive ? "rgba(255,255,255,0.2)" : "var(--bg-card)"}
                stroke={isActive ? "rgba(255,255,255,0.4)" : "var(--border)"}
                strokeWidth={1}
                className="transition-all duration-300"
              />
              <text
                x={boxX + 16}
                y={y + boxHeight / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fontFamily="var(--font-dm-mono), monospace"
                fontWeight={600}
                fill={isActive ? "white" : "var(--text-tertiary)"}
                className="transition-all duration-300"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function ProductionSection() {
  const steps = pipelineSteps.map((step) => ({
    label: step.label,
    content: (
      <>
        <p>{step.description}</p>
        {stepContext[step.id] && (
          <p className="mt-3 text-text-tertiary">{stepContext[step.id]}</p>
        )}
      </>
    ),
  }));

  return (
    <>
      {/* Section intro */}
      <div className="mx-auto max-w-4xl px-4 pb-0 pt-20 sm:px-6 sm:pt-28">
        <p className="mb-3 font-serif text-base italic text-text-tertiary">
          Passing a written driving test is one thing. Safely driving millions of passengers every
          day is another.
        </p>
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Battle-Tested at Billion Scale
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-base text-text-secondary sm:text-lg">
          Seed2.0 isn&apos;t a research model &mdash; it&apos;s the backbone of Doubao, ByteDance&apos;s
          AI assistant deployed across hundreds of millions of daily active users on the Volcengine
          cloud platform.
        </p>

        {/* Production stats row */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {productionStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-bg-card p-5"
            >
              <p className="font-mono text-2xl font-semibold text-forward-blue">
                {stat.value}
              </p>
              <p className="mt-1 font-sans text-sm font-medium text-text-primary">
                {stat.label}
              </p>
              <p className="mt-0.5 font-sans text-xs text-text-tertiary">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolly pipeline section */}
      <div className="mt-12">
        <ScrollySection
          id="production"
          steps={steps}
          stickyDiagram={(activeStep) => (
            <PipelineDiagram activeStep={activeStep} />
          )}
        />
      </div>

      {/* Lab vs Production comparison table */}
      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 sm:pb-28">
        <h3 className="mb-4 font-serif text-xl font-semibold text-text-primary sm:text-2xl">
          Lab vs. Production
        </h3>
        <p className="mb-6 font-sans text-sm text-text-secondary">
          Benchmark performance in a controlled lab environment and real-world production are
          fundamentally different challenges.
        </p>

        {/* Table header */}
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-bg-secondary px-4 py-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              Dimension
            </span>
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              Lab
            </span>
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-forward-blue">
              Production
            </span>
          </div>

          {labVsProduction.map((row, i) => (
            <div
              key={row.dimension}
              className={`grid grid-cols-3 px-4 py-3 ${
                i < labVsProduction.length - 1 ? "border-b border-border" : ""
              } ${i % 2 === 1 ? "bg-bg-secondary/40" : ""}`}
            >
              <span className="font-sans text-sm font-medium text-text-primary">
                {row.dimension}
              </span>
              <span className="font-sans text-sm text-text-secondary">{row.lab}</span>
              <span className="rounded px-2 py-0.5 font-sans text-sm text-text-primary" style={{ background: "color-mix(in srgb, var(--forward-blue) 10%, transparent)" }}>
                {row.production}
              </span>
            </div>
          ))}
        </div>

        {/* Why Should I Care? callout */}
        <div className="mt-8 border-l-2 border-forward-blue pl-4">
          <p className="font-serif text-sm italic leading-relaxed text-text-secondary">
            <span className="font-semibold not-italic text-text-primary">
              Why should I care?
            </span>{" "}
            Production at hundreds of millions of DAU is the ultimate stress test. This isn&apos;t
            a research preview &mdash; it&apos;s infrastructure that ByteDance already depends on.
          </p>
        </div>
      </div>
    </>
  );
}
