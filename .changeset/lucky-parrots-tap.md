---
'bna-ui': minor
---

Add `bna-ui firebase` — two Expo + Firebase starters, with and without auth.

Firebase was the one backend of the three with no path into a BNA project. The
new command mirrors `convex` and `supabase`: `npx bna-ui firebase my-app`
scaffolds the auth variant, `--no-auth` the backend-only one, and
`--skip-firebase` skips the interactive setup entirely.

Both use the **`firebase` JS SDK**, not `@react-native-firebase`, so the config
comes from `EXPO_PUBLIC_*` variables exactly as Supabase's does and everything
except OAuth runs in Expo Go — no config plugin, no `google-services.json`, no
development build to get started.

`start-firebase` ships Cloud Firestore with a live task list, Cloud Storage with
real upload progress (`uploadBytesResumable`, which Supabase's `upload()` cannot
report), security rules, and index definitions. `start-firebase-auth` adds
email/password, Google and Apple sign-in, onboarding, avatars and client-side
account deletion, with every document scoped to its owner.

Both also ship `rules-tests/` — the security rules executed against the
emulator, which is the only place the real boundary gets tested. The client
SDK's local cache accepts writes the server would reject.

After copying files the command asks for the six web-config values — deriving
`authDomain` and `storageBucket` from the project ID as overridable defaults,
since projects created before October 2024 still use `.appspot.com` — writes
`.env.local`, sets the default project in `.firebaserc`, and deploys the rules
and indexes when `firebase-tools` is present. Every step degrades to printed
commands rather than failing.

Three things Firebase genuinely cannot do that the Supabase starter can, all
documented rather than papered over: there is no email OTP (Firebase has only
SMS), no GitHub provider (the token exchange needs a client secret that cannot
ship in a bundle), and Google and Apple need a development build, because
`signInWithPopup` throws on React Native and `expo-auth-session`'s proxy was
removed in SDK 48. With no client IDs configured the OAuth buttons render
nothing at all rather than failing when pressed.
