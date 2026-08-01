/**
 * A Deno edge function, invoked from the settings tab.
 *
 *   supabase functions serve                 # local, hot-reloading
 *   supabase functions deploy hello-world    # to your linked project
 *
 * Deployed with JWT verification on (the default), so an unauthenticated call
 * is rejected before this code runs. Forwarding the caller's Authorization
 * header into the client below is what makes the query obey the same RLS
 * policies the app does — without it, `tasks` would come back empty.
 *
 * The editor will flag the `jsr:` and `Deno` references unless you open
 * `supabase/functions/` with the Deno extension — they resolve at deploy time,
 * not in the Expo TypeScript project, which is why this directory is excluded
 * in tsconfig.json.
 */
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // The browser preflights any request carrying an Authorization header.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization')!;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Runs as the caller, so RLS scopes this count to their own rows.
    const { count } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true });

    return new Response(
      JSON.stringify({
        message: 'Hello from the edge',
        user: user?.email ?? null,
        yourTaskCount: count ?? 0,
        region: Deno.env.get('SB_REGION') ?? 'local',
        at: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
