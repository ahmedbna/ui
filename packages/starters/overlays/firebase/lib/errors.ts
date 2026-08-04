/**
 * Firebase error codes, in words a user can act on.
 *
 * Pure and free of any runtime `firebase/*` import, so it is unit-testable and
 * usable from anywhere. `FirebaseError` is duck-typed rather than imported for
 * the same reason — the shape is stable and the import is not worth it.
 */

interface CodedError {
  code?: unknown;
  message?: unknown;
}

const MESSAGES: Record<string, string> = {
  'permission-denied':
    'Your security rules rejected that. Check firestore.rules — remember a query is checked against the query itself, not the rows it would return.',
  unauthenticated: 'You need to be signed in for that.',
  unavailable:
    'Could not reach Firestore. Check your connection and try again.',
  'deadline-exceeded': 'That took too long. Check your connection and retry.',
  'not-found': 'That document no longer exists.',
  'already-exists': 'That document already exists.',
  'resource-exhausted':
    'You have hit a Firestore quota. Check usage in the Firebase console.',
  cancelled: 'That request was cancelled.',
  'invalid-argument':
    'Firestore rejected the data. A common cause is an undefined value — write null instead.',

  // Storage codes arrive with a `storage/` prefix, which `codeOf` strips.
  unauthorized:
    'Your storage rules rejected that. Check storage.rules — note that `write` covers delete, where request.resource is null.',
  'object-not-found': 'That file does not exist in storage.',
  'quota-exceeded': 'Your storage quota is full.',
  canceled: 'The upload was cancelled.',
  'retry-limit-exceeded':
    'The upload kept failing. Check your connection and try again.',
  'unauthenticated-storage': 'You need to be signed in to upload.',
};

/** `firestore/permission-denied` and `permission-denied` both yield the latter. */
function codeOf(error: unknown): string | null {
  const code = (error as CodedError)?.code;
  if (typeof code !== 'string') return null;
  const slash = code.indexOf('/');
  return slash === -1 ? code : code.slice(slash + 1);
}

/**
 * A missing composite index is the one error worth passing through verbatim.
 *
 * Firestore puts a console URL in the message that creates exactly the index
 * the failed query needs. Replacing that with friendly prose throws away the
 * single most useful thing the SDK ever tells you.
 */
function isMissingIndex(error: unknown): boolean {
  const message = (error as CodedError)?.message;
  return (
    codeOf(error) === 'failed-precondition' &&
    typeof message === 'string' &&
    message.includes('index')
  );
}

export function messageFor(error: unknown): string {
  if (isMissingIndex(error)) {
    return (
      'This query needs a composite index. Firestore generated one for you:\n\n' +
      String((error as CodedError).message) +
      '\n\nAdd it to firestore.indexes.json and run `npm run deploy:indexes` so it lives in your repo.'
    );
  }

  const code = codeOf(error);
  if (code && MESSAGES[code]) return MESSAGES[code];

  const message = (error as CodedError)?.message;
  if (typeof message === 'string' && message) return message;

  return 'Something went wrong.';
}
