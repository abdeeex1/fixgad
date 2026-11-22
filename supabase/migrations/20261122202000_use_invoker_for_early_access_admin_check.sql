-- The helper only checks the caller's own admin membership.
-- SECURITY INVOKER lets the early_access_admins RLS policy enforce that read.
create or replace function public.is_early_access_admin()
returns boolean
language sql
stable
security invoker
set search_path = public
as $function$
  select exists (
    select 1
    from public.early_access_admins
    where user_id = auth.uid()
  );
$function$;

revoke all on function public.is_early_access_admin() from public, anon;
grant execute on function public.is_early_access_admin() to authenticated;
