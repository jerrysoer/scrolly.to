"use client";

import { useState } from "react";
import { Story } from "@/lib/types";
import { buildBrief } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";

interface CopyBriefButtonProps {
  story: Story;
}

export default function CopyBriefButton({ story }: CopyBriefButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const brief = buildBrief(story);
    await navigator.clipboard.writeText(brief);
    setCopied(true);
    trackEvent("brief-copied", { title: story.title, source: story.source });
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
        copied
          ? "bg-copied-bg text-copied-text"
          : "bg-accent text-white hover:opacity-90"
      }`}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 11V3.5A.5.5 0 0 1 3.5 3H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Copy Brief
        </>
      )}
    </button>
  );
}
