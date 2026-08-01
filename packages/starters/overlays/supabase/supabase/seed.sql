-- Applied by `supabase db reset` against the local stack. Never runs against a
-- linked project — `supabase db push` applies migrations only.

insert into public.tasks (text, is_complete) values
  ('Read the RLS policies in supabase/migrations', true),
  ('Add a column and run npm run db:diff', false),
  ('Open a second simulator and watch realtime sync', false);
