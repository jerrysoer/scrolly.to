"use client";

import { useState, useEffect } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import PullQuote from "@/components/explainers/shared/PullQuote";
import { moneyBreakdown } from "../data/moneyBreakdown";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function Section4Money() {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimationProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("money-trail");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="rounded-lg border p-3 shadow-lg"
          style={{
            background: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            {data.category}
          </p>
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ${data.amount.toFixed(2)} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percentage,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percentage < 8) return null; // Don't show label if slice is too small

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-bold"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
      >
        {`${percentage}%`}
      </text>
    );
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {payload.map((entry: any, index: number) => (
          <div
            key={`legend-${index}`}
            className="flex items-center gap-3 rounded-lg p-3 transition-transform hover:scale-105"
            style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="h-4 w-4 flex-shrink-0 rounded-sm"
              style={{ background: entry.color }}
            />
            <div className="flex-1">
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {entry.value}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                ${entry.payload.amount.toFixed(2)} ({entry.payload.percentage}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Calculate the end angle for animation
  const getEndAngle = (index: number) => {
    let totalPercentage = 0;
    for (let i = 0; i <= index; i++) {
      totalPercentage += moneyBreakdown[i].percentage;
    }
    return (totalPercentage / 100) * 360 * animationProgress;
  };

  return (
    <SectionWrapper id="money-trail" layout="split-right">
      {/* Left side: Chart (60% on desktop) */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Price tag */}
          <div className="mb-8 text-center">
            <p
              className="text-5xl font-bold sm:text-6xl"
              style={{ color: "var(--color-forward-blue)" }}
            >
              $6
            </p>
            <p
              className="mt-2 text-sm font-medium"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Average price per box
            </p>
          </div>

          {/* Pie chart with center text */}
          <div className="relative w-full" style={{ height: "320px" }} suppressHydrationWarning>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={moneyBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={120}
                  innerRadius={60}
                  dataKey="percentage"
                  startAngle={90}
                  endAngle={90 + 360 * animationProgress}
                  paddingAngle={2}
                >
                  {moneyBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{
                        filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.1))`,
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center text - absolutely positioned over the donut hole */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Total
                </p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  100%
                </p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8">
            {renderLegend({ payload: moneyBreakdown.map(item => ({ value: item.category, payload: item, color: item.color })) })}
          </div>
        </div>
      </div>

      {/* Right side: Text (40% on desktop) */}
      <div className="flex flex-col justify-center">
        <h2
          className="mb-6 text-3xl font-bold leading-tight sm:text-4xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          Where does your $6 actually go?
        </h2>

        <p
          className="mb-8 text-lg leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          When you buy a box, the money doesn't just disappear. It goes to the
          girl who sold it, her troop, and her local council — for camps,
          trips, and adventures.
        </p>

        {/* Callout with pull-quote treatment */}
        <PullQuote
          quote="The girl at the booth gets about $1 from every box you buy. She's basically running a business."
          variant="pull-quote"
        />

        {/* Additional context */}
        <div
          className="mt-6 rounded-lg p-4"
          style={{
            background: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            The breakdown varies slightly by region, but the principle is the
            same: most of the money stays local. The baker gets the largest
            share to cover production costs, while troops earn money directly
            from their sales efforts.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
