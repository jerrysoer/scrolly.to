function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-surface ${className ?? ""}`} />
  );
}

export default function AnalyticsLoading() {
  return (
    <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-24" />
        ))}
      </div>

      {/* Area chart */}
      <Shimmer className="h-80 mb-6" />

      {/* Two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Shimmer className="h-72" />
        <Shimmer className="h-72" />
      </div>

      {/* Table */}
      <Shimmer className="h-64 mb-6" />

      {/* Two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Shimmer className="h-56" />
        <Shimmer className="h-56" />
      </div>
    </div>
  );
}
