-- 006: Add region to explainer_geo RPC
-- Must DROP first because return type changed (added region column)

DROP FUNCTION IF EXISTS explainer_geo(text, timestamptz);

CREATE FUNCTION explainer_geo(eid text, since timestamptz)
RETURNS TABLE(country text, region text, city text, views bigint)
LANGUAGE sql STABLE
AS $$
  SELECT
    COALESCE(country, 'Unknown') AS country,
    region,
    COALESCE(city, 'Unknown') AS city,
    COUNT(*) AS views
  FROM pixel_events
  WHERE explainer_id = eid AND created_at >= since
  GROUP BY country, region, city
  ORDER BY views DESC
  LIMIT 50;
$$;
