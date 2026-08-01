import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Copy .env.example to .env.local ' +
      'and fill in EXPO_PUBLIC_SUPABASE_URL and ' +
      'EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY from your project settings.'
  );
}

/**
 * This starter has no sign-in, so there is no session to persist and nothing to
 * refresh. Turning all three off keeps the client from writing to storage it
 * never reads.
 *
 * `detectSessionInUrl` must be false on native regardless — there is no URL to
 * parse, and leaving it on makes the client wait for one that never arrives.
 *
 * The publishable key is safe to ship in the bundle: it grants exactly what
 * your RLS policies allow the `anon` role to do, which is why every table in
 * `supabase/migrations/` has RLS enabled and explicit policies. "No auth" is
 * not "no RLS".
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
