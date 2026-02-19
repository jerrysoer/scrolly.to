import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { checkProfanity } from "@/lib/profanity";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { topic?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const topic = body.topic?.trim();
  if (!topic || topic.length < 5 || topic.length > 200) {
    return NextResponse.json(
      { error: "Topic must be 5–200 characters" },
      { status: 400 }
    );
  }

  // Server-side profanity check (defense in depth)
  if (checkProfanity(topic)) {
    return NextResponse.json(
      { error: "Please remove inappropriate language" },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase() || null;
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Suggestions temporarily unavailable" },
      { status: 503 }
    );
  }

  // IP extraction (same pattern as pixel/route.ts)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;

  // IP-based rate limit: 1 suggestion per 60s per IP
  if (ip) {
    const cutoff = new Date(Date.now() - 60_000).toISOString();
    const { data: recent } = await supabase
      .from("suggestions")
      .select("id")
      .eq("ip_address", ip)
      .gte("created_at", cutoff)
      .limit(1);

    if (recent && recent.length > 0) {
      return NextResponse.json(
        { error: "Please wait a minute before submitting again" },
        { status: 429 }
      );
    }
  }

  const { error } = await supabase
    .from("suggestions")
    .insert({ topic, email, ip_address: ip });

  if (error) {
    console.error("[suggestions] insert failed:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
