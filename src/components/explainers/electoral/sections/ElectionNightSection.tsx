"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

interface TimelineStep {
  title: string;
  date: string;
  description: string;
}

const steps: TimelineStep[] = [
  {
    title: "Election Day",
    date: "Early November",
    description:
      "Voters cast ballots. Media 'calls' states based on projections, but these are not official.",
  },
  {
    title: "States Certify",
    date: "Late November-December",
    description:
      "Each state certifies its results after counting all ballots, including mail-in and provisional votes.",
  },
  {
    title: "Electors Meet",
    date: "First Monday after Dec 12",
    description:
      "The 538 electors meet in their state capitals and cast their votes. This is when the Electoral College actually votes.",
  },
  {
    title: "Congress Counts",
    date: "January 6",
    description:
      "A joint session of Congress counts the electoral votes. The Vice President presides. Objections can be raised but rarely succeed.",
  },
  {
    title: "Winner Declared",
    date: "January 6",
    description:
      "The candidate with 270+ electoral votes is officially declared the winner.",
  },
  {
    title: "Inauguration",
    date: "January 20",
    description:
      "The new president is sworn in at the US Capitol. The peaceful transfer of power.",
  },
];

export default function ElectionNightSection() {
  const [activeStep, setActiveStep] = useState(0);

  const handlePrevious = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  return (
    <SectionWrapper id="election-night">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-heading font-bold text-text-primary">
            Election Night to Inauguration
          </h2>
          <p className="text-lg text-text-secondary">
            The journey from your ballot to a new president takes months, not
            hours.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="relative pl-8">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-border"
                  aria-hidden="true"
                />
              )}

              {/* Step indicator dot */}
              <div
                className={`
                  absolute left-0 top-2 w-8 h-8 rounded-full border-2
                  flex items-center justify-center
                  transition-all duration-300
                  ${
                    index === activeStep
                      ? "border-accent-primary bg-accent-primary"
                      : index < activeStep
                      ? "border-accent-secondary bg-accent-secondary"
                      : "border-border bg-bg-card"
                  }
                `}
                aria-hidden="true"
              >
                <div
                  className={`
                    w-3 h-3 rounded-full
                    ${
                      index === activeStep
                        ? "bg-white"
                        : index < activeStep
                        ? "bg-bg-card"
                        : "bg-border"
                    }
                  `}
                />
              </div>

              {/* Step card */}
              <button
                onClick={() => setActiveStep(index)}
                className={`
                  w-full text-left bg-bg-card rounded-lg p-5
                  transition-all duration-300
                  card-glow
                  ${
                    index === activeStep
                      ? "border-2 border-accent-primary scale-105"
                      : "border border-border opacity-70 hover:opacity-100"
                  }
                `}
                aria-label={`View step ${index + 1}: ${step.title}`}
                aria-current={index === activeStep ? "step" : undefined}
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-xl font-heading font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <span className="font-mono text-sm text-accent-secondary whitespace-nowrap">
                    {step.date}
                  </span>
                </div>
                <p
                  className={`
                    text-text-secondary transition-all duration-300
                    ${index === activeStep ? "text-base" : "text-sm"}
                  `}
                >
                  {step.description}
                </p>
              </button>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handlePrevious}
            disabled={activeStep === 0}
            className="
              flex items-center gap-2 px-6 py-3 rounded-lg
              bg-bg-card border border-border
              text-text-primary font-heading font-semibold
              hover:border-accent-primary hover:bg-accent-primary hover:text-white
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:bg-bg-card disabled:hover:text-text-primary
              transition-all duration-200
            "
            aria-label="Previous step"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            className="
              flex items-center gap-2 px-6 py-3 rounded-lg
              bg-bg-card border border-border
              text-text-primary font-heading font-semibold
              hover:border-accent-primary hover:bg-accent-primary hover:text-white
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:bg-bg-card disabled:hover:text-text-primary
              transition-all duration-200
            "
            aria-label="Next step"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
