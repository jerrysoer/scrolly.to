"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { lawyerSteps, fabricatedCases } from "@/lib/explainers/hallucinate";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";

// ─── Step type colors ─────────────────────────────────────────────────────────

type StepType = "prompt" | "generation" | "submission" | "discovery" | "consequence";

const stepTypeConfig: Record<
  StepType,
  { color: string; bg: string; label: string }
> = {
  prompt: {
    color: "var(--forward-blue)",
    bg: "rgba(74,144,217,0.12)",
    label: "Research",
  },
  generation: {
    color: "var(--hallucination-red)",
    bg: "rgba(239,68,68,0.12)",
    label: "Generation",
  },
  submission: {
    color: "var(--accent-amber)",
    bg: "rgba(245,158,11,0.12)",
    label: "Submission",
  },
  discovery: {
    color: "var(--accent-purple)",
    bg: "rgba(124,92,191,0.12)",
    label: "Discovery",
  },
  consequence: {
    color: "var(--hallucination-red)",
    bg: "rgba(239,68,68,0.18)",
    label: "Consequence",
  },
};

// ─── Auto-advance progress ring ───────────────────────────────────────────────

function ProgressRing({
  progress,
  color,
  size = 36,
  strokeWidth = 3,
}: {
  progress: number; // 0–1
  color: string;
  size?: number;
  strokeWidth?: number;
}) {
  const r = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progress);

  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeOpacity="0.15"
        strokeWidth={strokeWidth}
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeOpacity="0.7"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.1s linear" }}
      />
    </svg>
  );
}

// ─── Timeline step indicator ──────────────────────────────────────────────────

function TimelineStep({
  step,
  index,
  isActive,
  isComplete,
  progress,
  onClick,
}: {
  step: (typeof lawyerSteps)[0];
  index: number;
  isActive: boolean;
  isComplete: boolean;
  progress: number;
  onClick: () => void;
}) {
  const config = stepTypeConfig[step.type as StepType] ?? stepTypeConfig.prompt;

  return (
    <button
      onClick={onClick}
      aria-label={`Step ${index + 1}: ${step.title}`}
      aria-current={isActive ? "step" : undefined}
      className="flex flex-col items-center gap-1.5 outline-none"
      style={{ minWidth: 44, minHeight: 44 }}
    >
      {/* Circle with optional progress ring */}
      <div
        className="relative flex items-center justify-center rounded-full font-mono text-xs font-bold"
        style={{
          width: 36,
          height: 36,
          backgroundColor: isActive || isComplete ? config.bg : "var(--bg-secondary)",
          border: `2px solid ${isActive || isComplete ? config.color : "var(--border)"}`,
          color: isActive || isComplete ? config.color : "var(--text-tertiary)",
          transition: "all 0.25s ease",
        }}
      >
        {isActive && (
          <ProgressRing progress={progress} color={config.color} size={36} strokeWidth={3} />
        )}
        {isComplete ? (
          <span aria-hidden="true" style={{ fontSize: 14 }}>✓</span>
        ) : (
          index + 1
        )}
      </div>

      {/* Step label — hidden on very small screens */}
      <span
        className="hidden sm:block font-mono text-[10px] uppercase tracking-wider text-center"
        style={{
          color: isActive ? config.color : "var(--text-tertiary)",
          transition: "color 0.25s ease",
          maxWidth: 56,
          lineHeight: 1.2,
        }}
      >
        {step.title.split(" ").slice(0, 2).join(" ")}
      </span>
    </button>
  );
}

// ─── Connector line between timeline steps ────────────────────────────────────

function TimelineConnector({ isComplete }: { isComplete: boolean }) {
  return (
    <div
      className="flex-1 h-0.5 mt-[18px] sm:mt-[18px] self-start"
      style={{
        backgroundColor: isComplete ? "var(--forward-blue)" : "var(--border)",
        transition: "background-color 0.3s ease",
        minWidth: 8,
        marginTop: 17,
      }}
      aria-hidden="true"
    />
  );
}

