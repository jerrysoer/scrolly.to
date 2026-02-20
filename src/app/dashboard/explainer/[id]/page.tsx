"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MetricCard from "@/components/dashboard/analytics/MetricCard";
import DateRangePicker from "@/components/dashboard/DateRangePicker";
import ViewsOverTime from "@/components/dashboard/analytics/ViewsOverTime";
import ScrollFunnel from "@/components/dashboard/ScrollFunnel";
import SectionHeatmap from "@/components/dashboard/SectionHeatmap";
import GeoTable from "@/components/dashboard/GeoTable";
import ReferrerBreakdown from "@/components/dashboard/analytics/ReferrerBreakdown";
import AnalyticsDeviceBreakdown from "@/components/dashboard/analytics/DeviceBreakdown";

interface ExplainerData {
  explainer: { id: string; name: string; url: string } | null;
  totalViews: number;
  avgDuration: number;
  completionRate: number;
  dailyViews: Array<{ day: string; views: number }>;
  scrollFunnel: Record<string, number>;
  sectionBreakdown: Record<string, number>;
  geo: Array<{ country: string; region: string | null; city: string; views: number }>;
  referrers: Array<{ referrer_domain: string; views: number }>;
  devices: {
    browsers: Record<string, number>;
    os: Record<string, number>;
    deviceTypes: Record<string, number>;
  };
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return "0s";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

export default function ExplainerDetail() {
  const params = useParams();
  const id = params.id as string;
  const [days, setDays] = useState(30);
  const [data, setData] = useState<ExplainerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/dashboard/explainer/${id}?days=${days}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [id, days]);

  // Map referrers to ReferrerGroup shape for the new component
  const referrerGroups = data?.referrers?.map((r) => ({
    domain: r.referrer_domain,
    count: r.views,
  })) ?? [];

  // Map devices to DeviceStats shape for the new component
  const deviceStats = data?.devices?.deviceTypes
    ? Object.entries(data.devices.deviceTypes).map(([label, count]) => ({ label, count }))
    : [];
  const browserStats = data?.devices?.browsers
    ? Object.entries(data.devices.browsers).map(([label, count]) => ({ label, count }))
    : [];

  // Map daily views to DailyViews shape
  const dailyViews = data?.dailyViews?.map((d) => ({
    date: d.day,
    views: d.views,
  })) ?? [];

  const explainerName = data?.explainer?.name ?? id;

  return (
    <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Back link */}
      <Link
        href="/dashboard/analytics"
        className="text-sm text-text-muted transition-colors hover:text-text-secondary"
      >
        &larr; Back to analytics
      </Link>

      {loading ? (
        <p className="mt-12 text-center text-sm text-text-muted">Loading...</p>
      ) : !data ? (
        <p className="mt-12 text-center text-sm text-text-muted">No data yet</p>
      ) : (
        <>
          {/* Header */}
          <div className="mt-4 flex items-center justify-between">
            <h1 className="font-display text-2xl font-medium tracking-tight text-text">
              {explainerName}
            </h1>
            <DateRangePicker value={days} onChange={setDays} />
          </div>

          <div className="mt-8 space-y-6">
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
              <MetricCard label="Total Views" value={data.totalViews} />
              <MetricCard
                label="Avg Duration"
                value={0}
                suffix={formatDuration(data.avgDuration)}
              />
              <MetricCard
                label="Completion Rate"
                value={0}
                suffix={`${Math.round(data.completionRate)}%`}
              />
            </div>

            {/* Views chart */}
            <ViewsOverTime data={dailyViews} />

            {/* Two-column grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left column */}
              <div className="space-y-6">
                <ScrollFunnel
                  data={data.scrollFunnel}
                  total={data.totalViews}
                />
                <SectionHeatmap data={data.sectionBreakdown ?? {}} />
                <GeoTable data={data.geo} />
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <ReferrerBreakdown data={referrerGroups} />
                <AnalyticsDeviceBreakdown devices={deviceStats} browsers={browserStats} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
