create table if not exists explainers (
  id text primary key,
  name text not null,
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS (only service role key writes)
alter table explainers enable row level security;
