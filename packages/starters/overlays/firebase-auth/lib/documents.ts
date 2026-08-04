/**
 * The Firestore snapshot → plain object boundary.
 *
 * `import type` only, so nothing here reaches `firebase/*` at runtime. That is
 * what lets `__tests__/documents.test.ts` run with no mocks, no emulator and no
 * environment variables — and it is why the Timestamp check below is
 * structural rather than `instanceof Timestamp`, which is unreliable the moment
 * two copies of the SDK end up in a bundle.
 *
 * This module exists where a Supabase project would have `lib/realtime.ts`.
 * There is no `applyChange` equivalent: `onSnapshot` hands back the entire
 * ordered result set on every change, so folding `docChanges()` into a local
 * array by hand would redo work the SDK just did. `docChanges()` is for
 * animating a diff, not for staying correct.
 */
import type {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';

export interface Task {
  id: string;
  text: string;
  isComplete: boolean;
  /** Milliseconds since the epoch, or null while the server timestamp is pending. */
  createdAt: number | null;
  /** True while this device's write has not been acknowledged by the server. */
  pending: boolean;
  /** Lowercased words from `text`. Firestore has no `ilike`. */
  searchTokens: string[];
  /** The uid that owns this task. firestore.rules checks it on every operation. */
  ownerId: string;
}

export interface Profile {
  id: string;
  email: string | null;
  displayName: string | null;
  /** `photoURL`, matching the Firebase `User` field it is kept in step with. */
  photoURL: string | null;
  onboarded: boolean;
  createdAt: number | null;
  updatedAt: number | null;
}

/**
 * Reads a Firestore Timestamp as milliseconds, tolerating the two shapes it is
 * legitimately not one.
 *
 * `serverTimestamp()` resolves to **null** in the local echo of a write — the
 * snapshot the SDK delivers before the server has acknowledged it. That echo is
 * not an edge case, it is every single write, which makes
 * `doc.data().createdAt.toMillis()` a crash on the first task anyone adds.
 */
function millisOf(value: unknown): number | null {
  if (value == null) return null;

  // The normal case: a Timestamp instance.
  if (typeof value === 'object' && 'toMillis' in value) {
    const { toMillis } = value as { toMillis: unknown };
    if (typeof toMillis === 'function') {
      return (value as { toMillis: () => number }).toMillis();
    }
  }

  // A Timestamp that has been through JSON — from the emulator's REST surface,
  // or a document seeded by a script.
  if (typeof value === 'object' && 'seconds' in value) {
    const { seconds, nanoseconds } = value as {
      seconds: number;
      nanoseconds?: number;
    };
    if (typeof seconds === 'number') {
      return seconds * 1000 + Math.floor((nanoseconds ?? 0) / 1e6);
    }
  }

  if (typeof value === 'number') return value;

  return null;
}

export function taskFromDoc(doc: QueryDocumentSnapshot<DocumentData>): Task {
  const data = doc.data();

  return {
    // Always `doc.id`, never `data().id`. Firestore does not store the document
    // id inside the document, so a stray `id` field would be someone else's.
    id: doc.id,
    text: typeof data.text === 'string' ? data.text : '',
    isComplete: data.isComplete === true,
    createdAt: millisOf(data.createdAt),
    pending: doc.metadata.hasPendingWrites,
    searchTokens: Array.isArray(data.searchTokens) ? data.searchTokens : [],
    ownerId: typeof data.ownerId === 'string' ? data.ownerId : '',
  };
}

/**
 * The whole of the realtime layer.
 *
 * Genuinely this small: the query's `orderBy` already put the documents in
 * order, and the SDK already deduplicated your own writes against the server's
 * echo via latency compensation. There is nothing left to reconcile.
 */
export function tasksFromSnapshot(
  snapshot: QuerySnapshot<DocumentData>
): Task[] {
  return snapshot.docs.map(taskFromDoc);
}

/**
 * `users/{uid}` → Profile, or null when the document does not exist yet.
 *
 * Null means "not created yet", never "not onboarded". There is no Cloud
 * Function creating this document — the provider writes it on first sight —
 * so between sign-up and that write there is a real window where a signed-in
 * user has no profile. Treating that as `onboarded: false` would flash the
 * onboarding flow at a returning user on a slow connection.
 */
export function profileFromDoc(
  snapshot: DocumentSnapshot<DocumentData>
): Profile | null {
  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  return {
    id: snapshot.id,
    email: typeof data.email === 'string' ? data.email : null,
    displayName: typeof data.displayName === 'string' ? data.displayName : null,
    photoURL: typeof data.photoURL === 'string' ? data.photoURL : null,
    onboarded: data.onboarded === true,
    createdAt: millisOf(data.createdAt),
    updatedAt: millisOf(data.updatedAt),
  };
}

/**
 * Newest first, with pending writes at the very top.
 *
 * A task whose `createdAt` is still null is one this device just created, so it
 * is by definition the newest thing that happened — showing it last, or
 * dropping it to wherever a null sorts, makes the app look like it ignored you.
 */
export const byNewest = (a: Task, b: Task): number => {
  if (a.createdAt === b.createdAt) return 0;
  if (a.createdAt === null) return -1;
  if (b.createdAt === null) return 1;
  return b.createdAt - a.createdAt;
};

const MAX_TOKENS = 20;

/**
 * Splits text into the tokens the search screen queries with.
 *
 * Firestore has no `LIKE`, no substring matching and no full-text index. The
 * standard workaround is to write the searchable words alongside the document
 * and query them with `array-contains`, which is what this produces.
 *
 * The consequence, and it is a real one: this matches whole words only. "migra"
 * will not find "migration" the way Postgres' `ilike '%migra%'` would. When you
 * need real search, put a Typesense, Algolia or Elastic extension in front of
 * the collection — the Firestore docs list the official ones.
 *
 * Capped at MAX_TOKENS because `array-contains` indexes every entry, and
 * firestore.rules rejects a longer array outright.
 */
export function tokenize(text: string): string[] {
  const words = text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);

  return Array.from(new Set(words)).slice(0, MAX_TOKENS);
}
