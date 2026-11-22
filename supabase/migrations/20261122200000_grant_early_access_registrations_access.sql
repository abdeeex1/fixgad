-- The table remains protected by RLS. Only users accepted by
-- public.is_early_access_admin() can read or update registration rows.
grant select, update on table public.early_access_registrations to authenticated;
