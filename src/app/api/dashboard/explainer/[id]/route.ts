import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const UAParser = require("ua-parser-js") as (ua: string) => {
  browser: { name?: string };
  os: { name?: string };
  device: { type?: string };
};

const EMPTY = {
  explainer: null,
  totalViews: 0,
  avgDuration: 0,
  completionRate: 0,
  dailyViews: [],
  scrollFunnel: { "25": 0, "50": 0, "75": 0, "100": 0 },
  sectionBreakdown: {},
  geo: [],
  referrers: [],
  devices: { browsers: {}, os: {}, deviceTypes: {} },
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const days = Math.min(
    Math.max(parseInt(req.nextUrl.searchParams.get("days") ?? "30", 10) || 30, 1),
    365
  );
  const since = new Date(Date.now() - days * 86_400_000).toISOString();

  const supabase = getSupabase();
  if (!supabase) {
    return Response.json(EMPTY, {
      headers: { "Cache-Control": "private, max-age=60" },
    });
  }

  // Fetch explainer metadata, daily views, geo, referrers, and engagement data in parallel
  const [explainerRes, dailyRes, geoRes, referrerRes, engagementRes] =
    await Promise.all([
      supabase.from("explainers").select("id, name, url").eq("id", id).single(),
      supabase.rpc("explainer_daily_views", { eid: id, since }),
      supabase.rpc("explainer_geo", { eid: id, since }),
      supabase.rpc("explainer_referrers", { eid: id, since }),
      supabase
        .from("engagement_events")
        .select("duration_seconds, max_scroll_depth, user_agent, sections_viewed")
        .eq("explainer_id", id)
        .gte("created_at", since),
    ]);

  const explainer = explainerRes.data ?? { id, name: id, url: "" };
  const dailyViews = dailyRes.data ?? [];
  const geo = geoRes.data ?? [];
  const referrers = referrerRes.data ?? [];
  const engagements: Array<{
    duration_seconds: number;
    max_scroll_depth: number;
    user_agent: string | null;
    sections_viewed: string | null;
  }> = engagementRes.data ?? [];

  // Total views from daily views
  const totalViews = (dailyViews as Array<{ views: number }>).reduce(
    (sum: number, d: { views: number }) => sum + (d.views ?? 0),
    0
  );

  // Engagement metrics
  let avgDuration = 0;
  let completionRate = 0;
  const scrollFunnel = { "25": 0, "50": 0, "75": 0, "100": 0 };
  const browsers: Record<string, number> = {};
  const os: Record<string, number> = {};
  const deviceTypes: Record<string, number> = {};

  const sectionCounts: Record<string, number> = {};

  if (engagements.length > 0) {
    let totalDuration = 0;
    let completedCount = 0;

    for (const e of engagements) {
      totalDuration += e.duration_seconds ?? 0;

      const depth = e.max_scroll_depth ?? 0;
      if (depth >= 25) scrollFunnel["25"]++;
      if (depth >= 50) scrollFunnel["50"]++;
      if (depth >= 75) scrollFunnel["75"]++;
      if (depth >= 90) completedCount++;
      if (depth >= 100) scrollFunnel["100"]++;

      // Aggregate sections_viewed
      if (e.sections_viewed) {
        const sections = e.sections_viewed.split(",").map((s) => s.trim()).filter(Boolean);
        for (const sec of sections) {
          sectionCounts[sec] = (sectionCounts[sec] ?? 0) + 1;
        }
      }

      // Parse user agent
      if (e.user_agent) {
        const result = UAParser(e.user_agent);

        const browserName = result.browser.name ?? "Unknown";
        browsers[browserName] = (browsers[browserName] ?? 0) + 1;

        const osName = result.os.name ?? "Unknown";
        os[osName] = (os[osName] ?? 0) + 1;

        const deviceType = result.device.type ?? "desktop";
        const normalizedType =
          deviceType.charAt(0).toUpperCase() + deviceType.slice(1);
        deviceTypes[normalizedType] = (deviceTypes[normalizedType] ?? 0) + 1;
      }
    }

    avgDuration = Math.round(totalDuration / engagements.length);
    completionRate = Math.round((completedCount / engagements.length) * 100);
  }

  return Response.json(
    {
      explainer,
      totalViews,
      avgDuration,
      completionRate,
      dailyViews,
      scrollFunnel,
      sectionBreakdown: sectionCounts,
      geo,
      referrers,
      devices: { browsers, os, deviceTypes },
    },
    { headers: { "Cache-Control": "private, max-age=60" } }
  );
}
