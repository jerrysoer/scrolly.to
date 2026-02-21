"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const speeds = [
  { mbps: 1, label: "1 Mbps", era: "Original WiFi (1997)", downloads: "A text document" },
  { mbps: 11, label: "11 Mbps", era: "WiFi 2 (802.11b)", downloads: "A high-res photo" },
  { mbps: 54, label: "54 Mbps", era: "WiFi 3 (802.11g)", downloads: "A 3-minute song" },
  { mbps: 150, label: "150 Mbps", era: "WiFi 4 (802.11n)", downloads: "A 10-minute HD video" },
  { mbps: 433, label: "433 Mbps", era: "WiFi 5 (802.11ac)", downloads: "A 2-hour HD movie" },
  { mbps: 1200, label: "1.2 Gbps", era: "WiFi 6 (802.11ax)", downloads: "A 4K movie in 30 seconds" },
];

export default function DataRateSection() {
  const [speedIdx, setSpeedIdx] = useState(4);
  const current = speeds[speedIdx];

  return (
    <SectionWrapper id="data-rate" layout="centered" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
          Section 07
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Data Rate Evolution
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          WiFi speeds have increased over 1,000x since 1997. Drag the slider to see what
          each generation can download in one second.
        </p>
      </div>

      {/* Speed slider */}
      <div className="mt-8 rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        {/* Speed display */}
        <div className="text-center mb-8">
          <p className="stat-hero">{current.label}</p>
          <p className="mt-2 font-sans text-sm" style={{ color: "var(--text-secondary)" }}>{current.era}</p>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={speeds.length - 1}
          value={speedIdx}
          onChange={(e) => setSpeedIdx(Number(e.target.value))}
          className="w-full"
          aria-label="Select WiFi generation"
        />

        {/* Speed labels */}
        <div className="flex justify-between mt-2">
          <span className="font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>1997</span>
          <span className="font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>Today</span>
        </div>

        {/* Download in 1 second */}
        <div className="mt-8 rounded-lg p-6 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-tertiary)" }}>
            Download in 1 second
          </p>
          <p className="font-serif text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            {current.downloads}
          </p>
        </div>

        {/* Speed bar comparison */}
        <div className="mt-6 space-y-2">
          {speeds.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="w-20 shrink-0 font-mono text-xs text-right" style={{ color: "var(--text-tertiary)" }}>
                {s.label}
              </span>
              <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((s.mbps / speeds[speeds.length - 1].mbps) * 100, 100)}%`,
                    backgroundColor: i === speedIdx ? "var(--accent-blue)" : "var(--border)",
                    opacity: i === speedIdx ? 1 : 0.5,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pull-quote">
        WiFi 6 can hit 9.6 Gbps in theory. In practice, you&rsquo;re sharing with everyone on the network.
      </div>
    </SectionWrapper>
  );
}
