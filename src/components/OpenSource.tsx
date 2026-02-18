import CopyButton from "./CopyButton";

export default function OpenSource() {
  return (
    <section
      id="open-source"
      className="scroll-mt-16 bg-surface px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
          MIT License
        </span>

        <h2 className="mt-6 font-condensed text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
          Open Source
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-text-muted">
          scrolly.to is a Claude skill — install it with one command and start
          generating explainers. Fork it, extend it, make it yours.
        </p>

        <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-xl border border-white/10 bg-code-bg shadow-xl">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <CopyButton text="claude skill install scrolly" />
          </div>
          <div className="p-5">
            <pre className="font-mono text-sm text-white/80">
              <code>
                <span className="text-white/40">$</span>{" "}
                <span className="text-[#28c840]">claude skill install</span>{" "}
                <span className="text-white">scrolly</span>
              </code>
            </pre>
          </div>
        </div>

        <a
          href="https://github.com/scrolly-to"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-green transition-opacity hover:opacity-80"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </section>
  );
}
