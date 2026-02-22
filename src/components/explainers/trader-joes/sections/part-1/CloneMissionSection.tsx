"use client";

import StickyDiagram from "@/components/explainers/trader-joes/shared/StickyDiagram";
import { prontoLocations, cloneMissionSteps } from "@/components/explainers/trader-joes/data/part-1";

function LAMap({ activeStepIndex }: { activeStepIndex: number }) {
  return (
    <div className="sticky top-24 w-full" style={{ height: "min(500px, 60vh)" }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full rounded-xl"
        style={{ backgroundColor: "var(--bg-secondary)", height: "100%", aspectRatio: "1" }}
        aria-label="Stylized map of Los Angeles showing Pronto Market locations"
      >
        {/* Faint road-like texture lines */}
        <line
          x1="10" y1="20" x2="90" y2="25"
          stroke="var(--border)" strokeWidth="0.3" opacity="0.4"
        />
        <line
          x1="15" y1="40" x2="85" y2="45"
          stroke="var(--border)" strokeWidth="0.3" opacity="0.4"
        />
        <line
          x1="20" y1="60" x2="80" y2="58"
          stroke="var(--border)" strokeWidth="0.3" opacity="0.4"
        />
        <line
          x1="5" y1="75" x2="70" y2="78"
          stroke="var(--border)" strokeWidth="0.3" opacity="0.3"
        />
        <line
          x1="35" y1="5" x2="38" y2="90"
          stroke="var(--border)" strokeWidth="0.3" opacity="0.3"
        />
        <line
          x1="55" y1="8" x2="58" y2="85"
          stroke="var(--border)" strokeWidth="0.3" opacity="0.3"
        />
        <line
          x1="75" y1="10" x2="72" y2="80"
          stroke="var(--border)" strokeWidth="0.3" opacity="0.3"
        />

        {/* Simplified LA coastline outline */}
        <path
          d="M 5,65 Q 10,60 18,58 Q 25,55 30,52 Q 38,48 42,50 Q 48,52 55,55 Q 62,58 70,62 Q 78,66 85,70 Q 90,73 95,78"
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* LA label */}
        <text
          x="15"
          y="90"
          style={{
            fontSize: "5px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: "var(--text-tertiary)",
            opacity: 0.5,
          }}
        >
          LOS ANGELES
        </text>

        {/* Pronto Market location dots */}
        {prontoLocations.map((loc, i) => {
          const isActive = activeStepIndex >= i;
          return (
            <g key={loc.name}>
              {/* Pulse ring — only visible when active */}
              {isActive && (
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="3"
                  fill="none"
                  stroke="var(--accent-red)"
                  strokeWidth="0.5"
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Dot */}
              <circle
                cx={loc.x}
                cy={loc.y}
                r="1.8"
                fill={isActive ? "var(--accent-red)" : "var(--border)"}
                style={{
                  transition: "fill 0.7s ease-out",
                }}
              />

              {/* Label */}
              <text
                x={loc.x}
                y={loc.y - 4.5}
                textAnchor="middle"
                style={{
                  fontSize: "3.5px",
                  fontFamily: "var(--font-dm-mono), monospace",
                  fill: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                  opacity: isActive ? 1 : 0.4,
                  transition: "fill 0.7s ease-out, opacity 0.7s ease-out",
                }}
              >
                {loc.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function CloneMissionSection() {
  const steps = cloneMissionSteps.map((step) => ({
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
        <span className="number">04</span>
      </div>

      <StickyDiagram
        id="clone-mission"
        visualSide="right"
        steps={steps}
        renderVisual={(activeStepIndex) => (
          <LAMap activeStepIndex={activeStepIndex} />
        )}
      />
    </>
  );
}
