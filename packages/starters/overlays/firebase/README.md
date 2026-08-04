# Expo + Firebase

An [Expo](https://expo.dev) app with [BNA UI](https://ui.ahmedbna.com) and a
[Firebase](https://firebase.google.com) backend — Cloud Firestore with live
listeners, Cloud Storage with upload progress, and security rules with tests
that actually run them. No sign-in.

Scaffolded with:

```bash
npx bna-ui firebase my-app --no-auth
```

## Setup

<!-- prettier-ignore -->
1. **Create a project** at [console.firebase.google.com](https://console.firebase.google.com),
   then add a **Web** app to it (the `</>` icon). Firestore and Storage each
   need enabling once from the console's Build menu.

2. **Add your config.** Copy `.env.example` to `.env.local` and fill in the six
   values from Project settings → General → Your apps → SDK setup and
   configuration:

   ```bash
   EXPO_PUBLIC_FIREBASE_API_KEY=AIza…
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   # …and four more
   ```

3. **Name your project** in `.firebaserc`, replacing `your-project-id`.

4. **Deploy the rules and indexes.** Until you do, Firestore uses whatever the
   console last set — usually locked down, so nothing loads:

   ```bash
   npx firebase-tools deploy --only firestore,storage
   ```

5. **Run it.**

   ```bash
   npm start
   ```

Expo Go works — the Firebase JS SDK is pure JavaScript with no native module,
so there is no config plugin, no `google-services.json` and no development
build needed. (That changes if you switch to `@react-native-firebase`.)

## What's here

```
lib/
├── firebase.ts          app + Firestore + Storage. Imports no auth code at all
├── documents.ts         pure: snapshot → plain object, byNewest, tokenize
└── errors.ts            pure: Firebase error code → prose
hooks/
├── useTasks.ts          one onSnapshot subscription + mutations
└── useUpload.ts         file URI → Blob → Storage → download URL, with progress
app/(tabs)/
├── (home)/index.tsx     live task list
├── search/index.tsx     array-contains query
└── settings/index.tsx   storage upload + getCountFromServer
firestore.rules          open on /tasks only — read this before you ship
firestore.indexes.json   the one composite index the search query needs
storage.rules            public read, validated create, no delete
rules-tests/             the rules, executed against the emulator
```

## Security rules

**Every rule in `firestore.rules` is open**, and `storage.rules` nearly so. Your
Firebase config ships inside the app bundle — that is what `EXPO_PUBLIC_` means
— so anyone with the app can read, create and delete every task. That is the
right shape for a public demo and the wrong shape for real data.

They are not the console's 30-day "test mode" rules, on purpose: those expire
into `permission-denied` on day 31, and a demo that breaks on a timer teaches
the wrong lesson. These are honestly open and say so in a comment.

Tighten them before you ship, or start from the auth variant, where every
document is scoped to its owner:

```bash
npx bna-ui firebase my-app
```

Whatever you write, run it:

```bash
npm run rules:test     # starts the emulators, executes rules-tests/, stops them
```

Needs a JDK 21 or newer on your PATH — the emulators are Java processes, and
firebase-tools 15 refuses to start on anything older.

## Local development

Run Firestore and Storage on your machine instead of against your project:

```bash
npm run emulators        # UI at http://localhost:4000
npm run emulators:seed   # three demo tasks
```

Then set `EXPO_PUBLIC_FIREBASE_USE_EMULATOR=1` in `.env.local`. The app reads
the dev server's LAN address from Expo, so this works from a real device and not
just the simulator.

## Things worth knowing

- **A query is checked against the query, not the rows.** Firestore refuses any
  query it cannot prove is scoped to documents your rules allow — it does not
  filter them out. This is the exact inverse of Postgres row level security, and
  it is the thing that surprises people arriving from Supabase.
- **`serverTimestamp()` reads as `null` locally** until the server acknowledges
  the write. `lib/documents.ts` handles it; your own mappers must too.
- **There is no offline disk cache.** Firestore's persistent cache is IndexedDB,
  which React Native does not have, so the cache here is per-session memory.
- **Search matches whole words.** Firestore has no `LIKE`. See the comment at the
  top of `app/(tabs)/search/index.tsx`.

## Learn more

- [Starter documentation](https://ui.ahmedbna.com/docs/installation/firebase)
- [Firestore](https://ui.ahmedbna.com/docs/firebase/firestore) ·
  [Realtime](https://ui.ahmedbna.com/docs/firebase/realtime) ·
  [Storage](https://ui.ahmedbna.com/docs/firebase/storage)
- [Security rules](https://ui.ahmedbna.com/docs/firebase/rules)
- [Firebase documentation](https://firebase.google.com/docs)
