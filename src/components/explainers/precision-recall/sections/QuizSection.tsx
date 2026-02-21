"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { quizQuestions, type QuizQuestion } from "@/lib/explainers/precision-recall";

function QuizQuestionCard({
  q,
  index,
  answer,
  onAnswer,
  showResults,
}: {
  q: QuizQuestion;
  index: number;
  answer?: string;
  onAnswer: (index: number, value: string) => void;
  showResults: boolean;
}) {
  const isCorrect = answer === q.correct;

  return (
    <div className="story-card p-6">
      <div className="pr-body text-sm mb-2" style={{ color: "var(--text-tertiary)" }}>
        Question {index + 1}
      </div>
      <h4 className="pr-display text-xl mb-6">{q.question}</h4>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {q.options.map((opt) => {
          let cls = "quiz-option";
          if (answer === opt.id) {
            if (showResults) {
              cls += isCorrect ? " correct" : " incorrect";
            } else {
              cls += " selected";
            }
          } else if (showResults && opt.id === q.correct) {
            cls += " correct";
          }

          return (
            <button
              key={opt.id}
              onClick={() => !showResults && onAnswer(index, opt.id)}
              disabled={showResults}
              className={cls}
            >
              <div className="font-medium" style={{ color: "var(--text-primary)" }}>{opt.label}</div>
              <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>{opt.desc}</div>
            </button>
          );
        })}
      </div>

      {showResults && answer && (
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: isCorrect
              ? "color-mix(in srgb, var(--pr-green) 10%, transparent)"
              : "color-mix(in srgb, var(--pr-terracotta) 10%, transparent)",
          }}
        >
          <div className="pr-body font-medium mb-1" style={{ color: isCorrect ? "var(--pr-green)" : "var(--pr-terracotta)" }}>
            {isCorrect ? "Correct!" : "Not quite"}
          </div>
          <div className="pr-body text-sm" style={{ color: "var(--text-secondary)" }}>{q.explanation}</div>
        </div>
      )}
    </div>
  );
}

export default function QuizSection() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const allAnswered = Object.keys(answers).length === quizQuestions.length;
  const correctCount = quizQuestions.filter((q, i) => answers[i] === q.correct).length;

  return (
    <SectionWrapper id="quiz">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="pr-body text-sm tracking-[0.2em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
            Test Yourself
          </p>
          <h2 className="pr-display text-4xl md:text-5xl mb-4">Which Matters More?</h2>
          <p className="pr-body text-lg" style={{ color: "var(--text-tertiary)" }}>
            Apply what you&apos;ve learned to real scenarios
          </p>
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, i) => (
            <QuizQuestionCard
              key={i}
              q={q}
              index={i}
              answer={answers[i]}
              onAnswer={handleAnswer}
              showResults={showResults}
            />
          ))}
        </div>

        {allAnswered && !showResults && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowResults(true)}
              className="rounded-full px-8 py-3 pr-body font-medium transition-colors"
              style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
            >
              Check Answers
            </button>
          </div>
        )}

        {showResults && (
          <div className="story-card mt-8 p-6 text-center">
            <div className="pr-display text-3xl mb-2">
              {correctCount} / {quizQuestions.length}
            </div>
            <p className="pr-body" style={{ color: "var(--text-tertiary)" }}>
              {correctCount === quizQuestions.length
                ? "Perfect! You understand the tradeoff."
                : "Good effort! Review the explanations above."}
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
