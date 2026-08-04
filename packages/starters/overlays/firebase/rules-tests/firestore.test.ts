import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * firestore.rules, actually executed.
 *
 * This is the one test that exercises the real security boundary. Everything
 * else in the project runs against mocks or the client SDK's local cache, both
 * of which happily let through writes the server would reject.
 *
 * Needs the emulator, so run it with:
 *
 *     npm run rules:test
 *
 * which starts the emulators, runs this, and shuts them down again. A JRE has
 * to be on your PATH — the Firestore emulator is a Java process.
 */

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'bna-rules-test',
    firestore: {
      rules: readFileSync(
        path.resolve(__dirname, '..', 'firestore.rules'),
        'utf8'
      ),
      host: '127.0.0.1',
      port: 8080,
    },
  });
});

afterAll(async () => {
  await testEnv?.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

const validTask = () => ({
  text: 'write a migration',
  isComplete: false,
  createdAt: serverTimestamp(),
  searchTokens: ['write', 'a', 'migration'],
});

describe('/tasks', () => {
  it('lets anyone read — this starter is deliberately open', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    await assertSucceeds(getDocs(collection(db, 'tasks')));
  });

  it('accepts a well-formed task', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    await assertSucceeds(addDoc(collection(db, 'tasks'), validTask()));
  });

  it('rejects a forged createdAt', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    // `createdAt == request.time` is the one thing pinned down even here. A
    // client that writes its own clock value — or backdates a document to win
    // an ordering — is refused.
    await assertFails(
      addDoc(collection(db, 'tasks'), {
        ...validTask(),
        createdAt: Timestamp.fromDate(new Date('2020-01-01')),
      })
    );
  });

  it('rejects an unknown field', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    // `hasOnly` is what stops a client stashing arbitrary data — and cost — in
    // your collection.
    await assertFails(
      addDoc(collection(db, 'tasks'), { ...validTask(), isAdmin: true })
    );
  });

  it('rejects empty and oversized text', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    await assertFails(
      addDoc(collection(db, 'tasks'), { ...validTask(), text: '' })
    );
    await assertFails(
      addDoc(collection(db, 'tasks'), {
        ...validTask(),
        text: 'x'.repeat(501),
      })
    );
  });

  it('rejects more searchTokens than the cap', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    await assertFails(
      addDoc(collection(db, 'tasks'), {
        ...validTask(),
        searchTokens: Array.from({ length: 21 }, (_, i) => `w${i}`),
      })
    );
  });

  it('allows an update but pins createdAt', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'tasks/t1'), {
        text: 'seeded',
        isComplete: false,
        createdAt: Timestamp.fromDate(new Date('2026-01-01')),
        searchTokens: ['seeded'],
      });
    });

    const db = testEnv.unauthenticatedContext().firestore();

    await assertSucceeds(updateDoc(doc(db, 'tasks/t1'), { isComplete: true }));
    await assertFails(
      updateDoc(doc(db, 'tasks/t1'), { createdAt: serverTimestamp() })
    );
  });

  it('allows a delete', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'tasks/t1'), {
        text: 'seeded',
        isComplete: false,
        createdAt: Timestamp.now(),
        searchTokens: ['seeded'],
      });
    });

    const db = testEnv.unauthenticatedContext().firestore();

    await assertSucceeds(deleteDoc(doc(db, 'tasks/t1')));
  });
});

describe('everything else', () => {
  it('is denied, because there is no catch-all match', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    // The absence of `match /{document=**}` is load-bearing. Without this
    // assertion, someone adding one back "to fix a permission error" would
    // open every future collection and no test would notice.
    await assertFails(getDocs(collection(db, 'secrets')));
    await assertFails(setDoc(doc(db, 'secrets/s1'), { value: 1 }));
  });
});
