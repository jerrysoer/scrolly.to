"use client";

import { useEffect, useRef, useState } from "react";
import DateStampedChapter from "@/components/explainers/shared/DateStampedChapter";
import { justices } from "@/lib/explainers/tariffs";

export default function SCOTUSSection() {
  const benchRef = useRef<HTMLDivElement>(null);
  const [benchVisible, setBenchVisible] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  const sorted = [...justices].sort((a, b) => a.position - b.position);
  const majorityJustices = sorted.filter((j) => j.vote === "majority");
  const dissentJustices = sorted.filter((j) => j.vote === "dissent");
  const allInOrder = [...majorityJustices, ...dissentJustices];

  useEffect(() => {
    const el = benchRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBenchVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!benchVisible) return;

    const total = allInOrder.length;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealedCount(count);
      if (count >= total) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, [benchVisible, allInOrder.length]);

  // Arc positions for 9 justices (bench layout)
  const getArcPosition = (index: number, total: number) => {
    const centerX = 420;
    const centerY = 320;
    const radiusX = 300;
    const radiusY = 120;
    // Spread justices across an arc from ~150deg to ~30deg
    const startAngle = (150 * Math.PI) / 180;
    const endAngle = (30 * Math.PI) / 180;
    const angle = startAngle + (endAngle - startAngle) * (index / (total - 1));
    return {
      x: centerX + radiusX * Math.cos(angle),
      y: centerY - radiusY * Math.sin(angle),
    };
  };

  return (
    <DateStampedChapter
      id="scotus"
      date="FEBRUARY 20, 2026"
      title='6 to 3. IEEPA "cannot bear such weight."'
    >
      <p className="text-base leading-relaxed text-text-secondary">
        The case moved fast. After lower courts split on the question, the
        Supreme Court granted certiorari and heard oral arguments in January
        2026. On February 20, the Court issued its ruling: IEEPA does not
        authorize tariffs. Six justices in the majority. Three in dissent.
      </p>

      {/* Court bench visualization */}
      <div ref={benchRef} className="mt-8">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          Supreme Court Vote
        </p>

        <div
          className="relative overflow-hidden rounded-xl border"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <svg
            viewBox="0 0 840 400"
            className="w-full"
            aria-label="Supreme Court bench showing 6-3 vote"
            role="img"
          >
            {/* Bench platform */}
            <path
              d="M100,330 Q420,250 740,330"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
              opacity="0.4"
            />

            {/* Justice seats */}
            {sorted.map((justice, i) => {
              const pos = getArcPosition(i, sorted.length);
              const orderInReveal = allInOrder.indexOf(justice);
              const isRevealed = orderInReveal < revealedCount;
              const isChief = justice.name === "Roberts";
              const radius = isChief ? 32 : 26;
              const fillColor =
                justice.vote === "majority"
                  ? "var(--accent-blue)"
                  : "var(--accent-red)";

              return (
                <g key={justice.name}>
                  {/* Outer ring for Chief */}
                  {isChief && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={radius + 5}
                      fill="none"
                      stroke={isRevealed ? fillColor : "var(--border)"}
                      strokeWidth="1.5"
                      opacity={isRevealed ? 0.4 : 0.15}
                      style={{
                        transition: "stroke 0.4s ease, opacity 0.4s ease",
                      }}
                    />
                  )}

                  {/* Seat circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={radius}
                    fill={isRevealed ? fillColor : "var(--bg-secondary)"}
                    stroke={isRevealed ? fillColor : "var(--border)"}
                    strokeWidth="2"
                    opacity={isRevealed ? 1 : 0.4}
                    style={{
                      transition:
                        "fill 0.5s ease, stroke 0.5s ease, opacity 0.5s ease",
                    }}
                  />

                  {/* Vote label inside circle */}
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize={isChief ? "12" : "11"}
                    fontFamily="var(--font-jetbrains), monospace"
                    fontWeight="700"
                    opacity={isRevealed ? 1 : 0}
                    style={{ transition: "opacity 0.4s ease" }}
                  >
                    {justice.vote === "majority" ? "M" : "D"}
                  </text>

                  {/* Name label */}
                  <text
                    x={pos.x}
                    y={pos.y + radius + 18}
                    textAnchor="middle"
                    fill="var(--text-secondary)"
                    fontSize="11"
                    fontFamily="var(--font-inter), sans-serif"
                    fontWeight={isChief ? "700" : "500"}
                    opacity={isRevealed ? 1 : 0.3}
                    style={{ transition: "opacity 0.4s ease" }}
                  >
                    {isChief ? "CJ Roberts" : justice.name}
                  </text>
                </g>
              );
            })}

            {/* Legend */}
            <g>
              <circle cx="310" cy="20" r="8" fill="var(--accent-blue)" />
              <text
                x="324"
                y="24"
                fill="var(--text-tertiary)"
                fontSize="11"
                fontFamily="var(--font-inter), sans-serif"
              >
                Majority (6)
              </text>
              <circle cx="440" cy="20" r="8" fill="var(--accent-red)" />
              <text
                x="454"
                y="24"
                fill="var(--text-tertiary)"
                fontSize="11"
                fontFamily="var(--font-inter), sans-serif"
              >
                Dissent (3)
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Roberts quote */}
      <div className="quote-callout mt-8">
        <p className="text-lg font-medium italic leading-relaxed text-text-primary">
          &ldquo;IEEPA&apos;s grant of authority to &lsquo;regulate
          importation&rsquo; falls short. IEEPA contains no reference to tariffs
          or duties.&rdquo;
        </p>
        <p className="mt-2 font-mono text-xs font-medium text-text-tertiary">
          — Chief Justice John Roberts, majority opinion
        </p>
      </div>

      {/* Intel callout */}
      <div className="intel-callout mt-6">
        <p className="callout-label">Intel</p>
        <p>
          No president had ever used IEEPA to impose tariffs before Trump. The
          law was designed for sanctions and asset freezes — tools that restrict
          transactions, not impose new taxes at the border.
        </p>
      </div>
    </DateStampedChapter>
  );
}
