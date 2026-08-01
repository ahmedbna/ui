-- Profiles: the app-owned half of a user.
--
-- `auth.users` belongs to Supabase and you should not write to it. Anything
-- your app needs about a user — display name, avatar, whether they finished
-- onboarding — goes here, keyed by the same id.

create table public.profiles (
  id           uuid        primary key references auth.users (id) on delete cascade,
  email        text,
  display_name text        check (display_name is null or char_length(display_name) between 1 and 64),
  avatar_url   text,
  onboarded    boolean     not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Every policy is scoped by `auth.uid()`, the id embedded in the caller's JWT.
-- It is null for an anonymous caller, so each of these fails closed.
create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No INSERT policy: rows are created by the trigger below, which runs as the
-- definer and bypasses RLS. No DELETE policy either — profiles go when the
-- auth user goes, via `on delete cascade`.

-- A profile has to exist the moment a user does, or the app's first read after
-- sign-up returns nothing and the UI has to special-case it forever. Doing it
-- in a trigger rather than from the client also means it cannot be skipped by
-- a user who closes the app mid-sign-up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
-- `security definer` runs as the function owner, so the search path must be
-- pinned. Without this a user-created schema earlier in the path could shadow
-- `public.profiles`.
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    -- OAuth providers hand back a name and picture; email sign-up does not.
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture'
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();
