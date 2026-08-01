-- Tasks: the demo table the home tab reads, writes and subscribes to.
--
-- This project has no sign-in, so every policy below targets the `anon` role.
-- That is a deliberate choice for a public demo, not a default to ship: anyone
-- holding your publishable key can do exactly what these four policies allow.
-- Read https://ui.ahmedbna.com/docs/supabase/database before you point this at
-- real data.

create table public.tasks (
  id          uuid        primary key default gen_random_uuid(),
  text        text        not null check (char_length(text) between 1 and 500),
  is_complete boolean     not null default false,
  created_at  timestamptz not null default now()
);

create index tasks_created_at_idx on public.tasks (created_at desc);

-- RLS is off by default on a new table, which would expose it to anyone with
-- the publishable key regardless of the policies below. Turn it on first.
alter table public.tasks enable row level security;

create policy "Anyone can read tasks"
  on public.tasks for select
  to anon, authenticated
  using (true);

create policy "Anyone can create tasks"
  on public.tasks for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can update tasks"
  on public.tasks for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Anyone can delete tasks"
  on public.tasks for delete
  to anon, authenticated
  using (true);

-- Realtime broadcasts nothing until the table joins this publication. Without
-- it `postgres_changes` subscribes successfully and then never fires, which is
-- the single most common "realtime is broken" report.
alter publication supabase_realtime add table public.tasks;

-- `postgres_changes` sends only the primary key on UPDATE and DELETE unless the
-- table has a full replica identity. The client needs the whole row to patch
-- its cache.
alter table public.tasks replica identity full;
