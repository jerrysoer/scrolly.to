export default function Hero() {
  return (
    <section className="relative px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-condensed text-5xl font-bold uppercase leading-[1.05] tracking-tight text-text sm:text-7xl">
          Agencies charge $10K
          <br />
          for this.{" "}
          <span className="relative inline-block">
            AI does it in minutes.
            <span
              className="absolute bottom-1 left-0 -z-10 h-[0.35em] w-full rounded-sm bg-highlight sm:bottom-2"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted sm:text-xl">
          Turn any complex topic into an interactive, scroll-driven visual
          explainer — with one AI command. No code, no design skills, no
          dependencies.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#gallery"
            className="inline-flex h-12 items-center rounded-full bg-green px-7 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            See examples
          </a>
          <a
            href="https://github.com/scrolly-to"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center rounded-full border border-border-strong px-7 text-base font-medium text-text transition-colors hover:bg-surface"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
