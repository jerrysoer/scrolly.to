"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calculator, TrendingUp } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

interface SimDataPoint {
  day: number;
  consistent: number;
  sprintCrash: number;
}

// Deterministic version for initial render
function generateSimDataDeterministic(
  dailyMinutes: number,
  consistencyRate: number,
  days: number
): SimDataPoint[] {
  const data: SimDataPoint[] = [];
  let consistentTotal = 0;
  let sprintCrashTotal = 0;

  const sprintDays = 5;
  const crashDays = 9;
  const cycleLength = sprintDays + crashDays;
  const sprintMultiplier = 3;

  for (let d = 0; d <= days; d++) {
    // Consistent: average out the consistency
    if (d > 0) {
      consistentTotal += dailyMinutes * (consistencyRate / 100);
    }

    const dayInCycle = d % cycleLength;
    if (dayInCycle < sprintDays && d > 0) {
      sprintCrashTotal += dailyMinutes * sprintMultiplier;
    }

    data.push({
      day: d,
      consistent: Math.round(consistentTotal),
      sprintCrash: Math.round(sprintCrashTotal),
    });
  }

  return data;
}

export default function GoalSimulator() {
  const [dailyMinutes, setDailyMinutes] = useState(30);
  const [consistencyRate, setConsistencyRate] = useState(85);
  const [days, setDays] = useState(90);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animStep, setAnimStep] = useState(-1);
  const animRef = useRef<ReturnType<typeof setInterval>>(null);

  const simData = useMemo(
    () => generateSimDataDeterministic(dailyMinutes, consistencyRate, days),
    [dailyMinutes, consistencyRate, days]
  );

  const displayData = useMemo(
    () => (animStep >= 0 ? simData.slice(0, animStep + 1) : simData),
    [simData, animStep]
  );

  const finalConsistent = simData[simData.length - 1]?.consistent || 0;
  const finalSprintCrash = simData[simData.length - 1]?.sprintCrash || 0;
  const consistentHours = (finalConsistent / 60).toFixed(0);
  const sprintCrashHours = (finalSprintCrash / 60).toFixed(0);

  const runSimulation = () => {
    setIsAnimating(true);
    setAnimStep(0);
    let step = 0;
    const totalSteps = simData.length - 1;
    const stepSize = Math.max(1, Math.floor(totalSteps / 100));

    if (animRef.current) clearInterval(animRef.current);
    animRef.current = setInterval(() => {
      step += stepSize;
      if (step >= totalSteps) {
        step = totalSteps;
        if (animRef.current) clearInterval(animRef.current);
        setIsAnimating(false);
      }
      setAnimStep(step);
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, []);

  return (
    <SectionWrapper id="goal-simulator" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-purple mb-4">
            Section V
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light mb-4">
            Run Your Own Race
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            What does your daily practice look like over time?
            Set your effort and consistency, then watch consistent practice outpace
            the sprint-and-crash cycle.
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 bg-bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Daily Effort</span>
              <span className="font-mono text-sm text-correct-green">{dailyMinutes} min</span>
            </label>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={dailyMinutes}
              onChange={(e) => setDailyMinutes(parseInt(e.target.value))}
              className="w-full"
              disabled={isAnimating}
            />
          </div>
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Consistency Rate</span>
              <span className="font-mono text-sm text-correct-green">{consistencyRate}%</span>
            </label>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={consistencyRate}
              onChange={(e) => setConsistencyRate(parseInt(e.target.value))}
              className="w-full"
              disabled={isAnimating}
            />
          </div>
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Time Horizon</span>
              <span className="font-mono text-sm text-accent-purple">{days} days</span>
            </label>
            <input
              type="range"
              min="30"
              max="365"
              step="15"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full"
              disabled={isAnimating}
            />
          </div>
        </div>

        {/* Simulate button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={runSimulation}
            disabled={isAnimating}
            className="flex items-center gap-2 px-8 py-3 bg-correct-green text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[44px]"
          >
            <TrendingUp size={16} />
            Simulate Your Race
          </button>
        </div>

        {/* Chart */}
        <div className="bg-bg-card border border-border rounded-2xl p-4 sm:p-8">
          <div className="h-[350px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="day"
                  stroke="var(--text-tertiary)"
                  tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
                  label={{ value: "Days", position: "insideBottom", offset: -5, fontSize: 12, fill: "var(--text-tertiary)" }}
                />
                <YAxis
                  stroke="var(--text-tertiary)"
                  tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
                  label={{ value: "Total Minutes", angle: -90, position: "insideLeft", offset: 10, fontSize: 12, fill: "var(--text-tertiary)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                  }}
                  formatter={(value: number | undefined, name: string | undefined) => {
                    const v = value ?? 0;
                    return [
                      `${Math.round(v / 60)}h ${v % 60}m`,
                      name === "consistent" ? "Consistent Practice" : "Sprint & Crash",
                    ];
                  }}
                />
                <Legend
                  formatter={(value: string) =>
                    value === "consistent" ? "Consistent Practice" : "Sprint & Crash"
                  }
                  wrapperStyle={{ fontSize: "12px", fontFamily: "var(--font-mono)" }}
                />
                <Line
                  type="monotone"
                  dataKey="consistent"
                  stroke="var(--correct-green)"
                  strokeWidth={2.5}
                  dot={false}
                  name="consistent"
                />
                <Line
                  type="stepAfter"
                  dataKey="sprintCrash"
                  stroke="var(--backward-orange)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="6 3"
                  name="sprintCrash"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-correct-green/10 border border-correct-green/30 rounded-xl p-6 text-center">
            <Calculator size={20} className="mx-auto text-correct-green mb-2" />
            <p className="text-xs font-mono uppercase tracking-wider text-correct-green mb-1">
              Consistent Practice Total
            </p>
            <p className="text-4xl font-mono font-bold text-correct-green">
              {consistentHours}h
            </p>
            <p className="text-sm text-text-secondary mt-1">
              {dailyMinutes} min/day at {consistencyRate}% consistency
            </p>
          </div>
          <div className="bg-backward-orange/10 border border-backward-orange/30 rounded-xl p-6 text-center">
            <Calculator size={20} className="mx-auto text-backward-orange mb-2" />
            <p className="text-xs font-mono uppercase tracking-wider text-backward-orange mb-1">
              Sprint &amp; Crash Total
            </p>
            <p className="text-4xl font-mono font-bold text-backward-orange">
              {sprintCrashHours}h
            </p>
            <p className="text-sm text-text-secondary mt-1">
              3x effort for 5 days, then 9 days off
            </p>
          </div>
        </div>

        <p className="text-center text-text-tertiary text-sm mt-6 max-w-lg mx-auto">
          The sprint-and-crash pattern looks productive in short bursts, but the consistent
          approach accumulates more total practice time over any meaningful horizon.
        </p>
      </div>
    </SectionWrapper>
  );
}
