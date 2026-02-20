interface GeoRow {
  country: string;
  region?: string | null;
  city: string;
  views: number;
}

interface GeoTableProps {
  data: GeoRow[];
}

function countryToFlag(code: string): string {
  if (!code || code.length !== 2) return "";
  const base = 0x1f1e6 - 65; // 'A' = 65
  return String.fromCodePoint(
    base + code.charCodeAt(0),
    base + code.charCodeAt(1)
  );
}

export default function GeoTable({ data }: GeoTableProps) {
  if (!data.length) {
    return (
      <div className="rounded-xl border border-border bg-card-bg p-5 text-center text-sm text-text-muted">
        No data yet
      </div>
    );
  }

  const top = data.slice(0, 15);
  const maxViews = Math.max(...top.map((r) => r.views), 1);

  return (
    <div className="rounded-xl border border-border bg-card-bg p-5">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
        Top Locations
      </h3>
      <div className="space-y-2">
        {top.map((row, i) => (
          <div key={`${row.country}-${row.city}-${i}`} className="flex items-center gap-3">
            <span className="w-6 text-center text-sm">{countryToFlag(row.country)}</span>
            <span className="w-36 shrink-0 truncate text-sm text-text" title={[row.city, row.region].filter(Boolean).join(", ")}>
              {row.city || "Unknown"}
              {row.region && (
                <span className="text-text-muted">, {row.region}</span>
              )}
            </span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-surface">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all"
                style={{ width: `${(row.views / maxViews) * 100}%`, opacity: 0.7 }}
              />
            </div>
            <span className="w-10 shrink-0 text-right font-mono text-xs text-text-muted">
              {row.views}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
