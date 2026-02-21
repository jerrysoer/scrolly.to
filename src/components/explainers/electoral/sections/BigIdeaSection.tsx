"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function BigIdeaSection() {
  return (
    <SectionWrapper id="big-idea">
      <div className="space-y-12">
        {/* Title */}
        <h2 className="text-4xl font-heading font-bold text-text-primary text-center">
          The Big Idea
        </h2>

        {/* Analogy paragraph */}
        <p className="text-lg text-text-secondary leading-relaxed">
          Imagine a classroom where students vote for class president — but instead of counting every hand, each table gets a number of votes based on how many students sit there. The table captain casts all the table&apos;s votes for whoever most students at that table chose. That&apos;s the Electoral College.
        </p>

        {/* Stat box */}
        <div className="text-center space-y-4">
          <div className="stat-hero">538</div>
          <p className="text-2xl font-heading font-semibold text-text-primary">
            Total Electors
          </p>
          <p className="text-lg text-text-secondary">
            270 needed to win
          </p>
        </div>

        {/* Breakdown visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
          {/* House Seats */}
          <div className="rounded-lg bg-bg-card border border-border p-6 text-center space-y-2">
            <div className="font-mono text-3xl font-bold text-accent-primary">
              435
            </div>
            <div className="text-sm text-text-tertiary">
              House Seats
            </div>
          </div>

          {/* Senate Seats */}
          <div className="rounded-lg bg-bg-card border border-border p-6 text-center space-y-2">
            <div className="font-mono text-3xl font-bold text-accent-secondary">
              100
            </div>
            <div className="text-sm text-text-tertiary">
              Senate Seats
            </div>
          </div>

          {/* DC Electors */}
          <div className="rounded-lg bg-bg-card border border-border p-6 text-center space-y-2 sm:col-span-1 col-span-1">
            <div className="font-mono text-3xl font-bold text-accent-tertiary">
              3
            </div>
            <div className="text-sm text-text-tertiary">
              DC Electors
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
