"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import {
  coldStartSequence,
  coldStartPhases,
  timelineMinutes,
} from "@/lib/explainers/tiktok-cold-start";
import { Play, SkipForward, Heart, Share2, Eye, Clock } from "lucide-react";

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  watched: Eye,
  skipped: SkipForward,
  liked: Heart,
  shared: Share2,
};

const actionColors: Record<string, string> = {
  watched: "var(--forward-blue)",
  skipped: "var(--text-tertiary)",
  liked: "var(--backward-orange)",
  shared: "var(--correct-green)",
};

export default function ColdStartSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const video = coldStartSequence[currentStep];
  const phase = coldStartPhases.find(
    (p) =>
      video.id >= p.videoRange[0] && video.id <= p.videoRange[1]
  );

  const startAutoPlay = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= coldStartSequence.length) {
        clearInterval(interval);
        setIsPlaying(false);
        return;
      }
      setCurrentStep(step);
    }, 2000);
  };

  const ActionIcon = actionIcons[video.userAction];

  return (
    <SectionWrapper id="cold-start">
      <div className="text-center mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-3">
          Section 04
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Cold Start Sprint
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          A brand-new user opens TikTok for the first time. Within{" "}
          <span className="font-semibold text-accent-amber">~30 minutes</span> and
          roughly 8 videos, the algorithm has built a working model of their
          interests. Here is how.
        </p>
      </div>

      {/* Phase indicator */}
      <div className="mb-8 flex justify-center gap-3">
        {coldStartPhases.map((p) => (
          <div
            key={p.name}
            className={`rounded-full px-4 py-1.5 font-sans text-xs font-medium transition-all ${
              phase?.name === p.name
                ? "border-2 text-text-primary"
                : "border border-border text-text-tertiary"
            }`}
            style={{
              borderColor: phase?.name === p.name ? p.color : undefined,
              backgroundColor:
                phase?.name === p.name
                  ? `color-mix(in srgb, ${p.color} 10%, transparent)`
                  : undefined,
            }}
          >
            {p.name}
          </div>
        ))}
      </div>

      {/* Timeline slider */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="h-4 w-4 text-text-tertiary" />
          <span className="font-mono text-xs text-text-tertiary">
            ~{timelineMinutes[currentStep]} min into session
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={0}
            max={coldStartSequence.length - 1}
            value={currentStep}
            onChange={(e) => {
              setCurrentStep(Number(e.target.value));
              setIsPlaying(false);
            }}
            className="w-full"
            aria-label="Cold start timeline"
          />
          {/* Step markers */}
          <div className="flex justify-between px-1 mt-1">
            {coldStartSequence.map((v, i) => (
              <span
                key={i}
                className={`font-mono text-[10px] ${
                  i === currentStep ? "text-forward-blue font-medium" : "text-text-tertiary"
                }`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Current video card */}
      <div className="rounded-2xl border border-border bg-bg-card p-6 sm:p-8 animate-slide-up" key={currentStep}>
        <div className="flex items-start gap-5">
          {/* Video thumbnail */}
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-4xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${phase?.color || "var(--border)"} 12%, transparent)`,
            }}
          >
            {video.thumbnail}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase"
                style={{
                  color: phase?.color,
                  backgroundColor: `color-mix(in srgb, ${phase?.color || "var(--border)"} 12%, transparent)`,
                }}
              >
                {video.category}
              </span>
              <span className="font-mono text-xs text-text-tertiary">
                Video #{video.id}
              </span>
            </div>
            <h3 className="font-sans text-base font-semibold text-text-primary mb-1">
              {video.title}
            </h3>
            <p className="font-sans text-sm text-text-tertiary">{video.creator} &middot; {video.duration}</p>
          </div>
        </div>

        {/* User action */}
        <div className="mt-5 flex items-center gap-3 rounded-lg bg-bg-secondary p-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{
              backgroundColor: `color-mix(in srgb, ${actionColors[video.userAction]} 15%, transparent)`,
            }}
          >
            {ActionIcon && (
              <span style={{ color: actionColors[video.userAction] }}>
                <ActionIcon className="h-4 w-4" />
              </span>
            )}
          </div>
          <div>
            <span className="font-sans text-sm font-medium text-text-primary capitalize">
              {video.userAction}
            </span>
            <span className="font-sans text-sm text-text-tertiary">
              {" "}&middot; {video.watchPercent}% watched
            </span>
          </div>
        </div>

        {/* Purpose and learning */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <span className="font-sans text-xs font-medium text-text-tertiary uppercase tracking-wider block mb-1">
              Why this was served
            </span>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              {video.purpose}
            </p>
          </div>
          <div>
            <span className="font-sans text-xs font-medium text-text-tertiary uppercase tracking-wider block mb-1">
              What the algorithm learned
            </span>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              {video.algorithmLearning}
            </p>
          </div>
        </div>
      </div>

      {/* Auto-play button */}
      <div className="mt-6 text-center">
        <button
          onClick={startAutoPlay}
          disabled={isPlaying}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-5 py-2.5 font-sans text-sm font-medium text-text-primary shadow-sm transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="h-4 w-4" />
          {isPlaying ? "Playing..." : "Watch the cold start unfold"}
        </button>
      </div>

      {/* Phase description */}
      {phase && (
        <div className="mt-8 text-center">
          <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
            <span className="font-semibold" style={{ color: phase.color }}>
              {phase.name} phase:
            </span>{" "}
            {phase.description}
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
