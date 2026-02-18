const STEPS = [
  {
    num: "01",
    title: "Pick a topic",
    desc: "Choose any complex concept — TCP/IP, transformers, SaaS metrics, rocket science.",
  },
  {
    num: "02",
    title: "AI generates",
    desc: "The scrolly skill creates a full visual explainer with animations and interactive diagrams.",
  },
  {
    num: "03",
    title: "One HTML file",
    desc: "Output is a single self-contained HTML file. No build step, no framework, no dependencies.",
  },
  {
    num: "04",
    title: "Share anywhere",
    desc: "Drop it in a blog, host on GitHub Pages, or embed in your docs. It just works.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-condensed text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
          How it works
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-border bg-card-bg p-6"
            >
              <span className="font-mono text-sm text-text-muted">
                {step.num}
              </span>
              <h3 className="mt-2 font-condensed text-xl font-semibold uppercase text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-code-bg p-6 shadow-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <pre className="font-mono text-sm leading-relaxed text-white/80">
            <code>
              <span className="text-white/40">$</span>{" "}
              <span className="text-[#28c840]">/scrolly</span>{" "}
              <span className="text-[#e8ff5a]">
                &quot;How TCP/IP works&quot;
              </span>
              <span
                className="inline-block w-2 translate-y-[1px] bg-white/70"
                style={{ animation: "blink 1.2s step-end infinite" }}
              >
                &nbsp;
              </span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
