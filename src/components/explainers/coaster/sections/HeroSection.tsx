"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-28 sm:px-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Radial orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--kinetic)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--potential)", opacity: 0.08 }}
        aria-hidden="true"
      />

      {/* Coaster track silhouette SVG */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-end justify-center"
        style={{ paddingBottom: "10%" }}
      >
        <svg
          viewBox="0 0 800 300"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "min(90vw, 700px)",
            opacity: 0.06,
          }}
          preserveAspectRatio="xMidYMax meet"
        >
          <title>Roller coaster track silhouette</title>
          <path
            d="M0 280 Q50 280 80 260 Q120 220 140 120 Q160 20 180 20 Q200 20 220 120 Q240 200 260 220 Q280 240 300 200 Q320 160 330 140 Q340 120 350 120 Q360 120 370 140 Q390 200 400 220 Q410 240 430 250 Q460 260 490 240 Q520 220 540 200 Q560 180 580 190 Q600 200 620 220 Q640 240 660 250 Q700 260 740 260 Q780 260 800 260"
            stroke="var(--kinetic)"
            strokeWidth="3"
            fill="none"
          />
          {/* Support structures */}
          <line x1="180" y1="20" x2="180" y2="280" stroke="var(--border)" strokeWidth="1.5" opacity="0.5" />
          <line x1="260" y1="220" x2="260" y2="280" stroke="var(--border)" strokeWidth="1.5" opacity="0.5" />
          <line x1="350" y1="120" x2="350" y2="280" stroke="var(--border)" strokeWidth="1.5" opacity="0.5" />
          <line x1="490" y1="240" x2="490" y2="280" stroke="var(--border)" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--kinetic)", animation: "fade-in 0.6s ease-out 0.1s both" }}
        >
          scrolly.to &mdash; Interactive Explainer
        </p>

        <h1
          className="mt-6 font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
          style={{
            color: "var(--text-primary)",
            animation: "rise-up 0.8s ease-out 0.2s both",
          }}
        >
          Roller Coaster{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--potential), var(--kinetic))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Physics
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed sm:text-xl"
          style={{
            color: "var(--text-secondary)",
            animation: "rise-up 0.8s ease-out 0.35s both",
          }}
        >
          At the top of a loop you&rsquo;re upside down at 60&nbsp;mph with nothing
          holding you in but physics. Here&rsquo;s exactly why that&rsquo;s enough.
        </p>

        <p
          className="mt-3 font-mono text-xs"
          style={{
            color: "var(--text-tertiary)",
            animation: "fade-in 0.6s ease-out 0.45s both",
          }}
        >
          7 min read
        </p>

        {/* Key numbers row */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10"
          style={{ animation: "fade-in 0.6s ease-out 0.55s both" }}
        >
          {[
            { value: "0", label: "engines needed" },
            { value: "4g", label: "peak force" },
            { value: "7", label: "min read" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-mono text-3xl font-bold sm:text-4xl"
                style={{ color: "var(--kinetic)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 font-sans text-sm" style={{ color: "var(--text-tertiary)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{ animation: "fade-in 0.6s ease-out 0.7s both" }}
        >
          <p className="font-sans text-sm" style={{ color: "var(--text-tertiary)" }}>
            Scroll to explore
          </p>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            style={{ color: "var(--text-tertiary)", animation: "float 2s ease-in-out infinite" }}
            aria-hidden="true"
          >
            <path
              d="M10 4v12M5 11l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
