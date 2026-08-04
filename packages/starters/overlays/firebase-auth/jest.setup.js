// `lib/firebase.ts` throws at import time when these are missing — deliberately,
// so a misconfigured app fails loudly rather than at the first query. Tests that
// import anything downstream of it need them set.
//
// The pure modules in `lib/` (documents.ts, errors.ts, auth-link.ts) use
// `import type` only, so the tests that matter most never reach these values.
process.env.EXPO_PUBLIC_FIREBASE_API_KEY = 'test-api-key';
process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test-project.firebaseapp.com';
process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET =
  'test-project.firebasestorage.app';
process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '000000000000';
process.env.EXPO_PUBLIC_FIREBASE_APP_ID = '1:000000000000:web:testappid';
