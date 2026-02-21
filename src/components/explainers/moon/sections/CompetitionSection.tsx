"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { competitionTimeline } from "@/lib/explainers/moon";

export default function CompetitionSection() {
  return (
    <SectionWrapper id="competition" layout="split-left">
      {/* Left column: text */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          Section 7
        </p>

        <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
          The New Space Race
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
          It&rsquo;s not just the US anymore. China&rsquo;s space program has
          landed on the far side of the Moon, returned samples, and announced
          plans for a crewed landing by 2030.
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          India became the first country to land near the south pole. The EU,
          Japan, and South Korea all have lunar programs.
        </p>

        <blockquote className="pull-quote mt-8">
          The first country to extract resources from the Moon writes the rules
          for everyone else.
        </blockquote>

        {/* India callout */}
        <div className="mt-6 rounded-xl border border-amber/30 bg-bg-card p-5">
          <p className="font-mono text-xs font-semibold text-amber uppercase tracking-wide">
            {competitionTimeline.india.year}
          </p>
          <p className="mt-1 font-sans text-sm font-semibold text-text-primary">
            {competitionTimeline.india.event}
          </p>
          <p className="mt-1 font-sans text-xs text-text-secondary">
            {competitionTimeline.india.detail}
          </p>
        </div>
      </div>

      {/* Right column: parallel timelines */}
      <div className="grid grid-cols-2 gap-6">
        {/* US Timeline */}
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-space-blue">
            US &mdash; Artemis
          </p>
          <div className="relative mt-4 space-y-6">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-space-blue/30" />
            {competitionTimeline.us.map((item, i) => (
              <div key={i} className="relative flex items-start gap-4 pl-6">
                <span className="absolute left-0 top-1 block h-4 w-4 rounded-full border-2 border-space-blue bg-bg-primary" />
                <div>
                  <p className="font-mono text-xs font-bold text-space-blue">
                    {item.year}
                  </p>
                  <p className="font-sans text-xs text-text-secondary">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* China Timeline */}
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-amber">
            China &mdash; CNSA
          </p>
          <div className="relative mt-4 space-y-6">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-amber/30" />
            {competitionTimeline.china.map((item, i) => (
              <div key={i} className="relative flex items-start gap-4 pl-6">
                <span className="absolute left-0 top-1 block h-4 w-4 rounded-full border-2 border-amber bg-bg-primary" />
                <div>
                  <p className="font-mono text-xs font-bold text-amber">
                    {item.year}
                  </p>
                  <p className="font-sans text-xs text-text-secondary">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
