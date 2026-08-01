-- Avatars, scoped to their owner.
--
-- The bucket is public so `getPublicUrl()` returns a link that renders without
-- a token — avatars are shown to other users by design. Writes are not public:
-- the policies below key off the first path segment, so an object at
-- `<user-id>/avatar.jpg` can only be written by that user.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  2097152, -- 2 MB
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- A private bucket for anything that is not meant to be shared. Nothing in the
-- starter writes to it; it is here as the shape to copy, and the docs show
-- `createSignedUrl()` against it.
insert into storage.buckets (id, name, public, file_size_limit)
values ('files', 'files', false, 10485760) -- 10 MB
on conflict (id) do nothing;

-- storage.objects already has RLS enabled and ships with no policies, so an
-- un-policied bucket rejects every request.

create policy "Avatars are publicly readable"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'avatars');

-- `storage.foldername(name)` splits the object path; [1] is the first segment.
-- Requiring it to equal the caller's id is what makes `<user-id>/…` a private
-- namespace inside a shared bucket.
create policy "Users can upload their own avatar"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can replace their own avatar"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- The private bucket: same ownership rule, but no public read.
create policy "Users can read their own files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'files'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can write their own files"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'files'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'files'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
