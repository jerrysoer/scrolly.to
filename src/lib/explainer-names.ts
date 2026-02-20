import { getSupabase } from "./supabase";

export interface ExplainerMeta {
  name: string;
  url: string | null;
}

let _cache: Map<string, ExplainerMeta> | null = null;
let _cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function fetchExplainerNames(): Promise<Map<string, ExplainerMeta>> {
  if (_cache && Date.now() - _cacheTime < CACHE_TTL) return _cache;

  const supabase = getSupabase();
  if (!supabase) return new Map();

  const { data, error } = await supabase
    .from("explainers")
    .select("id, name, url");

  if (error) {
    console.error("[explainer-names] fetch failed:", error.message);
    return _cache ?? new Map();
  }

  const map = new Map<string, ExplainerMeta>();
  for (const row of data ?? []) {
    map.set(row.id, { name: row.name, url: row.url });
  }

  _cache = map;
  _cacheTime = Date.now();
  return map;
}

export function getExplainerName(
  id: string,
  namesMap?: Map<string, ExplainerMeta>
): string {
  return namesMap?.get(id)?.name ?? id;
}

export function getExplainerUrl(
  id: string,
  namesMap?: Map<string, ExplainerMeta>
): string | null {
  return namesMap?.get(id)?.url ?? null;
}
