"use client";

import { useState, useCallback } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

type Environment = "moon" | "earth" | "vacuum";

const ENV_CONFIG = {
  moon: {
    label: "Moon",
    hammerDuration: 1.6,
    featherDuration: 1.6,
    description: "No atmosphere — both fall identically",
  },
  earth: {
    label: "Earth",
    hammerDuration: 0.8,
    featherDuration: 2.5,
    description: "Air resistance slows the feather",
  },
  vacuum: {
    label: "Vacuum Chamber",
    hammerDuration: 0.8,
    featherDuration: 0.8,
    description: "Remove air — same result as the Moon",
  },
} as const;

export default function FallingSpeedSection() {
  const [environment, setEnvironment] = useState<Environment>("earth");
  const [isDropping, setIsDropping] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);

  const config = ENV_CONFIG[environment];
  const maxDuration = Math.max(config.hammerDuration, config.featherDuration);

  const handleDrop = useCallback(() => {
    setIsDropping(true);
    setHasDropped(false);
    setTimeout(() => {
      setHasDropped(true);
    }, maxDuration * 1000 + 100);
  }, [maxDuration]);

  const handleReset = useCallback(() => {
    setIsDropping(false);
    setHasDropped(false);
  }, []);

  const handleEnvironmentChange = useCallback((env: Environment) => {
    setEnvironment(env);
    setIsDropping(false);
    setHasDropped(false);
  }, []);

  return (
    <SectionWrapper id="falling-speed">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* LEFT — Interactive */}
        <div className="w-full lg:w-1/2">
          <div
            className="inline-flex rounded-full p-1 mb-6"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            {(["moon", "earth", "vacuum"] as Environment[]).map((env) => (
              <button
                key={env}
                onClick={() => handleEnvironmentChange(env)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "var(--font-mono)",
                  backgroundColor: environment === env ? "var(--gravity-blue)" : "transparent",
                  color: environment === env ? "#ffffff" : "var(--text-secondary)",
                }}
              >
                {ENV_CONFIG[env].label}
              </button>
            ))}
          </div>

          <div
            className="relative rounded-xl overflow-hidden mb-4"
            style={{
              height: 300,
              backgroundColor: "var(--space-deep)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Feather */}
            <div
              className="absolute"
              style={{
                left: "35%",
                top: 24,
                transform: isDropping ? "translateY(220px)" : "translateY(0)",
                transition: isDropping
                  ? `transform ${config.featherDuration}s ease-in`
                  : "none",
              }}
            >
              <svg width="20" height="40" viewBox="0 0 20 40" fill="none">
                <path
                  d="M10 0 C10 0 2 10 2 20 C2 30 8 38 10 40 C12 38 18 30 18 20 C18 10 10 0 10 0Z"
                  fill="#d4d4d8"
                  opacity={0.9}
                />
                <line x1="10" y1="2" x2="10" y2="38" stroke="#a1a1aa" strokeWidth="1" />
              </svg>
              <p
                className="text-xs text-center mt-1"
                style={{ color: "#94a3b8", fontFamily: "var(--font-mono)" }}
              >
                Feather
              </p>
            </div>

            {/* Hammer */}
            <div
              className="absolute"
              style={{
                left: "60%",
                top: 24,
                transform: isDropping ? "translateY(220px)" : "translateY(0)",
                transition: isDropping
                  ? `transform ${config.hammerDuration}s ease-in`
                  : "none",
              }}
            >
              <svg width="20" height="35" viewBox="0 0 20 35" fill="none">
                <rect x="7" y="12" width="6" height="23" rx="1" fill="#a1a1aa" />
                <rect x="2" y="0" width="16" height="14" rx="2" fill="#6b7280" />
              </svg>
              <p
                className="text-xs text-center mt-1"
                style={{ color: "#94a3b8", fontFamily: "var(--font-mono)" }}
              >
                Hammer
              </p>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>

          <p
            className="text-sm mb-4"
            style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
          >
            {config.description}
          </p>

          {!isDropping ? (
            <button
              onClick={handleDrop}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: "var(--gravity-blue)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
              }}
            >
              Drop
            </button>
          ) : hasDropped ? (
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Reset
            </button>
          ) : (
            <p
              className="text-sm py-2.5"
              style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
            >
              Dropping...
            </p>
          )}
        </div>

        {/* RIGHT — Text */}
        <div className="w-full lg:w-1/2">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
          >
            Section 03
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
          >
            Why Things Fall at the{" "}
            <span style={{ color: "var(--gravity-blue)" }}>Same Speed</span>
          </h2>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
          >
            Gravity accelerates everything at the same rate — a feather and a
            hammer, a bowling ball and a marble. Air resistance is what makes
            Earth feel different. Remove the air, and everything falls together.
          </p>

          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--gravity-amber)", fontFamily: "var(--font-mono)" }}
            >
              Whoa
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
            >
              Apollo 15 astronaut David Scott dropped a hammer and feather on the
              Moon in 1971 — live on TV. They hit at exactly the same time.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
