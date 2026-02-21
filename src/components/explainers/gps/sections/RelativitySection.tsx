"use client";

import { useState, useEffect, useRef } from "react";
import { Atom } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function RelativitySection() {
  const [correctionOn, setCorrectionOn] = useState(true);
  const [daysElapsed, setDaysElapsed] = useState(0);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const DRIFT_RATE_KM_PER_DAY = 10;
  const totalDriftKm = correctionOn ? 0 : daysElapsed * DRIFT_RATE_KM_PER_DAY;

  useEffect(() => {
    if (correctionOn) {
      setDaysElapsed(0);
      cancelAnimationFrame(animRef.current);
      return;
    }

    startRef.current = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startRef.current) / 1000;
      setDaysElapsed(Math.min(elapsed, 30));
      if (elapsed < 30) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [correctionOn]);

  return (
    <SectionWrapper id="relativity">
      <div className="text-center mb-12">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{
            color: "var(--accent-purple)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Section 5
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Einstein&apos;s Correction:{" "}
          <span style={{ color: "var(--accent-purple)" }}>
            Relativity in Your Pocket
          </span>
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          GPS is one of the only everyday technologies that requires
          corrections from both special and general relativity. Without
          Einstein, your GPS would be useless within hours.
        </p>
      </div>

      {/* Two effects */}
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(74,144,217,0.15)" }}
            >
              <span
                style={{ color: "var(--forward-blue)", fontSize: "18px" }}
              >
                v
              </span>
            </div>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Special Relativity
            </h3>
          </div>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Satellites orbit at 14,000 km/h. At this speed, their clocks tick{" "}
            <strong>slightly slower</strong> than clocks on Earth (time
            dilation).
          </p>
          <div
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <p
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "var(--forward-blue)",
              }}
            >
              -7 &mu;s/day
            </p>
            <p
              className="text-xs mt-1"
              style={{
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Satellite clocks run slower
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(124,92,191,0.15)" }}
            >
              <Atom
                size={18}
                style={{ color: "var(--accent-purple)" }}
              />
            </div>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              General Relativity
            </h3>
          </div>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-inter)",
            }}
          >
            At 20,200 km altitude, gravity is weaker. Clocks in weaker gravity
            tick <strong>faster</strong> (gravitational time dilation).
          </p>
          <div
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <p
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "var(--accent-purple)",
              }}
            >
              +45 &mu;s/day
            </p>
            <p
              className="text-xs mt-1"
              style={{
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Satellite clocks run faster
            </p>
          </div>
        </div>
      </div>

      {/* Net effect */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-10 text-center"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <h3
          className="text-xl font-bold mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Net Effect
        </h3>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div
            className="px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(74,144,217,0.1)",
              fontFamily: "var(--font-jetbrains)",
              color: "var(--forward-blue)",
            }}
          >
            -7 &mu;s
          </div>
          <span
            className="text-xl font-bold"
            style={{ color: "var(--text-tertiary)" }}
          >
            +
          </span>
          <div
            className="px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(124,92,191,0.1)",
              fontFamily: "var(--font-jetbrains)",
              color: "var(--accent-purple)",
            }}
          >
            +45 &mu;s
          </div>
          <span
            className="text-xl font-bold"
            style={{ color: "var(--text-tertiary)" }}
          >
            =
          </span>
          <div
            className="px-5 py-2.5 rounded-full font-bold"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              fontFamily: "var(--font-jetbrains)",
              color: "var(--accent-amber)",
              fontSize: "18px",
            }}
          >
            +38 &mu;s/day
          </div>
        </div>
        <p
          className="mt-4 text-sm"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Without correction, satellite clocks gain 38 microseconds per day
          relative to ground clocks. That&apos;s ~11.4 km of accumulated error
          per day.
        </p>
      </div>

      {/* Toggle simulation */}
      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <h3
          className="text-xl font-bold mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          What Happens Without Relativity Corrections?
        </h3>
        <p
          className="text-sm mb-6"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Toggle the corrections off and watch your position drift. Each
          second represents one day.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span
            className="text-sm font-medium"
            style={{
              color: correctionOn
                ? "var(--correct-green)"
                : "var(--text-tertiary)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Corrections ON
          </span>
          <button
            onClick={() => setCorrectionOn(!correctionOn)}
            className="relative w-14 h-7 rounded-full transition-all duration-300"
            style={{
              backgroundColor: correctionOn
                ? "var(--correct-green)"
                : "var(--backward-orange)",
            }}
            aria-label="Toggle relativity corrections"
          >
            <div
              className="absolute top-0.5 w-6 h-6 rounded-full bg-white transition-all duration-300"
              style={{ left: correctionOn ? "30px" : "2px" }}
            />
          </button>
          <span
            className="text-sm font-medium"
            style={{
              color: !correctionOn
                ? "var(--backward-orange)"
                : "var(--text-tertiary)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Corrections OFF
          </span>
        </div>

        {/* Map drift visualization */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            backgroundColor: "#0a0f1a",
            height: "280px",
          }}
        >
          <svg
            viewBox="0 0 400 280"
            className="w-full h-full"
            style={{ position: "absolute", inset: 0 }}
          >
            {/* Grid */}
            {Array.from({ length: 9 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * 35}
                x2={400}
                y2={i * 35}
                stroke="rgba(74,144,217,0.08)"
                strokeWidth={1}
              />
            ))}
            {Array.from({ length: 12 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 36}
                y1={0}
                x2={i * 36}
                y2={280}
                stroke="rgba(74,144,217,0.08)"
                strokeWidth={1}
              />
            ))}

            {/* Actual position */}
            <circle cx={200} cy={140} r={6} fill="#4CAF50" />
            <circle
              cx={200}
              cy={140}
              r={12}
              fill="none"
              stroke="#4CAF50"
              strokeWidth={1}
              opacity={0.3}
            />

            {/* Drifted position */}
            {!correctionOn && daysElapsed > 0 && (
              <>
                <circle
                  cx={200}
                  cy={140}
                  r={Math.min(120, totalDriftKm * 1.2)}
                  fill="none"
                  stroke="#E8734A"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  opacity={0.6}
                />
                <circle
                  cx={
                    200 +
                    Math.sin(daysElapsed * 0.3) *
                      Math.min(100, totalDriftKm)
                  }
                  cy={
                    140 +
                    Math.cos(daysElapsed * 0.5) *
                      Math.min(80, totalDriftKm * 0.8)
                  }
                  r={5}
                  fill="#E8734A"
                />
                {Array.from(
                  { length: Math.min(10, Math.floor(daysElapsed)) },
                  (_, i) => {
                    const d = i + 1;
                    const drift = d * DRIFT_RATE_KM_PER_DAY;
                    return (
                      <circle
                        key={`trail-${i}`}
                        cx={
                          200 +
                          Math.sin(d * 0.3) * Math.min(100, drift)
                        }
                        cy={
                          140 +
                          Math.cos(d * 0.5) *
                            Math.min(80, drift * 0.8)
                        }
                        r={2}
                        fill="#E8734A"
                        opacity={0.3}
                      />
                    );
                  }
                )}
              </>
            )}

            {/* Labels */}
            <text
              x={200}
              y={170}
              textAnchor="middle"
              fill="#4CAF50"
              fontSize={11}
              fontFamily="var(--font-inter)"
            >
              Actual
            </text>
            {!correctionOn && daysElapsed > 2 && (
              <text
                x={
                  200 +
                  Math.sin(daysElapsed * 0.3) *
                    Math.min(100, totalDriftKm)
                }
                y={
                  140 +
                  Math.cos(daysElapsed * 0.5) *
                    Math.min(80, totalDriftKm * 0.8) +
                  18
                }
                textAnchor="middle"
                fill="#E8734A"
                fontSize={10}
                fontFamily="var(--font-inter)"
              >
                GPS says
              </text>
            )}
          </svg>

          {/* Stats overlay */}
          <div
            className="absolute bottom-3 left-3 right-3 flex justify-between items-end"
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "12px",
            }}
          >
            <div>
              <p style={{ color: "#6A6A62" }}>Day</p>
              <p
                style={{
                  color: "#E8E8E3",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                {daysElapsed.toFixed(0)}
              </p>
            </div>
            <div className="text-right">
              <p style={{ color: "#6A6A62" }}>Position Drift</p>
              <p
                style={{
                  color: totalDriftKm > 0 ? "#E8734A" : "#4CAF50",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                {totalDriftKm >= 1
                  ? `${totalDriftKm.toFixed(1)} km`
                  : `${(totalDriftKm * 1000).toFixed(0)} m`}
              </p>
            </div>
          </div>
        </div>

        {correctionOn && (
          <p
            className="text-center text-sm mt-4"
            style={{
              color: "var(--correct-green)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Relativity corrections active. Position is accurate.
          </p>
        )}
        {!correctionOn && daysElapsed > 5 && (
          <p
            className="text-center text-sm mt-4"
            style={{
              color: "var(--backward-orange)",
              fontFamily: "var(--font-inter)",
            }}
          >
            After just {daysElapsed.toFixed(0)} days, your GPS would think
            you&apos;re {totalDriftKm.toFixed(1)} km from where you actually
            are.
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}
