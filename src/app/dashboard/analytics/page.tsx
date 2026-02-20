import { fetchAnalyticsData } from "@/lib/analytics-queries";
import MetricCard from "@/components/dashboard/analytics/MetricCard";
import ViewsOverTime from "@/components/dashboard/analytics/ViewsOverTime";
import ReferrerBreakdown from "@/components/dashboard/analytics/ReferrerBreakdown";
import AnalyticsDeviceBreakdown from "@/components/dashboard/analytics/DeviceBreakdown";
import ExplainerTable from "@/components/dashboard/analytics/ExplainerTable";
import TimeHeatmap from "@/components/dashboard/analytics/TimeHeatmap";
import ActivityFeed from "@/components/dashboard/analytics/ActivityFeed";

export const revalidate = 300;

export const metadata = {
  title: "scrolly.to — Pixel Analytics",
  description: "Real-time analytics for Scrolly explainer tracking pixels.",
};

export default async function AnalyticsPage() {
  const data = await fetchAnalyticsData();

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
      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Total Views" value={data.totalViews} />
        <MetricCard label="Last 7 Days" value={data.views7d} />
        <MetricCard label="Last 30 Days" value={data.views30d} />
        <MetricCard label="Active Explainers" value={data.activeExplainers} />
      </div>

      {/* Views over time */}
      <div className="mb-6">
        <ViewsOverTime data={data.dailyViews} />
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
