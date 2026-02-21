"use client";

import { useState } from "react";
import { Brain, Eye, Video, FileText, Wrench, FlaskConical, LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { capabilities, Capability } from "@/lib/explainers/seed2-capabilities";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Eye,
  Video,
  FileText,
  Wrench,
  FlaskConical,
};

function CapabilityCard({
  capability,
  expanded,
  onToggle,
}: {
  capability: Capability;
  expanded: boolean;
  onToggle: () => void;
}) {
  const Icon = iconMap[capability.icon] ?? Brain;

  return (
    <div className="rounded-xl border border-border bg-bg-card p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${capability.color}18` }}
        >
          <Icon
            className="h-5 w-5"
            style={{ color: capability.color }}
          />
        </div>
        <h3 className="font-serif text-lg font-semibold text-text-primary">
          {capability.title}
        </h3>
      </div>

      {/* Summary */}
      <p className="font-sans text-sm leading-relaxed text-text-secondary">
        {capability.summary}
      </p>

      {/* Expand/collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 self-start rounded-md px-2 py-1 font-sans text-xs font-medium text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-secondary"
        aria-expanded={expanded}
      >
        {expanded ? (
          <>
            <ChevronUp className="h-3.5 w-3.5" />
            Hide benchmarks
          </>
        ) : (
          <>
            <ChevronDown className="h-3.5 w-3.5" />
            Show benchmarks
          </>
        )}
      </button>

      {/* Expandable content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border pt-3 flex flex-col gap-2">
            {/* Benchmark list */}
            <ul className="flex flex-col gap-1">
              {capability.benchmarks.map((bench, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span
                    className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: capability.color }}
                  />
                  <span className="font-mono text-xs text-text-secondary">
                    {bench}
                  </span>
                </li>
              ))}
            </ul>

            {/* Insight */}
            <p className="font-sans text-sm italic leading-relaxed text-text-tertiary">
              {capability.insight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CapabilitiesSection() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <SectionWrapper id="capabilities">
      {/* Analogy opener */}
      <p className="mb-3 font-serif text-base italic text-text-tertiary">
        Most AI models are like calculators that only handle numbers. Seed2.0 reads documents,
        watches videos, and uses tools &mdash; more like a research assistant than a calculator.
      </p>

      {/* Heading */}
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        Beyond Text
      </h2>

      {/* Subtitle */}
      <p className="mt-3 max-w-2xl font-sans text-base text-text-secondary sm:text-lg">
        Seed2.0 is a natively multimodal model &mdash; it processes text, images, video, and documents
        in a single unified system, with tool use built in from the ground up.
      </p>

      {/* 6-card grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {capabilities.map((cap) => (
          <CapabilityCard
            key={cap.id}
            capability={cap}
            expanded={expanded.has(cap.id)}
            onToggle={() => toggle(cap.id)}
          />
        ))}
      </div>

      {/* Why Should I Care? callout */}
      <div className="mt-8 border-l-2 border-forward-blue pl-4">
        <p className="font-serif text-sm italic leading-relaxed text-text-secondary">
          <span className="font-semibold not-italic text-text-primary">Why should I care?</span>{" "}
          The multimodal capabilities mean Seed2.0 can replace multiple specialized tools in your
          stack &mdash; vision, document processing, and tool use in a single API call.
        </p>
      </div>
    </SectionWrapper>
  );
}
