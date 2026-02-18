create table if not exists pixel_events (
  id bigint generated always as identity primary key,
  explainer_id text not null,
  source text not null default 'oss',
  version text not null default '1',
  referrer text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

-- Index for querying by explainer
create index idx_pixel_events_explainer_id on pixel_events (explainer_id);

-- Index for time-range queries (dashboard analytics)
create index idx_pixel_events_created_at on pixel_events (created_at desc);

-- Enable RLS (no public access — only service role key writes)
alter table pixel_events enable row level security;
