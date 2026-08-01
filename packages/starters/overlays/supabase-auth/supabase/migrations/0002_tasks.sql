-- Tasks, owned by the user who created them.
--
-- Contrast with the no-auth starter, where every policy is `using (true)`.
-- Here the four policies below are the entire access-control story: the
-- publishable key in the app bundle grants nothing beyond what they allow, and
-- two users signed into the same build cannot see each other's rows.

create table public.tasks (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users (id) on delete cascade,
  text        text        not null check (char_length(text) between 1 and 500),
  is_complete boolean     not null default false,
  created_at  timestamptz not null default now()
);

-- Every policy filters on user_id, so every query does too. Without this index
-- each one is a sequential scan.
create index tasks_user_id_created_at_idx
  on public.tasks (user_id, created_at desc);

alter table public.tasks enable row level security;

create policy "Users can read their own tasks"
  on public.tasks for select
  to authenticated
  using (auth.uid() = user_id);

-- `with check` on INSERT is what stops a client writing a row owned by someone
-- else — the column is client-supplied, so it has to be verified server-side.
create policy "Users can create their own tasks"
  on public.tasks for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
  on public.tasks for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own tasks"
  on public.tasks for delete
  to authenticated
  using (auth.uid() = user_id);

-- Realtime respects RLS: each client is only sent changes to rows its own
-- policies would let it select. The table still has to join the publication.
alter publication supabase_realtime add table public.tasks;

-- UPDATE and DELETE events carry only the primary key without this, and the
-- client needs user_id to know whether the row was even its own.
alter table public.tasks replica identity full;
