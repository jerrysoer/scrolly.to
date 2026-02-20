import { fetchAnalyticsData } from "@/lib/analytics-queries";
import MetricCard from "@/components/dashboard/analytics/MetricCard";
import ViewsOverTime from "@/components/dashboard/analytics/ViewsOverTime";
import ReferrerBreakdown from "@/components/dashboard/analytics/ReferrerBreakdown";
import AnalyticsDeviceBreakdown from "@/components/dashboard/analytics/DeviceBreakdown";
import ExplainerTable from "@/components/dashboard/analytics/ExplainerTable";
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
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <p className="text-lg text-text-muted mb-2">No analytics data available</p>
          <p className="text-sm text-text-muted">
            Check that SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are configured.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header with date picker */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-xl font-medium tracking-tight text-text">
          Pixel Analytics
        </h1>
        <AnalyticsDatePicker />
      </div>

      {/* Views metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <MetricCard label="Total Views" value={data.totalViews} />
        <MetricCard
          label={`Last ${days} Days`}
          value={data.views30d}
          trend={data.trendViews}
        />
        <MetricCard
          label="Unique Visitors (7d)"
          value={data.uniqueVisitors7d}
        />
        <MetricCard
          label={`Unique Visitors (${days}d)`}
          value={data.uniqueVisitors30d}
          trend={data.trendUniqueVisitors}
        />
      </div>

      {/* Engagement metric cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
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

      {/* Views over time */}
      <div className="mb-6">
        <ViewsOverTime data={data.dailyViews} label={`Views — Last ${days} Days`} />
      </div>

      {/* Two-column: referrers + devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ReferrerBreakdown data={data.referrers} />
        <AnalyticsDeviceBreakdown devices={data.devices} browsers={data.browsers} />
      </div>

      {/* Explainer table */}
      <div className="mb-6">
        <ExplainerTable data={data.explainers} />
      </div>

      {/* Two-column: heatmap + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeHeatmap data={data.heatmap} />
        <ActivityFeed events={data.recentEvents} />
      </div>
    </div>
  );
}
