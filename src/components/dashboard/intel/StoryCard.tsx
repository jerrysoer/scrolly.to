"use client";

import { Story } from "@/lib/types";
import { timeAgo } from "@/lib/format";

interface StoryCardProps {
  story: Story;
  index: number;
  onClick: () => void;
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export default function StoryCard({ story, index, onClick }: StoryCardProps) {
  const hostname = getHostname(story.url);
  const isHigh = story.score >= 8;

  return (
    <button
      onClick={onClick}
      className="group w-full text-left px-3.5 py-3 rounded-lg border border-border bg-card-bg hover:bg-card-hover hover:border-border-strong transition-all duration-150 cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Meta row: favicon + source + time + score */}
      <div className="flex items-center gap-2 mb-1.5">
        <img
          src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=16`}
          alt=""
          width={14}
          height={14}
          className="shrink-0 rounded-sm opacity-70"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <span className="text-xs font-medium text-text-muted truncate">
          {story.source}
        </span>
        <span className="text-text-muted opacity-40 text-xs">&middot;</span>
        <span className="text-xs text-text-muted shrink-0">
          {timeAgo(story.published)}
        </span>
        <span
          className={`ml-auto shrink-0 font-mono text-xs font-medium px-1.5 py-0.5 rounded ${
            isHigh
              ? "bg-score-high-bg text-score-high-text"
              : "bg-score-bg text-score-text"
          }`}
          style={isHigh ? { animation: "score-pulse 3s ease-in-out infinite" } : undefined}
        >
          {story.score.toFixed(1)}
        </span>
      </div>

      {/* Title — 2 lines max */}
      <h3 className="text-[13.5px] font-medium leading-snug text-text line-clamp-2 mb-1 group-hover:text-accent transition-colors duration-150">
        {story.title}
      </h3>

      {/* Teaser — 1 line */}
      <p className="text-xs text-text-muted leading-relaxed line-clamp-1">
        {story.teaser}
      </p>

      {/* Engagement signals */}
      {story.engagement && story.engagement.length > 0 && (
        <div className="flex items-center gap-2.5 mt-2 pt-2 border-t border-border">
          {story.engagement.map((e) => (
            <span key={e.platform} className="flex items-center gap-1 text-[10px] text-text-muted">
              <span className="font-medium">{e.platform === "hn" ? "HN" : e.platform === "reddit" ? "Reddit" : e.platform === "github" ? "GH" : e.platform}</span>
              {e.points != null && (
                <span className="flex items-center gap-0.5">
                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M8 2l2.4 5 5.6.8-4 3.9.9 5.3L8 14l-4.9 3 .9-5.3-4-3.9 5.6-.8z" fill="currentColor"/></svg>
                  {e.points.toLocaleString()}
                </span>
              )}
              {e.comments != null && (
                <span className="flex items-center gap-0.5">
                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v8H5l-3 3V3z" stroke="currentColor" strokeWidth="1.5"/></svg>
                  {e.comments.toLocaleString()}
                </span>
              )}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
