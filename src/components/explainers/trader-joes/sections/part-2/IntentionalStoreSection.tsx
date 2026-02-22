"use client";

import StickyDiagram from "@/components/explainers/trader-joes/shared/StickyDiagram";
import { storeSteps, storeSpecs } from "@/components/explainers/trader-joes/data/part-2";

function StoreFloorPlan({ activeStepIndex }: { activeStepIndex: number }) {
  return (
    <div className="sticky top-24 w-full" style={{ height: "min(500px, 60vh)" }}>
      <svg
        viewBox="0 0 200 160"
        className="w-full rounded-xl"
        style={{ backgroundColor: "var(--bg-secondary)", height: "100%", aspectRatio: "200/160" }}
        aria-label="Floor plan comparing Trader Joe's store size to an average supermarket"
      >
        {/* Supermarket ghost outline — ~50K sqft footprint */}
        <rect
          x="10"
          y="10"
          width="180"
          height="140"
          rx="3"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.5"
          strokeDasharray="3 2"
          opacity="0.4"
        />
        <text
          x="190"
          y="22"
          textAnchor="end"
          style={{
            fontSize: "5px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: "var(--text-tertiary)",
            opacity: 0.5,
          }}
        >
          {storeSpecs.supermarketLabel} (~{(storeSpecs.supermarketSqFt / 1000).toFixed(0)}K sqft)
        </text>

        {/* Trader Joe's store — ~12.5K sqft, roughly 25% of supermarket area */}
        <rect
          x="10"
          y="10"
          width="90"
          height="70"
          rx="2"
          fill={activeStepIndex >= 0 ? "var(--accent-red)" : "var(--border)"}
          fillOpacity={activeStepIndex >= 0 ? 0.1 : 0.05}
          stroke={activeStepIndex >= 0 ? "var(--accent-red)" : "var(--border)"}
          strokeWidth="1"
          style={{ transition: "all 0.7s ease-out" }}
        />
        <text
          x="55"
          y="22"
          textAnchor="middle"
          style={{
            fontSize: "5.5px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: activeStepIndex >= 0 ? "var(--accent-red)" : "var(--text-tertiary)",
            fontWeight: 600,
            transition: "fill 0.7s ease-out",
          }}
        >
          {storeSpecs.tjLabel} (~{(storeSpecs.tjSqFt / 1000).toFixed(1)}K sqft)
        </text>

        {/* --- Interior details inside TJ's outline --- */}

        {/* Produce area — top-left corner */}
        <rect
          x="14"
          y="28"
          width="22"
          height="18"
          rx="1.5"
          fill={activeStepIndex >= 0 ? "var(--accent-green)" : "var(--border)"}
          fillOpacity={activeStepIndex >= 0 ? 0.15 : 0.05}
          stroke={activeStepIndex >= 0 ? "var(--accent-green)" : "var(--border)"}
          strokeWidth="0.5"
          style={{ transition: "all 0.7s ease-out" }}
        />
        <text
          x="25"
          y="39"
          textAnchor="middle"
          style={{
            fontSize: "3.5px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: activeStepIndex >= 0 ? "var(--accent-green)" : "var(--text-tertiary)",
            opacity: activeStepIndex >= 0 ? 0.8 : 0.4,
            transition: "all 0.7s ease-out",
          }}
        >
          PRODUCE
        </text>

        {/* Narrow aisles — three parallel lines */}
        {[0, 1, 2].map((i) => (
          <g key={`aisle-${i}`}>
            <rect
              x={42 + i * 16}
              y="28"
              width="12"
              height="36"
              rx="1"
              fill={activeStepIndex >= 2 ? "var(--accent-navy)" : "var(--border)"}
              fillOpacity={activeStepIndex >= 2 ? 0.08 : 0.03}
              stroke={activeStepIndex >= 2 ? "var(--accent-navy)" : "var(--border)"}
              strokeWidth="0.3"
              style={{ transition: "all 0.7s ease-out" }}
            />
            {/* Shelf lines inside aisle */}
            <line
              x1={44 + i * 16}
              y1="32"
              x2={44 + i * 16}
              y2="60"
              stroke={activeStepIndex >= 2 ? "var(--accent-navy)" : "var(--border)"}
              strokeWidth="0.3"
              opacity={activeStepIndex >= 2 ? 0.4 : 0.2}
              style={{ transition: "all 0.7s ease-out" }}
            />
            <line
              x1={52 + i * 16}
              y1="32"
              x2={52 + i * 16}
              y2="60"
              stroke={activeStepIndex >= 2 ? "var(--accent-navy)" : "var(--border)"}
              strokeWidth="0.3"
              opacity={activeStepIndex >= 2 ? 0.4 : 0.2}
              style={{ transition: "all 0.7s ease-out" }}
            />
          </g>
        ))}
        <text
          x="64"
          y="70"
          textAnchor="middle"
          style={{
            fontSize: "3px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: activeStepIndex >= 2 ? "var(--accent-navy)" : "var(--text-tertiary)",
            opacity: activeStepIndex >= 2 ? 0.7 : 0.3,
            transition: "all 0.7s ease-out",
          }}
        >
          NARROW AISLES
        </text>

        {/* Checkout lanes — bottom-left */}
        {[0, 1, 2].map((i) => (
          <rect
            key={`checkout-${i}`}
            x={16 + i * 10}
            y="54"
            width="7"
            height="4"
            rx="0.5"
            fill={activeStepIndex >= 4 ? "var(--accent-gold)" : "var(--border)"}
            fillOpacity={activeStepIndex >= 4 ? 0.3 : 0.1}
            stroke={activeStepIndex >= 4 ? "var(--accent-gold)" : "var(--border)"}
            strokeWidth="0.3"
            style={{ transition: "all 0.7s ease-out" }}
          />
        ))}
        <text
          x="29"
          y="63"
          textAnchor="middle"
          style={{
            fontSize: "3px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: activeStepIndex >= 4 ? "var(--accent-gold)" : "var(--text-tertiary)",
            opacity: activeStepIndex >= 4 ? 0.7 : 0.3,
            transition: "all 0.7s ease-out",
          }}
        >
          CHECKOUT (no self-checkout)
        </text>

        {/* Nautical decor markers — tiki/bell icons as small symbols */}
        {activeStepIndex >= 1 && (
          <g style={{ transition: "opacity 0.7s ease-out" }}>
            {/* Ship bell near entrance */}
            <circle
              cx="18"
              cy="74"
              r="2"
              fill="var(--accent-gold)"
              fillOpacity="0.2"
              stroke="var(--accent-gold)"
              strokeWidth="0.4"
            />
            <text
              x="24"
              y="75.5"
              style={{
                fontSize: "3px",
                fontFamily: "var(--font-dm-mono), monospace",
                fill: "var(--accent-gold)",
                opacity: 0.7,
              }}
            >
              SHIP BELL
            </text>

            {/* Hand-painted signs marker */}
            <rect
              x="54"
              y="72"
              width="4"
              height="3"
              rx="0.5"
              fill="var(--accent-gold)"
              fillOpacity="0.2"
              stroke="var(--accent-gold)"
              strokeWidth="0.4"
            />
            <text
              x="61"
              y="75"
              style={{
                fontSize: "3px",
                fontFamily: "var(--font-dm-mono), monospace",
                fill: "var(--accent-gold)",
                opacity: 0.7,
              }}
            >
              HAND-PAINTED SIGNS
            </text>

            {/* Cedar plank wall marker */}
            <line
              x1="10"
              y1="28"
              x2="10"
              y2="80"
              stroke="var(--accent-gold)"
              strokeWidth="0.8"
              opacity="0.3"
            />
            <text
              x="8"
              y="55"
              textAnchor="end"
              transform="rotate(-90, 8, 55)"
              style={{
                fontSize: "3px",
                fontFamily: "var(--font-dm-mono), monospace",
                fill: "var(--accent-gold)",
                opacity: 0.6,
              }}
            >
              CEDAR PLANK WALL
            </text>
          </g>
        )}

        {/* Scale comparison annotation */}
        <line
          x1="10"
          y1="95"
          x2="100"
          y2="95"
          stroke="var(--accent-red)"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="10"
          y1="93"
          x2="10"
          y2="97"
          stroke="var(--accent-red)"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="100"
          y1="93"
          x2="100"
          y2="97"
          stroke="var(--accent-red)"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <text
          x="55"
          y="101"
          textAnchor="middle"
          style={{
            fontSize: "3.5px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: "var(--accent-red)",
            opacity: 0.6,
          }}
        >
          TJ&apos;s footprint
        </text>

        <line
          x1="10"
          y1="110"
          x2="190"
          y2="110"
          stroke="var(--border)"
          strokeWidth="0.5"
          strokeDasharray="2 1"
          opacity="0.4"
        />
        <line
          x1="10"
          y1="108"
          x2="10"
          y2="112"
          stroke="var(--border)"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <line
          x1="190"
          y1="108"
          x2="190"
          y2="112"
          stroke="var(--border)"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <text
          x="100"
          y="116"
          textAnchor="middle"
          style={{
            fontSize: "3.5px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: "var(--text-tertiary)",
            opacity: 0.5,
          }}
        >
          Avg supermarket footprint
        </text>

        {/* Ratio callout */}
        <text
          x="100"
          y="135"
          textAnchor="middle"
          style={{
            fontSize: "7px",
            fontFamily: "var(--font-playfair), Georgia, serif",
            fill: "var(--text-primary)",
            fontWeight: 600,
          }}
        >
          4x smaller by design
        </text>
        <text
          x="100"
          y="143"
          textAnchor="middle"
          style={{
            fontSize: "4px",
            fontFamily: "var(--font-dm-mono), monospace",
            fill: "var(--text-tertiary)",
          }}
        >
          Every square foot earns its keep
        </text>
      </svg>
    </div>
  );
}

export default function IntentionalStoreSection() {
  const steps = storeSteps.map((step) => ({
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
        id="intentional-store"
        visualSide="left"
        steps={steps}
        renderVisual={(activeStepIndex) => (
          <StoreFloorPlan activeStepIndex={activeStepIndex} />
        )}
      />
    </>
  );
}
