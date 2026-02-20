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
  const country = req.headers.get("x-vercel-ip-country") ?? null;
  const region = req.headers.get("x-vercel-ip-region") ?? null;
  const city = req.headers.get("x-vercel-ip-city") ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;
  const referrer = req.headers.get("referer") ?? null;

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("engagement_events").insert({
      session_id: sessionId,
      explainer_id: explainerId,
      duration_seconds: duration,
      max_scroll_depth: scrollDepth,
      sections_viewed: sectionsViewed,
      country,
      region,
      city,
      user_agent: userAgent,
      ip_address: ip,
      referrer,
    });
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
