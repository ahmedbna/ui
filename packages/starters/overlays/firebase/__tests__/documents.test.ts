import {
  byNewest,
  taskFromDoc,
  tasksFromSnapshot,
  tokenize,
  type Task,
} from '@/lib/documents';

/**
 * `lib/documents.ts` uses `import type` only, so nothing here touches the
 * Firebase SDK, the network or the emulator. These are the mappers a Firestore
 * app actually gets wrong, tested as plain functions.
 */

/** A minimal stand-in for a QueryDocumentSnapshot. Cast at the boundary. */
const snap = (
  id: string,
  data: Record<string, unknown>,
  hasPendingWrites = false
) =>
  ({
    id,
    data: () => data,
    metadata: { hasPendingWrites, fromCache: false },
  }) as never;

/** What a real Firestore Timestamp looks like to `millisOf`. */
const timestamp = (millis: number) => ({
  toMillis: () => millis,
  seconds: Math.floor(millis / 1000),
  nanoseconds: (millis % 1000) * 1e6,
});

const task = (over: Partial<Task> = {}): Task => ({
  id: 'a',
  text: 'write a migration',
  isComplete: false,
  createdAt: 1_767_225_600_000,
  pending: false,
  searchTokens: ['write', 'a', 'migration'],
  ...over,
});

describe('taskFromDoc', () => {
  it('reads a Timestamp as milliseconds', () => {
    const result = taskFromDoc(
      snap('a', { text: 'x', isComplete: false, createdAt: timestamp(1234) })
    );

    expect(result.createdAt).toBe(1234);
  });

  it('survives a pending serverTimestamp', () => {
    // The whole reason this module exists. `serverTimestamp()` resolves to null
    // in the local echo of a write — which is EVERY write, not an edge case —
    // so `data().createdAt.toMillis()` would crash on the first task anyone
    // adds. A null createdAt means "not acknowledged yet", not "broken".
    const result = taskFromDoc(
      snap('a', { text: 'x', isComplete: false, createdAt: null }, true)
    );

    expect(result.createdAt).toBeNull();
    expect(result.pending).toBe(true);
  });

  it('reads a JSON-shaped Timestamp, as the emulator and seed scripts produce', () => {
    const result = taskFromDoc(
      snap('a', {
        text: 'x',
        isComplete: false,
        createdAt: { seconds: 2, nanoseconds: 500_000_000 },
      })
    );

    expect(result.createdAt).toBe(2500);
  });

  it('takes the id from the snapshot, never from the data', () => {
    // Firestore does not store the document id inside the document, so an `id`
    // field is someone else's data — trusting it silently breaks every write
    // that targets `doc(db, 'tasks', task.id)`.
    const result = taskFromDoc(
      snap('real-id', { id: 'impostor', text: 'x', isComplete: false })
    );

    expect(result.id).toBe('real-id');
  });

  it('defaults missing fields rather than yielding undefined', () => {
    const result = taskFromDoc(snap('a', {}));

    expect(result.text).toBe('');
    expect(result.isComplete).toBe(false);
    expect(result.searchTokens).toEqual([]);
  });
});

describe('tasksFromSnapshot', () => {
  it('preserves the order the query returned', () => {
    const snapshot = {
      docs: [
        snap('b', {
          text: 'newer',
          isComplete: false,
          createdAt: timestamp(2),
        }),
        snap('a', {
          text: 'older',
          isComplete: false,
          createdAt: timestamp(1),
        }),
      ],
    } as never;

    // The query's orderBy already sorted these. Re-sorting here would be a
    // second, disagreeing source of truth.
    expect(tasksFromSnapshot(snapshot).map((t) => t.id)).toEqual(['b', 'a']);
  });
});

describe('byNewest', () => {
  it('puts a pending task first', () => {
    const pending = task({ id: 'new', createdAt: null, pending: true });
    const settled = task({ id: 'old', createdAt: 5_000 });

    // The thing you just typed is the newest thing you did. Sorting it to the
    // bottom makes the app look like it ignored you.
    expect([settled, pending].sort(byNewest).map((t) => t.id)).toEqual([
      'new',
      'old',
    ]);
  });

  it('sorts settled tasks newest first', () => {
    const older = task({ id: 'a', createdAt: 1_000 });
    const newer = task({ id: 'b', createdAt: 2_000 });

    expect([older, newer].sort(byNewest).map((t) => t.id)).toEqual(['b', 'a']);
  });
});

describe('tokenize', () => {
  it('lowercases, strips punctuation and deduplicates', () => {
    expect(tokenize('Write a Migration!')).toEqual(['write', 'a', 'migration']);
    expect(tokenize('test test TEST')).toEqual(['test']);
  });

  it('drops empties rather than emitting blank tokens', () => {
    expect(tokenize('   ')).toEqual([]);
    expect(tokenize('a -- b')).toEqual(['a', 'b']);
  });

  it('caps the array so firestore.rules accepts it', () => {
    const many = Array.from({ length: 40 }, (_, i) => `word${i}`).join(' ');

    // firestore.rules rejects `searchTokens.size() > 20` outright, so exceeding
    // the cap here would fail every write rather than degrade search.
    expect(tokenize(many)).toHaveLength(20);
  });

  it('keeps the round trip the search screen depends on', () => {
    // If this ever stops holding, search silently returns nothing — the query
    // still succeeds, it just never matches. No integration test would catch
    // that, which is why it is asserted directly.
    const text = 'Deploy the Firestore rules, then verify';

    for (const word of ['deploy', 'firestore', 'rules', 'verify']) {
      expect(tokenize(text)).toContain(word.toLowerCase());
    }
  });

  it('handles non-ASCII words', () => {
    expect(tokenize('café über 日本')).toEqual(['café', 'über', '日本']);
  });
});
