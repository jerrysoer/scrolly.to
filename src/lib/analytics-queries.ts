import { getSupabase } from "./supabase";
import { fetchExplainerNames, getExplainerName } from "./explainer-names";
import { UAParser } from "ua-parser-js";
import type {
  AnalyticsData,
  DailyViews,
  ExplainerStats,
  ReferrerGroup,
  DeviceStats,
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

export async function fetchAnalyticsData(): Promise<AnalyticsData | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const since7d = daysAgo(7);
  const since30d = daysAgo(30);

  const [
    totalRes,
    res7d,
    res30d,
    dailyRes,
    explainerRes,
    allEventsRes,
    recentRes,
  ] = await Promise.all([
    // Total views
    supabase
      .from("pixel_events")
      .select("*", { count: "exact", head: true }),

    // 7d views
    supabase
      .from("pixel_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since7d),

    // 30d views
    supabase
      .from("pixel_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since30d),

    // Daily views (last 30 days) — fetch raw timestamps, group client-side
    supabase
      .from("pixel_events")
      .select("created_at")
      .gte("created_at", since30d)
      .order("created_at", { ascending: true }),

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
  ]);

  // Fetch explainer names from Supabase
  const namesMap = await fetchExplainerNames();

  const totalViews = totalRes.count ?? 0;
  const views7d = res7d.count ?? 0;
  const views30d = res30d.count ?? 0;

  // Daily views grouped by date
  const dailyMap = new Map<string, number>();
  for (const row of dailyRes.data ?? []) {
    const date = row.created_at.slice(0, 10);
    dailyMap.set(date, (dailyMap.get(date) ?? 0) + 1);
  }
  // Fill missing days
  const dailyViews: DailyViews[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dailyViews.push({ date: key, views: dailyMap.get(key) ?? 0 });
  }

  // Explainer breakdown — auto-discover from data
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
    views30d,
    activeExplainers: explainerMap.size,
    dailyViews,
    explainers,
    referrers,
    devices,
    browsers,
    heatmap,
    recentEvents,
  };
}
