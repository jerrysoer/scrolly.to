"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function DebateSection() {
  const elections = [
    {
      year: "1824",
      evWinner: "John Quincy Adams",
      pvWinner: "Andrew Jackson",
      note: "",
    },
    {
      year: "1876",
      evWinner: "Rutherford B. Hayes",
      pvWinner: "Samuel Tilden",
      note: "",
    },
    {
      year: "1888",
      evWinner: "Benjamin Harrison",
      pvWinner: "Grover Cleveland",
      note: "",
    },
    {
      year: "2000",
      evWinner: "George W. Bush",
      pvWinner: "Al Gore",
      note: "537 votes in Florida",
    },
    {
      year: "2016",
      evWinner: "Donald Trump",
      pvWinner: "Hillary Clinton",
      note: "~77k votes across 3 states",
    },
  ];

  return (
    <SectionWrapper id="debate" layout="split-left">
      {/* LEFT: Text content */}
      <div className="space-y-6">
        <h2 className="text-4xl font-heading font-bold text-text-primary">
          The Great Debate
        </h2>

        <p className="text-lg text-text-secondary leading-relaxed">
          Should the United States keep the Electoral College? The question has been debated since the founding — and five elections where the popular vote winner lost the presidency have made the argument more urgent than ever.
        </p>

        <blockquote className="pull-quote">
          The Electoral College was designed for a world without mass communication, national parties, or universal suffrage. The question is whether it still serves democracy.
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {/* Keep It card */}
          <div className="bg-bg-card rounded-lg border border-accent-primary p-4 card-glow">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
              Keep It
            </h3>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <span className="text-accent-primary mr-2">&bull;</span>
                <span>Protects small states</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-primary mr-2">&bull;</span>
                <span>Preserves federalism</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-primary mr-2">&bull;</span>
                <span>Forces broad coalitions</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-primary mr-2">&bull;</span>
                <span>Prevents disputed recounts</span>
              </li>
            </ul>
          </div>

          {/* Reform It card */}
          <div className="bg-bg-card rounded-lg border border-accent-secondary p-4 card-glow">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
              Reform It
            </h3>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <span className="text-accent-secondary mr-2">&bull;</span>
                <span>One person, one vote</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-secondary mr-2">&bull;</span>
                <span>Eliminates swing state dominance</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-secondary mr-2">&bull;</span>
                <span>Increases turnout everywhere</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-secondary mr-2">&bull;</span>
                <span>Popular mandate for the president</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT: Historical examples */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
          When the Popular Vote Lost
        </h3>

        <div className="space-y-3">
          {elections.map((election, index) => (
            <div
              key={election.year}
              className="bg-bg-card rounded-lg border border-border p-4 card-glow transition-all"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-accent-tertiary font-bold text-lg">
                  {election.year}
                </span>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-accent-success px-2 py-0.5 bg-bg-secondary rounded">
                    EV Winner
                  </span>
                  <span className="font-heading font-semibold text-text-primary">
                    {election.evWinner}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-accent-red px-2 py-0.5 bg-bg-secondary rounded">
                    PV Winner
                  </span>
                  <span className="text-text-secondary">
                    {election.pvWinner}
                  </span>
                </div>

                {election.note && (
                  <p className="text-text-tertiary text-xs italic mt-2">
                    {election.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
