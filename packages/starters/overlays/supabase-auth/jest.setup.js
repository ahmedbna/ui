// `lib/supabase.ts` throws at import time when these are missing — deliberately,
// so a misconfigured app fails loudly rather than at the first query. Tests that
// import anything downstream of it need them set.
process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_test';
