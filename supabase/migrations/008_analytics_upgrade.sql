-- 008: Analytics upgrade — UTM tracking, section-level engagement, advanced RPCs

-- ============================================================
-- 1. New columns on pixel_events
-- ============================================================

ALTER TABLE pixel_events
  ADD COLUMN IF NOT EXISTS hostname text,
  ADD COLUMN IF NOT EXISTS page_path text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_content text;

-- ============================================================
-- 2. New columns on engagement_events
-- ============================================================

ALTER TABLE engagement_events
  ADD COLUMN IF NOT EXISTS hostname text,
  ADD COLUMN IF NOT EXISTS section_durations jsonb,
  ADD COLUMN IF NOT EXISTS last_section text,
  ADD COLUMN IF NOT EXISTS milestone integer;

-- ============================================================
-- 3. New column on explainers
-- ============================================================

ALTER TABLE explainers
  ADD COLUMN IF NOT EXISTS total_sections integer;

-- ============================================================
-- 4. Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_pixel_events_hostname
  ON pixel_events (hostname);

CREATE INDEX IF NOT EXISTS idx_pixel_events_utm_source
  ON pixel_events (utm_source);

CREATE INDEX IF NOT EXISTS idx_pixel_events_utm_campaign
  ON pixel_events (utm_campaign);

-- ============================================================
-- 5. RPC Functions
-- ============================================================

-- Classify visitors as new or returning based on first-seen date
CREATE OR REPLACE FUNCTION visitor_type_breakdown(since timestamptz)
RETURNS TABLE(visitor_type text, visitor_count bigint)
LANGUAGE sql STABLE
AS $$
  WITH first_seen AS (
    SELECT
      ip_address,
      MIN(created_at) AS first_visit
    FROM pixel_events
    GROUP BY ip_address
  )
  SELECT
    CASE
      WHEN fs.first_visit >= since THEN 'new'
      ELSE 'returning'
    END AS visitor_type,
    COUNT(*) AS visitor_count
  FROM first_seen fs
  WHERE fs.ip_address IN (
    SELECT DISTINCT ip_address
    FROM pixel_events
    WHERE created_at >= since
  )
  GROUP BY visitor_type;
$$;

-- Section-level dropoff analysis for a specific explainer
CREATE OR REPLACE FUNCTION section_dropoff(eid text, since timestamptz)
RETURNS TABLE(section_id text, view_count bigint, exit_count bigint)
LANGUAGE sql STABLE
AS $$
  WITH viewed AS (
    SELECT
      session_id,
      UNNEST(STRING_TO_ARRAY(sections_viewed, ',')) AS section_id,
      last_section
    FROM engagement_events
    WHERE explainer_id = eid AND created_at >= since
      AND sections_viewed IS NOT NULL
  )
  SELECT
    v.section_id,
    COUNT(*) AS view_count,
    COUNT(*) FILTER (WHERE v.section_id = v.last_section) AS exit_count
  FROM viewed v
  GROUP BY v.section_id
  ORDER BY view_count DESC;
$$;

-- Engagement heatmap grouped by day-of-week and hour
CREATE OR REPLACE FUNCTION engagement_by_hour(since timestamptz)
RETURNS TABLE(day_of_week integer, hour integer, avg_duration numeric, avg_depth numeric, session_count bigint)
LANGUAGE sql STABLE
AS $$
  SELECT
    EXTRACT(DOW FROM created_at)::integer AS day_of_week,
    EXTRACT(HOUR FROM created_at)::integer AS hour,
    ROUND(AVG(duration_seconds)::numeric, 1) AS avg_duration,
    ROUND(AVG(max_scroll_depth)::numeric, 1) AS avg_depth,
    COUNT(*) AS session_count
  FROM engagement_events
  WHERE created_at >= since
  GROUP BY day_of_week, hour
  ORDER BY day_of_week, hour;
$$;

-- Cross-reference top N countries with per-explainer view counts
CREATE OR REPLACE FUNCTION geo_explainer_matrix(since timestamptz, top_countries integer DEFAULT 10)
RETURNS TABLE(country text, explainer_id text, views bigint)
LANGUAGE sql STABLE
AS $$
  WITH ranked_countries AS (
    SELECT
      COALESCE(country, 'Unknown') AS country,
      COUNT(*) AS total_views
    FROM pixel_events
    WHERE created_at >= since
    GROUP BY country
    ORDER BY total_views DESC
    LIMIT top_countries
  )
  SELECT
    rc.country,
    pe.explainer_id,
    COUNT(*) AS views
  FROM pixel_events pe
  INNER JOIN ranked_countries rc
    ON COALESCE(pe.country, 'Unknown') = rc.country
  WHERE pe.created_at >= since
  GROUP BY rc.country, pe.explainer_id
  ORDER BY rc.country, views DESC;
$$;
