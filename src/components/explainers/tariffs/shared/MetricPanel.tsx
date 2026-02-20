"use client";

import { useEffect, useRef, useState } from "react";

export interface Metric {
  value: string;
  label: string;
  trend?: "positive" | "negative" | "neutral" | "warning";
  trendText?: string;
}

interface MetricPanelProps {
  metrics: Metric[];
  title?: string;
  className?: string;
}

export default function MetricPanel({
  metrics,
  title,
  className = "",
}: MetricPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`mx-auto max-w-4xl px-4 sm:px-6 ${className}`}>
      {title && (
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          {title}
        </p>
      )}

      <div className="metric-panel">
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={`metric-cell transition-all duration-500 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
          >
            <span className={`metric-value ${metric.trend ?? "neutral"}`}>
              {metric.value}
            </span>
            <span className="metric-label">{metric.label}</span>
            {metric.trendText && (
              <span
                className={`metric-trend ${
                  metric.trend === "positive"
                    ? "text-accent-green"
                    : metric.trend === "negative"
                    ? "text-accent-red"
                    : metric.trend === "warning"
                    ? "text-accent-amber"
                    : "text-text-tertiary"
                }`}
              >
                {metric.trendText}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
