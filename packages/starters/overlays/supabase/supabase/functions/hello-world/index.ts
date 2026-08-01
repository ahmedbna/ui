/**
 * A Deno edge function, invoked from the settings tab.
 *
 *   supabase functions serve                 # local, hot-reloading
 *   supabase functions deploy hello-world    # to your linked project
 *
 * This project has no sign-in, so the function is deployed with
 * `--no-verify-jwt` (see .github/workflows/ci.yml) and treats every caller as
 * anonymous. The auth starter's copy reads the caller's JWT instead.
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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      // Server-side, so this may be the secret key. Never put a secret key in
      // the Expo bundle — it bypasses RLS entirely.
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ??
        Deno.env.get('SUPABASE_ANON_KEY')!
    );

    const { count } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true });

    return new Response(
      JSON.stringify({
        message: 'Hello from the edge',
        taskCount: count ?? 0,
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
