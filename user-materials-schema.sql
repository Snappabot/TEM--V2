-- user_materials table
-- Run this in Supabase SQL editor (or via psql) to enable
-- the elevation visualizer's material upload feature.

create table if not exists user_materials (
  id         uuid        default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  label      text,
  image_data text,        -- truncated base64 preview or storage URL
  status     text        default 'pending'  -- pending | approved | rejected
);

-- Optional: RLS (the API uses the service key, so inserts bypass RLS)
alter table user_materials enable row level security;

-- Only service role can read/write; no anon access
create policy "service_only" on user_materials
  using (false)
  with check (false);
