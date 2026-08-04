/**
 * Demo tasks for the emulator.
 *
 * The equivalent of a `seed.sql`. Every task needs an owner — firestore.rules
 * keys on `ownerId` and the queries filter on it — so this takes a uid:
 *
 *     npm run emulators:seed -- --uid <your-uid>
 *
 * Find your uid in the Emulator UI's Authentication tab after signing up, or
 * log `auth.currentUser?.uid` from the app. Without one it seeds a placeholder
 * that no signed-in user will be able to read, which is a confusing result.
 *
 * It talks to the emulator's REST surface directly rather than importing the
 * SDK, so it needs no credentials, no service account and no extra dependency.
 */
const HOST = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8080';
const PROJECT =
  process.env.GCLOUD_PROJECT ??
  process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ??
  'demo-bna';

const uidIndex = process.argv.indexOf('--uid');
const uid = uidIndex === -1 ? null : process.argv[uidIndex + 1];

if (!uid) {
  console.error(
    '✖ No --uid given.\n' +
      '  Every task needs an owner, so seeded data would be unreadable.\n' +
      '  Sign up in the app, copy your uid from the Emulator UI\n' +
      '  (http://localhost:4000/auth), then:\n\n' +
      '    npm run emulators:seed -- --uid <your-uid>\n'
  );
  process.exit(1);
}

const TASKS = [
  'Read firestore.rules before shipping',
  'Deploy the composite indexes',
  'Try the app on a second device',
];

const tokenize = (text) =>
  Array.from(
    new Set(
      text
        .toLowerCase()
        .split(/[^\p{L}\p{N}]+/u)
        .filter(Boolean)
    )
  ).slice(0, 20);

const url = `http://${HOST}/v1/projects/${PROJECT}/databases/(default)/documents/tasks`;

for (const text of TASKS) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        text: { stringValue: text },
        isComplete: { booleanValue: false },
        createdAt: { timestampValue: new Date().toISOString() },
        searchTokens: {
          arrayValue: {
            values: tokenize(text).map((token) => ({ stringValue: token })),
          },
        },
        ownerId: { stringValue: uid },
      },
    }),
  });

  if (!response.ok) {
    console.error(`✖ ${text}: ${response.status} ${await response.text()}`);
    process.exit(1);
  }

  console.log(`✔ ${text}`);
}

console.log(`\nSeeded ${TASKS.length} tasks for ${uid} in ${PROJECT}.`);
