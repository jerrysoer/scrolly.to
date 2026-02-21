"use client";

import StickyDiagram from "@/components/explainers/trader-joes/shared/StickyDiagram";
import {
  treasureHuntSteps,
  funnelStages,
  tastingRoomInsight,
} from "@/components/explainers/trader-joes/data/part-3";

function ProductFunnel({ activeStepIndex }: { activeStepIndex: number }) {
  // Data for funnel visualization with rejection stats
  const stages = [
    { label: "10,000+", sublabel: "candidates", percent: 100, survival: "100%" },
    { label: "4,000", sublabel: "survive tasting", percent: 40, survival: "40%", rejected: "-60%" },
    { label: "2,000", sublabel: "pass margin", percent: 20, survival: "20%", rejected: "-50%" },
    { label: "800", sublabel: "fit shelf", percent: 8, survival: "8%", rejected: "-60%" },
    { label: "~200", sublabel: "make it", percent: 2, survival: "2%", rejected: "-75%" },
  ];

  return (
    <div className="sticky top-24 px-4">
      <style jsx>{`
        @keyframes pulseGold {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.015); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .funnel-stage-active {
          animation: pulseGold 3s ease-in-out infinite;
        }
        .funnel-stage-enter {
          animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div
        className="relative overflow-hidden rounded-2xl p-10 shadow-2xl"
        style={{
          background: "linear-gradient(165deg, #faf8f4 0%, #f5f1e8 50%, #faf8f4 100%)",
          border: "2px solid rgba(184, 134, 11, 0.12)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Decorative background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(184, 134, 11, 0.5) 10px, rgba(184, 134, 11, 0.5) 11px)`,
          }}
        />

        {/* Title with dramatic styling */}
        <div className="relative mb-8 text-center">
          <div
            className="inline-block rounded-full px-6 py-2"
            style={{
              background: "linear-gradient(135deg, rgba(184, 134, 11, 0.15), rgba(184, 134, 11, 0.08))",
              border: "2px solid rgba(184, 134, 11, 0.25)",
              boxShadow: "0 4px 12px rgba(184, 134, 11, 0.1)",
            }}
          >
            <h3
              className="text-base font-black uppercase tracking-[0.25em]"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                background: "linear-gradient(135deg, #B8860B 0%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The Product Gauntlet
            </h3>
          </div>

          {/* Rejection stat callout */}
          <div className="mt-4 text-center">
            <div
              className="inline-block text-3xl font-bold"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "#B8860B",
              }}
            >
              98%
            </div>
            <div
              className="mt-1 text-xs font-semibold uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "rgba(184, 134, 11, 0.7)",
              }}
            >
              Rejection Rate
            </div>
          </div>
        </div>

        {/* Funnel stages - clean and readable */}
        <div className="relative space-y-2.5">
          {stages.map((stage, i) => {
            const isActive = activeStepIndex >= i;
            const widthPercent = stage.percent;

            return (
              <div key={i} className="relative funnel-stage-enter">
                {/* Stage bar - simplified layout */}
                <div
                  className={`relative mx-auto rounded-xl transition-all duration-500 ${
                    isActive ? "funnel-stage-active" : ""
                  }`}
                  style={{
                    width: `${widthPercent}%`,
                    minWidth: "160px",
                    padding: "14px 20px",
                    background: isActive
                      ? "linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)"
                      : "linear-gradient(135deg, rgba(184, 134, 11, 0.15) 0%, rgba(184, 134, 11, 0.08) 100%)",
                    border: isActive
                      ? "2.5px solid rgba(184, 134, 11, 0.6)"
                      : "2px solid rgba(184, 134, 11, 0.2)",
                    boxShadow: isActive
                      ? "0 6px 20px rgba(184, 134, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                      : "0 2px 6px rgba(184, 134, 11, 0.08)",
                  }}
                >
                  {/* Clean two-column layout */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: Main number + label */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-black leading-none"
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: i === 0 ? "1.5rem" : "1.25rem",
                          color: isActive ? "#FFFFFF" : "#B8860B",
                          textShadow: isActive ? "0 1px 3px rgba(0, 0, 0, 0.2)" : "none",
                        }}
                      >
                        {stage.label}
                      </div>
                      <div
                        className="mt-1 text-xs font-semibold uppercase tracking-wide"
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          color: isActive ? "rgba(255, 255, 255, 0.85)" : "rgba(184, 134, 11, 0.75)",
                          fontSize: "0.65rem",
                        }}
                      >
                        {stage.sublabel}
                      </div>
                    </div>

                    {/* Right: Survival rate */}
                    <div
                      className="rounded-lg px-3 py-1.5 text-center font-black"
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "0.875rem",
                        background: isActive
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(255, 255, 255, 0.5)",
                        color: isActive ? "#FFFFFF" : "#B8860B",
                        border: isActive
                          ? "2px solid rgba(255, 255, 255, 0.3)"
                          : "1.5px solid rgba(184, 134, 11, 0.25)",
                        minWidth: "60px",
                      }}
                    >
                      {stage.survival}
                    </div>
                  </div>

                  {/* Rejection percentage (inline, below main content) */}
                  {stage.rejected && isActive && (
                    <div
                      className="mt-2 pt-2 text-center text-xs font-bold"
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        color: "#DC2626",
                        borderTop: "1px solid rgba(220, 38, 38, 0.2)",
                      }}
                    >
                      {stage.rejected} eliminated
                    </div>
                  )}
                </div>

                {/* Simple arrow connector */}
                {i < stages.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg width="24" height="14" className="transition-opacity duration-500">
                      <polygon
                        points="12,12 8,6 16,6"
                        fill={activeStepIndex > i ? "#B8860B" : "rgba(184, 134, 11, 0.3)"}
                        opacity={activeStepIndex > i ? "0.8" : "0.5"}
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom tagline with emphasis */}
        <div className="relative mt-8">
          <div
            className="rounded-2xl border-2 py-3 text-center"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              borderColor: "rgba(184, 134, 11, 0.25)",
              background: "linear-gradient(135deg, rgba(184, 134, 11, 0.05), rgba(184, 134, 11, 0.08))",
              boxShadow: "0 4px 12px rgba(184, 134, 11, 0.08)",
            }}
          >
            <div
              className="text-sm font-black uppercase tracking-[0.2em]"
              style={{
                background: "linear-gradient(135deg, #B8860B 0%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One in, one out — always
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function TreasureHuntSection() {
  const steps = treasureHuntSteps.map((step) => ({
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
        <span className="number">02</span>
      </div>

      <StickyDiagram
        id="treasure-hunt"
        visualSide="left"
        steps={steps}
        renderVisual={(activeStepIndex) => (
          <ProductFunnel activeStepIndex={activeStepIndex} />
        )}
      />

      {/* Intel callout — Tasting Room insight */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div
          className="rounded-xl border-l-4 p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--accent-gold)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--accent-gold)",
            }}
          >
            {tastingRoomInsight.title}
          </p>
          <p
            className="mt-2 text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {tastingRoomInsight.description}
          </p>
        </div>
      </div>
    </>
  );
}