// ─── Step detail card ─────────────────────────────────────────────────────────

function StepDetailCard({ step }: { step: (typeof lawyerSteps)[0] }) {
  const config = stepTypeConfig[step.type as StepType] ?? stepTypeConfig.prompt;

  return (
    <div
      className="rounded-2xl border p-6 sm:p-8"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        boxShadow: `0 0 0 1px ${config.color}20, 0 4px 24px rgba(0,0,0,0.08)`,
      }}
    >
      {/* Date + type badge row */}
      <div className="flex items-center flex-wrap gap-3 mb-4">
        <span
          className="font-mono text-xs uppercase tracking-wider"
          style={{ color: "var(--text-tertiary)" }}
        >
          {step.date}
        </span>
        <span
          className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
          style={{
            backgroundColor: config.bg,
            color: config.color,
          }}
        >
          {config.label}
        </span>
        {step.highlight && (
          <span
            className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(239,68,68,0.12)",
              color: "var(--hallucination-red)",
            }}
          >
            Key Moment
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="font-serif text-xl sm:text-2xl font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className="font-sans text-base leading-relaxed mb-3"
        style={{ color: "var(--text-secondary)" }}
      >
        {step.description}
      </p>

      {/* Detail */}
      <p
        className="font-sans text-sm leading-relaxed mb-4"
        style={{ color: "var(--text-tertiary)" }}
      >
        {step.detail}
      </p>

      {/* Quote — if present */}
      {step.quote && (
        <blockquote
          className="border-l-4 pl-4 py-1 mt-4"
          style={{ borderColor: config.color }}
        >
          <p
            className="font-serif text-sm sm:text-base italic leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            &ldquo;{step.quote}&rdquo;
          </p>
          <cite
            className="block mt-2 font-mono text-xs not-italic"
            style={{ color: "var(--text-tertiary)" }}
          >
            — {step.actor === "judge" ? "Judge P. Kevin Castel" : step.actor === "chatgpt" ? "Steven Schwartz (on ChatGPT)" : "Court record, Mata v. Avianca"}
          </cite>
        </blockquote>
      )}

      {/* Highlight copy */}
      {step.highlightCopy && (
        <div
          className="mt-5 rounded-xl px-4 py-3"
          style={{
            backgroundColor: config.bg,
            borderLeft: `3px solid ${config.color}`,
          }}
        >
          <p
            className="font-mono text-xs sm:text-sm font-semibold"
            style={{ color: config.color }}
          >
            {step.highlightCopy}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Fabricated cases table ───────────────────────────────────────────────────

function FabricatedCasesTable() {
  return (
    <div
      className="rounded-2xl border overflow-hidden mt-10"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 border-b flex items-center gap-3"
        style={{
          backgroundColor: "rgba(239,68,68,0.06)",
          borderColor: "var(--border)",
        }}
      >
        <AlertTriangle
          size={16}
          aria-hidden="true"
          style={{ color: "var(--hallucination-red)", flexShrink: 0 }}
        />
        <h4
          className="font-serif text-base font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          The Six Fabricated Cases
        </h4>
        <span
          className="ml-auto font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: "rgba(239,68,68,0.12)",
            color: "var(--hallucination-red)",
          }}
        >
          None existed
        </span>
      </div>

      {/* Column headers */}
      <div
        className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-5 py-2 border-b"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--text-tertiary)" }}
        >
          Case Name
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-widest text-right"
          style={{ color: "var(--text-tertiary)" }}
        >
          Court
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-widest text-right"
          style={{ color: "var(--text-tertiary)" }}
        >
          Year
        </span>
      </div>

      {/* Rows */}
      {fabricatedCases.map((fc, i) => (
        <div
          key={fc.name}
          className="stagger-item grid grid-cols-[1fr_auto_auto] gap-x-4 px-5 py-3 border-b last:border-b-0 items-center"
          style={{
            borderColor: "var(--border)",
            transitionDelay: `${i * 80}ms`,
          }}
        >
          {/* Case name — monospace, red, with strikethrough decoration */}
          <div className="min-w-0">
            <span
              className="font-mono text-xs sm:text-sm font-medium leading-snug block"
              style={{
                color: "var(--hallucination-red)",
                textDecoration: "line-through",
                textDecorationColor: "rgba(239,68,68,0.5)",
              }}
            >
              {fc.name}
            </span>
            {fc.note && (
              <span
                className="font-sans text-[10px] leading-snug block mt-0.5"
                style={{ color: "var(--text-tertiary)" }}
              >
                {fc.note}
              </span>
            )}
          </div>

          {/* Court */}
          <span
            className="font-mono text-xs whitespace-nowrap"
            style={{ color: "var(--text-secondary)" }}
          >
            {fc.court}
          </span>

          {/* Year */}
          <span
            className="font-mono text-xs whitespace-nowrap"
            style={{ color: "var(--text-secondary)" }}
          >
            {fc.year}
          </span>
        </div>
      ))}

      {/* Footer note */}
      <div
        className="px-5 py-3"
        style={{
          backgroundColor: "rgba(239,68,68,0.04)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <p
          className="font-sans text-xs leading-relaxed"
          style={{ color: "var(--text-tertiary)" }}
        >
          Mata v. Avianca, Inc., No. 22-cv-1461 (S.D.N.Y. Jun. 22, 2023).
          All citations confirmed non-existent by Judge P. Kevin Castel.
        </p>
      </div>
    </div>
  );
}

