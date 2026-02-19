create table if not exists suggestions (
  id bigint generated always as identity primary key,
  topic text not null,
  email text,
  ip_address text,
  created_at timestamptz not null default now()
);

create index idx_suggestions_ip_created on suggestions (ip_address, created_at desc);

alter table suggestions enable row level security;
