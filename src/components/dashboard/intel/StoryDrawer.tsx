"use client";

import { useEffect, useRef } from "react";
import { Story } from "@/lib/types";
import { timeAgo } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";
import CopyBriefButton from "./CopyBriefButton";

interface StoryDrawerProps {
  story: Story | null;
  onClose: () => void;
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export default function StoryDrawer({ story, onClose }: StoryDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!story) return;
    trackEvent("story-expanded", { title: story.title, source: story.source });

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [story, onClose]);

  // Focus trap
  useEffect(() => {
    if (story && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [story]);

  if (!story) return null;

  const hostname = getHostname(story.url);
  const isHigh = story.score >= 8;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-backdrop"
        style={{ animation: "fade-in 200ms ease-out" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-label={story.title}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-drawer-bg border-l border-border overflow-y-auto outline-none"
        style={{
          animation: "slide-in-right 280ms cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "-8px 0 32px var(--drawer-shadow)",
        }}
      >
        <div className="p-6 sm:p-8">
          {/* Close button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-border-strong text-text-muted hover:text-text transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=16`}
              alt=""
              width={14}
              height={14}
              className="rounded-sm opacity-70"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <span className="text-sm font-medium text-text-muted">{story.source}</span>
            <span className="text-text-muted opacity-40">&middot;</span>
            <span className="text-sm text-text-muted">{timeAgo(story.published)}</span>
            <span
              className={`ml-auto font-mono text-sm font-medium px-2 py-0.5 rounded ${
                isHigh
                  ? "bg-score-high-bg text-score-high-text"
                  : "bg-score-bg text-score-text"
              }`}
            >
              {story.score.toFixed(1)}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-xl sm:text-2xl font-medium leading-snug text-text mb-4">
            {story.title}
          </h2>

          {/* Summary */}
          <p className="text-sm leading-relaxed text-text-secondary mb-6">
            {story.summary}
          </p>

          {/* Key Facts */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
              Key Facts
            </h3>
            <ul className="space-y-2">
              {story.key_facts.map((fact, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-text-secondary">
                  <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-surface text-xs font-mono font-medium text-text-muted">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagement */}
          {story.engagement && story.engagement.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                Traction
              </h3>
              <div className="flex flex-wrap gap-2">
                {story.engagement.map((e) => (
                  <a
                    key={e.platform}
                    href={e.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-text-secondary hover:border-border-strong transition-colors"
                    onClick={(ev) => { if (!e.url) ev.preventDefault(); }}
                  >
                    <span className="font-semibold">
                      {e.platform === "hn" ? "Hacker News" : e.platform === "reddit" ? "Reddit" : e.platform === "github" ? "GitHub" : e.platform}
                    </span>
                    {e.points != null && (
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 2l2.4 5 5.6.8-4 3.9.9 5.3L8 14l-4.9 3 .9-5.3-4-3.9 5.6-.8z" fill="currentColor" className="text-score-text"/></svg>
                        {e.points.toLocaleString()} pts
                      </span>
                    )}
                    {e.comments != null && (
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v8H5l-3 3V3z" stroke="currentColor" strokeWidth="1.5"/></svg>
                        {e.comments.toLocaleString()}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Scrolly Angle */}
          <div className="mb-8 p-4 rounded-lg bg-score-bg border border-border">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-score-text mb-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l2 5h5l-4 3.5 1.5 5L8 11.5 3.5 14.5 5 9.5 1 6h5l2-5z" fill="currentColor" />
              </svg>
              Scrolly Angle
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              {story.scrolly_angle}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <CopyBriefButton story={story} />
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-border hover:border-border-strong text-text-secondary hover:text-text transition-colors"
            >
              Read Source
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M6 3h7v7M13 3L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
