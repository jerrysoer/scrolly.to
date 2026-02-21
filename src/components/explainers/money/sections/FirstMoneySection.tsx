"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { moneyProperties } from "@/lib/explainers/money";
import { Check, X } from "lucide-react";

const moneyTypes = ["Gold", "Shells", "Paper", "Bitcoin"] as const;
type MoneyType = (typeof moneyTypes)[number];

const moneyTypeColors: Record<MoneyType, string> = {
  Gold: "var(--gold)",
  Shells: "var(--accent-blue)",
  Paper: "var(--money-green)",
  Bitcoin: "var(--gold)",
};

const moneyTypeKey: Record<MoneyType, "gold" | "shells" | "paper" | "bitcoin"> = {
  Gold: "gold",
  Shells: "shells",
  Paper: "paper",
  Bitcoin: "bitcoin",
};

export default function FirstMoneySection() {
  const [showAnswers, setShowAnswers] = useState(false);
  const [userGuesses, setUserGuesses] = useState<Record<string, boolean | null>>({});

  const toggleGuess = (property: string, type: MoneyType) => {
    const key = `${property}-${type}`;
    setUserGuesses((prev) => ({
      ...prev,
      [key]: prev[key] === true ? false : prev[key] === false ? null : true,
    }));
  };

  return (
    <SectionWrapper id="first-money" layout="split-left">
      {/* Left narrative */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
          Section 2
        </p>

        <h2 className="mt-4 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          What Makes Good Money?
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
          Throughout history, humans have tried everything as money: shells, beads, salt,
          cattle, giant stone wheels. But only things with the right properties survived.
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          Good money needs to be <strong>scarce</strong> (can&rsquo;t just pick it up off
          the beach), <strong>portable</strong> (try carrying a cow to the store),{" "}
          <strong>durable</strong> (food rots, shells crack), and{" "}
          <strong>divisible</strong> (how do you pay half a cow?).
        </p>

        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="mt-6 rounded-lg border border-border bg-bg-card px-4 py-2 font-sans text-sm font-medium text-text-primary transition-all hover:border-money-green"
        >
          {showAnswers ? "Hide Answers" : "Show Correct Answers"}
        </button>
      </div>

      {/* Right interactive grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="pb-3 text-left font-sans text-xs font-medium uppercase tracking-wider text-text-tertiary">
                Property
              </th>
              {moneyTypes.map((type) => (
                <th
                  key={type}
                  className="pb-3 text-center font-sans text-xs font-medium uppercase tracking-wider"
                  style={{ color: moneyTypeColors[type] }}
                >
                  {type}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {moneyProperties.map((prop) => (
              <tr key={prop.property} className="border-t border-border">
                <td className="py-4 pr-4">
                  <p className="font-sans text-sm font-semibold text-text-primary">
                    {prop.property}
                  </p>
                  <p className="font-sans text-xs text-text-tertiary">{prop.description}</p>
                </td>
                {moneyTypes.map((type) => {
                  const key = `${prop.property}-${type}`;
                  const correct = prop[moneyTypeKey[type]];
                  const guess = userGuesses[key];
                  const display = showAnswers ? correct : guess;

                  return (
                    <td key={type} className="py-4 text-center">
                      <button
                        onClick={() => !showAnswers && toggleGuess(prop.property, type)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 ${
                          showAnswers ? "cursor-default" : "cursor-pointer hover:shadow-sm"
                        }`}
                        style={{
                          borderColor:
                            display === true
                              ? "var(--money-green)"
                              : display === false
                              ? "var(--inflation-red)"
                              : "var(--border)",
                          backgroundColor:
                            display === true
                              ? "var(--money-green)"
                              : display === false
                              ? "var(--inflation-red)"
                              : "var(--bg-card)",
                        }}
                        aria-label={`${prop.property} for ${type}`}
                      >
                        {display === true && <Check className="h-4 w-4 text-white" />}
                        {display === false && <X className="h-4 w-4 text-white" />}
                        {display === null || display === undefined ? (
                          <span className="h-1 w-4 rounded-full bg-border" />
                        ) : null}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 font-sans text-xs text-text-tertiary">
          {showAnswers
            ? "Notice: Bitcoin scores 4/4. That's not an accident."
            : "Click cells to guess, then reveal the answers."}
        </p>
      </div>
    </SectionWrapper>
  );
}
