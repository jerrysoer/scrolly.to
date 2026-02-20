"use client";

import { formatNumber } from "@/lib/format";
import type { TrendIndicator, WaitlistEntry } from "@/lib/types";

interface WaitlistCardProps {
  total: number;
  periodCount: number;
  trend: TrendIndicator | null;
  recentSignups: WaitlistEntry[];
  days: number;
}

function obfuscateEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const first = local[0] ?? "";
  const last = local.length > 1 ? local[local.length - 1] : "";
  return `${first}***${last}@${domain}`;
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function TrendArrow({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "up" ? (
        <path d="M7 17l5-5 5 5M12 12V3" />
      ) : (
        <path d="M7 7l5 5 5-5M12 12v9" />
      )}
    </svg>
  );
}

export default function WaitlistCard({
  total,
  periodCount,
  trend,
  recentSignups,
  days,
}: WaitlistCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-4">
        Waitlist
      </p>

      <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10">
        {/* Total */}
        <div>
          <span className="font-display text-4xl font-medium tracking-tight tabular-nums text-text">
            {formatNumber(total)}
          </span>
          <p className="text-[11px] text-text-muted mt-1">Total signups</p>
        </div>

        {/* Period count + trend */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-medium tracking-tight tabular-nums text-text">
              {formatNumber(periodCount)}
            </span>
            {trend && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  trend.value > 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : trend.value < 0
                    ? "bg-red-500/10 text-red-500"
                    : "text-text-muted"
                }`}
              >
                {trend.value !== 0 && (
                  <TrendArrow direction={trend.value > 0 ? "up" : "down"} />
                )}
                <span className="tabular-nums">
                  {trend.value > 0 ? "+" : ""}
                  {trend.value}%
                </span>
              </span>
            )}
          </div>
          <p className="text-[11px] text-text-muted mt-1">Last {days} days</p>
        </div>

        {/* Recent signups */}
        {recentSignups.length > 0 && (
          <div className="sm:ml-auto">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-2">
              Recent
            </p>
            <ul className="space-y-1">
              {recentSignups.map((entry) => (
                <li
                  key={entry.created_at}
                  className="flex items-center justify-between gap-4 text-[12px]"
                >
                  <span className="text-text font-mono truncate max-w-[180px]">
                    {obfuscateEmail(entry.email)}
                  </span>
                  <span className="text-text-muted whitespace-nowrap">
                    {relativeTime(entry.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
