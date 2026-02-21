"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StateData {
  name: string;
  population: number;
  houseSeats: number;
}

const STATES: StateData[] = [
  { name: "Wyoming", population: 577000, houseSeats: 1 },
  { name: "Vermont", population: 647000, houseSeats: 1 },
  { name: "Florida", population: 22600000, houseSeats: 28 },
  { name: "Texas", population: 30500000, houseSeats: 38 },
  { name: "California", population: 39500000, houseSeats: 52 },
];

export default function MathSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentState = STATES[selectedIndex];

  const senateSeats = 2;
  const totalElectors = currentState.houseSeats + senateSeats;
  const peoplePerElector = Math.round(currentState.population / totalElectors);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? STATES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === STATES.length - 1 ? 0 : prev + 1));
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <SectionWrapper id="math" layout="split-left">
      <div className="space-y-6">
        <h2 className="text-4xl font-heading font-bold text-text-primary">
          The Math Behind the Map
        </h2>
        <p className="text-lg text-text-secondary">
          Every state gets electors equal to its Congressional delegation — House
          representatives (based on population) plus 2 Senators (equal for all
          states). This means small states get proportionally more electoral power
          per capita than large ones.
        </p>
        <aside className="ml-4 border-l-2 border-accent-muted pl-4 text-sm text-text-tertiary italic">
          Wyoming has 1 elector per ~192,000 people. California has 1 per
          ~720,000. That&apos;s a 3.7x difference in per-capita voting power.
        </aside>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-bg-card rounded-xl border border-border p-6 space-y-4 card-glow">
          <h3 className="font-heading text-2xl text-text-primary text-center mb-6">
            {currentState.name}
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Population</span>
              <span className="font-semibold text-text-primary">
                {formatNumber(currentState.population)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">House Seats</span>
              <span className="font-semibold text-text-primary">
                {currentState.houseSeats}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Senate Seats</span>
              <span className="font-semibold text-text-primary">{senateSeats}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b-2 border-accent-primary">
              <span className="text-text-primary font-semibold">Total Electors</span>
              <span className="font-bold text-xl text-accent-primary">
                {totalElectors}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 bg-bg-secondary rounded-lg px-4 mt-4">
              <span className="text-text-secondary">People per Elector</span>
              <span className="font-bold text-lg text-accent-secondary">
                {formatNumber(peoplePerElector)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            <button
              onClick={handlePrevious}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Previous state"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Next state"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-text-tertiary">
          {selectedIndex + 1} of {STATES.length}
        </div>
      </div>
    </SectionWrapper>
  );
}
