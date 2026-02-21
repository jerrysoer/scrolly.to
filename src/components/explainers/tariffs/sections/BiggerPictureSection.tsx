"use client";

import { useEffect, useRef, useState } from "react";
import DateStampedChapter from "@/components/explainers/shared/DateStampedChapter";

export default function BiggerPictureSection() {
  const scalesRef = useRef<HTMLDivElement>(null);
  const [scalesVisible, setScalesVisible] = useState(false);

  useEffect(() => {
    const el = scalesRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScalesVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <DateStampedChapter
      id="bigger-picture"
      title="This was never just about tariffs."
    >
      <p className="text-base leading-relaxed text-text-secondary">
        The SCOTUS ruling reaches far beyond trade policy. At its core, this
        case was about the boundaries of executive power — whether a president
        can unilaterally reshape the economy using emergency declarations, or
        whether that power belongs to Congress.
      </p>

      {/* Scales of justice visualization */}
      <div ref={scalesRef} className="mt-8 flex justify-center">
        <div
          className="relative overflow-hidden rounded-xl border px-8 py-6"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-card)",
            width: "100%",
            maxWidth: 560,
          }}
        >
          <svg
            viewBox="0 0 480 320"
            className="w-full"
            aria-label="Scales of justice tilting toward Congressional Authority"
            role="img"
          >
            {/* Center pillar */}
            <line
              x1="240"
              y1="40"
              x2="240"
              y2="280"
              stroke="var(--border)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Base */}
            <rect
              x="200"
              y="270"
              width="80"
              height="12"
              rx="6"
              fill="var(--border)"
            />

            {/* Balance beam — tilts on reveal */}
            <g
              style={{
                transformOrigin: "240px 60px",
                transform: scalesVisible ? "rotate(-12deg)" : "rotate(0deg)",
                transition: "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Beam bar */}
              <line
                x1="80"
                y1="60"
                x2="400"
                y2="60"
                stroke="var(--text-tertiary)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Fulcrum triangle */}
              <polygon
                points="230,45 250,45 240,30"
                fill="var(--text-tertiary)"
              />

              {/* Left pan — Presidential Power (goes up) */}
              <g>
                {/* Chain lines */}
                <line
                  x1="100"
                  y1="60"
                  x2="80"
                  y2="120"
                  stroke="var(--text-tertiary)"
                  strokeWidth="1.5"
                />
                <line
                  x1="100"
                  y1="60"
                  x2="120"
                  y2="120"
                  stroke="var(--text-tertiary)"
                  strokeWidth="1.5"
                />

                {/* Pan */}
                <ellipse
                  cx="100"
                  cy="125"
                  rx="50"
                  ry="10"
                  fill="var(--accent-red)"
                  opacity="0.2"
                  stroke="var(--accent-red)"
                  strokeWidth="1.5"
                />

                {/* Label */}
                <text
                  x="100"
                  y="155"
                  textAnchor="middle"
                  fill="var(--accent-red)"
                  fontSize="11"
                  fontFamily="var(--font-inter), sans-serif"
                  fontWeight="600"
                >
                  Presidential
                </text>
                <text
                  x="100"
                  y="170"
                  textAnchor="middle"
                  fill="var(--accent-red)"
                  fontSize="11"
                  fontFamily="var(--font-inter), sans-serif"
                  fontWeight="600"
                >
                  Power
                </text>
              </g>

              {/* Right pan — Congressional Authority (goes down = heavier) */}
              <g>
                {/* Chain lines */}
                <line
                  x1="380"
                  y1="60"
                  x2="360"
                  y2="120"
                  stroke="var(--text-tertiary)"
                  strokeWidth="1.5"
                />
                <line
                  x1="380"
                  y1="60"
                  x2="400"
                  y2="120"
                  stroke="var(--text-tertiary)"
                  strokeWidth="1.5"
                />

                {/* Pan */}
                <ellipse
                  cx="380"
                  cy="125"
                  rx="50"
                  ry="10"
                  fill="var(--accent-blue)"
                  opacity="0.2"
                  stroke="var(--accent-blue)"
                  strokeWidth="1.5"
                />

                {/* Weight block (to indicate heavier) */}
                <rect
                  x="362"
                  y="100"
                  width="36"
                  height="20"
                  rx="3"
                  fill="var(--accent-blue)"
                  opacity={scalesVisible ? 0.3 : 0}
                  style={{ transition: "opacity 0.8s ease-out 0.6s" }}
                />

                {/* Label */}
                <text
                  x="380"
                  y="155"
                  textAnchor="middle"
                  fill="var(--accent-blue)"
                  fontSize="11"
                  fontFamily="var(--font-inter), sans-serif"
                  fontWeight="600"
                >
                  Congressional
                </text>
                <text
                  x="380"
                  y="170"
                  textAnchor="middle"
                  fill="var(--accent-blue)"
                  fontSize="11"
                  fontFamily="var(--font-inter), sans-serif"
                  fontWeight="600"
                >
                  Authority
                </text>
              </g>
            </g>

            {/* Annotation */}
            <text
              x="240"
              y="240"
              textAnchor="middle"
              fill="var(--text-tertiary)"
              fontSize="10"
              fontFamily="var(--font-jetbrains), monospace"
              fontWeight="500"
              opacity={scalesVisible ? 0.7 : 0}
              style={{ transition: "opacity 0.6s ease-out 1s" }}
            >
              Art. I, Sec. 8: &quot;Congress shall have Power to lay and collect
              Taxes&quot;
            </text>
          </svg>
        </div>
      </div>

      {/* Closing prose */}
      <div className="mt-10 space-y-5">
        <p className="text-base leading-relaxed text-text-secondary">
          For decades, Congress ceded trade authority to the executive branch,
          one emergency declaration at a time. The Supreme Court just drew a
          line. Not all executive trade power is gone — but the most expansive
          interpretation of it is.
        </p>

        <p className="text-base leading-relaxed text-text-secondary">
          The practical effects will unfold over months. Prices may ease as
          IEEPA tariffs unwind. Importers will file refund claims. And the
          administration will look for new legal paths to reimpose the tariffs
          it lost. The trade war isn&apos;t over — it just changed venue.
        </p>

        <p className="text-base leading-relaxed text-text-secondary">
          But the constitutional principle is now settled. The power to tax
          imports belongs to Congress. A president can regulate trade. A
          president can impose sanctions. A president cannot, under IEEPA,
          impose tariffs.
        </p>
      </div>

      {/* Closing line */}
      <div className="mt-12 border-t pt-8" style={{ borderColor: "var(--border)" }}>
        <p className="chapter-heading text-center" style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}>
          Tariffs are taxes. And now, the courts have decided who gets to set
          them.
        </p>
      </div>
    </DateStampedChapter>
  );
}
