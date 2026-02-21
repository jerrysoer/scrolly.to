export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="font-serif text-lg tracking-tight text-text"
          >
            scrolly.to
          </a>
          <span className="text-border-strong">/</span>
          <a
            href="#gallery"
            className="text-sm text-text-muted transition-colors hover:text-text"
          >
            Explore
          </a>
          <a
            href="https://github.com/jerrysoer/scrolly.to"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-text"
          >
            GitHub
          </a>
        </div>

        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span>MIT License</span>
          <span className="text-border-strong">&middot;</span>
          <span>&copy; {new Date().getFullYear()} scrolly.to</span>
        </div>
      </div>
    </footer>
  );
}
