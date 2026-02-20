"use client";

import { HeatmapCell } from "@/lib/types";

interface TimeHeatmapProps {
  data: HeatmapCell[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CELL_SIZE = 20;
const GAP = 2;

export default function TimeHeatmap({ data }: TimeHeatmapProps) {
  const maxCount = Math.max(1, ...data.map((d) => d.count));

  function getOpacity(count: number): number {
    if (count === 0) return 0.04;
    return 0.15 + (count / maxCount) * 0.85;
  }

  // Build lookup
  const lookup = new Map<string, number>();
  for (const cell of data) {
    lookup.set(`${cell.day}-${cell.hour}`, cell.count);
  }

  return (
    <div className="p-5 rounded-xl border border-border bg-card-bg">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
        Activity by Time (UTC)
      </h3>
      <div className="overflow-x-auto">
        <svg
          width={50 + 24 * (CELL_SIZE + GAP)}
          height={20 + 7 * (CELL_SIZE + GAP)}
          className="block"
        >
          {/* Hour labels */}
          {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
            <text
              key={h}
              x={50 + h * (CELL_SIZE + GAP) + CELL_SIZE / 2}
              y={12}
              textAnchor="middle"
              className="fill-text-muted"
              style={{ fontSize: "9px" }}
            >
              {h.toString().padStart(2, "0")}
            </text>
          ))}

          {/* Grid */}
          {DAYS.map((day, dayIndex) => (
            <g key={day}>
              <text
                x={42}
                y={20 + dayIndex * (CELL_SIZE + GAP) + CELL_SIZE / 2 + 4}
                textAnchor="end"
                className="fill-text-muted"
                style={{ fontSize: "10px" }}
              >
                {day}
              </text>
              {Array.from({ length: 24 }, (_, hour) => {
                const count = lookup.get(`${dayIndex}-${hour}`) ?? 0;
                return (
                  <rect
                    key={hour}
                    x={50 + hour * (CELL_SIZE + GAP)}
                    y={20 + dayIndex * (CELL_SIZE + GAP)}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    rx={3}
                    fill="var(--accent)"
                    opacity={getOpacity(count)}
                  >
                    <title>
                      {day} {hour.toString().padStart(2, "0")}:00 — {count} view{count !== 1 ? "s" : ""}
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
