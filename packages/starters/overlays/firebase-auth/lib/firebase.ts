import Constants from 'expo-constants';
import {
  getApps,
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions,
} from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  type Auth,
  type Persistence,
  type ReactNativeAsyncStorage,
} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { Platform } from 'react-native';
import { LargeSecureStore } from '@/lib/large-secure-store';

/**
 * The Firebase client.
 *
 * Everything imports through a subpath (`firebase/app`, `firebase/auth`,
 * `firebase/firestore`, `firebase/storage`) rather than the `firebase` root,
 * which re-exports every product Firebase ships.
 *
 * There is no `metro.config.js` in this project and it does not need one. The
 * `sourceExts.push('cjs')` and `unstable_enablePackageExports = true` advice
 * you will find in older Firebase + Expo threads describes defaults that Expo
 * SDK 57 and Metro 0.84 already set.
 *
 * There is also no `AppState` listener refreshing tokens. A Supabase project
 * needs one because supabase-js refreshes on a JS timer that iOS suspends in
 * the background; Firebase refreshes proactively and again lazily inside
 * `getIdToken()`, and Firestore and Storage both pull their token through this
 * same `Auth` instance. Nothing to wire up.
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
 * `getReactNativePersistence`, fetched off the namespace rather than imported.
 *
 * It exists in `@firebase/auth`'s React Native build and only there. Metro
 * picks that build on ios and android — the package's `exports` map has a
 * `react-native` condition and @expo/metro-config turns it on for those
 * platforms — but TypeScript resolves the `types` condition, which is listed
 * first and points at the browser build. So the symbol is real at runtime and
 * invisible to the compiler, and the obvious
 *
 *     import { getReactNativePersistence } from 'firebase/auth';
 *
 * does not compile. Verified against firebase@12.17.0 / @firebase/auth@1.13.4.
 *
 * A typed lookup keeps this file compiling on every platform and turns the
 * missing case into the explicit error below instead of a crash at first
 * sign-in.
 */
const getReactNativePersistence = (
  firebaseAuth as unknown as {
    getReactNativePersistence?: (
      storage: ReactNativeAsyncStorage
    ) => Persistence;
  }
).getReactNativePersistence;

/**
 * Fast Refresh re-executes this module whenever it is edited, and every
 * initializer here throws on a second call — `initializeApp` with
 * `app/duplicate-app`, `initializeAuth` with `auth/already-initialized`,
 * `initializeFirestore` with "settings can no longer be changed". Deriving
 * everything from one `existing` binding means a single condition covers all
 * three.
 */
const existing = getApps()[0];
const app: FirebaseApp = existing ?? initializeApp(firebaseConfig);

function createAuth(instance: FirebaseApp): Auth {
  if (Platform.OS === 'web') {
    // An array: the first persistence the browser supports wins, and the SDK
    // migrates an existing account out of the fallback into the primary.
    // Note this installs no popupRedirectResolver — if you swap the web OAuth
    // path to `signInWithPopup`, pass `browserPopupRedirectResolver` here too.
    return initializeAuth(instance, {
      persistence: [indexedDBLocalPersistence, browserLocalPersistence],
    });
  }

  if (!getReactNativePersistence) {
    // Throwing rather than falling through is deliberate. The silent fallback
    // is in-memory persistence, which signs every user out on relaunch — a bug
    // that looks like "sessions randomly expire" and takes a day to trace.
    throw new Error(
      'firebase/auth did not expose getReactNativePersistence on this platform. ' +
        'Auth would fall back to in-memory persistence and sign the user out on ' +
        'every relaunch, so this fails loudly instead. Check that the installed ' +
        'firebase version still ships a React Native build.'
    );
  }

  return initializeAuth(instance, {
    // Firebase writes one JSON blob per user here — uid, providerData,
    // and stsTokenManager with both tokens. A bare email/password account is
    // around 1.5 KB and a Google account with a long photoURL goes past
    // SecureStore's 2048-byte ceiling, which is exactly what LargeSecureStore
    // exists to solve. Its interface already matches ReactNativeAsyncStorage,
    // so no adapter is needed.
    persistence: getReactNativePersistence(new LargeSecureStore()),
  });
}

// `getAuth(app)` on the `existing` branch is safe precisely because `existing`
// implies this module already ran `initializeAuth` — it returns that instance
// rather than creating a memory-persisted one.
export const auth = existing ? getAuth(app) : createAuth(app);

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

  connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true });
  connectFirestoreEmulator(db, host, 8080);
  connectStorageEmulator(storage, host, 9199);

  console.log(`[firebase] using emulators at ${host}`);
}

export { app };
