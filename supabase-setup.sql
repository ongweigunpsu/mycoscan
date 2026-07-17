-- ============================================================
-- MycoScan — Supabase setup
-- Run this once in the Supabase SQL Editor.
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS.
-- ============================================================

-- ---------- uploads table ----------
create table if not exists public.uploads (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  user_id           uuid references auth.users(id) on delete cascade,
  user_email        text,
  image_url         text,
  storage_path      text,
  disease_type      text,
  mushroom_species  text,
  sensor_type       text,
  growth_stage      text,
  severity_grade    text,
  notes             text,
  country           text,
  original_filename text,
  file_size_kb      integer
);

alter table public.uploads enable row level security;

drop policy if exists "anyone can view uploads" on public.uploads;
create policy "anyone can view uploads"
  on public.uploads for select using (true);

drop policy if exists "authenticated can insert own" on public.uploads;
create policy "authenticated can insert own"
  on public.uploads for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "users can delete own" on public.uploads;
create policy "users can delete own"
  on public.uploads for delete to authenticated
  using (auth.uid() = user_id);

-- ---------- storage bucket ----------
insert into storage.buckets (id, name, public)
values ('mycoscan-images', 'mycoscan-images', true)
on conflict (id) do nothing;

drop policy if exists "public read images" on storage.objects;
create policy "public read images"
  on storage.objects for select
  using (bucket_id = 'mycoscan-images');

drop policy if exists "authenticated upload images" on storage.objects;
create policy "authenticated upload images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'mycoscan-images');

drop policy if exists "owner delete images" on storage.objects;
create policy "owner delete images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'mycoscan-images' and owner = auth.uid());
