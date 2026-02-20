-- 007: Global geo aggregation for main analytics dashboard

CREATE OR REPLACE FUNCTION global_geo(since timestamptz)
RETURNS TABLE(country text, region text, city text, views bigint)
LANGUAGE sql STABLE
AS $$
  SELECT
    COALESCE(country, 'Unknown') AS country,
    region,
    COALESCE(city, 'Unknown') AS city,
    COUNT(*) AS views
  FROM pixel_events
  WHERE created_at >= since
  GROUP BY country, region, city
  ORDER BY views DESC
  LIMIT 50;
$$;
