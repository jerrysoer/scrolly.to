"use client";

import { useState, useMemo } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { matchClusters, popularHashtags } from "@/lib/explainers/tiktok-clusters";
import { Hash, Type, Music, Eye, X } from "lucide-react";

export default function VideoInfoSection() {
  const [caption, setCaption] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const matchedClusters = useMemo(
    () => matchClusters(caption, selectedHashtags),
    [caption, selectedHashtags]
  );

  const toggleHashtag = (tag: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const removeHashtag = (tag: string) => {
    setSelectedHashtags((prev) => prev.filter((t) => t !== tag));
  };

  const analysisLayers = [
    {
      icon: Type,
      label: "Captions",
      description: "Natural language processing extracts topics, sentiment, and entities from video captions.",
      color: "var(--forward-blue)",
    },
    {
      icon: Hash,
      label: "Hashtags",
      description: "Hashtags map directly to interest clusters. Even niche tags help TikTok classify content.",
      color: "var(--accent-purple)",
    },
    {
      icon: Music,
      label: "Sounds",
      description: "Trending sounds connect videos across creators. Using a sound links you to its audience.",
      color: "var(--accent-amber)",
    },
    {
      icon: Eye,
      label: "Visual Content",
      description: "Computer vision identifies objects, scenes, text overlays, and even facial expressions.",
      color: "var(--correct-green)",
    },
  ];

  return (
    <SectionWrapper id="video-info">
      <div className="text-center mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-purple mb-3">
          Section 03
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Reading Between the Frames
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          Before a video reaches any feed, TikTok has already dissected it —
          analyzing four distinct layers of information to classify its content
          into interest clusters.
        </p>
      </div>

      {/* Analysis layers */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12">
        {analysisLayers.map((layer) => {
          const Icon = layer.icon;
          return (
            <div
              key={layer.label}
              className="rounded-xl border border-border bg-bg-card p-5 transition-all hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `color-mix(in srgb, ${layer.color} 15%, transparent)` }}
                >
                  <span style={{ color: layer.color }}><Icon className="h-4 w-4" /></span>
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-text-primary">
                    {layer.label}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-text-secondary leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive: Caption + Hashtag mapper */}
      <div className="rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
        <h3 className="font-serif text-xl font-semibold text-text-primary mb-1">
          Try it: Map a video to interest clusters
        </h3>
        <p className="font-sans text-sm text-text-tertiary mb-6">
          Type a caption and select hashtags to see which clusters TikTok would assign.
        </p>

        {/* Caption input */}
        <div className="mb-5">
          <label className="font-sans text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2 block">
            Video Caption
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g., Easy 5-minute pasta recipe for busy weeknights"
            className="w-full rounded-lg border border-border bg-bg-primary px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-forward-blue focus:ring-1 focus:ring-forward-blue transition-colors"
          />
        </div>

        {/* Selected hashtags */}
        {selectedHashtags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedHashtags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-forward-blue/10 px-3 py-1 font-mono text-xs text-forward-blue"
              >
                {tag}
                <button
                  onClick={() => removeHashtag(tag)}
                  className="hover:text-backward-orange transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Hashtag picker */}
        <div className="mb-6">
          <label className="font-sans text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2 block">
            Add Hashtags
          </label>
          <div className="flex flex-wrap gap-2">
            {popularHashtags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleHashtag(tag)}
                className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-all ${
                  selectedHashtags.includes(tag)
                    ? "border-forward-blue bg-forward-blue/10 text-forward-blue"
                    : "border-border text-text-secondary hover:border-text-tertiary hover:text-text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="border-t border-border pt-6">
          <h4 className="font-sans text-xs font-medium text-text-tertiary uppercase tracking-wider mb-4">
            Matched Interest Clusters
          </h4>
          {matchedClusters.length === 0 ? (
            <p className="font-sans text-sm text-text-tertiary italic">
              Type a caption or select hashtags to see cluster matches...
            </p>
          ) : (
            <div className="space-y-3">
              {matchedClusters.map(({ cluster, score }) => {
                const maxScore = Math.max(...matchedClusters.map((c) => c.score));
                const pct = Math.round((score / maxScore) * 100);
                return (
                  <div key={cluster.id} className="animate-slide-up">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-sans text-sm font-medium text-text-primary">
                        {cluster.name}
                      </span>
                      <span
                        className="font-mono text-xs font-medium"
                        style={{ color: cluster.color }}
                      >
                        {pct}% match
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: cluster.color,
                        }}
                      />
                    </div>
                    {cluster.relatedClusters.length > 0 && (
                      <p className="mt-1 font-sans text-xs text-text-tertiary">
                        Also linked to: {cluster.relatedClusters.join(", ")}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
