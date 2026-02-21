"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function ConfidentWrongnessSection() {
  return (
    <SectionWrapper id="confident-wrongness" layout="split-left">
      {/* Left: Text explanation */}
      <div>
        <div className="mb-8">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--forward-blue)" }}
          >
            Section 07
          </p>
          <h2
            className="font-serif text-3xl font-bold sm:text-4xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            The Fluency Trap
          </h2>
          <p
            className="font-sans text-base leading-relaxed sm:text-lg mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            A search engine that returns no results is useless but harmless. An
            AI that returns confident wrong results is{" "}
            <span style={{ color: "var(--hallucination-red)", fontWeight: 600 }}>
              dangerous
            </span>
            . The fluency is the trap.
          </p>
          <p
            className="font-sans text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            The better the writing, the harder the error is to spot. AI
            doesn&rsquo;t generate answers that &ldquo;sound wrong&rdquo; — it
            generates answers that sound{" "}
            <em>exactly right</em>, with perfect grammar, appropriate tone, and
            convincing detail. That&rsquo;s what makes hallucination so
            insidious.
          </p>
        </div>

        {/* Bottom question */}
        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <p
            className="font-sans text-sm italic leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            The search engine is unhelpful but honest. The AI is helpful but
            wrong.{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              Which is more dangerous?
            </strong>
          </p>
        </div>
      </div>

      {/* Right: Side-by-side comparison panels */}
      <div className="flex flex-col gap-4">
        {/* Search Engine Panel */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          {/* Chrome-style browser bar */}
          <div
            className="px-4 py-2 border-b flex items-center gap-2"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border)",
            }}
          >
            {/* Traffic lights */}
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#FF5F57" }}
              aria-hidden="true"
            />
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#FFBD2E" }}
              aria-hidden="true"
            />
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#28CA41" }}
              aria-hidden="true"
            />
            <div
              className="flex-1 ml-2 rounded-md px-3 py-1 font-mono text-xs truncate"
              style={{
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-tertiary)",
                border: "1px solid var(--border)",
              }}
            >
              google.com/search?q=Varghese+v.+China+Southern+Airlines
            </div>
          </div>

          {/* Search result area */}
          <div className="p-6">
            {/* Google logo area */}
            <div
              className="font-sans font-bold text-xl mb-4"
              style={{ color: "var(--text-tertiary)", letterSpacing: "-0.02em" }}
              aria-hidden="true"
            >
              <span style={{ color: "#4285F4" }}>G</span>
              <span style={{ color: "#EA4335" }}>o</span>
              <span style={{ color: "#FBBC05" }}>o</span>
              <span style={{ color: "#4285F4" }}>g</span>
              <span style={{ color: "#34A853" }}>l</span>
              <span style={{ color: "#EA4335" }}>e</span>
            </div>

            {/* About results line */}
            <p
              className="font-sans text-xs mb-6"
              style={{ color: "var(--text-tertiary)" }}
            >
              About <strong>0 results</strong> (0.38 seconds)
            </p>

            {/* Empty state */}
            <div
              className="rounded-lg border-2 border-dashed p-8 text-center"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--bg-secondary)" }}
                aria-hidden="true"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                  <path
                    d="M15 15l-3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                  <path
                    d="M7 7l3 3M10 7L7 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{ color: "var(--hallucination-red)" }}
                  />
                </svg>
              </div>
              <p
                className="font-sans text-sm font-medium mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                No results found for{" "}
                <span className="font-mono">&ldquo;Varghese v. China Southern Airlines&rdquo;</span>
              </p>
              <p
                className="font-sans text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                Try different keywords or check your spelling.
              </p>
            </div>

            {/* Label */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--verified-green)" }}
                aria-hidden="true"
              />
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--verified-green)" }}
              >
                Honest — no results
              </p>
            </div>
          </div>
        </div>

        {/* AI Response Panel */}
        <div
          className="rounded-2xl border-2 overflow-hidden"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--hallucination-red)",
          }}
        >
          {/* ChatGPT-style header */}
          <div
            className="px-4 py-2 border-b flex items-center gap-3"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-white font-bold text-xs"
              style={{ backgroundColor: "#10A37F" }}
              aria-hidden="true"
            >
              AI
            </div>
            <span
              className="font-sans text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              ChatGPT
            </span>
            <span
              className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-widest"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                color: "var(--hallucination-red)",
                border: "1px solid var(--hallucination-red)",
              }}
            >
              Fabricated
            </span>
          </div>

          {/* AI response content */}
          <div className="p-5">
            {/* User prompt bubble */}
            <div className="flex justify-end mb-4">
              <div
                className="max-w-xs rounded-2xl rounded-tr-sm px-4 py-2 font-sans text-sm"
                style={{
                  backgroundColor: "var(--forward-blue)",
                  color: "#fff",
                }}
              >
                Find me cases about airline liability for lost luggage — specifically{" "}
                <em>Varghese v. China Southern Airlines</em>.
              </div>
            </div>

            {/* AI response bubble */}
            <div
              className="rounded-2xl rounded-tl-sm p-4 font-sans text-sm leading-relaxed"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
              }}
            >
              <p className="mb-2">
                <strong>Varghese v. China Southern Airlines Co., Ltd.</strong>,
                677 F.3d 1120 (11th Cir. 2019) is a significant case addressing
                passenger claims under the Montreal Convention.
              </p>
              <p className="mb-2">
                In this case, the Eleventh Circuit held that passengers may seek
                damages for emotional distress arising from the airline&rsquo;s
                negligent handling of checked baggage, provided the distress
                stems from bodily injury. The court relied on{" "}
                <em>Eastern Airlines, Inc. v. Floyd</em>, 499 U.S. 530 (1991),
                confirming the liability framework.
              </p>
              <p className="font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
                Docket No. 18-14291 &bull; Filed March 4, 2019 &bull; 3-0 panel
                decision
              </p>
            </div>

            {/* Fabrication label */}
            <div
              className="mt-4 rounded-lg border p-3 flex items-start gap-2"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                borderColor: "var(--hallucination-red)",
              }}
              role="alert"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M8 1.5L14.5 13H1.5L8 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  style={{ color: "var(--hallucination-red)" }}
                />
                <path
                  d="M8 6v3M8 11v.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ color: "var(--hallucination-red)" }}
                />
              </svg>
              <p
                className="font-sans text-xs leading-relaxed"
                style={{ color: "var(--hallucination-red)" }}
              >
                <strong>This entire response is fabricated.</strong> The case
                does not exist. The docket number, citation, judges, and legal
                analysis were all invented. This is exactly what happened to
                attorney Mata in 2023 — leading to federal sanctions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
