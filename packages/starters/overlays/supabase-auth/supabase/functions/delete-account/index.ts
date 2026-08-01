/**
 * Deletes the calling user's account.
 *
 *   supabase functions deploy delete-account
 *
 * This has to be a function rather than a client call: removing a user from
 * `auth.users` requires the secret key, and a secret key bypasses RLS
 * entirely — putting one in the Expo bundle would hand every installer full
 * read/write on the whole database.
 *
 * The caller is identified from their own JWT, never from the request body, so
 * this cannot be pointed at somebody else's id. `profiles` and `tasks` both
 * cascade from `auth.users`, so deleting the user is enough for those; storage
 * objects do not cascade and are removed explicitly.
 */
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Client one: the caller's own token, used only to find out who they are.
    const asUser = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await asUser.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Client two: the secret key, which can delete users. Never constructed
    // before the caller has been identified above.
    const asAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Storage has no foreign key to auth.users, so nothing cascades here.
    const buckets = ['avatars', 'files'];
    for (const bucket of buckets) {
      const { data: objects } = await asAdmin.storage
        .from(bucket)
        .list(user.id);

      if (objects?.length) {
        await asAdmin.storage
          .from(bucket)
          .remove(objects.map((object) => `${user.id}/${object.name}`));
      }
    }

    // `profiles` and `tasks` reference auth.users with `on delete cascade`, so
    // this one call takes them too.
    const { error: deleteError } = await asAdmin.auth.admin.deleteUser(user.id);
    if (deleteError) throw deleteError;

    return new Response(JSON.stringify({ deleted: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
