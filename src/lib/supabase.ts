import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn("[supabase] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return null;
  }

  _client = createClient(url, key);
  return _client;
}
