"use client";

import { useState, useMemo } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { Percent, UserPlus, Layers, Sliders } from "lucide-react";

interface DiversityMechanism {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
  defaultRate: number;
  color: string;
  effect: string;
}

const mechanisms: DiversityMechanism[] = [
  {
    id: "random-exploration",
    icon: Percent,
    name: "Random Exploration",
    description:
      "A percentage of every feed consists of completely random content from outside your interest graph. This is how TikTok discovers new interests you didn't know you had.",
    defaultRate: 15,
    color: "var(--forward-blue)",
    effect: "Introduces entirely new content categories",
  },
  {
    id: "new-creator-boost",
    icon: UserPlus,
    name: "New Creator Boost",
    description:
      "Fresh creators get an initial boost \u2014 their first videos are shown to a small test audience regardless of follower count. If engagement is high, distribution expands exponentially.",
    defaultRate: 10,
    color: "var(--accent-purple)",
    effect: "Surfaces unknown voices and fresh perspectives",
  },
  {
    id: "topic-diversity",
    icon: Layers,
    name: "Topic Diversity Quotas",
    description:
      "The algorithm enforces minimum representation across content categories. Even if you only engage with cooking, it will periodically surface tech, comedy, or education to test for latent interests.",
    defaultRate: 12,
    color: "var(--correct-green)",
    effect: "Prevents complete content monoculture",
  },
];

interface FeedItem {
  category: string;
  isExploration: boolean;
  isNewCreator: boolean;
  isDiversityQuota: boolean;
}

function generateFeed(rates: Record<string, number>): FeedItem[] {
  const total = 20;
  const feed: FeedItem[] = [];
  const explorationCount = Math.round((rates["random-exploration"] / 100) * total);
  const newCreatorCount = Math.round((rates["new-creator-boost"] / 100) * total);
  const diversityCount = Math.round((rates["topic-diversity"] / 100) * total);
  const personalizedCount = Math.max(0, total - explorationCount - newCreatorCount - diversityCount);

  const personalizedCategories = ["Cooking", "Cooking", "Tech", "Tech", "Comedy"];
  const explorationCategories = ["Travel", "Art", "Science", "Music", "History", "Sports", "Nature", "DIY"];
  const diversityCategories = ["Fashion", "Finance", "Health", "Gaming", "Dance", "Pets"];

  for (let i = 0; i < personalizedCount; i++) {
    feed.push({
      category: personalizedCategories[i % personalizedCategories.length],
      isExploration: false,
      isNewCreator: false,
      isDiversityQuota: false,
    });
  }

  for (let i = 0; i < explorationCount; i++) {
    feed.push({
      category: explorationCategories[i % explorationCategories.length],
      isExploration: true,
      isNewCreator: false,
      isDiversityQuota: false,
    });
  }

  for (let i = 0; i < newCreatorCount; i++) {
    feed.push({
      category: personalizedCategories[i % personalizedCategories.length],
      isExploration: false,
      isNewCreator: true,
      isDiversityQuota: false,
    });
  }

  for (let i = 0; i < diversityCount; i++) {
    feed.push({
      category: diversityCategories[i % diversityCategories.length],
      isExploration: false,
      isNewCreator: false,
      isDiversityQuota: true,
    });
  }

  // Shuffle
  for (let i = feed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.sin(i * 3.7 + 1.2) * 0.5 + 0.5) * i;
    const k = Math.abs(j) % feed.length;
    [feed[i], feed[k]] = [feed[k], feed[i]];
  }

  return feed;
}

const categoryColorsMap: Record<string, string> = {
  Cooking: "var(--backward-orange)",
  Tech: "var(--forward-blue)",
  Comedy: "var(--accent-amber)",
  Education: "var(--correct-green)",
  Travel: "var(--accent-purple)",
  Art: "var(--accent-purple)",
  Science: "var(--forward-blue)",
  Music: "var(--accent-amber)",
  Fashion: "var(--backward-orange)",
  Finance: "var(--accent-amber)",
  Health: "var(--correct-green)",
  Gaming: "var(--backward-orange)",
  Dance: "var(--accent-purple)",
  Sports: "var(--correct-green)",
  Nature: "var(--correct-green)",
  History: "var(--accent-amber)",
  Pets: "var(--correct-green)",
  DIY: "var(--forward-blue)",
};

