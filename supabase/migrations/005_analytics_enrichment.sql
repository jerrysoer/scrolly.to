-- 005: Analytics enrichment — geo columns, engagement events, dashboard RPCs

-- ============================================================
-- 1. Add geo + session columns to pixel_events
-- ============================================================

ALTER TABLE pixel_events
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS session_id text;

-- Composite index for time-range queries scoped to explainer
CREATE INDEX IF NOT EXISTS idx_pixel_events_explainer_created
  ON pixel_events (explainer_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_pixel_events_country
  ON pixel_events (country);

CREATE INDEX IF NOT EXISTS idx_pixel_events_session
  ON pixel_events (session_id);

-- ============================================================
-- 2. Engagement events table
-- ============================================================

CREATE TABLE IF NOT EXISTS engagement_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  session_id text NOT NULL,
  explainer_id text NOT NULL,
  duration_seconds integer NOT NULL DEFAULT 0,
  max_scroll_depth integer NOT NULL DEFAULT 0,  -- 0-100
  sections_viewed text,                          -- comma-separated section IDs
  country text,
  region text,
  city text,
  user_agent text,
  ip_address text,
  referrer text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_engagement_explainer
  ON engagement_events (explainer_id);

CREATE INDEX IF NOT EXISTS idx_engagement_created
  ON engagement_events (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_engagement_session
  ON engagement_events (session_id);

ALTER TABLE engagement_events ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 3. Dashboard RPC functions
-- ============================================================

-- Distinct visitor count (unique IPs) since a given timestamp
CREATE OR REPLACE FUNCTION count_unique_ips(since timestamptz)
RETURNS bigint
LANGUAGE sql STABLE
AS $$
  SELECT COUNT(DISTINCT ip_address)
  FROM pixel_events
  WHERE created_at >= since;
$$;

-- Top explainers ranked by view count
CREATE OR REPLACE FUNCTION top_explainers(since timestamptz, lim integer DEFAULT 20)
RETURNS TABLE(explainer_id text, name text, url text, view_count bigint)
LANGUAGE sql STABLE
AS $$
  SELECT
    pe.explainer_id,
    COALESCE(e.name, pe.explainer_id) AS name,
    e.url,
    COUNT(*) AS view_count
  FROM pixel_events pe
  LEFT JOIN explainers e ON e.id = pe.explainer_id
  WHERE pe.created_at >= since
  GROUP BY pe.explainer_id, e.name, e.url
  ORDER BY view_count DESC
  LIMIT lim;
$$;

-- Daily view totals for overview chart
CREATE OR REPLACE FUNCTION daily_views(since timestamptz)
RETURNS TABLE(day date, views bigint)
LANGUAGE sql STABLE
AS $$
  SELECT
    DATE(created_at) AS day,
    COUNT(*) AS views
  FROM pixel_events
  WHERE created_at >= since
  GROUP BY day
  ORDER BY day;
$$;

-- Per-explainer daily views
CREATE OR REPLACE FUNCTION explainer_daily_views(eid text, since timestamptz)
RETURNS TABLE(day date, views bigint)
LANGUAGE sql STABLE
AS $$
  SELECT
    DATE(created_at) AS day,
    COUNT(*) AS views
  FROM pixel_events
  WHERE explainer_id = eid AND created_at >= since
  GROUP BY day
  ORDER BY day;
$$;

-- Geo breakdown for a specific explainer
CREATE OR REPLACE FUNCTION explainer_geo(eid text, since timestamptz)
RETURNS TABLE(country text, city text, views bigint)
LANGUAGE sql STABLE
AS $$
  SELECT
    COALESCE(country, 'Unknown') AS country,
    COALESCE(city, 'Unknown') AS city,
    COUNT(*) AS views
  FROM pixel_events
  WHERE explainer_id = eid AND created_at >= since
  GROUP BY country, city
  ORDER BY views DESC
  LIMIT 50;
$$;

-- Referrer breakdown for a specific explainer
CREATE OR REPLACE FUNCTION explainer_referrers(eid text, since timestamptz)
RETURNS TABLE(referrer_domain text, views bigint)
LANGUAGE sql STABLE
AS $$
  SELECT
    COALESCE(
      CASE
        WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
        ELSE SPLIT_PART(SPLIT_PART(referrer, '://', 2), '/', 1)
      END,
      'Direct'
    ) AS referrer_domain,
    COUNT(*) AS views
  FROM pixel_events
  WHERE explainer_id = eid AND created_at >= since
  GROUP BY referrer_domain
  ORDER BY views DESC
  LIMIT 20;
$$;
