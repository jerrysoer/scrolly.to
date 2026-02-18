const TAGS = [
  "Scroll-driven",
  "Custom SVG diagrams",
  "One HTML file",
  "No dependencies",
  "Mobile responsive",
  "Dark + light mode",
  "SEO-ready",
  "Open source",
];

export default function Marquee() {
  const items = [...TAGS, ...TAGS];

  return (
    <div className="overflow-hidden border-y border-border bg-surface py-4">
      <div
        className="flex w-max gap-8"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {items.map((tag, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-sm font-medium uppercase tracking-widest text-text-muted"
          >
            {tag}
            <span className="ml-8 text-border-strong" aria-hidden="true">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
