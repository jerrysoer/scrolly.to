"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { RefreshCw } from "lucide-react";

export default function WinnerTakeAllSection() {
  const [flipped, setFlipped] = useState(false);

  const candidateAPercent = flipped ? 48.8 : 51.2;
  const candidateBPercent = flipped ? 51.2 : 48.8;

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <SectionWrapper id="winner-take-all" layout="full-bleed">
      <div className="max-w-5xl mx-auto space-y-12 px-4">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-heading font-bold text-text-primary">
            Winner Takes All
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            In 48 states plus DC, the candidate who wins the popular vote — even by
            a single vote — gets ALL of that state&apos;s electoral votes. This is
            the most consequential rule in American elections.
          </p>
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-8 space-y-6 card-glow max-w-2xl mx-auto">
          <h3 className="text-2xl font-heading font-bold text-text-primary text-center">
            California — 54 Electoral Votes
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-semibold">Candidate A</span>
                <span className="text-text-secondary font-mono">{candidateAPercent}%</span>
              </div>
              <div className="w-full bg-bg-secondary rounded-full h-8 overflow-hidden">
                <div
                  className="bg-accent-blue h-full flex items-center justify-end pr-3 transition-all duration-500"
                  style={{ width: `${candidateAPercent}%` }}
                >
                  <span className="text-white text-sm font-semibold">
                    {candidateAPercent}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-semibold">Candidate B</span>
                <span className="text-text-secondary font-mono">{candidateBPercent}%</span>
              </div>
              <div className="w-full bg-bg-secondary rounded-full h-8 overflow-hidden">
                <div
                  className="bg-accent-red h-full flex items-center justify-end pr-3 transition-all duration-500"
                  style={{ width: `${candidateBPercent}%` }}
                >
                  <span className="text-white text-sm font-semibold">
                    {candidateBPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary rounded-lg p-4 text-center">
            <p className="font-bold text-accent-primary">
              Result: Candidate {flipped ? "B" : "A"} gets ALL 54 electoral votes.
              Candidate {flipped ? "A" : "B"} gets 0.
            </p>
          </div>

          <button
            onClick={handleFlip}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
            aria-label="Flip vote percentages"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Flip the Vote</span>
          </button>
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-8 space-y-4 card-glow max-w-2xl mx-auto">
          <h3 className="text-xl font-heading font-semibold text-accent-secondary">
            The Exceptions: Maine &amp; Nebraska
          </h3>
          <p className="text-text-secondary">
            Only Maine (4 EVs) and Nebraska (5 EVs) split their votes. Each
            congressional district awards 1 elector; the statewide winner gets 2
            bonus electors. In 2020, Biden won Nebraska&apos;s 2nd district (Omaha),
            picking up 1 electoral vote in an otherwise red state.
          </p>

          <div className="flex items-center gap-3 pt-4">
            <span className="text-text-tertiary text-sm">Nebraska 2020:</span>
            <div className="flex gap-2" role="img" aria-label="Nebraska electoral votes: 4 Republican, 1 Democratic">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-accent-red">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-accent-red">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-accent-red">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-accent-red">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-accent-blue">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
