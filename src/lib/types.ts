export interface EngagementSignal {
  platform: string;
  points?: number;
  comments?: number;
  url?: string;
}

export interface Story {
  title: string;
  source: string;
  url: string;
  published: string;
  score: number;
  teaser: string;
  summary: string;
  key_facts: string[];
  scrolly_angle: string;
  category: string;
  engagement?: EngagementSignal[];
}

export interface CategoryData {
  label: string;
  stories: Story[];
}

export interface Feed {
  generated_at: string;
  date_label: string;
  categories: Record<string, CategoryData>;
}

/* ── Waitlist types ── */

export interface WaitlistEntry {
  email: string;
  created_at: string;
}

/* ── Analytics types ── */

export interface DailyViews {
  date: string;
  views: number;
}

export interface ExplainerStats {
  id: string;
  name: string;
  url: string | null;
  total: number;
  last7d: number;
  last30d: number;
}

export interface ReferrerGroup {
  domain: string;
  count: number;
}

export interface DeviceStats {
  label: string;
  count: number;
}

export interface GeoRow {
  country: string;
  region: string | null;
  city: string;
  views: number;
}

export interface HeatmapCell {
  day: number;   // 0=Sun … 6=Sat
  hour: number;  // 0–23
  count: number;
}

export interface RecentEvent {
  id: number;
  explainer_id: string;
  explainer_name: string;
  explainer_url: string | null;
  referrer: string | null;
  device: string;
  browser: string;
  created_at: string;
}

export interface TrendIndicator {
  value: number; // percentage change
  label: string; // e.g. "vs prev 30d"
}

export interface AnalyticsData {
  totalViews: number;
  views7d: number;
  views30d: number;
  activeExplainers: number;
  uniqueVisitors7d: number;
  uniqueVisitors30d: number;
  avgDuration: number;      // seconds
  avgScrollDepth: number;   // 0–100
  bounceRate: number;       // 0–100
  trendViews: TrendIndicator | null;
  trendUniqueVisitors: TrendIndicator | null;
  trendAvgDuration: TrendIndicator | null;
  dailyViews: DailyViews[];
  explainers: ExplainerStats[];
  referrers: ReferrerGroup[];
  devices: DeviceStats[];
  browsers: DeviceStats[];
  geo: GeoRow[];
  heatmap: HeatmapCell[];
  recentEvents: RecentEvent[];
  waitlistTotal: number;
  waitlist7d: number;
  waitlistTrend: TrendIndicator | null;
  recentWaitlistSignups: WaitlistEntry[];
}
