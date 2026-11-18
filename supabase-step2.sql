-- ============================================================
-- MycoScan — Step 2 migration
-- Consent records, provenance, and closing the email leak.
-- Run once in the Supabase SQL Editor. Safe to re-run.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Consent and provenance columns on uploads
-- ------------------------------------------------------------
-- A dataset is only publishable if every record can say who contributed it,
-- under which licence, and under which version of the agreement. Without
-- these columns a withdrawal request cannot be honoured reliably and the
-- dataset cannot go to a data journal.

alter table public.uploads add column if not exists consent_version     text;
alter table public.uploads add column if not exists consent_license     text;
alter table public.uploads add column if not exists consent_accepted_at timestamptz;
alter table public.uploads add column if not exists attribution_kind    text;
alter table public.uploads add column if not exists attribution_value   text;
alter table public.uploads add column if not exists metadata_stripped   boolean default false;
alter table public.uploads add column if not exists image_width_px      integer;
alter table public.uploads add column if not exists image_height_px     integer;
alter table public.uploads add column if not exists withdrawn_at        timestamptz;

-- Attribution must name someone unless it is anonymous.
alter table public.uploads drop constraint if exists attribution_value_required;
alter table public.uploads add constraint attribution_value_required
  check (
    attribution_kind is null
    or attribution_kind = 'anonymous'
    or attribution_value is not null
  );

-- ------------------------------------------------------------
-- 2. Close the contributor email leak
-- ------------------------------------------------------------
-- The original policy was `for select using (true)` on a table holding
-- user_email, so anyone could read every contributor's address through the
-- public API. Contributors see their own rows; everyone else reads the view
-- below, which has no email column.

drop policy if exists "anyone can view uploads" on public.uploads;

drop policy if exists "contributors view own uploads" on public.uploads;
create policy "contributors view own uploads"
  on public.uploads for select to authenticated
  using (auth.uid() = user_id);

create or replace view public.uploads_public
with (security_invoker = off) as
select
  id,
  created_at,
  image_url,
  storage_path,
  disease_type,
  mushroom_species,
  sensor_type,
  growth_stage,
  severity_grade,
  notes,
  country,
  file_size_kb,
  image_width_px,
  image_height_px,
  consent_license,
  case
    when attribution_kind is null or attribution_kind = 'anonymous'
      then 'Anonymous contributor'
    else attribution_value
  end as attribution
from public.uploads
where withdrawn_at is null;

comment on view public.uploads_public is
  'Public read surface for the dataset. Excludes user_email, user_id and original_filename. Excludes withdrawn records.';

grant select on public.uploads_public to anon, authenticated;

-- ------------------------------------------------------------
-- 3. Stop storing the original filename
-- ------------------------------------------------------------
-- Filenames carry identifying detail (farm names, dates, camera paths).
-- The client now sends a random UUID instead. Clear anything already stored.

update public.uploads set original_filename = null where original_filename is not null;

-- ------------------------------------------------------------
-- 4. Mark pre-existing rows as predating the consent flow
-- ------------------------------------------------------------
-- Any row already in the table was collected before the Contributor
-- Agreement existed. It must not be treated as consented, and must not be
-- published in a release until consent is obtained or it is removed.

update public.uploads
   set consent_version = 'pre-agreement'
 where consent_version is null;
