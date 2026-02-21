"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, StepBack, StepForward, RotateCcw } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { stepByStepDemo } from "@/lib/explainers/hallucinate";

const steps = stepByStepDemo.steps;

// Derive per-token metadata from the step sequence so we can colour each token
// independently in the "text so far" display.
interface TokenMeta {
  text: string;
  isHallucinated: boolean;
}

function buildTokenList(stepIndex: number): TokenMeta[] {
  const tokens: TokenMeta[] = [];
  for (let i = 1; i <= stepIndex; i++) {
    const prev = steps[i - 1].currentText;
    const curr = steps[i].currentText;
    // The new token is everything after the previous text (plus any leading space)
    const raw = curr.slice(prev.length);
    const text = raw.startsWith(" ") ? raw : (i === 1 ? raw : " " + raw);
    // isHallucinated: the selected candidate at step i-1 had isHallucinated set
    const prevCandidates = steps[i - 1].candidates;
    const selectedCandidate = prevCandidates.find(
      (c) => c.token === steps[i - 1].selected
    );
    tokens.push({
      text,
      isHallucinated: selectedCandidate?.isHallucinated ?? false,
    });
  }
  return tokens;
}

export default function AutocompleteSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPlaying = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= steps.length - 1) {
        stopPlaying();
        return prev;
      }
      return prev + 1;
    });
  }, [stopPlaying]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(advance, 800);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, advance]);

  // Auto-stop when reaching last step
  useEffect(() => {
    if (currentStep >= steps.length - 1 && isPlaying) {
      stopPlaying();
    }
  }, [currentStep, isPlaying, stopPlaying]);

  const handlePlayPause = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((v) => !v);
    }
  };

  const handleStepBack = () => {
    stopPlaying();
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleStepForward = () => {
    stopPlaying();
    setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const handleReset = () => {
    stopPlaying();
    setCurrentStep(0);
  };

  const currentStepData = steps[currentStep];
  const tokenList = buildTokenList(currentStep);
  const promptText = stepByStepDemo.prompt;

  return (
    <SectionWrapper id="autocomplete" layout="centered-card">
      {/* Header */}
      <div className="text-center mb-12">
        <p
          className="font-mono text-xs uppercase tracking-widest mb-3"
          style={{ color: "var(--forward-blue)" }}
        >
          Section 03
        </p>
        <h2
          className="font-serif text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          The Autocomplete at Scale
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Every response is an elaborate autocomplete. The model is always
          asking: &ldquo;given everything so far, what word comes next?&rdquo;
          It&rsquo;s extraordinarily good at this &mdash; which is why it sounds
          so confident even when it&rsquo;s wrong.
        </p>
      </div>

      {/* Analogy callout */}
      <div
        className="rounded-xl border p-5 mb-10"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <p
          className="font-sans text-sm leading-relaxed italic"
          style={{ color: "var(--text-secondary)" }}
        >
          &ldquo;Your phone&rsquo;s autocomplete knows &lsquo;See you&rsquo; is
          usually followed by &lsquo;later&rsquo; or &lsquo;tomorrow&rsquo;.
          Now imagine that autocomplete was trained on every book, article, and
          forum post ever written.&rdquo;
        </p>
      </div>

      {/* Interactive token predictor */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
        role="region"
        aria-label="Token generation demo"
      >
        {/* Demo label */}
        <div
          className="px-5 py-3 border-b flex items-center gap-2"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--forward-blue)" }}
          >
            Live Token Generation
          </span>
          <span
            className="font-mono text-xs ml-auto"
            style={{ color: "var(--text-tertiary)" }}
          >
            Token {currentStep} of {steps.length - 1}
          </span>
        </div>

        {/* Generated text display */}
        <div className="p-5">
          <p
            className="font-mono text-sm leading-loose break-words"
            style={{ color: "var(--text-secondary)" }}
            aria-live="polite"
            aria-label="Generated text so far"
          >
            {/* Prompt (always shown in muted colour) */}
            <span style={{ color: "var(--text-tertiary)" }}>{promptText}</span>

            {/* Generated tokens */}
            {tokenList.map((tok, i) => (
              <span
                key={i}
                style={
                  tok.isHallucinated
                    ? {
                        color: "var(--hallucination-red)",
                        backgroundColor: "rgba(239,68,68,0.12)",
                        borderRadius: "3px",
                        padding: "0 2px",
                      }
                    : { color: "var(--text-primary)" }
                }
              >
                {tok.text}
              </span>
            ))}

            {/* Blinking cursor */}
            {currentStep < steps.length - 1 && (
              <span
                className="inline-block w-[2px] h-[1.1em] ml-[2px] align-middle animate-pulse"
                style={{ backgroundColor: "var(--forward-blue)" }}
                aria-hidden="true"
              />
            )}
          </p>
        </div>

        {/* Candidate token bar chart */}
        {currentStep < steps.length - 1 && (
          <div
            className="px-5 pb-5 border-t pt-4"
            style={{ borderColor: "var(--border)" }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--text-tertiary)" }}
            >
              Next token candidates
            </p>
            <div className="flex flex-col gap-2" role="list">
              {currentStepData.candidates.slice(0, 3).map((candidate, i) => {
                const pct = Math.round(candidate.probability * 100);
                const isSelected = candidate.token === currentStepData.selected;
                const isHallucinated = candidate.isHallucinated ?? false;

                const barColor = isHallucinated
                  ? "var(--hallucination-red)"
                  : isSelected
                  ? "var(--forward-blue)"
                  : "var(--border)";

                return (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                    role="listitem"
                  >
                    <span
                      className="font-mono text-xs w-20 shrink-0 truncate"
                      style={{
                        color: isHallucinated
                          ? "var(--hallucination-red)"
                          : isSelected
                          ? "var(--text-primary)"
                          : "var(--text-tertiary)",
                        fontWeight: isSelected ? 700 : 400,
                      }}
                    >
                      &ldquo;{candidate.token}&rdquo;
                    </span>

                    {/* Bar track */}
                    <div
                      className="flex-1 h-5 rounded-sm overflow-hidden"
                      style={{ backgroundColor: "var(--bg-secondary)" }}
                      role="meter"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${candidate.token}: ${pct}%`}
                    >
                      <div
                        className="h-full rounded-sm transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: barColor,
                          opacity: isSelected ? 1 : 0.45,
                        }}
                      />
                    </div>

                    <span
                      className="font-mono text-xs w-9 text-right shrink-0"
                      style={{
                        color: isHallucinated
                          ? "var(--hallucination-red)"
                          : "var(--text-tertiary)",
                      }}
                    >
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Hallucination flag */}
            {currentStepData.candidates.some(
              (c) => c.token === currentStepData.selected && c.isHallucinated
            ) && (
              <p
                className="mt-3 font-sans text-xs"
                style={{ color: "var(--hallucination-red)" }}
                role="alert"
              >
                The selected token is part of a fabricated case citation.
              </p>
            )}
          </div>
        )}

        {/* Completion message */}
        {currentStep === steps.length - 1 && (
          <div
            className="px-5 pb-4 border-t pt-4"
            style={{ borderColor: "var(--border)" }}
          >
            <p
              className="font-sans text-sm"
              style={{ color: "var(--hallucination-red)" }}
              role="status"
            >
              The entire case citation &mdash;{" "}
              <em>Varghese v. China Southern Airlines, 677 F.3d 1120 (11th Cir. 2019)</em>{" "}
              &mdash; does not exist. The model assembled it token by token, each
              step statistically plausible, the whole thing false.
            </p>
          </div>
        )}

        {/* Controls */}
        <div
          className="px-5 py-4 border-t flex items-center gap-3"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          {/* Reset */}
          <button
            onClick={handleReset}
            aria-label="Reset to beginning"
            className="flex items-center justify-center rounded-lg border transition-colors"
            style={{
              minWidth: 44,
              minHeight: 44,
              width: 44,
              height: 44,
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-secondary)",
            }}
          >
            <RotateCcw size={16} aria-hidden="true" />
          </button>

          {/* Step back */}
          <button
            onClick={handleStepBack}
            disabled={currentStep === 0}
            aria-label="Previous token"
            className="flex items-center justify-center rounded-lg border transition-colors disabled:opacity-40"
            style={{
              minWidth: 44,
              minHeight: 44,
              width: 44,
              height: 44,
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-secondary)",
            }}
          >
            <StepBack size={16} aria-hidden="true" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex items-center justify-center rounded-lg flex-1 border transition-colors font-sans text-sm font-semibold gap-2"
            style={{
              minHeight: 44,
              height: 44,
              backgroundColor: "var(--forward-blue)",
              borderColor: "var(--forward-blue)",
              color: "#fff",
            }}
          >
            {isPlaying ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
            {isPlaying ? "Pause" : currentStep >= steps.length - 1 ? "Replay" : "Play"}
          </button>

          {/* Step forward */}
          <button
            onClick={handleStepForward}
            disabled={currentStep >= steps.length - 1}
            aria-label="Next token"
            className="flex items-center justify-center rounded-lg border transition-colors disabled:opacity-40"
            style={{
              minWidth: 44,
              minHeight: 44,
              width: 44,
              height: 44,
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-secondary)",
            }}
          >
            <StepForward size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: "var(--text-primary)" }}
            aria-hidden="true"
          />
          <span
            className="font-sans text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            Normal token
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{
              backgroundColor: "var(--hallucination-red)",
              opacity: 0.8,
            }}
            aria-hidden="true"
          />
          <span
            className="font-sans text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            Hallucinated token
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-3 rounded-sm animate-pulse"
            style={{ backgroundColor: "var(--forward-blue)" }}
            aria-hidden="true"
          />
          <span
            className="font-sans text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            Current position
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}