export default function DiversitySection() {
  const [rates, setRates] = useState<Record<string, number>>(() =>
    Object.fromEntries(mechanisms.map((m) => [m.id, m.defaultRate]))
  );

  const totalDiversity = Object.values(rates).reduce((s, v) => s + v, 0);

  const feed = useMemo(() => generateFeed(rates), [rates]);

  const updateRate = (id: string, value: number) => {
    setRates((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <SectionWrapper id="diversity">
      <div className="text-center mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-purple mb-3">
          Section 07
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Breaking the Loop
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          TikTok knows the filter bubble is a problem. It deploys three mechanisms
          to inject diversity into your feed — each with its own purpose. Adjust the
          sliders to see how changing these rates reshapes what you see.
        </p>
      </div>

      {/* Total diversity meter */}
      <div className="mb-10 text-center">
        <div className="inline-flex flex-col items-center rounded-2xl border border-border bg-bg-card px-8 py-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Sliders className="h-4 w-4 text-text-tertiary" />
            <span className="font-sans text-sm text-text-tertiary">
              Total Diversity Injection
            </span>
          </div>
          <span
            className={`font-mono text-4xl font-bold ${
              totalDiversity >= 30
                ? "text-correct-green"
                : totalDiversity >= 20
                ? "text-accent-amber"
                : "text-backward-orange"
            }`}
          >
            {totalDiversity}%
          </span>
          <span className="font-sans text-xs text-text-tertiary mt-1">
            of your feed is non-personalized
          </span>
        </div>
      </div>

      {/* Mechanism sliders */}
      <div className="space-y-6 mb-12">
        {mechanisms.map((mech) => {
          const Icon = mech.icon;
          return (
            <div
              key={mech.id}
              className="rounded-xl border border-border bg-bg-card p-5"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${mech.color} 15%, transparent)`,
                  }}
                >
                  <span style={{ color: mech.color }}><Icon className="h-5 w-5" /></span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-sans text-sm font-semibold text-text-primary">
                      {mech.name}
                    </h3>
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: mech.color }}
                    >
                      {rates[mech.id]}%
                    </span>
                  </div>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed mb-3">
                    {mech.description}
                  </p>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={rates[mech.id]}
                    onChange={(e) => updateRate(mech.id, Number(e.target.value))}
                    className="w-full"
                    aria-label={`${mech.name} rate`}
                  />
                  <p className="mt-2 font-sans text-xs text-text-tertiary italic">
                    {mech.effect}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated feed */}
      <div className="rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
        <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
          Simulated Feed Preview
        </h3>
        <p className="font-sans text-sm text-text-tertiary mb-6">
          A 20-video sample of what your For You page would look like with these settings.
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {feed.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-lg p-2 sm:p-3 text-center transition-all ${
                item.isExploration || item.isNewCreator || item.isDiversityQuota
                  ? ""
                  : "border border-border"
              }`}
              style={{
                backgroundColor: `color-mix(in srgb, ${
                  categoryColorsMap[item.category] || "var(--text-tertiary)"
                } 10%, transparent)`,
                outline: (item.isExploration || item.isNewCreator || item.isDiversityQuota)
                  ? `1px solid ${
                      item.isExploration
                        ? "var(--forward-blue)"
                        : item.isNewCreator
                        ? "var(--accent-purple)"
                        : "var(--correct-green)"
                    }`
                  : undefined,
                outlineOffset: (item.isExploration || item.isNewCreator || item.isDiversityQuota) ? "-1px" : undefined,
                borderRadius: "0.5rem",
              }}
            >
              <span className="font-sans text-[10px] sm:text-xs font-medium text-text-primary block truncate">
                {item.category}
              </span>
              {(item.isExploration || item.isNewCreator || item.isDiversityQuota) && (
                <span
                  className="mt-1 inline-block rounded-full px-1.5 py-0.5 font-mono text-[8px]"
                  style={{
                    color: item.isExploration
                      ? "var(--forward-blue)"
                      : item.isNewCreator
                      ? "var(--accent-purple)"
                      : "var(--correct-green)",
                    backgroundColor: item.isExploration
                      ? "color-mix(in srgb, var(--forward-blue) 15%, transparent)"
                      : item.isNewCreator
                      ? "color-mix(in srgb, var(--accent-purple) 15%, transparent)"
                      : "color-mix(in srgb, var(--correct-green) 15%, transparent)",
                  }}
                >
                  {item.isExploration ? "explore" : item.isNewCreator ? "new" : "quota"}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/30" />
            <span className="font-sans text-xs text-text-tertiary">Personalized</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--forward-blue)" }} />
            <span className="font-sans text-xs text-text-tertiary">Random Exploration</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--accent-purple)" }} />
            <span className="font-sans text-xs text-text-tertiary">New Creator</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--correct-green)" }} />
            <span className="font-sans text-xs text-text-tertiary">Diversity Quota</span>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="mt-6 text-center">
        <button
          onClick={() =>
            setRates(
              Object.fromEntries(mechanisms.map((m) => [m.id, m.defaultRate]))
            )
          }
          className="font-sans text-sm text-text-tertiary hover:text-forward-blue transition-colors underline underline-offset-2"
        >
          Reset to default rates
        </button>
      </div>
    </SectionWrapper>
  );
}
