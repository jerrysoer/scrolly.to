"use client";

import { useEffect, useRef, useState } from "react";
import DateStampedChapter from "../shared/DateStampedChapter";
import MetricPanel from "../shared/MetricPanel";
import { countryTariffs, liberationDayMetrics } from "@/lib/explainers/tariffs";

interface RegionBlock {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const regionLayout: Record<string, RegionBlock> = {
  americas: { name: "Americas", x: 40, y: 80, width: 200, height: 240 },
  europe: { name: "Europe", x: 310, y: 60, width: 180, height: 180 },
  asia: { name: "Asia", x: 540, y: 50, width: 260, height: 220 },
  oceania: { name: "Oceania", x: 600, y: 300, width: 140, height: 100 },
};

function getTariffColor(rate: number): string {
  if (rate >= 100) return "var(--accent-red)";
  if (rate >= 40) return "#dc2626";
  if (rate >= 25) return "#ef4444";
  if (rate >= 15) return "#f87171";
  return "#fca5a5";
}

function getTariffOpacity(rate: number): number {
  return Math.min(0.3 + (rate / 145) * 0.7, 1);
}

export default function LiberationDaySection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Position countries within their region blocks
  const getCountryPosition = (
    country: (typeof countryTariffs)[number],
    index: number
  ) => {
    const region = regionLayout[country.region];
    if (!region) return { x: 400, y: 200, w: 80, h: 40 };

    const countriesInRegion = countryTariffs.filter(
      (c) => c.region === country.region
    );
    const idx = countriesInRegion.indexOf(country);
    const cols = Math.ceil(Math.sqrt(countriesInRegion.length));
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    const cellW = region.width / cols;
    const cellH = region.height / Math.ceil(countriesInRegion.length / cols);
    const padding = 4;

    return {
      x: region.x + col * cellW + padding,
      y: region.y + row * cellH + padding,
      w: cellW - padding * 2,
      h: cellH - padding * 2,
    };
  };

  const handlePointerMove = (
    e: React.PointerEvent,
    country: (typeof countryTariffs)[number]
  ) => {
    const svgEl = mapRef.current?.querySelector("svg");
    if (!svgEl) return;
    const rect = svgEl.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10,
    });
    setHoveredCountry(country.name);
  };

  return (
    <DateStampedChapter
      id="liberation-day"
      date="APRIL 2, 2025"
      title="April 2, 2025. The chart that panicked markets."
    >
      <p className="text-base leading-relaxed text-text-secondary">
        The administration called it &ldquo;Liberation Day.&rdquo; In a single
        executive order, tariffs hit nearly every country on Earth. No
        investigation. No Commerce Department review. Just an emergency
        declaration under IEEPA and a chart held up on live television.
      </p>

      <p className="text-base leading-relaxed text-text-secondary">
        China was hit with a cumulative 145% rate. Vietnam: 46%. The EU: 20%.
        Even close allies like Japan (24%) and South Korea (25%) were caught in
        the sweep. A 10% baseline tariff applied to every country not
        individually listed.
      </p>

      {/* World map visualization */}
      <div ref={mapRef} className="relative mt-8">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          IEEPA Tariff Rates by Country
        </p>

        <div className="relative overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          <svg
            viewBox="0 0 840 430"
            className="w-full"
            aria-label="World map showing tariff rates by country"
            role="img"
          >
            {/* Region labels */}
            {Object.entries(regionLayout).map(([key, region]) => (
              <text
                key={key}
                x={region.x + region.width / 2}
                y={region.y - 8}
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="10"
                fontFamily="var(--font-jetbrains), monospace"
                fontWeight="500"
                opacity="0.6"
              >
                {region.name.toUpperCase()}
              </text>
            ))}

            {/* Country blocks */}
            {countryTariffs.map((country, i) => {
              const pos = getCountryPosition(country, i);
              const isHovered = hoveredCountry === country.name;

              return (
                <g
                  key={country.name}
                  onPointerEnter={(e) => handlePointerMove(e, country)}
                  onPointerMove={(e) => handlePointerMove(e, country)}
                  onPointerLeave={() => setHoveredCountry(null)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={pos.w}
                    height={pos.h}
                    rx={4}
                    fill={getTariffColor(country.rate)}
                    opacity={
                      mapVisible ? getTariffOpacity(country.rate) : 0
                    }
                    stroke={isHovered ? "var(--text-primary)" : "transparent"}
                    strokeWidth={isHovered ? 2 : 0}
                    style={{
                      transition: `opacity 0.6s ease-out ${i * 80}ms, stroke 0.15s ease`,
                    }}
                  />
                  <text
                    x={pos.x + pos.w / 2}
                    y={pos.y + pos.h / 2 - 4}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize={pos.w > 60 ? "11" : "9"}
                    fontFamily="var(--font-inter), sans-serif"
                    fontWeight="600"
                    opacity={mapVisible ? 1 : 0}
                    style={{
                      transition: `opacity 0.5s ease-out ${i * 80 + 200}ms`,
                    }}
                  >
                    {country.name}
                  </text>
                  <text
                    x={pos.x + pos.w / 2}
                    y={pos.y + pos.h / 2 + 10}
                    textAnchor="middle"
                    fill="var(--text-secondary)"
                    fontSize={pos.w > 60 ? "10" : "8"}
                    fontFamily="var(--font-jetbrains), monospace"
                    fontWeight="500"
                    opacity={mapVisible ? 0.8 : 0}
                    style={{
                      transition: `opacity 0.5s ease-out ${i * 80 + 300}ms`,
                    }}
                  >
                    {country.rate}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredCountry && (
            <div
              className="pointer-events-none absolute z-10 rounded-lg px-3 py-2 text-sm font-medium shadow-lg"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y,
                transform: "translate(-50%, -100%)",
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <span className="font-semibold">{hoveredCountry}</span>
              <span className="ml-2 font-mono" style={{ color: "var(--accent-red)" }}>
                {countryTariffs.find((c) => c.name === hoveredCountry)?.rate}%
              </span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-4 text-xs text-text-tertiary">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#fca5a5", opacity: 0.6 }} />
            <span>10-20%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#ef4444", opacity: 0.7 }} />
            <span>25-40%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#dc2626", opacity: 0.85 }} />
            <span>40-100%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "var(--accent-red)", opacity: 1 }} />
            <span>100%+</span>
          </div>
        </div>
      </div>

      <MetricPanel metrics={liberationDayMetrics} title="Liberation Day Impact" />
    </DateStampedChapter>
  );
}
