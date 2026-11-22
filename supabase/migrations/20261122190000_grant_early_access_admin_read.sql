-- Allow signed-in users to read their own early-access admin membership row.
-- Row-level security remains enforced by early_access_admin_read.
GRANT SELECT ON TABLE public.early_access_admins TO authenticated;
