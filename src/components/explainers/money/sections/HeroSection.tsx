"use client";

const currencySymbols = [
  { symbol: "$", x: "8%", y: "12%", size: "clamp(40px, 6vw, 70px)", delay: "0s", duration: "18s", color: "var(--money-green)" },
  { symbol: "\u20AC", x: "85%", y: "18%", size: "clamp(35px, 5vw, 60px)", delay: "2s", duration: "22s", color: "var(--accent-blue)" },
  { symbol: "\u00A5", x: "12%", y: "70%", size: "clamp(30px, 4vw, 55px)", delay: "4s", duration: "20s", color: "var(--gold)" },
  { symbol: "\u00A3", x: "80%", y: "65%", size: "clamp(32px, 4.5vw, 58px)", delay: "1s", duration: "24s", color: "var(--money-green)" },
  { symbol: "\u20BF", x: "90%", y: "40%", size: "clamp(28px, 3.5vw, 50px)", delay: "3s", duration: "26s", color: "var(--gold)" },
  { symbol: "$", x: "5%", y: "42%", size: "clamp(24px, 3vw, 42px)", delay: "5s", duration: "30s", color: "var(--accent-blue)" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-28 sm:px-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Floating currency symbols */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {currencySymbols.map((c, i) => (
          <span
            key={i}
            className="absolute font-serif font-bold select-none"
            style={{
              left: c.x,
              top: c.y,
              fontSize: c.size,
              color: c.color,
              opacity: 0.07,
              animation: `currency-float ${c.duration} ease-in-out ${c.delay} infinite`,
            }}
          >
            {c.symbol}
          </span>
        ))}
      </div>

      {/* Radial orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--money-green)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--gold)", opacity: 0.08 }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--money-green)", animation: "fade-in 0.6s ease-out 0.1s both" }}
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
          How Money{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--money-green), var(--accent-blue))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Actually Works
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed sm:text-xl"
          style={{
            color: "var(--text-secondary)",
            animation: "rise-up 0.8s ease-out 0.35s both",
          }}
        >
          Money isn&rsquo;t real. It&rsquo;s a story everyone agreed to believe &mdash; and that
          agreement is the most powerful force in human civilization.
        </p>

        <p
          className="mt-3 font-mono text-xs"
          style={{
            color: "var(--text-tertiary)",
            animation: "fade-in 0.6s ease-out 0.45s both",
          }}
        >
          8 min read
        </p>

        {/* Pull quote */}
        <blockquote
          className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed sm:text-xl"
          style={{
            color: "var(--text-secondary)",
            borderLeft: "3px solid var(--money-green)",
            paddingLeft: "1.25rem",
            textAlign: "left",
            animation: "rise-up 0.8s ease-out 0.5s both",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "2.5rem",
              lineHeight: "0.5",
              color: "var(--money-green)",
              opacity: 0.35,
              fontFamily: "Georgia, serif",
              marginBottom: "0.25rem",
            }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          Banks don&rsquo;t lend money. They create it. And that changes everything.
        </blockquote>

        {/* Key numbers */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10"
          style={{ animation: "fade-in 0.6s ease-out 0.65s both" }}
        >
          {[
            { value: "$21T", label: "total US money supply" },
            { value: "97%", label: "is just digital numbers" },
            { value: "1971", label: "gold standard ended" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-mono text-3xl font-bold sm:text-4xl"
                style={{ color: "var(--money-green)" }}
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
          style={{ animation: "fade-in 0.6s ease-out 0.8s both" }}
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
