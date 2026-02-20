import { getSupabase } from "./supabase";
import { fetchExplainerNames, getExplainerName } from "./explainer-names";
import { UAParser } from "ua-parser-js";
import type {
  AnalyticsData,
  DailyViews,
  TrendIndicator,
  ExplainerStats,
  ReferrerGroup,
  DeviceStats,
  GeoRow,
  HeatmapCell,
  RecentEvent,
} from "./types";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function extractDomain(referrer: string | null): string {
  if (!referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.replace("www.", "");
    return host || "Direct";
  } catch {
    return "Direct";
  }
}

function computeTrend(current: number, previous: number): TrendIndicator | null {
  if (previous === 0 && current === 0) return null;
  if (previous === 0) return { value: 100, label: "new" };
  const pct = Math.round(((current - previous) / previous) * 100);
  return { value: pct, label: "vs prev period" };
}

export async function fetchAnalyticsData(days: number = 30): Promise<AnalyticsData | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const since = daysAgo(days);
  const since7d = daysAgo(7);
  // Previous period for trend comparison
  const prevStart = daysAgo(days * 2);
  const prevEnd = daysAgo(days);

  const [
    totalRes,
    res7d,
    resPeriod,
    dailyRpcRes,
    uniqueCurrent,
    unique7d,
    uniquePrev,
    explainerRes,
    allEventsRes,
    recentRes,
    engagementRes,
    // Previous period for trends
    prevViewsRes,
    prevEngagementRes,
    geoRes,
  ] = await Promise.all([
    // Total views (all time)
    supabase
      .from("pixel_events")
      .select("*", { count: "exact", head: true }),

    // 7d views
    supabase
      .from("pixel_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since7d),

    // Current period views
    supabase
      .from("pixel_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since),

    // Daily views via RPC
    supabase.rpc("daily_views", { since }),

    // Unique visitors — current period
    supabase.rpc("count_unique_ips", { since }),

    // Unique visitors — 7d
    supabase.rpc("count_unique_ips", { since: since7d }),

    // Unique visitors — previous period (for trend)
    supabase.rpc("count_unique_ips", { since: prevEnd }),

    // All explainer IDs with counts — auto-discover
    supabase
      .from("pixel_events")
      .select("explainer_id, created_at"),

    // All events for referrer/device/heatmap aggregation
    supabase
      .from("pixel_events")
      .select("referrer, user_agent, created_at"),

    // Recent 20 events
    supabase
      .from("pixel_events")
      .select("id, explainer_id, referrer, user_agent, created_at")
      .order("created_at", { ascending: false })
      .limit(20),

    // Engagement events — current period
    supabase
      .from("engagement_events")
      .select("duration_seconds, max_scroll_depth")
      .gte("created_at", since),

    // Previous period views (for trend)
    supabase
      .from("pixel_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", prevStart)
      .lt("created_at", prevEnd),

    // Previous period engagement (for trend)
    supabase
      .from("engagement_events")
      .select("duration_seconds, max_scroll_depth")
      .gte("created_at", prevStart)
      .lt("created_at", prevEnd),

    // Global geo distribution
    supabase.rpc("global_geo", { since }),
  ]);

  // Fetch explainer names from Supabase
  const namesMap = await fetchExplainerNames();

  const totalViews = totalRes.count ?? 0;
  const views7d = res7d.count ?? 0;
  const viewsPeriod = resPeriod.count ?? 0;

  // Daily views from RPC — map {day, views}[] to DailyViews[]
  const rpcDaily: Array<{ day: string; views: number }> = dailyRpcRes.data ?? [];
  const dailyMap = new Map<string, number>();
  for (const row of rpcDaily) {
    dailyMap.set(row.day, row.views);
  }
  // Fill missing days
  const dailyViews: DailyViews[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dailyViews.push({ date: key, views: dailyMap.get(key) ?? 0 });
  }

  // Unique visitors
  const uniqueVisitors7d = (typeof unique7d.data === "number" ? unique7d.data : 0);
  const uniqueVisitorsPeriod = (typeof uniqueCurrent.data === "number" ? uniqueCurrent.data : 0);
  const uniqueVisitorsPrev = (typeof uniquePrev.data === "number" ? uniquePrev.data : 0);

  // Engagement metrics — current period
  const engagements: Array<{ duration_seconds: number; max_scroll_depth: number }> =
    engagementRes.data ?? [];
  let avgDuration = 0;
  let avgScrollDepth = 0;
  let bounceRate = 0;

  if (engagements.length > 0) {
    let totalDuration = 0;
    let totalDepth = 0;
    let bounceCount = 0;

    for (const e of engagements) {
      const dur = e.duration_seconds ?? 0;
      totalDuration += dur;
      totalDepth += e.max_scroll_depth ?? 0;
      if (dur < 10) bounceCount++;
    }

    avgDuration = Math.round(totalDuration / engagements.length);
    avgScrollDepth = Math.round(totalDepth / engagements.length);
    bounceRate = Math.round((bounceCount / engagements.length) * 100);
  }

  // Engagement metrics — previous period (for trend)
  const prevEngagements: Array<{ duration_seconds: number; max_scroll_depth: number }> =
    prevEngagementRes.data ?? [];
  let prevAvgDuration = 0;
  if (prevEngagements.length > 0) {
    let totalDuration = 0;
    for (const e of prevEngagements) {
      totalDuration += e.duration_seconds ?? 0;
    }
    prevAvgDuration = Math.round(totalDuration / prevEngagements.length);
  }

  // Trends
  const prevViews = prevViewsRes.count ?? 0;
  const trendViews = computeTrend(viewsPeriod, prevViews);
  const trendUniqueVisitors = computeTrend(uniqueVisitorsPeriod, uniqueVisitorsPrev);
  const trendAvgDuration = computeTrend(avgDuration, prevAvgDuration);

  // Explainer breakdown — auto-discover from data
  const since30d = daysAgo(30);
  const explainerMap = new Map<string, { total: number; last7d: number; last30d: number }>();
  for (const row of explainerRes.data ?? []) {
    const id = row.explainer_id;
    if (!explainerMap.has(id)) {
      explainerMap.set(id, { total: 0, last7d: 0, last30d: 0 });
    }
    const stats = explainerMap.get(id)!;
    stats.total++;
    if (row.created_at >= since30d) stats.last30d++;
    if (row.created_at >= since7d) stats.last7d++;
  }
  const explainers: ExplainerStats[] = Array.from(explainerMap.entries())
    .map(([id, s]) => ({
      id,
      name: getExplainerName(id, namesMap),
      url: namesMap.get(id)?.url ?? null,
      total: s.total,
      last7d: s.last7d,
      last30d: s.last30d,
    }))
    .sort((a, b) => b.total - a.total);

  // Referrer, device, browser, heatmap from all events
  const referrerMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();
  const browserMap = new Map<string, number>();
  const heatmapMap = new Map<string, number>();

  for (const row of allEventsRes.data ?? []) {
    // Referrer
    const domain = extractDomain(row.referrer);
    referrerMap.set(domain, (referrerMap.get(domain) ?? 0) + 1);

    // UA parsing
    const ua = new UAParser(row.user_agent ?? "");
    const device = ua.getDevice().type ?? "desktop";
    const deviceLabel = device.charAt(0).toUpperCase() + device.slice(1);
    deviceMap.set(deviceLabel, (deviceMap.get(deviceLabel) ?? 0) + 1);

    const browser = ua.getBrowser().name ?? "Unknown";
    browserMap.set(browser, (browserMap.get(browser) ?? 0) + 1);

    // Heatmap
    const dt = new Date(row.created_at);
    const key = `${dt.getUTCDay()}-${dt.getUTCHours()}`;
    heatmapMap.set(key, (heatmapMap.get(key) ?? 0) + 1);
  }

  const referrers: ReferrerGroup[] = Array.from(referrerMap.entries())
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const devices: DeviceStats[] = Array.from(deviceMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const browsers: DeviceStats[] = Array.from(browserMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const heatmap: HeatmapCell[] = [];
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      heatmap.push({
        day,
        hour,
        count: heatmapMap.get(`${day}-${hour}`) ?? 0,
      });
    }
  }

  // Geo distribution
  const geo: GeoRow[] = (geoRes.data ?? []).map((row: { country: string; region: string | null; city: string; views: number }) => ({
    country: row.country,
    region: row.region,
    city: row.city,
    views: Number(row.views),
  }));

  // Recent events
  const recentEvents: RecentEvent[] = (recentRes.data ?? []).map((row) => {
    const ua = new UAParser(row.user_agent ?? "");
    return {
      id: row.id,
      explainer_id: row.explainer_id,
      explainer_name: getExplainerName(row.explainer_id, namesMap),
      explainer_url: namesMap.get(row.explainer_id)?.url ?? null,
      referrer: row.referrer,
      device: ua.getDevice().type ?? "desktop",
      browser: ua.getBrowser().name ?? "Unknown",
      created_at: row.created_at,
    };
  });

  return {
    totalViews,
    views7d,
    views30d: viewsPeriod,
    activeExplainers: explainerMap.size,
    uniqueVisitors7d,
    uniqueVisitors30d: uniqueVisitorsPeriod,
    avgDuration,
    avgScrollDepth,
    bounceRate,
    trendViews,
    trendUniqueVisitors,
    trendAvgDuration,
    dailyViews,
    explainers,
    referrers,
    devices,
    browsers,
    geo,
    heatmap,
    recentEvents,
  };
}
