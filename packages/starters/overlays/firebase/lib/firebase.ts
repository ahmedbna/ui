import Constants from 'expo-constants';
import {
  getApps,
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions,
} from 'firebase/app';
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

/**
 * The Firebase client.
 *
 * Note what is *not* imported: `firebase/auth`. This starter has no sign-in, so
 * pulling it in would ship the whole auth product — and its persistence
 * machinery — for nothing. The auth variant adds it in one place:
 *
 *     npx bna-ui firebase my-app
 *
 * Everything here imports through a subpath (`firebase/app`,
 * `firebase/firestore`, `firebase/storage`) rather than the `firebase` root,
 * which re-exports every product Firebase ships.
 *
 * There is no `metro.config.js` in this project and it does not need one. The
 * `sourceExts.push('cjs')` and `unstable_enablePackageExports = true` advice
 * you will find in older Firebase + Expo threads describes defaults that Expo
 * SDK 57 and Metro 0.84 already set.
 */

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    'Missing Firebase environment variables. Copy .env.example to .env.local ' +
      'and fill in the six EXPO_PUBLIC_FIREBASE_* values from Project settings ' +
      '→ General → Your apps → SDK setup and configuration.'
  );
}

/**
 * Fast Refresh re-executes this module whenever it is edited, and every
 * initializer here throws on a second call — `initializeApp` with
 * `app/duplicate-app`, `initializeFirestore` with "Firestore has already been
 * started and its settings can no longer be changed". Deriving everything from
 * one `existing` binding means a single condition covers all of them.
 */
const existing = getApps()[0];
const app: FirebaseApp = existing ?? initializeApp(firebaseConfig);

export const db = existing
  ? getFirestore(app)
  : initializeFirestore(app, {
      // The default since v9.22.0, written out so the knob is discoverable. If
      // you see "Could not reach Cloud Firestore backend" behind a corporate
      // proxy or a stubborn emulator, swap this for
      // `experimentalForceLongPolling: true` — the two are mutually exclusive
      // and Firestore throws if you set both.
      experimentalAutoDetectLongPolling: true,
      // Deliberately not set: `localCache: persistentLocalCache()` is backed by
      // IndexedDB, which React Native does not have. The offline cache here is
      // per-session memory only. That is the main thing you give up by using
      // the JS SDK rather than @react-native-firebase.
    });

// Idempotent per bucket, so unlike the two above it needs no guard.
export const storage = getStorage(app);

/**
 * Point everything at `npm run emulators` when EXPO_PUBLIC_FIREBASE_USE_EMULATOR=1.
 *
 * Gated on `!existing` because `connectFirestoreEmulator` throws once the
 * instance has issued its first request, which a Fast Refresh re-run would hit.
 */
if (!existing && process.env.EXPO_PUBLIC_FIREBASE_USE_EMULATOR === '1') {
  // `localhost` means the phone itself on a real device, so the emulator would
  // be unreachable. Expo already knows the dev server's LAN address — reuse it.
  const host = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';

  connectFirestoreEmulator(db, host, 8080);
  connectStorageEmulator(storage, host, 9199);

  console.log(`[firebase] using emulators at ${host}`);
}

export { app };
