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
      <div className="p-8 text-center text-text-muted text-sm">
        No activity yet.
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl border border-border bg-card-bg">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
        Recent Activity
      </h3>
      <div className="space-y-0">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
          >
            {/* Timeline dot */}
            <div className="shrink-0 w-2 h-2 rounded-full bg-accent opacity-60" />

            {/* Content */}
            <div className="min-w-0 flex-1">
              {event.explainer_url ? (
                <a href={event.explainer_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-text-secondary underline decoration-border hover:decoration-text-secondary transition-colors">
                  {event.explainer_name}
                </a>
              ) : (
                <span className="text-sm font-medium text-text-secondary">
                  {event.explainer_name}
                </span>
              )}
              <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                <span>{extractDomain(event.referrer)}</span>
                <span className="opacity-40">&middot;</span>
                <span className="capitalize">{event.device}</span>
                <span className="opacity-40">&middot;</span>
                <span>{event.browser}</span>
              </div>
            </div>

            {/* Time */}
            <span className="shrink-0 text-xs text-text-muted font-mono">
              {timeAgo(event.created_at)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
