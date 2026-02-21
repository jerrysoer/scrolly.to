interface ScrollyFooterProps {
  attribution?: string;
}

export default function ScrollyFooter({ attribution }: ScrollyFooterProps) {
  return (
    <footer className="border-t border-border px-6 pb-20 pt-10 lg:pb-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <a
            href="https://scrolly.to"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-lg tracking-tight text-text-primary transition-colors hover:text-text-secondary"
          >
            scrolly.to
          </a>
        </div>

        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          {attribution && (
            <>
              <span>{attribution}</span>
              <span className="text-border">&middot;</span>
            </>
          )}
          <span>&copy; {new Date().getFullYear()} scrolly.to</span>
        </div>
      </div>
    </footer>
  );
}
