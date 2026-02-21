"use client";

import { useState } from "react";
import {
  Shield,
  Plane,
  Satellite,
  Unlock,
  Globe,
  Smartphone,
} from "lucide-react";
import {
  TIMELINE_EVENTS,
  CONSTELLATION_SYSTEMS,
  type TimelineEvent,
} from "@/lib/explainers/gps";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const ICON_MAP = {
  shield: Shield,
  plane: Plane,
  satellite: Satellite,
  unlock: Unlock,
  globe: Globe,
  smartphone: Smartphone,
};

function TimelineCard({
  event,
  isActive,
  onClick,
}: {
  event: TimelineEvent;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[event.icon];

  return (
    <button
      onClick={onClick}
      className="group relative text-left w-full transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: isActive
                ? "var(--forward-blue)"
                : "var(--bg-secondary)",
              border: `2px solid ${isActive ? "var(--forward-blue)" : "var(--border)"}`,
            }}
          >
            <Icon
              size={18}
              style={{
                color: isActive ? "#fff" : "var(--text-tertiary)",
              }}
            />
          </div>
          <div
            className="w-px flex-1 min-h-[20px]"
            style={{ backgroundColor: "var(--border)" }}
          />
        </div>

        <div
          className="flex-1 pb-8 rounded-xl p-4 transition-all duration-300"
          style={{
            backgroundColor: isActive ? "var(--bg-card)" : "transparent",
            border: isActive
              ? "1px solid var(--border)"
              : "1px solid transparent",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: isActive
                  ? "var(--forward-blue)"
                  : "var(--text-tertiary)",
              }}
            >
              {event.year}
            </span>
            <h3
              className="text-base font-bold"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              {event.title}
            </h3>
          </div>

          {isActive && (
            <div className="space-y-3 gps-fade-in">
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {event.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(74,144,217,0.1)",
                    color: "var(--forward-blue)",
                    fontFamily: "var(--font-jetbrains)",
                  }}
                >
                  Accuracy: {event.accuracy}
                </span>
              </div>
            </div>
          )}

          {!isActive && (
            <p
              className="text-xs"
              style={{
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {event.milestone}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default function HistorySection() {
  const [activeEvent, setActiveEvent] = useState(0);

  return (
    <SectionWrapper id="history">
      <div className="text-center mb-12">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{
            color: "var(--forward-blue)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Section 7
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          From Military Secret{" "}
          <span style={{ color: "var(--forward-blue)" }}>to Your Pocket</span>
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          A Cold War navigation tool became the invisible infrastructure of
          modern life. Here&apos;s how accuracy improved 1000x in 50 years.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto mb-12">
        {TIMELINE_EVENTS.map((event, i) => (
          <TimelineCard
            key={event.year}
            event={event}
            isActive={activeEvent === i}
            onClick={() => setActiveEvent(i)}
          />
        ))}
      </div>

      {/* Constellation comparison */}
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
          Today: Four Constellations, 100+ Satellites
        </h3>
        <p
          className="text-sm mb-6"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Your phone doesn&apos;t just use American GPS. It simultaneously
          receives signals from four independent constellations:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CONSTELLATION_SYSTEMS.map((sys) => (
            <div
              key={sys.name}
              className="p-4 rounded-xl text-center"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <p
                className="text-xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: "var(--forward-blue)",
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
                {sys.country}
              </p>
              <p
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {sys.satellites}
              </p>
              <p
                className="text-xs"
                style={{
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                satellites
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
