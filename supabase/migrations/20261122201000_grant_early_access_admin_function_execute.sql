-- The registrations RLS policies call this helper to verify admin membership.
-- Grant execution to signed-in users; row access remains controlled by RLS.
grant execute on function public.is_early_access_admin() to authenticated;
