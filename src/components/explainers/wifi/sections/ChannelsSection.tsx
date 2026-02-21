"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const channels = Array.from({ length: 11 }, (_, i) => ({
  number: i + 1,
  centerFreq: 2412 + i * 5,
}));

const nonOverlapping = [1, 6, 11];

export default function ChannelsSection() {
  const [showBestPractice, setShowBestPractice] = useState(false);
  const [hoveredChannel, setHoveredChannel] = useState<number | null>(null);

  return (
    <SectionWrapper id="channels" layout="split-right">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
          Section 05
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Channels &amp; Interference
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          The 2.4 GHz band is divided into 11 channels &mdash; but they overlap.
          When your neighbor&rsquo;s router uses the same channel, signals collide and
          speeds drop. The fix? Use channels 1, 6, or 11 &mdash; the only ones that
          don&rsquo;t overlap.
        </p>

        <div className="mt-6 pull-quote">
          When your neighbor&rsquo;s router uses the same channel, signals collide.
        </div>

        {/* Channel visualization */}
        <div className="mt-8 rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
              2.4 GHz Band &mdash; 11 Channels
            </p>
            <button
              onClick={() => setShowBestPractice(!showBestPractice)}
              className="rounded-lg px-3 py-1.5 font-mono text-xs transition-all"
              style={{
                backgroundColor: showBestPractice ? "rgba(34, 197, 94, 0.15)" : "var(--bg-secondary)",
                color: showBestPractice ? "var(--accent-green)" : "var(--text-tertiary)",
              }}
            >
              {showBestPractice ? "Best Practice" : "Show Best Practice"}
            </button>
          </div>

          {/* Channel bars */}
          <div className="relative">
            <svg viewBox="0 0 440 120" className="w-full" aria-label="WiFi channel overlap visualization">
              <title>WiFi channel overlap</title>
              {channels.map((ch) => {
                const x = 20 + (ch.number - 1) * 40;
                const isNonOverlap = nonOverlapping.includes(ch.number);
                const isHighlighted = showBestPractice ? isNonOverlap : true;
                const isHovered = hoveredChannel === ch.number;

                return (
                  <g key={ch.number}>
                    <ellipse
                      cx={x}
                      cy={60}
                      rx={40}
                      ry={30}
                      fill={isNonOverlap ? "var(--accent-blue)" : "var(--accent-amber)"}
                      opacity={isHighlighted ? (isHovered ? 0.3 : 0.12) : 0.04}
                      style={{ transition: "opacity 0.2s" }}
                    />
                    <circle
                      cx={x}
                      cy={60}
                      r={isHovered ? 6 : 4}
                      fill={isNonOverlap ? "var(--accent-blue)" : "var(--accent-amber)"}
                      opacity={isHighlighted ? 1 : 0.3}
                      style={{ transition: "all 0.2s", cursor: "pointer" }}
                      onMouseEnter={() => setHoveredChannel(ch.number)}
                      onMouseLeave={() => setHoveredChannel(null)}
                    />
                    <text
                      x={x}
                      y={100}
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="var(--font-jetbrains)"
                      fill={isNonOverlap ? "var(--accent-blue)" : "var(--text-tertiary)"}
                      fontWeight={isNonOverlap ? "bold" : "normal"}
                      opacity={isHighlighted ? 1 : 0.4}
                    >
                      {ch.number}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {hoveredChannel && (
            <p className="mt-2 text-center font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
              Channel {hoveredChannel} &mdash; {channels[hoveredChannel - 1].centerFreq} MHz
              {nonOverlapping.includes(hoveredChannel) && (
                <span className="ml-2" style={{ color: "var(--accent-green)" }}>Non-overlapping</span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Key takeaway card */}
      <div className="flex flex-col justify-center gap-4">
        <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "var(--text-tertiary)" }}>Key Rule</p>
          <p className="font-serif text-xl font-bold" style={{ color: "var(--text-primary)" }}>Use channels 1, 6, or 11</p>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            These are the only three non-overlapping channels in the 2.4 GHz band.
            Any other channel will overlap with its neighbors, causing interference.
          </p>
        </div>
        <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "var(--text-tertiary)" }}>5 GHz Advantage</p>
          <p className="font-serif text-xl font-bold" style={{ color: "var(--text-primary)" }}>23+ non-overlapping channels</p>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            The 5 GHz band has far more room. Less congestion means faster speeds
            &mdash; if you&rsquo;re close enough to the router.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
