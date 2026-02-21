"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const rooms = [
  { name: "Living Room", x: 10, y: 10, w: 40, h: 35 },
  { name: "Kitchen", x: 50, y: 10, w: 40, h: 35 },
  { name: "Bedroom", x: 10, y: 55, w: 30, h: 35 },
  { name: "Office", x: 40, y: 55, w: 25, h: 35 },
  { name: "Bathroom", x: 65, y: 55, w: 25, h: 35 },
];

const specs = {
  "2.4": {
    label: "2.4 GHz",
    range: "150 ft",
    speed: "Up to 600 Mbps",
    wallPen: "Good",
    coverage: [1, 0.85, 0.7, 0.6, 0.5],
    color: "var(--accent-blue)",
    pros: ["Wider coverage", "Better through walls", "More compatible"],
    cons: ["Slower speeds", "More interference", "Only 3 usable channels"],
  },
  "5": {
    label: "5 GHz",
    range: "50 ft",
    speed: "Up to 1,300 Mbps",
    wallPen: "Poor",
    coverage: [1, 0.5, 0.2, 0.15, 0.08],
    color: "var(--accent-amber)",
    pros: ["Much faster", "Less interference", "23+ channels"],
    cons: ["Shorter range", "Blocked by walls", "Fewer old devices support it"],
  },
};

type FreqKey = "2.4" | "5";

export default function FrequencySection() {
  const [freq, setFreq] = useState<FreqKey>("2.4");
  const spec = specs[freq];

  return (
    <SectionWrapper id="frequency" layout="full-bleed" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
          Section 06
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          2.4 GHz vs 5 GHz
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          Your router speaks two languages. 2.4 GHz travels far but talks slow. 5 GHz
          talks fast but can&rsquo;t get through walls. Toggle to see the difference.
        </p>
      </div>

      {/* Toggle */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-lg border p-1" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          {(["2.4", "5"] as FreqKey[]).map((f) => (
            <button
              key={f}
              onClick={() => setFreq(f)}
              className="rounded-md px-6 py-2.5 font-mono text-sm font-semibold transition-all"
              style={{
                backgroundColor: freq === f ? (f === "2.4" ? "var(--accent-blue)" : "var(--accent-amber)") : "transparent",
                color: freq === f ? "white" : "var(--text-tertiary)",
              }}
            >
              {f} GHz
            </button>
          ))}
        </div>
      </div>

      {/* Floor plan */}
      <div className="mt-8 rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        <p className="mb-4 font-mono text-xs uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
          Signal Coverage &mdash; Floor Plan View
        </p>
        <svg viewBox="0 0 100 100" className="w-full max-w-lg mx-auto" aria-label={`${spec.label} coverage through house floor plan`}>
          <title>{spec.label} coverage</title>
          {rooms.map((room, i) => (
            <g key={room.name}>
              <rect
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
                fill={spec.color}
                opacity={spec.coverage[i] * 0.4}
                stroke="var(--border)"
                strokeWidth="0.5"
                rx="1"
                style={{ transition: "opacity 0.5s ease-out" }}
              />
              <text
                x={room.x + room.w / 2}
                y={room.y + room.h / 2 - 3}
                textAnchor="middle"
                fontSize="3.5"
                fill="var(--text-primary)"
                fontFamily="var(--font-inter)"
                fontWeight="600"
              >
                {room.name}
              </text>
              <text
                x={room.x + room.w / 2}
                y={room.y + room.h / 2 + 5}
                textAnchor="middle"
                fontSize="3"
                fill="var(--text-secondary)"
                fontFamily="var(--font-jetbrains)"
              >
                {Math.round(spec.coverage[i] * 100)}%
              </text>
            </g>
          ))}
          <circle cx="30" cy="27" r="3" fill={spec.color} opacity="0.9" />
          <text x="30" y="23" textAnchor="middle" fontSize="2.5" fill={spec.color} fontFamily="var(--font-jetbrains)" fontWeight="bold">
            ROUTER
          </text>
        </svg>
      </div>

      {/* Comparison cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "var(--accent-green)" }}>Pros</p>
          <ul className="space-y-2">
            {spec.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="mt-0.5" style={{ color: "var(--accent-green)" }}>+</span> {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "var(--accent-amber)" }}>Cons</p>
          <ul className="space-y-2">
            {spec.cons.map((con) => (
              <li key={con} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="mt-0.5" style={{ color: "var(--accent-amber)" }}>&minus;</span> {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
