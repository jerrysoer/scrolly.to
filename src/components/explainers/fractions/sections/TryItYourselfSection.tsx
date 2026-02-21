"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

interface Problem {
  dividend: string;
  divisor: string;
  flippedDivisor: string;
  answer: string;
  explanation: string;
}

const problems: Problem[] = [
  {
    dividend: "1/2",
    divisor: "1/4",
    flippedDivisor: "4/1",
    answer: "2",
    explanation: "1/2 \u00D7 4/1 = 4/2 = 2. Two quarters fit in a half.",
  },
  {
    dividend: "2/3",
    divisor: "1/6",
    flippedDivisor: "6/1",
    answer: "4",
    explanation: "2/3 \u00D7 6/1 = 12/3 = 4. Four sixths fit in two-thirds.",
  },
  {
    dividend: "5/6",
    divisor: "5/12",
    flippedDivisor: "12/5",
    answer: "2",
    explanation: "5/6 \u00D7 12/5 = 60/30 = 2. Two portions of 5/12 fit in 5/6.",
  },
];

function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [checked, setChecked] = useState(false);

  const isCorrect = userAnswer.trim() === problem.answer;

  const handleCheck = () => {
    setChecked(true);
  };

  const handleReveal = () => {
    setRevealed(true);
    setUserAnswer(problem.answer);
    setChecked(true);
  };

  return (
    <div className="rounded-xl border border-border bg-bg-card p-5 sm:p-6">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-amber">
        Problem {index + 1}
      </p>

      {/* Problem statement */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="font-mono text-2xl font-bold text-text-primary">
          {problem.dividend}
        </span>
        <span className="font-mono text-xl text-text-tertiary">&divide;</span>
        <span className="font-mono text-2xl font-bold text-text-primary">
          {problem.divisor}
        </span>
      </div>

      {/* Flip step */}
      <p className="mt-3 font-sans text-sm text-text-secondary">
        Flip: {problem.divisor} &rarr; <span className="font-mono font-semibold text-space-blue">{problem.flippedDivisor}</span>
      </p>

      <p className="mt-1 font-sans text-sm text-text-secondary">
        Multiply: {problem.dividend} &times; {problem.flippedDivisor} =
      </p>

      {/* Answer input */}
      <div className="mt-3 flex items-center gap-3">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => {
            setUserAnswer(e.target.value);
            setChecked(false);
          }}
          placeholder="?"
          className="w-20 rounded-lg border border-border bg-bg-secondary px-3 py-2 text-center font-mono text-lg font-bold text-text-primary outline-none transition-colors focus:border-space-blue"
          disabled={revealed}
        />
        {!revealed && (
          <>
            <button
              onClick={handleCheck}
              disabled={!userAnswer.trim()}
              className="rounded-lg border border-space-blue bg-space-blue/10 px-4 py-2 font-sans text-sm font-medium text-space-blue transition-all hover:bg-space-blue/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Check
            </button>
            <button
              onClick={handleReveal}
              className="rounded-lg border border-border px-4 py-2 font-sans text-sm font-medium text-text-tertiary transition-all hover:border-amber hover:text-amber"
            >
              Reveal
            </button>
          </>
        )}
      </div>

      {/* Feedback */}
      {checked && (
        <div
          className={`mt-3 rounded-lg px-4 py-3 ${
            isCorrect
              ? "border border-success-green/30 bg-success-green/10"
              : "border border-pizza-sauce/30 bg-pizza-sauce/10"
          }`}
          style={{ animation: "fade-in 0.3s ease-out" }}
        >
          <p className={`font-sans text-sm font-medium ${isCorrect ? "text-success-green" : "text-pizza-sauce"}`}>
            {isCorrect ? "Correct!" : revealed ? "Here's the answer:" : "Not quite. Try again or reveal."}
          </p>
          {(isCorrect || revealed) && (
            <p className="mt-1 font-sans text-sm text-text-secondary">
              {problem.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function TryItYourselfSection() {
  return (
    <SectionWrapper id="try-it-yourself" layout="centered">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 6
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        Try It Yourself
      </h2>

      <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        Three practice problems. For each one: flip the divisor, multiply, and simplify.
        Type your answer and check.
      </p>

      <div className="mt-8 space-y-6">
        {problems.map((problem, i) => (
          <ProblemCard key={i} problem={problem} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
