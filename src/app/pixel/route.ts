import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";

// 1x1 transparent GIF (43 bytes)
const TRANSPARENT_GIF = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

const RESPONSE_HEADERS = {
  "Content-Type": "image/gif",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
  "Access-Control-Allow-Origin": "*",
} as const;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const source = searchParams.get("s");
  const explainerId = searchParams.get("e");
  const version = searchParams.get("v");

  if (explainerId) {
    const referrer = req.headers.get("referer") ?? null;
    const userAgent = req.headers.get("user-agent") ?? null;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      null;

    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from("pixel_events").insert({
        explainer_id: explainerId,
        source: source ?? "oss",
        version: version ?? "1",
        referrer,
        user_agent: userAgent,
        ip_address: ip,
      });
      if (error) console.error("[pixel] insert failed:", error.message);
    }
  }

  return new Response(TRANSPARENT_GIF, { headers: RESPONSE_HEADERS });
}
