"use client";

import { useState } from "react";
import { ERROR_SOURCES, CORRECTION_SYSTEMS } from "@/lib/explainers/gps";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function ErrorBudgetSection() {
  const [activeErrors, setActiveErrors] = useState<Set<string>>(
    new Set(ERROR_SOURCES.map((e) => e.id))
  );

  const toggleError = (id: string) => {
    setActiveErrors((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalError = ERROR_SOURCES.filter((e) =>
    activeErrors.has(e.id)
  ).reduce((sum, e) => sum + e.errorMeters, 0);

  const maxTotal = ERROR_SOURCES.reduce((sum, e) => sum + e.errorMeters, 0);

  return (
    <SectionWrapper id="error-budget">
      <div className="text-center mb-12">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{
            color: "var(--accent-amber)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Section 6
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          The{" "}
          <span style={{ color: "var(--accent-amber)" }}>Error Budget</span>
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Even with atomic clocks and relativity corrections, multiple error
          sources still affect your position. Toggle each source to see its
          contribution.
        </p>
      </div>

      {/* Stacked Bar */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-8"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Total Error
          </h3>
          <span
            className="text-2xl font-bold"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "var(--accent-amber)",
            }}
          >
            &plusmn;{totalError.toFixed(1)}m
          </span>
        </div>

        <div
          className="relative h-12 rounded-lg overflow-hidden flex"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          {ERROR_SOURCES.map((source) => {
            const isActive = activeErrors.has(source.id);
            const widthPercent = (source.errorMeters / maxTotal) * 100;
            return (
              <div
                key={source.id}
                className="h-full transition-all duration-500 relative group"
                style={{
                  width: isActive ? `${widthPercent}%` : "0%",
                  backgroundColor: source.color,
                  opacity: isActive ? 0.85 : 0,
                }}
              >
                {isActive && widthPercent > 8 && (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {source.errorMeters}m
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="flex justify-between mt-2 text-xs"
          style={{
            color: "var(--text-tertiary)",
            fontFamily: "var(--font-jetbrains)",
          }}
        >
          <span>0m</span>
          <span>{maxTotal.toFixed(1)}m</span>
        </div>
      </div>

      {/* Toggle cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {ERROR_SOURCES.map((source) => {
          const isActive = activeErrors.has(source.id);
          return (
            <button
              key={source.id}
              onClick={() => toggleError(source.id)}
              className="text-left p-5 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: isActive
                  ? "var(--bg-card)"
                  : "var(--bg-secondary)",
                border: `2px solid ${isActive ? source.color : "transparent"}`,
                opacity: isActive ? 1 : 0.6,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full transition-all"
                    style={{
                      backgroundColor: isActive
                        ? source.color
                        : "var(--text-tertiary)",
                    }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {source.name}
                  </span>
                </div>
                <span
                  className="text-sm font-bold"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: isActive
                      ? source.color
                      : "var(--text-tertiary)",
                  }}
                >
                  &plusmn;{source.errorMeters}m
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {source.description}
              </p>
              {source.correctable && (
                <span
                  className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(76,175,80,0.1)",
                    color: "var(--correct-green)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Correctable
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Correction systems */}
      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <h3
          className="text-xl font-bold mb-6"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          How Augmentation Systems Help
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {CORRECTION_SYSTEMS.map((sys) => (
            <div
              key={sys.name}
              className="p-4 rounded-xl"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <p
                className="text-lg font-bold mb-1"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: "var(--correct-green)",
                }}
              >
                {sys.name}
              </p>
              <p
                className="text-xs mb-2"
                style={{
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {sys.fullName}
              </p>
              <p
                className="text-sm font-semibold mb-1"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {sys.improvement}
              </p>
              <p
                className="text-xs"
                style={{
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {sys.region}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
