import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 400, headers: corsHeaders });
  }

  const sessionId = typeof body.sid === "string" ? body.sid : null;
  const explainerId = typeof body.e === "string" ? body.e : null;
  const rawDuration = typeof body.d === "number" ? body.d : 0;
  const rawScroll = typeof body.sd === "number" ? body.sd : 0;
  const sectionsViewed = typeof body.sv === "string" ? body.sv : null;
  const sectionDurations = body.st && typeof body.st === "object" && !Array.isArray(body.st) ? body.st : null;
  const lastSection = typeof body.ls === "string" ? body.ls : null;
  const milestone = typeof body.milestone === "number" ? body.milestone : null;

  if (!sessionId || !explainerId) {
    return new Response(null, { status: 400, headers: corsHeaders });
  }

  // Clamp values to valid ranges
  const duration = Math.min(Math.max(Math.round(rawDuration), 0), 7200);
  const scrollDepth = Math.min(Math.max(Math.round(rawScroll), 0), 100);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;
  const referrer = req.headers.get("referer") ?? null;

  // Filter localhost traffic
  const refHost = referrer ? (() => { try { return new URL(referrer).hostname; } catch { return null; } })() : null;
  const isLocal = refHost === "localhost" || refHost === "127.0.0.1" || ip === "127.0.0.1" || ip === "::1";
  if (isLocal) return new Response(null, { status: 204, headers: corsHeaders });

  const country = req.headers.get("x-vercel-ip-country") ?? null;
  const region = req.headers.get("x-vercel-ip-region") ?? null;
  const city = req.headers.get("x-vercel-ip-city") ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;

  // Extract hostname from referrer
  const hostname = refHost ?? null;

  const supabase = getSupabase();
  if (supabase) {
    const insertData: Record<string, unknown> = {
      session_id: sessionId,
      explainer_id: explainerId,
      duration_seconds: duration,
      max_scroll_depth: scrollDepth,
      sections_viewed: sectionsViewed,
      section_durations: sectionDurations,
      last_section: lastSection,
      hostname,
      country,
      region,
      city,
      user_agent: userAgent,
      ip_address: ip,
      referrer,
    };

    // Milestone pings only carry the milestone field
    if (milestone !== null) {
      insertData.milestone = milestone;
    }

    const { error } = await supabase.from("engagement_events").insert(insertData);
    if (error) console.error("[beacon] insert failed:", error.message);
  }

  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
