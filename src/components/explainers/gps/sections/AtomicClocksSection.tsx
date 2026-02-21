"use client";

import { useState, useEffect, useRef } from "react";
import { Radio, Zap } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function AtomicClocksSection() {
  const [signalDelay, setSignalDelay] = useState(67.3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulseProgress, setPulseProgress] = useState(0);
  const animRef = useRef<number>(0);

  const SPEED_OF_LIGHT = 299792458;
  const distance = ((signalDelay / 1000) * SPEED_OF_LIGHT) / 1000; // km

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPulseProgress(0);
    const start = performance.now();
    const duration = 2000;

    const animate = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setPulseProgress(p);
      if (p < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <SectionWrapper id="atomic-clocks">
      <div className="text-center mb-12">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{
            color: "var(--forward-blue)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Section 2
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Atomic Clocks and{" "}
          <span style={{ color: "var(--forward-blue)" }}>Speed of Light</span>
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Each GPS satellite carries an atomic clock accurate to one billionth
          of a second. By measuring how long a signal takes to reach you,
          distance becomes simple arithmetic.
        </p>
      </div>

      {/* Signal Animation */}
      <div
        className="relative rounded-2xl p-6 sm:p-8 mb-10 overflow-hidden"
        style={{
          backgroundColor: "#0a0f1a",
          border: "1px solid rgba(74,144,217,0.2)",
        }}
      >
        <div className="relative h-48 sm:h-56 flex items-center">
          {/* Satellite */}
          <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: "rgba(74,144,217,0.2)",
                border: "1px solid rgba(74,144,217,0.4)",
              }}
            >
              <Radio size={28} color="#5B9FE8" />
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: "#A8A8A0", fontFamily: "var(--font-inter)" }}
            >
              Satellite
            </span>
          </div>

          {/* Signal path */}
          <div className="absolute left-24 sm:left-32 right-24 sm:right-32 top-1/2 -translate-y-1/2">
            <div
              className="h-px w-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(74,144,217,0.3) 0px, rgba(74,144,217,0.3) 8px, transparent 8px, transparent 16px)",
              }}
            />

            {isAnimating && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${pulseProgress * 100}%` }}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: "#5B9FE8",
                    boxShadow:
                      "0 0 20px rgba(74,144,217,0.8), 0 0 40px rgba(74,144,217,0.4)",
                  }}
                />
              </div>
            )}

            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
              <p
                className="text-2xl sm:text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: "#5B9FE8",
                }}
              >
                {isAnimating
                  ? `${(pulseProgress * signalDelay).toFixed(1)} ms`
                  : `${signalDelay.toFixed(1)} ms`}
              </p>
              <p className="text-xs mt-1" style={{ color: "#6A6A62" }}>
                signal travel time
              </p>
            </div>
          </div>

          {/* Your phone */}
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: "rgba(76,175,80,0.2)",
                border: "1px solid rgba(76,175,80,0.4)",
              }}
            >
              <Zap size={28} color="#66BB6A" />
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: "#A8A8A0", fontFamily: "var(--font-inter)" }}
            >
              Your Phone
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-6 py-3 rounded-full text-sm font-semibold transition-all"
            style={{
              backgroundColor: isAnimating
                ? "rgba(74,144,217,0.2)"
                : "rgba(74,144,217,0.9)",
              color: "#fff",
              fontFamily: "var(--font-inter)",
            }}
          >
            {isAnimating ? "Signal in transit..." : "Send Signal Pulse"}
          </button>
        </div>
      </div>

      {/* The Math */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-10"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <h3
          className="text-xl font-bold mb-6"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          The Math
        </h3>
        <div
          className="text-center py-6 px-4 rounded-xl mb-6"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <p
            className="text-lg sm:text-xl mb-2"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "var(--text-secondary)",
            }}
          >
            distance = speed &times; time
          </p>
          <p
            className="text-2xl sm:text-3xl font-bold"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "var(--forward-blue)",
            }}
          >
            {distance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km ={" "}
            <span
              style={{ color: "var(--text-tertiary)", fontSize: "0.7em" }}
            >
              299,792 km/s
            </span>{" "}
            &times;{" "}
            <span
              style={{ color: "var(--text-tertiary)", fontSize: "0.7em" }}
            >
              {signalDelay.toFixed(1)} ms
            </span>
          </p>
        </div>
      </div>

      {/* Slider */}
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
          Try it: Adjust Signal Delay
        </h3>
        <p
          className="text-sm mb-6"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Move the slider to see how signal travel time maps directly to
          distance. GPS satellites are about 20,200 km up, but the signal path
          varies depending on the satellite&apos;s position relative to you.
        </p>

        <div className="space-y-4">
          <input
            type="range"
            min={20}
            max={130}
            step={0.1}
            value={signalDelay}
            onChange={(e) => setSignalDelay(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--forward-blue) ${
                ((signalDelay - 20) / 110) * 100
              }%, var(--bg-secondary) ${((signalDelay - 20) / 110) * 100}%)`,
            }}
          />
          <div
            className="flex justify-between text-xs"
            style={{
              color: "var(--text-tertiary)",
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            <span>20 ms (~6,000 km)</span>
            <span>130 ms (~39,000 km)</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div
              className="p-4 rounded-xl text-center"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <p
                className="text-xs mb-1"
                style={{
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Signal Delay
              </p>
              <p
                className="text-xl font-bold"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: "var(--forward-blue)",
                }}
              >
                {signalDelay.toFixed(1)} ms
              </p>
            </div>
            <div
              className="p-4 rounded-xl text-center"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <p
                className="text-xs mb-1"
                style={{
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Distance
              </p>
              <p
                className="text-xl font-bold"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: "var(--correct-green)",
                }}
              >
                {distance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
