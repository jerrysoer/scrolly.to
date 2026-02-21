"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

interface SwingState {
  name: string;
  evs: number;
  selected: "blue" | "red" | null;
}

export default function SwingStatesSection() {
  const [states, setStates] = useState<SwingState[]>([
    { name: "Pennsylvania", evs: 19, selected: null },
    { name: "Georgia", evs: 16, selected: null },
    { name: "Michigan", evs: 15, selected: null },
    { name: "Wisconsin", evs: 10, selected: null },
    { name: "Arizona", evs: 11, selected: null },
    { name: "Nevada", evs: 6, selected: null },
    { name: "North Carolina", evs: 16, selected: null },
  ]);

  const toggleState = (index: number) => {
    setStates((prev) =>
      prev.map((state, i) => {
        if (i === index) {
          if (state.selected === null) return { ...state, selected: "blue" };
          if (state.selected === "blue") return { ...state, selected: "red" };
          return { ...state, selected: null };
        }
        return state;
      })
    );
  };

  const totalEVs = states.reduce(
    (sum, state) => (state.selected ? sum + state.evs : sum),
    0
  );

  return (
    <SectionWrapper id="swing-states" layout="split-right">
      {/* LEFT CHILD: Visual - Interactive swing state cards */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {states.map((state, index) => (
            <button
              key={state.name}
              onClick={() => toggleState(index)}
              className={`
                bg-bg-card rounded-lg p-4
                card-glow
                transition-all duration-200
                ${
                  state.selected === "blue"
                    ? "border-2 border-accent-blue"
                    : state.selected === "red"
                    ? "border-2 border-accent-red"
                    : "border border-border"
                }
                hover:scale-105 active:scale-95
              `}
              aria-label={`Toggle ${state.name} with ${state.evs} electoral votes`}
            >
              <div className="font-heading font-semibold text-text-primary text-sm sm:text-base">
                {state.name}
              </div>
              <div className="font-mono text-accent-secondary text-lg sm:text-xl mt-1">
                {state.evs}
              </div>
            </button>
          ))}
        </div>
        <div className="bg-bg-card rounded-lg border border-border p-4 text-center">
          <div className="font-mono text-xl text-text-primary">
            Selected EVs: <span className="text-accent-primary">{totalEVs}</span>
          </div>
        </div>
      </div>

      {/* RIGHT CHILD: Text content */}
      <div className="space-y-6">
        <h2 className="text-4xl font-heading font-bold text-text-primary">
          Swing States
        </h2>
        <p className="text-lg text-text-secondary">
          Because most states vote reliably for one party, elections are decided
          by a handful of competitive states. In recent elections, about 7 states
          have been true battlegrounds.
        </p>
        <div className="space-y-4">
          <h3 className="text-xl font-heading font-semibold text-text-primary">
            Why these states matter
          </h3>
          <p className="text-text-secondary">
            Candidates spend most of their campaign time and money in swing
            states. In 2020, 96% of campaign events occurred in just 12 states.
            Voters in &apos;safe&apos; states — whether deep blue or deep red — see almost
            no direct campaigning.
          </p>
        </div>
        <blockquote className="pull-quote">
          If you live in a safe state, your vote for president is essentially
          symbolic. The Electoral College makes some votes matter more than
          others.
        </blockquote>
      </div>
    </SectionWrapper>
  );
}
