"use client";

import { RecentEvent } from "@/lib/types";
import { timeAgo } from "@/lib/format";

interface ActivityFeedProps {
  events: RecentEvent[];
}

function extractDomain(referrer: string | null): string {
  if (!referrer) return "Direct";
  try {
    return new URL(referrer).hostname.replace("www.", "");
  } catch {
    return "Direct";
  }
}

export default function ActivityFeed({ events }: ActivityFeedProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No activity yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Recent Activity
      </h3>
      <div className="space-y-0">
        {events.map((event, i) => (
          <div
            key={event.id}
            className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0 group"
          >
            {/* Timeline */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-50 group-hover:opacity-100 transition-opacity" />
              {i < events.length - 1 && (
                <div className="w-px h-full bg-border/40 mt-0.5" />
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {event.explainer_url ? (
                <a
                  href={event.explainer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                >
                  {event.explainer_name}
                </a>
              ) : (
                <span className="text-sm font-medium text-text-secondary">
                  {event.explainer_name}
                </span>
              )}
              <div className="flex items-center gap-1.5 text-[11px] text-text-muted mt-0.5">
                <span>{extractDomain(event.referrer)}</span>
                <span className="opacity-30">·</span>
                <span className="capitalize">{event.device}</span>
                <span className="opacity-30">·</span>
                <span>{event.browser}</span>
              </div>
            </div>

            {/* Time */}
            <span className="shrink-0 text-[11px] text-text-muted font-mono tabular-nums">
              {timeAgo(event.created_at)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
