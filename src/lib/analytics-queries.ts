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
  WaitlistEntry,
  CampaignStats,
  VisitorTypeBreakdown,
  ReadingQuality,
  DayOfWeekAvg,
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

function categorizeReferrer(domain: string): string {
  if (['google', 'bing', 'duckduckgo', 'baidu', 'yandex'].some(s => domain.includes(s))) return 'Search';
  if (['t.co', 'twitter.com', 'x.com', 'linkedin', 'reddit', 'facebook', 'news.ycombinator'].some(s => domain.includes(s))) return 'Social';
  if (domain === 'Direct') return 'Direct';
  if (['substack', 'mailchimp', 'campaign-monitor', 'convertkit'].some(s => domain.includes(s))) return 'Newsletter';
  return 'Other';
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
    // Waitlist
    waitlistTotalRes,
    waitlistPeriodRes,
    waitlistPrevRes,
    waitlistRecentRes,
    // New queries
    visitorTypeRes,
    utmEventsRes,
    perExplainerEngagementRes,
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

    // Waitlist — total count
    supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true }),

    // Waitlist — current period
    supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since),

    // Waitlist — previous period (for trend)
    supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .gte("created_at", prevStart)
      .lt("created_at", prevEnd),

    // Waitlist — recent 5 signups
    supabase
      .from("waitlist")
      .select("email, created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    // Visitor type breakdown via RPC
    supabase.rpc("visitor_type_breakdown", { since }),

    // UTM campaign data — pixel events with utm_source
    supabase
      .from("pixel_events")
      .select("utm_source, utm_campaign, utm_medium, created_at")
      .not("utm_source", "is", null)
      .gte("created_at", since),

    // Per-explainer engagement data
    supabase
      .from("engagement_events")
      .select("explainer_id, duration_seconds, max_scroll_depth")
      .gte("created_at", since),
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
  // Per-explainer engagement aggregation for engagementScore
  const perExplainerEngagement = new Map<string, { totalDur: number; totalDepth: number; count: number }>();
  for (const row of perExplainerEngagementRes.data ?? []) {
    const id = row.explainer_id;
    if (!perExplainerEngagement.has(id)) {
      perExplainerEngagement.set(id, { totalDur: 0, totalDepth: 0, count: 0 });
    }
    const agg = perExplainerEngagement.get(id)!;
    agg.totalDur += row.duration_seconds ?? 0;
    agg.totalDepth += row.max_scroll_depth ?? 0;
    agg.count++;
  }

  const explainers: ExplainerStats[] = Array.from(explainerMap.entries())
    .map(([id, s]) => {
      const eng = perExplainerEngagement.get(id);
      let engagementScore = 0;
      if (eng && eng.count > 0) {
        const avgDur = eng.totalDur / eng.count;
        const avgDepth = eng.totalDepth / eng.count;
        // Score: weighted combination of duration (max 60s) and depth (0-100)
        engagementScore = Math.round(
          (Math.min(avgDur, 60) / 60) * 50 + (avgDepth / 100) * 50
        );
      }
      return {
        id,
        name: getExplainerName(id, namesMap),
        url: namesMap.get(id)?.url ?? null,
        total: s.total,
        last7d: s.last7d,
        last30d: s.last30d,
        engagementScore,
      };
    })
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
    .map(([domain, count]) => ({ domain, count, category: categorizeReferrer(domain) }))
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

  // Geo distribution — decode URL-encoded city/region from Vercel headers
  const geo: GeoRow[] = (geoRes.data ?? []).map((row: { country: string; region: string | null; city: string; views: number }) => {
    let city = row.city;
    let region = row.region;
    try { city = decodeURIComponent(city); } catch {}
    try { region = region ? decodeURIComponent(region) : region; } catch {}
    return {
      country: row.country,
      region,
      city,
      views: Number(row.views),
    };
  });

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

  // Waitlist
  const waitlistTotal = waitlistTotalRes.count ?? 0;
  const waitlistPeriod = waitlistPeriodRes.count ?? 0;
  const waitlistPrev = waitlistPrevRes.count ?? 0;
  const waitlistTrend = computeTrend(waitlistPeriod, waitlistPrev);
  const recentWaitlistSignups: WaitlistEntry[] = (waitlistRecentRes.data ?? []).map(
    (row: { email: string; created_at: string }) => ({
      email: row.email,
      created_at: row.created_at,
    })
  );

  // Completion rate — percentage of engagements with max_scroll_depth >= 90
  const completedCount = engagements.filter(e => (e.max_scroll_depth ?? 0) >= 90).length;
  const completionRate = engagements.length > 0
    ? Math.round((completedCount / engagements.length) * 100)
    : 0;

  // Reading quality quadrants
  const readingQualityCounts = { 'deep-reader': 0, 'skimmer': 0, 'stuck': 0, 'bounced': 0 };
  for (const e of engagements) {
    const dur = e.duration_seconds ?? 0;
    const depth = e.max_scroll_depth ?? 0;
    if (dur >= 60 && depth >= 70) readingQualityCounts['deep-reader']++;
    else if (dur < 30 && depth >= 50) readingQualityCounts['skimmer']++;
    else if (dur >= 60 && depth < 30) readingQualityCounts['stuck']++;
    else if (dur < 10) readingQualityCounts['bounced']++;
  }
  const readingQuality: ReadingQuality[] = (
    Object.entries(readingQualityCounts) as [ReadingQuality['quadrant'], number][]
  ).map(([quadrant, count]) => ({ quadrant, count }));

  // Day of week averages from dailyViews
  const dayTotals = new Map<number, { sum: number; count: number }>();
  for (const dv of dailyViews) {
    const dayOfWeek = new Date(dv.date).getUTCDay();
    if (!dayTotals.has(dayOfWeek)) {
      dayTotals.set(dayOfWeek, { sum: 0, count: 0 });
    }
    const entry = dayTotals.get(dayOfWeek)!;
    entry.sum += dv.views;
    entry.count++;
  }
  const dayOfWeekAvg: DayOfWeekAvg[] = [];
  for (let day = 0; day < 7; day++) {
    const entry = dayTotals.get(day);
    dayOfWeekAvg.push({
      day,
      avgViews: entry ? Math.round(entry.sum / entry.count) : 0,
    });
  }

  // Visitor type breakdown
  const visitorBreakdown: VisitorTypeBreakdown[] = (visitorTypeRes.data ?? []).map(
    (row: { visitor_type: string; visitor_count: number }) => ({
      visitor_type: row.visitor_type,
      visitor_count: Number(row.visitor_count),
    })
  );

  // UTM campaign aggregation
  const campaignMap = new Map<string, { views: number; sources: Set<string> }>();
  for (const row of utmEventsRes.data ?? []) {
    const key = `${row.utm_source}||${row.utm_campaign ?? ''}||${row.utm_medium ?? ''}`;
    if (!campaignMap.has(key)) {
      campaignMap.set(key, { views: 0, sources: new Set() });
    }
    campaignMap.get(key)!.views++;
  }
  // Join with engagement data for campaign-level metrics
  const campaignEngagement = new Map<string, { totalDur: number; completions: number; total: number }>();
  for (const row of perExplainerEngagementRes.data ?? []) {
    // Aggregate all engagement for campaign avg_duration / completion_rate fallback
    const key = '__all__';
    if (!campaignEngagement.has(key)) {
      campaignEngagement.set(key, { totalDur: 0, completions: 0, total: 0 });
    }
    const agg = campaignEngagement.get(key)!;
    agg.totalDur += row.duration_seconds ?? 0;
    agg.completions += (row.max_scroll_depth ?? 0) >= 90 ? 1 : 0;
    agg.total++;
  }
  const globalEngagement = campaignEngagement.get('__all__');
  const globalAvgDur = globalEngagement && globalEngagement.total > 0
    ? Math.round(globalEngagement.totalDur / globalEngagement.total)
    : 0;
  const globalCompletionRate = globalEngagement && globalEngagement.total > 0
    ? Math.round((globalEngagement.completions / globalEngagement.total) * 100)
    : 0;

  const campaigns: CampaignStats[] = Array.from(campaignMap.entries())
    .map(([key, val]) => {
      const [utm_source, utm_campaign, utm_medium] = key.split('||');
      return {
        utm_source,
        utm_campaign: utm_campaign || null,
        utm_medium: utm_medium || null,
        views: val.views,
        avg_duration: globalAvgDur,
        completion_rate: globalCompletionRate,
      };
    })
    .sort((a, b) => b.views - a.views);

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
    waitlistTotal,
    waitlist7d: waitlistPeriod,
    waitlistTrend,
    recentWaitlistSignups,
    completionRate,
    visitorBreakdown,
    campaigns,
    readingQuality,
    dayOfWeekAvg,
  };
}