// ─── LawyerStorySection ───────────────────────────────────────────────────────

const AUTO_ADVANCE_MS = 5000;

export default function LawyerStorySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // ── Progress ticker ──────────────────────────────────────────────────────────
  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    const tick = 50; // ms per tick
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += tick;
      setProgress(Math.min(elapsed / AUTO_ADVANCE_MS, 1));
    }, tick);
  }, []);

  const stopProgress = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
  }, []);

  // ── Auto-advance ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopProgress();
      return;
    }

    startProgress();
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < lawyerSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(intervalRef.current!);
        stopProgress();
        return prev;
      });
      startProgress();
    }, AUTO_ADVANCE_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopProgress();
    };
  }, [isPaused, startProgress, stopProgress]);

  // ── Keyboard navigation ───────────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    }

    const el = sectionRef.current;
    if (el) {
      el.addEventListener("keydown", handleKey);
      return () => el.removeEventListener("keydown", handleKey);
    }
  });

  function goTo(index: number) {
    setActiveStep(index);
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    stopProgress();
  }

  function goNext() {
    if (activeStep < lawyerSteps.length - 1) goTo(activeStep + 1);
  }

  function goPrev() {
    if (activeStep > 0) goTo(activeStep - 1);
  }

  function handleResume() {
    setIsPaused(false);
  }

  const currentStep = lawyerSteps[activeStep];

  return (
    <SectionWrapper id="lawyer-story" layout="centered-card" stagger>
      {/* ── Section Header ── */}
      <div className="text-center mb-10">
        <p
          className="font-mono text-xs uppercase tracking-widest mb-3"
          style={{ color: "var(--hallucination-red)" }}
        >
          Section 06
        </p>
        <h2
          className="font-serif text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          The Lawyer Who Trusted ChatGPT
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          In 2023, a New York lawyer submitted a brief with six court cases found
          by ChatGPT. The judge couldn&rsquo;t find any of them. All six were
          fabricated.
        </p>
      </div>

      {/* ── Pull-quote ── */}
      <div
        className="my-10 py-1"
        style={{
          borderTop: "2px solid var(--border)",
          borderBottom: "2px solid var(--border)",
        }}
      >
        <blockquote className="py-6 text-center">
          <p
            className="font-serif italic leading-relaxed mx-auto max-w-2xl"
            style={{
              fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
              color: "var(--text-primary)",
              lineHeight: 1.55,
            }}
          >
            &ldquo;Every single case was made up &mdash; complete with fake quotes,
            fake docket numbers, fake outcomes. The AI wasn&rsquo;t lying. It was
            just predicting.&rdquo;
          </p>
        </blockquote>
      </div>

      {/* ── Stepper ── */}
      <div
        ref={sectionRef}
        className="mt-8 outline-none"
        tabIndex={0}
        aria-label="Timeline: navigate with arrow keys"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleResume}
        onFocus={() => setIsPaused(true)}
        onBlur={handleResume}
      >
        {/* Timeline track */}
        <div
          className="flex items-start gap-0 mb-6 px-1 overflow-x-auto pb-2"
          role="list"
          aria-label="Case timeline steps"
        >
          {lawyerSteps.map((step, i) => (
            <div
              key={step.id}
              className="flex items-start"
              style={{ flex: i < lawyerSteps.length - 1 ? "1 1 0%" : "none" }}
              role="listitem"
            >
              <TimelineStep
                step={step}
                index={i}
                isActive={i === activeStep}
                isComplete={i < activeStep}
                progress={i === activeStep ? progress : 0}
                onClick={() => goTo(i)}
              />
              {i < lawyerSteps.length - 1 && (
                <TimelineConnector isComplete={i < activeStep} />
              )}
            </div>
          ))}
        </div>

        {/* Step detail */}
        <StepDetailCard step={currentStep} />

        {/* Navigation controls */}
        <div className="flex items-center justify-between mt-5 gap-4">
          {/* Prev button */}
          <button
            onClick={goPrev}
            disabled={activeStep === 0}
            aria-label="Previous step"
            className="flex items-center gap-2 rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-wider disabled:opacity-30 outline-none"
            style={{
              minWidth: 44,
              minHeight: 44,
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (activeStep > 0) {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "var(--forward-blue)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--forward-blue)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--border)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-secondary)";
            }}
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Prev
          </button>

          {/* Step counter + pause status */}
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-tertiary)" }}
              aria-live="polite"
              aria-atomic="true"
            >
              {activeStep + 1} / {lawyerSteps.length}
            </span>
            {!isPaused && activeStep < lawyerSteps.length - 1 && (
              <span
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                auto-advancing
              </span>
            )}
            {isPaused && (
              <button
                onClick={handleResume}
                className="font-mono text-[10px] uppercase tracking-wider outline-none"
                style={{ color: "var(--forward-blue)" }}
                aria-label="Resume auto-advance"
              >
                Resume
              </button>
            )}
          </div>

          {/* Next button */}
          <button
            onClick={goNext}
            disabled={activeStep === lawyerSteps.length - 1}
            aria-label="Next step"
            className="flex items-center gap-2 rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-wider disabled:opacity-30 outline-none"
            style={{
              minWidth: 44,
              minHeight: 44,
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (activeStep < lawyerSteps.length - 1) {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "var(--forward-blue)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--forward-blue)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--border)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-secondary)";
            }}
          >
            Next
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Fabricated Cases Table ── */}
      <FabricatedCasesTable />

      {/* ── Emotional closing note ── */}
      <div
        className="mt-10 rounded-2xl p-6 sm:p-8"
        style={{
          backgroundColor: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.2)",
        }}
      >
        <p
          className="font-serif text-base sm:text-lg leading-relaxed italic text-center mx-auto max-w-xl"
          style={{ color: "var(--text-primary)" }}
        >
          A real lawyer. A real court. A real client. The AI wasn&rsquo;t
          malicious &mdash; it simply had no mechanism for &ldquo;I don&rsquo;t
          know.&rdquo; That gap cost someone their reputation.
        </p>
        <p
          className="text-center mt-4 font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--hallucination-red)" }}
        >
          Mata v. Avianca &mdash; S.D.N.Y. &mdash; 2023
        </p>
      </div>
    </SectionWrapper>
  );
}
