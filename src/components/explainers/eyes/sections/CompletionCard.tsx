"use client";

import { useState } from "react";
import { Check, Share2, ExternalLink } from "lucide-react";

export default function CompletionCard() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const text =
      "Color doesn't exist. Your brain invents it. Here's the science — with an RGB mixer you can play with. 👁️ " +
      window.location.href;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-12">
      <div className="rounded-2xl border border-border bg-bg-card p-8 text-center shadow-sm">
        {/* Three overlapping circles icon */}
        <div className="flex justify-center mb-4" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="20" cy="20" r="12" fill="var(--cone-red)" opacity="0.4" />
            <circle cx="28" cy="20" r="12" fill="var(--cone-green)" opacity="0.4" />
            <circle cx="24" cy="28" r="12" fill="var(--cone-blue)" opacity="0.4" />
          </svg>
        </div>

        <h3 className="font-serif text-xl font-bold text-text-primary mb-2">
          You explored it all
        </h3>
        <p className="font-sans text-sm text-text-secondary mb-6 leading-relaxed">
          Color isn&rsquo;t out there in the world. It&rsquo;s a story your brain tells itself based on three little detectors.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={share}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary text-bg-primary px-5 py-3 text-sm font-semibold transition-all hover:opacity-90 min-h-[44px]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Link copied!
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                Copy share link
              </>
            )}
          </button>
          <a
            href="https://scrolly.to"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-bg-card text-text-secondary px-5 py-3 text-sm font-semibold transition-all hover:border-forward-blue hover:text-forward-blue min-h-[44px]"
          >
            <ExternalLink className="h-4 w-4" />
            See more explainers
          </a>
        </div>
      </div>
    </div>
  );
}
