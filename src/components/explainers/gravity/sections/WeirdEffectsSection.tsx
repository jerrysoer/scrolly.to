"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

function LightBendingPanel() {
  const [sunPresent, setSunPresent] = useState(true);

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <h3
        className="text-xl font-bold mb-4"
        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
      >
        Light Bending
      </h3>

      <div
        className="rounded-lg overflow-hidden mb-4"
        style={{ backgroundColor: "var(--space-deep)" }}
      >
        <svg
          viewBox="0 0 300 200"
          width="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="100" r="4" fill="#ffffff" />
          <text
            x="40"
            y="85"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            Star
          </text>

          {sunPresent && (
            <>
              <circle cx="150" cy="100" r="30" fill="#fbbf24" opacity={0.3} />
              <circle cx="150" cy="100" r="22" fill="#f59e0b" opacity={0.6} />
              <text
                x="150"
                y="145"
                textAnchor="middle"
                fill="#fbbf24"
                fontSize="9"
                fontFamily="var(--font-mono)"
              >
                Sun
              </text>
            </>
          )}

          {sunPresent ? (
            <>
              <path
                d="M44 100 C80 100 110 55 150 55 C190 55 220 80 270 80"
                stroke="#facc15"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity={0.8}
              />
              <path
                d="M44 100 C80 100 110 145 150 145 C190 145 220 120 270 120"
                stroke="#facc15"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity={0.8}
              />
              <circle cx="270" cy="80" r="3" fill="#ffffff" opacity={0.6} />
              <circle cx="270" cy="120" r="3" fill="#ffffff" opacity={0.6} />
              <text
                x="270"
                y="70"
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="8"
                fontFamily="var(--font-mono)"
              >
                Apparent
              </text>
            </>
          ) : (
            <>
              <line
                x1="44"
                y1="100"
                x2="270"
                y2="80"
                stroke="#facc15"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity={0.6}
              />
              <line
                x1="44"
                y1="100"
                x2="270"
                y2="120"
                stroke="#facc15"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity={0.6}
              />
              <circle cx="270" cy="80" r="3" fill="#ffffff" opacity={0.6} />
              <circle cx="270" cy="120" r="3" fill="#ffffff" opacity={0.6} />
              <text
                x="270"
                y="70"
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="8"
                fontFamily="var(--font-mono)"
              >
                Actual
              </text>
            </>
          )}

          <text x="280" y="103" fontSize="14">
            👁
          </text>
        </svg>
      </div>

      <button
        onClick={() => setSunPresent(!sunPresent)}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer mb-4"
        style={{
          backgroundColor: sunPresent ? "var(--gravity-amber)" : "var(--bg-secondary)",
          color: sunPresent ? "#000000" : "var(--text-primary)",
          border: sunPresent ? "none" : "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {sunPresent ? "Remove Sun" : "Add Sun"}
      </button>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-body)" }}
      >
        Proven during the 1919 solar eclipse — it made Einstein famous overnight.
      </p>
    </div>
  );
}

function GPSClockDriftPanel() {
  const [microseconds, setMicroseconds] = useState(0);
  const [running] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const INCREMENT = 38 / 86.4;

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setMicroseconds((prev) => prev + INCREMENT);
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, INCREMENT]);

  const handleCorrect = useCallback(() => {
    setMicroseconds(0);
  }, []);

  const progress = Math.min(microseconds / 38, 1);

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <h3
        className="text-xl font-bold mb-4"
        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
      >
        GPS Clock Drift
      </h3>

      <div
        className="rounded-lg p-5 text-center mb-4"
        style={{ backgroundColor: "var(--space-deep)" }}
      >
        <p
          className="text-3xl font-bold tabular-nums"
          style={{
            color: "var(--gravity-green)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {microseconds.toFixed(1)} <span className="text-lg">μs drift</span>
        </p>
      </div>

      <div className="mb-4">
        <div
          className="h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress * 100}%`,
              backgroundColor:
                progress < 0.5
                  ? "var(--gravity-green)"
                  : progress < 0.8
                    ? "var(--gravity-amber)"
                    : "#ef4444",
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span
            className="text-xs"
            style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
          >
            0 μs
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
          >
            38 μs / day
          </span>
        </div>
      </div>

      <button
        onClick={handleCorrect}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer mb-4"
        style={{
          backgroundColor: "var(--gravity-green)",
          color: "#000000",
          fontFamily: "var(--font-mono)",
        }}
      >
        Correct
      </button>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-body)" }}
      >
        GPS satellites experience time 38 microseconds faster per day. Without
        correction, navigation would drift 7 miles per day.
      </p>
    </div>
  );
}

export default function WeirdEffectsSection() {
  return (
    <SectionWrapper id="weird-effects">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--gravity-amber)", fontFamily: "var(--font-mono)" }}
        >
          Section 07
        </p>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          Gravity&rsquo;s{" "}
          <span style={{ color: "var(--gravity-amber)" }}>Weirdest</span>{" "}
          Effects
        </h2>

        <p
          className="text-lg"
          style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
        >
          From bending starlight to breaking your GPS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LightBendingPanel />
        <GPSClockDriftPanel />
      </div>
    </SectionWrapper>
  );
}
