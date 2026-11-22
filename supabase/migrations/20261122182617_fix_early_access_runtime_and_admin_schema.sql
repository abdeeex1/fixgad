-- Align the production early-access schema with the public registration form and admin dashboard.
alter table public.early_access_registrations
  add column if not exists phone text,
  add column if not exists preferred_language text,
  add column if not exists primary_trade text,
  add column if not exists custom_profession text,
  add column if not exists additional_trades text[] not null default '{}',
  add column if not exists experience_years integer,
  add column if not exists service_description text,
  add column if not exists admin_notes text;

alter table public.early_access_registrations
  drop constraint if exists early_access_registrations_status_check;
alter table public.early_access_registrations
  add constraint early_access_registrations_status_check
  check (status = any (array['new','pending_review','approved','rejected','contacted','pending','accepted','closed']::text[]));
alter table public.early_access_registrations alter column status set default 'pending';

create or replace function public.register_early_access(
  full_name text, email text, city text, registration_type text, phone text,
  preferred_language text, primary_trade text, additional_trades text[],
  experience_years integer, service_description text, custom_profession text,
  source_ip_hash text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  clean_name text := btrim(full_name);
  clean_email text := lower(btrim(email));
  clean_city text := btrim(city);
  recent_attempts integer;
  inserted_id uuid;
begin
  if clean_name is null or char_length(clean_name) < 2 or char_length(clean_name) > 100 then
    return jsonb_build_object('status','invalid','message','Invalid full name');
  end if;
  if clean_email is null or char_length(clean_email) < 3 or char_length(clean_email) > 255
     or clean_email !~ '^[A-Za-z0-9.!#$%&''*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$' then
    return jsonb_build_object('status','invalid','message','Invalid email address');
  end if;
  if clean_city is null or char_length(clean_city) < 2 or char_length(clean_city) > 100 then
    return jsonb_build_object('status','invalid','message','Invalid city');
  end if;
  if registration_type not in ('customer','hrayfi') then
    return jsonb_build_object('status','invalid','message','Invalid user type');
  end if;
  if source_ip_hash is null or char_length(source_ip_hash) <> 64 then
    return jsonb_build_object('status','invalid','message','Invalid submission source');
  end if;
  if experience_years is not null and (experience_years < 0 or experience_years > 60) then
    return jsonb_build_object('status','invalid','message','Invalid experience');
  end if;
  delete from public.early_access_submission_attempts where attempted_at < now() - interval '10 minutes';
  select count(*) into recent_attempts from public.early_access_submission_attempts
    where ip_hash = source_ip_hash and attempted_at >= now() - interval '10 minutes';
  if recent_attempts >= 5 then return jsonb_build_object('status','rate_limited'); end if;
  insert into public.early_access_submission_attempts(ip_hash) values (source_ip_hash);
  begin
    insert into public.early_access_registrations (
      full_name,email,normalized_email,city,user_type,status,phone,preferred_language,
      primary_trade,additional_trades,experience_years,service_description,custom_profession
    ) values (
      clean_name,clean_email,clean_email,clean_city,registration_type,'pending',
      nullif(btrim(phone),''),nullif(btrim(preferred_language),''),nullif(btrim(primary_trade),''),
      coalesce(additional_trades,'{}'),experience_years,nullif(btrim(service_description),''),
      nullif(btrim(custom_profession),'')
    ) returning id into inserted_id;
  exception when unique_violation then
    return jsonb_build_object('status','duplicate');
  end;
  return jsonb_build_object('status','success','id',inserted_id);
end;
$function$;

revoke all on function public.register_early_access(text,text,text,text,text,text,text,text[],integer,text,text,text) from public;
grant execute on function public.register_early_access(text,text,text,text,text,text,text,text[],integer,text,text,text) to anon;
revoke all on function public.rls_auto_enable() from public, anon, authenticated;
