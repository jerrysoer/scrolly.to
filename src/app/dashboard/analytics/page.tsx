import { fetchAnalyticsData } from "@/lib/analytics-queries";
import MetricCard from "@/components/dashboard/analytics/MetricCard";
import ViewsOverTime from "@/components/dashboard/analytics/ViewsOverTime";
import ReferrerBreakdown from "@/components/dashboard/analytics/ReferrerBreakdown";
import AnalyticsDeviceBreakdown from "@/components/dashboard/analytics/DeviceBreakdown";
import ExplainerTable from "@/components/dashboard/analytics/ExplainerTable";
import GeoTable from "@/components/dashboard/GeoTable";
import TimeHeatmap from "@/components/dashboard/analytics/TimeHeatmap";
import ActivityFeed from "@/components/dashboard/analytics/ActivityFeed";
import AnalyticsDatePicker from "@/components/dashboard/analytics/AnalyticsDatePicker";

export const revalidate = 300;

export const metadata = {
  title: "scrolly.to — Pixel Analytics",
  description: "Real-time analytics for Scrolly explainer tracking pixels.",
};

function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return "0s";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const params = await searchParams;
  const days = Math.min(Math.max(parseInt(params.days ?? "30", 10) || 30, 1), 365);
  const data = await fetchAnalyticsData(days);

  if (!data) {
    return (
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-24">
          <p className="font-display text-2xl text-text-muted mb-3">No data yet</p>
          <p className="text-sm text-text-muted">
            Check that SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are configured.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-1">
            Dashboard
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-text">
            Analytics
          </h1>
        </div>
        <AnalyticsDatePicker />
      </div>

      {/* Hero metric + supporting metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <MetricCard label="Total Views" value={data.totalViews} featured />
        <MetricCard
          label={`Last ${days} Days`}
          value={data.views30d}
          trend={data.trendViews}
        />
        <MetricCard label="Unique Visitors (7d)" value={data.uniqueVisitors7d} />
        <MetricCard
          label={`Unique Visitors (${days}d)`}
          value={data.uniqueVisitors30d}
          trend={data.trendUniqueVisitors}
        />
      </div>

      {/* Engagement row */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <MetricCard
          label="Avg Duration"
          value={0}
          suffix={formatDuration(data.avgDuration)}
          trend={data.trendAvgDuration}
        />
        <MetricCard
          label="Avg Scroll Depth"
          value={0}
          suffix={`${data.avgScrollDepth}%`}
        />
        <MetricCard
          label="Bounce Rate"
          value={0}
          suffix={`${data.bounceRate}%`}
        />
      </div>

      {/* Views chart — full width hero */}
      <div className="mb-8">
        <ViewsOverTime data={data.dailyViews} label={`Views — Last ${days} Days`} />
      </div>

      {/* Explainer table */}
      <div className="mb-8">
        <ExplainerTable data={data.explainers} />
      </div>

      {/* Two-column: traffic + devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <ReferrerBreakdown data={data.referrers} />
        <AnalyticsDeviceBreakdown devices={data.devices} browsers={data.browsers} />
      </div>

      {/* Two-column: geo + heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <GeoTable data={data.geo} />
        <TimeHeatmap data={data.heatmap} />
      </div>

      {/* Activity feed */}
      <ActivityFeed events={data.recentEvents} />
    </div>
  );
}
