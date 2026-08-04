/**
 * Demo tasks for the emulator.
 *
 * The equivalent of a `seed.sql`. Run it through the emulator so it never
 * touches a real project:
 *
 *     npm run emulators:seed
 *
 * It talks to the emulator's REST surface directly rather than importing the
 * SDK, so it needs no credentials, no service account and no extra dependency.
 */
const HOST = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8080';
const PROJECT =
  process.env.GCLOUD_PROJECT ??
  process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ??
  'demo-bna';

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
      },
    }),
  });

  if (!response.ok) {
    console.error(`✖ ${text}: ${response.status} ${await response.text()}`);
    process.exit(1);
  }

  console.log(`✔ ${text}`);
}

console.log(`\nSeeded ${TASKS.length} tasks into ${PROJECT}.`);
