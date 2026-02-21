"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { achievements, radarData } from "@/lib/explainers/seed2-achievements";

const MODEL_COLORS = {
  "Seed2.0 Pro": "var(--forward-blue)",
  "GPT-5.2": "var(--correct-green)",
  "Claude Opus": "var(--accent-purple)",
} as const;

function MedalBadge({ medal }: { medal: string }) {
  if (medal === "Gold") {
    return (
      <span className="inline-block rounded-full bg-accent-amber/20 px-3 py-1 font-sans text-xs font-semibold text-accent-amber">
        Gold Medal
      </span>
    );
  }
  if (medal === "1st") {
    return (
      <span className="inline-block rounded-full bg-forward-blue/20 px-3 py-1 font-sans text-xs font-semibold text-forward-blue">
        1st Place
      </span>
    );
  }
  return (
    <span className="inline-block rounded-full bg-bg-secondary px-3 py-1 font-sans text-xs font-semibold text-text-secondary">
      {medal}
    </span>
  );
}

export default function AchievementsSection() {
  return (
    <SectionWrapper id="achievements">
      {/* Section header */}
      <div className="mb-10">
        <p className="mb-3 font-serif text-base italic text-text-tertiary">
          Benchmarks are practice exams. Math olympiads and programming contests
          are the real tournament &mdash; problems no one has seen before, under time
          pressure.
        </p>
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Gold Standard
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-base text-text-secondary sm:text-lg">
          How Seed2.0 Pro performs across six capability dimensions compared to
          GPT-5.2 and Claude Opus &mdash; and where it earns gold at the world&apos;s
          most demanding competitions.
        </p>
      </div>

      {/* Radar chart */}
      <div className="mb-10 rounded-xl border border-border bg-bg-card p-4">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData} margin={{ top: 16, right: 24, bottom: 16, left: 24 }}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 12,
                fill: "var(--text-secondary)",
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "var(--text-tertiary)" }}
              tickCount={4}
            />
            <Radar
              name="Seed2.0 Pro"
              dataKey="seed2Pro"
              stroke={MODEL_COLORS["Seed2.0 Pro"]}
              fill={MODEL_COLORS["Seed2.0 Pro"]}
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="GPT-5.2"
              dataKey="gpt52"
              stroke={MODEL_COLORS["GPT-5.2"]}
              fill={MODEL_COLORS["GPT-5.2"]}
              fillOpacity={0.1}
              strokeWidth={1.5}
              strokeDasharray="4 2"
            />
            <Radar
              name="Claude Opus"
              dataKey="claudeOpus"
              stroke={MODEL_COLORS["Claude Opus"]}
              fill={MODEL_COLORS["Claude Opus"]}
              fillOpacity={0.1}
              strokeWidth={1.5}
              strokeDasharray="4 2"
            />
            <Legend
              wrapperStyle={{
                paddingTop: "16px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "12px",
                color: "var(--text-secondary)",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Medal showcase */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.competition}
            className="rounded-xl border border-border bg-bg-card p-5"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="font-serif text-lg font-semibold text-text-primary">
                {achievement.competition}
              </h3>
              <MedalBadge medal={achievement.medal} />
            </div>

            <p className="mb-2 font-mono text-2xl font-bold text-text-primary">
              {achievement.score}
            </p>

            <p className="mb-2 font-sans text-sm text-text-tertiary">
              {achievement.threshold}
            </p>

            <p className="font-sans text-sm leading-relaxed text-text-secondary">
              {achievement.context}
            </p>
          </div>
        ))}
      </div>

      {/* Why Should I Care? callout */}
      <div className="border-l-2 border-forward-blue pl-4">
        <p className="font-serif text-sm italic leading-relaxed text-text-secondary">
          <span className="font-semibold not-italic text-text-primary">
            Why should I care?
          </span>{" "}
          Gold medals at IMO and CMO, plus top ranking at ICPC, signal genuine
          mathematical reasoning &mdash; not just pattern matching on training data.
          This matters for any use case requiring logical rigor.
        </p>
      </div>
    </SectionWrapper>
  );
}
