"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const howItems = [
  "Land rovers on Mars",
  "Predict eclipses centuries ahead",
  "Correct GPS every day",
];

const whyItems = [
  "Quantum gravity?",
  "Graviton particle?",
  "String theory?",
];

export default function UnsolvedSection() {
  return (
    <SectionWrapper id="unsolved">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--gravity-amber)", fontFamily: "var(--font-mono)" }}
        >
          Section 08
        </p>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          The{" "}
          <span style={{ color: "var(--gravity-amber)" }}>Honest</span>{" "}
          Ending
        </h2>

        <p
          className="text-lg"
          style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
        >
          We Still Don&rsquo;t Know Why
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-14 stagger-children">
        {/* HOW column */}
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--gravity-green)", fontFamily: "var(--font-mono)" }}
          >
            How gravity works
          </h3>

          <ul className="space-y-4">
            {howItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: "var(--gravity-green)",
                    color: "#fff",
                  }}
                >
                  &#10003;
                </span>
                <span
                  className="text-base"
                  style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHY column */}
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--gravity-amber)", fontFamily: "var(--font-mono)" }}
          >
            Why mass bends space
          </h3>

          <ul className="space-y-4">
            {whyItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: "var(--gravity-amber)",
                    color: "#fff",
                  }}
                >
                  ?
                </span>
                <span
                  className="text-base"
                  style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <p
          className="text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
        >
          Even the smartest scientists alive don&rsquo;t know yet — and
          that&rsquo;s what makes it exciting. Science isn&rsquo;t a closed
          textbook. It&rsquo;s an open frontier.
        </p>
      </div>
    </SectionWrapper>
  );
}
