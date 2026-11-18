-- ============================================================
-- MycoScan — keepalive table
-- Run once in the Supabase SQL Editor. Safe to re-run.
--
-- The GitHub Actions workflow reads this table twice a week so the
-- free-tier project registers activity and does not auto-pause.
-- It holds no data of any kind.
-- ============================================================

create table if not exists public.keepalive (
  id        integer primary key default 1,
  pinged_at timestamptz not null default now(),
  constraint keepalive_single_row check (id = 1)
);

insert into public.keepalive (id) values (1) on conflict (id) do nothing;

alter table public.keepalive enable row level security;

drop policy if exists "keepalive readable" on public.keepalive;
create policy "keepalive readable"
  on public.keepalive for select using (true);
