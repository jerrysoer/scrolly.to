"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { GUILD_AWARDS, type GuildAward } from "@/lib/explainers/oscars";

// ─── Types ────────────────────────────────────────────────────────────────────

type GuildKey = "DGA" | "SAG" | "PGA" | "WGA" | "ASC" | "ACE";

// ─── HeatmapTable ─────────────────────────────────────────────────────────────

function CorrelationBar({ pct }: { pct: number }) {
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`${pct}% correlation`}
    >
      <div
        className="relative h-2 rounded-full flex-1"
        style={{
          background: "var(--border)",
          minWidth: "80px",
          maxWidth: "140px",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background:
              pct >= 80
                ? "var(--forward-blue)"
                : pct >= 70
                ? "color-mix(in srgb, var(--forward-blue) 70%, var(--accent-amber))"
                : "var(--text-tertiary)",
          }}
        />
      </div>
      <span
        className="text-xs font-semibold tabular-nums"
        style={{
          color: pct >= 80 ? "var(--forward-blue)" : "var(--text-secondary)",
          minWidth: "34px",
        }}
      >
        {pct}%
      </span>
    </div>
  );
}

function StatusBadge({ guild }: { guild: GuildAward }) {
  if (guild.announced && guild.winner2026 && guild.film2026) {
    return (
      <div className="flex flex-col gap-1">
        <span
          className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
          style={{
            background: "color-mix(in srgb, var(--success-green) 12%, var(--bg-card))",
            color: "var(--success-green)",
            border: "1px solid color-mix(in srgb, var(--success-green) 30%, var(--border))",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--success-green)" }}
          />
          Announced
        </span>
        <span
          className="text-[11px] leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          {guild.winner2026}
          <br />
          <em style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
            {guild.film2026}
          </em>
        </span>
      </div>
    );
  }

  return (
    <span
      className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{
        background: "color-mix(in srgb, var(--accent-amber) 10%, var(--bg-card))",
        color: "var(--accent-amber)",
        border: "1px solid color-mix(in srgb, var(--accent-amber) 25%, var(--border))",
      }}
    >
      TBD
    </span>
  );
}

