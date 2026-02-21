"use client";

interface EngagementScoreProps {
  score: number;
}

export default function EngagementScore({ score }: EngagementScoreProps) {
  const tier =
    score <= 30
      ? { bg: "bg-red-500/10", text: "text-red-500 dark:text-red-400" }
      : score <= 60
      ? { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" }
      : { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${tier.bg} ${tier.text}`}
    >
      {score}
    </span>
  );
}
