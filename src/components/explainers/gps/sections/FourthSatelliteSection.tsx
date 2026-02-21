"use client";

import { useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function FourthSatelliteSection() {
  const [clockErrorUs, setClockErrorUs] = useState(1.0);

  const positionErrorM = clockErrorUs * 299.792;

  return (
    <SectionWrapper id="fourth-satellite">
      <div className="text-center mb-12">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{
            color: "var(--backward-orange)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Section 4
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          The Fourth Satellite{" "}
          <span style={{ color: "var(--backward-orange)" }}>Problem</span>
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Your phone&apos;s clock is off by microseconds. At light speed, that
          tiny error becomes hundreds of meters. The fourth satellite is the
          fix.
        </p>
      </div>

      {/* Key insight */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-8"
        style={{
          backgroundColor: "rgba(232,115,74,0.08)",
          border: "1px solid rgba(232,115,74,0.2)",
        }}
      >
        <div className="flex items-start gap-4">
          <AlertTriangle
            size={24}
            style={{
              color: "var(--backward-orange)",
              flexShrink: 0,
              marginTop: 2,
            }}
          />
          <div>
            <h3
              className="text-lg font-bold mb-2"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              The Problem with Cheap Clocks
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Each GPS satellite carries a $50,000+ atomic clock. Your phone
              has a $0.50 quartz crystal oscillator. The satellite clock drifts
              by about 1 nanosecond per day. Your phone? It drifts by{" "}
              <strong>microseconds</strong> — a thousand times worse. And at
              the speed of light, every microsecond of clock error translates
              to 300 meters of position error.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive slider */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-8"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <h3
          className="text-xl font-bold mb-6"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Clock Error &rarr; Position Drift
        </h3>

        {/* Visual representation */}
        <div
          className="relative rounded-xl p-6 mb-8 overflow-hidden"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            <div className="text-center">
              <div className="relative inline-block">
                <div
                  className="w-4 h-4 rounded-full mx-auto"
                  style={{ backgroundColor: "var(--correct-green)" }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300"
                  style={{
                    width: `${Math.min(200, positionErrorM / 3)}px`,
                    height: `${Math.min(200, positionErrorM / 3)}px`,
                    borderColor: "var(--backward-orange)",
                    opacity: 0.4,
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300"
                  style={{
                    width: `${Math.min(240, positionErrorM / 2.5)}px`,
                    height: `${Math.min(240, positionErrorM / 2.5)}px`,
                    borderColor: "var(--backward-orange)",
                    opacity: 0.2,
                  }}
                />
              </div>
              <p
                className="mt-16 text-xs"
                style={{
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Actual position (green) vs error zone (orange)
              </p>
            </div>
          </div>

          <div className="absolute top-3 right-3">
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor:
                  positionErrorM > 1000
                    ? "rgba(232,115,74,0.2)"
                    : positionErrorM > 300
                      ? "rgba(245,166,35,0.2)"
                      : "rgba(76,175,80,0.2)",
                color:
                  positionErrorM > 1000
                    ? "var(--backward-orange)"
                    : positionErrorM > 300
                      ? "var(--accent-amber)"
                      : "var(--correct-green)",
                fontFamily: "var(--font-jetbrains)",
              }}
            >
              &plusmn;{positionErrorM.toFixed(0)}m error
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span
              className="text-sm font-medium"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Clock Error (microseconds)
            </span>
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "var(--backward-orange)",
              }}
            >
              {clockErrorUs.toFixed(1)} &mu;s
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={clockErrorUs}
            onChange={(e) => setClockErrorUs(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--backward-orange) ${
                (clockErrorUs / 10) * 100
              }%, var(--bg-secondary) ${(clockErrorUs / 10) * 100}%)`,
            }}
          />
          <div
            className="flex justify-between text-xs"
            style={{
              color: "var(--text-tertiary)",
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            <span>0 &mu;s (perfect)</span>
            <span>10 &mu;s (~3 km error)</span>
          </div>
        </div>

        {/* Key numbers */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <Clock
              size={20}
              className="mx-auto mb-2"
              style={{ color: "var(--backward-orange)" }}
            />
            <p
              className="text-xs mb-1"
              style={{
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Clock Error
            </p>
            <p
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "var(--backward-orange)",
              }}
            >
              {clockErrorUs.toFixed(1)} &mu;s
            </p>
          </div>
          <div
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <span className="text-lg block mb-2">&times;</span>
            <p
              className="text-xs mb-1"
              style={{
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Speed of Light
            </p>
            <p
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "var(--forward-blue)",
              }}
            >
              299.8 m/&mu;s
            </p>
          </div>
          <div
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <span className="text-lg block mb-2">=</span>
            <p
              className="text-xs mb-1"
              style={{
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Position Error
            </p>
            <p
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color:
                  positionErrorM > 1000
                    ? "var(--backward-orange)"
                    : positionErrorM > 300
                      ? "var(--accent-amber)"
                      : "var(--correct-green)",
              }}
            >
              {positionErrorM >= 1000
                ? `${(positionErrorM / 1000).toFixed(1)} km`
                : `${positionErrorM.toFixed(0)} m`}
            </p>
          </div>
        </div>
      </div>

      {/* The Solution */}
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
          The Elegant Solution
        </h3>
        <p
          className="text-sm leading-relaxed mb-6"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Instead of putting an atomic clock in every phone, GPS uses a
          mathematical trick. With 3 satellites, you solve for x, y, z
          (position). Add a 4th satellite, and you can also solve for t
          (time). The system of equations:
        </p>
        <div
          className="p-5 rounded-xl text-center space-y-2"
          style={{
            backgroundColor: "var(--bg-secondary)",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "14px",
            color: "var(--text-secondary)",
          }}
        >
          <p>
            (x - x<sub>1</sub>)&sup2; + (y - y<sub>1</sub>)&sup2; + (z - z
            <sub>1</sub>)&sup2; = (c &middot; &Delta;t<sub>1</sub>)&sup2;
          </p>
          <p>
            (x - x<sub>2</sub>)&sup2; + (y - y<sub>2</sub>)&sup2; + (z - z
            <sub>2</sub>)&sup2; = (c &middot; &Delta;t<sub>2</sub>)&sup2;
          </p>
          <p>
            (x - x<sub>3</sub>)&sup2; + (y - y<sub>3</sub>)&sup2; + (z - z
            <sub>3</sub>)&sup2; = (c &middot; &Delta;t<sub>3</sub>)&sup2;
          </p>
          <p style={{ color: "var(--backward-orange)" }}>
            (x - x<sub>4</sub>)&sup2; + (y - y<sub>4</sub>)&sup2; + (z - z
            <sub>4</sub>)&sup2; = (c &middot; &Delta;t<sub>4</sub>)&sup2;
          </p>
          <p
            className="pt-3 text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            4 equations, 4 unknowns: x, y, z, t
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