function HeatmapTable() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Table header */}
      <div
        className="grid text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5"
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          color: "var(--text-tertiary)",
          gridTemplateColumns: "60px 1fr 160px 1fr",
          gap: "0.75rem",
        }}
      >
        <span>Guild</span>
        <span>Full Name</span>
        <span>Oscar Correlation</span>
        <span>2026 Status</span>
      </div>

      {/* Rows */}
      {GUILD_AWARDS.map((guild) => {
        const isDGA = guild.guild === "DGA";
        return (
          <div key={guild.guild}>
            <div
              className="grid px-4 py-3 items-start transition-colors"
              style={{
                gridTemplateColumns: "60px 1fr 160px 1fr",
                gap: "0.75rem",
                borderBottom: "1px solid var(--border)",
                borderLeft: isDGA
                  ? "3px solid var(--forward-blue)"
                  : "3px solid transparent",
                background: isDGA
                  ? "color-mix(in srgb, var(--forward-blue) 5%, var(--bg-card))"
                  : "var(--bg-card)",
              }}
            >
              {/* Guild abbreviation */}
              <span
                className="text-sm font-bold"
                style={{ color: isDGA ? "var(--forward-blue)" : "var(--text-primary)" }}
              >
                {guild.guild}
              </span>

              {/* Full name + award */}
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-xs font-semibold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {guild.guildFull}
                </span>
                <span
                  className="text-[10px]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {guild.award}
                </span>
              </div>

              {/* Correlation bar */}
              <CorrelationBar pct={guild.oscarCorrelation} />

              {/* Status */}
              <StatusBadge guild={guild} />
            </div>

            {/* DGA annotation row */}
            {isDGA && (
              <div
                className="px-4 py-2.5 text-xs leading-relaxed"
                style={{
                  background: "color-mix(in srgb, var(--forward-blue) 5%, var(--bg-secondary))",
                  borderBottom: "1px solid var(--border)",
                  borderLeft: "3px solid var(--forward-blue)",
                  color: "var(--text-secondary)",
                }}
              >
                Paul Thomas Anderson won the DGA Award in 2026 — a strong Best Director
                signal, though{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  Sinners
                </strong>{" "}
                leads the overall race.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── GuildToggleTracker ────────────────────────────────────────────────────────

const GUILD_KEYS: GuildKey[] = ["DGA", "SAG", "PGA", "WGA", "ASC", "ACE"];

function impliedFrontrunner(active: Set<GuildKey>): string {
  if (active.size === 0) return "No guild results yet";

  const hasDGA = active.has("DGA");
  const nonDGAOnly = active.size > 0 && !hasDGA;

  if (nonDGAOnly) {
    return "Insufficient data — check back after more guild results";
  }

  if (hasDGA && active.size === 1) {
    return "Paul Thomas Anderson (One Battle After Another)";
  }

  // DGA is on + at least one other
  return "Paul Thomas Anderson — confirmed by DGA";
}

function GuildToggleTracker() {
  const [active, setActive] = useState<Set<GuildKey>>(new Set(["DGA"]));

  function toggle(key: GuildKey) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  const frontrunner = impliedFrontrunner(active);
  const hasFrontrunner =
    active.size > 0 && active.has("DGA");
  const hasNone = active.size === 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Guild Results Tracker
        </p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Toggle which results are in to see the implied frontrunner.
        </p>
      </div>

      {/* Toggle chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Guild toggles">
        {GUILD_KEYS.map((key) => {
          const isOn = active.has(key);
          const guild = GUILD_AWARDS.find((g) => g.guild === key)!;
          const isAnnounced = guild.announced;

          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              aria-pressed={isOn}
              className="text-sm font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: isOn
                  ? "var(--forward-blue)"
                  : "var(--bg-secondary)",
                color: isOn ? "#ffffff" : "var(--text-secondary)",
                border: isOn
                  ? "1.5px solid var(--forward-blue)"
                  : "1.5px solid var(--border)",
                cursor: "pointer",
                opacity: !isAnnounced && !isOn ? 0.6 : 1,
              }}
            >
              {key}
            </button>
          );
        })}
      </div>

      {/* Implied frontrunner panel */}
      <div
        className="rounded-xl p-4 transition-all duration-300"
        style={{
          background: hasFrontrunner
            ? "color-mix(in srgb, var(--forward-blue) 8%, var(--bg-card))"
            : hasNone
            ? "var(--bg-secondary)"
            : "color-mix(in srgb, var(--accent-amber) 8%, var(--bg-card))",
          border: hasFrontrunner
            ? "1px solid color-mix(in srgb, var(--forward-blue) 25%, var(--border))"
            : hasNone
            ? "1px solid var(--border)"
            : "1px solid color-mix(in srgb, var(--accent-amber) 25%, var(--border))",
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
          style={{ color: "var(--text-tertiary)" }}
        >
          Implied Frontrunner
        </p>
        <p
          className="text-sm font-semibold leading-snug"
          style={{
            color: hasFrontrunner
              ? "var(--forward-blue)"
              : "var(--text-secondary)",
          }}
        >
          {frontrunner}
        </p>
      </div>
    </div>
  );
}

// ─── GuildSection ─────────────────────────────────────────────────────────────

export default function GuildSection() {
  return (
    <SectionWrapper id="guilds" layout="centered" tinted>
      <div className="flex flex-col gap-10">
        {/* Section number divider */}
        <div className="section-number-divider" aria-hidden="true">
          <span className="section-number-badge">06</span>
        </div>

        {/* Heading block */}
        <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Reading the Tea Leaves
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Guild awards aren&apos;t the Oscars. But they&apos;re the best predictor
            we have.
          </p>
        </div>

        {/* Prediction accuracy heatmap */}
        <div className="flex flex-col gap-3">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-tertiary)" }}
          >
            Prediction Accuracy Heatmap
          </p>
          <HeatmapTable />
        </div>

        {/* Guild toggle tracker */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <GuildToggleTracker />
        </div>
      </div>
    </SectionWrapper>
  );
}
