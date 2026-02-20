"use client";

import { HeatmapCell } from "@/lib/types";

interface TimeHeatmapProps {
  data: HeatmapCell[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CELL = 18;
const GAP = 3;

export default function TimeHeatmap({ data }: TimeHeatmapProps) {
  const maxCount = Math.max(1, ...data.map((d) => d.count));

  function getOpacity(count: number): number {
    if (count === 0) return 0.04;
    return 0.12 + (count / maxCount) * 0.88;
  }

  const lookup = new Map<string, number>();
  for (const cell of data) {
    lookup.set(`${cell.day}-${cell.hour}`, cell.count);
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Activity by Time (UTC)
      </h3>
      <div className="overflow-x-auto">
        <svg
          width={44 + 24 * (CELL + GAP)}
          height={16 + 7 * (CELL + GAP)}
          className="block"
        >
          {/* Hour labels */}
          {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
            <text
              key={h}
              x={44 + h * (CELL + GAP) + CELL / 2}
              y={10}
              textAnchor="middle"
              className="fill-text-muted"
              style={{ fontSize: "8px", fontFamily: "var(--font-mono)" }}
            >
              {h.toString().padStart(2, "0")}
            </text>
          ))}

          {/* Grid */}
          {DAYS.map((day, dayIndex) => (
            <g key={day}>
              <text
                x={36}
                y={16 + dayIndex * (CELL + GAP) + CELL / 2 + 3}
                textAnchor="end"
                className="fill-text-muted"
                style={{ fontSize: "9px", fontFamily: "var(--font-mono)" }}
              >
                {day}
              </text>
              {Array.from({ length: 24 }, (_, hour) => {
                const count = lookup.get(`${dayIndex}-${hour}`) ?? 0;
                return (
                  <rect
                    key={hour}
                    x={44 + hour * (CELL + GAP)}
                    y={16 + dayIndex * (CELL + GAP)}
                    width={CELL}
                    height={CELL}
                    rx={4}
                    fill="var(--accent)"
                    opacity={getOpacity(count)}
                    className="transition-opacity duration-200 hover:opacity-100"
                  >
                    <title>
                      {day} {hour.toString().padStart(2, "0")}:00 — {count} view
                      {count !== 1 ? "s" : ""}
                    </title>
                  </rect>
                );
              })}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
