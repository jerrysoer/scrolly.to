"use client";

import { useState, useCallback } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const trackPoints = [
  { x: 0, y: 0.95 },
  { x: 0.08, y: 0.9 },
  { x: 0.15, y: 0.15 },
  { x: 0.22, y: 0.85 },
  { x: 0.32, y: 0.45 },
  { x: 0.42, y: 0.75 },
  { x: 0.52, y: 0.35 },
  { x: 0.62, y: 0.65 },
  { x: 0.72, y: 0.55 },
  { x: 0.82, y: 0.7 },
  { x: 0.92, y: 0.6 },
  { x: 1, y: 0.65 },
];

function interpolateTrack(t: number): number {
  const n = trackPoints.length - 1;
  for (let i = 0; i < n; i++) {
    const p0 = trackPoints[i];
    const p1 = trackPoints[i + 1];
    if (t >= p0.x && t <= p1.x) {
      const localT = (t - p0.x) / (p1.x - p0.x);
      return p0.y + (p1.y - p0.y) * localT;
    }
  }
  return trackPoints[n].y;
}

export default function EnergySection() {
  const [position, setPosition] = useState(0.15);

  const height = interpolateTrack(position);
  const pe = Math.round((1 - height) * 100);
  const ke = Math.round(height * 100);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(parseFloat(e.target.value));
  }, []);

  const svgWidth = 600;
  const svgHeight = 200;
  const padding = 20;

  const pathD = trackPoints
    .map((p, i) => {
      const x = padding + p.x * (svgWidth - 2 * padding);
      const y = padding + p.y * (svgHeight - 2 * padding);
      return `${i === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");

  const carX = padding + position * (svgWidth - 2 * padding);
  const carY = padding + height * (svgHeight - 2 * padding);

  return (
    <SectionWrapper id="energy" layout="centered">
      <div className="space-y-8">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-kinetic">
            Section 02
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            Conservation of Energy
          </h2>
        </div>

        <p className="max-w-2xl font-sans text-lg leading-relaxed text-text-secondary">
          Energy is never created or destroyed &mdash; just transformed. Drag the
          car along the track and watch potential energy trade places with kinetic
          energy.
        </p>

        {/* Interactive track visualization */}
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full"
            aria-label="Interactive energy diagram: drag slider to move car along track"
          >
            {/* Track */}
            <path d={pathD} stroke="var(--text-tertiary)" strokeWidth="2.5" fill="none" />

            {/* Height reference line */}
            <line
              x1={carX}
              y1={carY}
              x2={carX}
              y2={svgHeight - padding}
              stroke="var(--potential)"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.5"
            />

            {/* Car */}
            <rect
              x={carX - 10}
              y={carY - 10}
              width={20}
              height={12}
              rx={3}
              fill="var(--kinetic)"
            />
            <circle cx={carX - 5} cy={carY + 4} r={3} fill="var(--text-tertiary)" />
            <circle cx={carX + 5} cy={carY + 4} r={3} fill="var(--text-tertiary)" />

            {/* Labels */}
            <text x={padding} y={svgHeight - 4} fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-jetbrains)">
              Start
            </text>
            <text x={svgWidth - padding} y={svgHeight - 4} fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-jetbrains)" textAnchor="end">
              End
            </text>
          </svg>

          {/* Slider */}
          <div className="mt-4">
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={position}
              onChange={handleSlider}
              className="w-full accent-kinetic"
              aria-label="Move car along the track"
            />
          </div>

          {/* Energy bars */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 flex justify-between">
                <span className="font-mono text-xs font-medium text-potential">Potential Energy</span>
                <span className="font-mono text-xs font-bold text-potential">{pe}%</span>
              </div>
              <div className="h-6 w-full overflow-hidden rounded-full bg-bg-secondary">
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{
                    width: `${pe}%`,
                    backgroundColor: "var(--potential)",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <span className="font-mono text-xs font-medium text-kinetic">Kinetic Energy</span>
                <span className="font-mono text-xs font-bold text-kinetic">{ke}%</span>
              </div>
              <div className="h-6 w-full overflow-hidden rounded-full bg-bg-secondary">
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{
                    width: `${ke}%`,
                    backgroundColor: "var(--kinetic)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Total energy indicator */}
          <div className="mt-4 text-center">
            <span className="font-mono text-xs text-text-tertiary">
              Total Energy: <strong className="text-text-primary">{pe + ke}%</strong> (always conserved)
            </span>
          </div>
        </div>

        <div className="pull-quote max-w-2xl">
          At the top: all potential, no speed. At the bottom: all speed, no
          height. The total never changes.
        </div>
      </div>
    </SectionWrapper>
  );
}
