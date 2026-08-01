-- A public bucket for the upload demo in the search tab.
--
-- `public = true` means every object in it is readable by URL without a token.
-- That is what makes `getPublicUrl()` work and it is the right shape for
-- avatars or product images. For anything private, create the bucket with
-- `public = false` and hand out `createSignedUrl()` links instead.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'uploads',
  'uploads',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- storage.objects has RLS enabled by Supabase already; it ships with no
-- policies, so an un-policied bucket rejects everything.

create policy "Public read access to uploads"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'uploads');

create policy "Anyone can upload to uploads"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'uploads');

-- Deliberately no UPDATE or DELETE policy: with no authenticated owner there is
-- no way to tell whose object is whose, so nobody may overwrite or remove one.
-- The auth starter scopes these to `owner_id` instead.
