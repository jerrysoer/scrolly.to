"use client";

import { useState, useMemo, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Play, RotateCcw } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { generateRaceData, defaultRaceParams } from "@/lib/explainers/tortoise-hare-race";

export default function RaceSimulation() {
  const [hareSpeed, setHareSpeed] = useState(defaultRaceParams.hareSpeed);
  const [napDuration, setNapDuration] = useState(defaultRaceParams.napDuration);
  const [tortoiseSpeed, setTortoiseSpeed] = useState(defaultRaceParams.tortoiseSpeed);
  const [napStart] = useState(defaultRaceParams.napStart);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(100);

  const raceData = useMemo(
    () => generateRaceData(hareSpeed, napStart, napDuration, tortoiseSpeed),
    [hareSpeed, napStart, napDuration, tortoiseSpeed]
  );

  const displayData = useMemo(
    () => raceData.slice(0, animationStep + 1),
    [raceData, animationStep]
  );

  const overtakePoint = useMemo(
    () => raceData.find((d) => d.label === "Tortoise overtakes!"),
    [raceData]
  );

  const finalTortoise = raceData[raceData.length - 1]?.tortoise || 0;
  const finalHare = raceData[raceData.length - 1]?.hare || 0;
  const tortoiseWins = finalTortoise >= finalHare;

  const runAnimation = useCallback(() => {
    setIsAnimating(true);
    setAnimationStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setAnimationStep(step);
      if (step >= 100) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 50);
  }, []);

  const resetAnimation = useCallback(() => {
    setAnimationStep(100);
    setIsAnimating(false);
  }, []);

  return (
    <SectionWrapper id="race-simulation" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-purple mb-4">
            Section I
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light mb-4">
            The Sprint &amp; the Nap
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            Adjust the speeds and watch the race unfold. The hare sprints ahead, then takes a nap.
            The tortoise never stops.
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 bg-bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Hare Speed</span>
              <span className="font-mono text-sm text-backward-orange">{hareSpeed.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={hareSpeed}
              onChange={(e) => setHareSpeed(parseFloat(e.target.value))}
              className="w-full"
              disabled={isAnimating}
            />
          </div>
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Nap Duration</span>
              <span className="font-mono text-sm text-backward-orange">{napDuration} ticks</span>
            </label>
            <input
              type="range"
              min="10"
              max="80"
              step="1"
              value={napDuration}
              onChange={(e) => setNapDuration(parseInt(e.target.value))}
              className="w-full"
              disabled={isAnimating}
            />
          </div>
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Tortoise Speed</span>
              <span className="font-mono text-sm text-correct-green">{tortoiseSpeed.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={tortoiseSpeed}
              onChange={(e) => setTortoiseSpeed(parseFloat(e.target.value))}
              className="w-full"
              disabled={isAnimating}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={runAnimation}
            disabled={isAnimating}
            className="flex items-center gap-2 px-6 py-3 bg-accent-purple text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[44px]"
          >
            <Play size={16} />
            Run Race
          </button>
          <button
            onClick={resetAnimation}
            className="flex items-center gap-2 px-6 py-3 bg-bg-secondary text-text-primary rounded-xl font-medium text-sm hover:bg-border transition-colors min-h-[44px]"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* Chart */}
        <div className="bg-bg-card border border-border rounded-2xl p-4 sm:p-8">
          <div className="h-[350px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradTortoise" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--correct-green)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--correct-green)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradHare" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--backward-orange)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--backward-orange)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="time"
                  stroke="var(--text-tertiary)"
                  tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
                  label={{ value: "Time", position: "insideBottom", offset: -5, fontSize: 12, fill: "var(--text-tertiary)" }}
                />
                <YAxis
                  stroke="var(--text-tertiary)"
                  tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
                  label={{ value: "Distance", angle: -90, position: "insideLeft", offset: 10, fontSize: 12, fill: "var(--text-tertiary)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                  }}
                  labelStyle={{ color: "var(--text-primary)" }}
                />
                {/* Nap zone */}
                <ReferenceLine
                  x={napStart}
                  stroke="var(--backward-orange)"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{ value: "Nap starts", position: "top", fontSize: 11, fill: "var(--backward-orange)" }}
                />
                <ReferenceLine
                  x={napStart + napDuration}
                  stroke="var(--backward-orange)"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{ value: "Wakes up", position: "top", fontSize: 11, fill: "var(--backward-orange)" }}
                />
                <Area
                  type="monotone"
                  dataKey="tortoise"
                  stroke="var(--correct-green)"
                  fill="url(#gradTortoise)"
                  strokeWidth={2.5}
                  dot={false}
                  name="Tortoise"
                />
                <Area
                  type="monotone"
                  dataKey="hare"
                  stroke="var(--backward-orange)"
                  fill="url(#gradHare)"
                  strokeWidth={2.5}
                  dot={false}
                  name="Hare"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Result callout */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-bg-card border border-border rounded-xl p-5 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-1">
              Tortoise Final
            </p>
            <p className="text-2xl font-mono font-semibold text-correct-green">
              {finalTortoise.toFixed(0)}
            </p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-5 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-1">
              Hare Final
            </p>
            <p className="text-2xl font-mono font-semibold text-backward-orange">
              {finalHare.toFixed(0)}
            </p>
          </div>
          <div className={`border rounded-xl p-5 text-center ${tortoiseWins ? "bg-correct-green/10 border-correct-green/30" : "bg-backward-orange/10 border-backward-orange/30"}`}>
            <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-1">
              Winner
            </p>
            <p className={`text-2xl font-heading font-semibold ${tortoiseWins ? "text-correct-green" : "text-backward-orange"}`}>
              {tortoiseWins ? "Tortoise" : "Hare"}
            </p>
            {overtakePoint && (
              <p className="text-xs text-text-tertiary mt-1">
                Overtook at t={overtakePoint.time}
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
