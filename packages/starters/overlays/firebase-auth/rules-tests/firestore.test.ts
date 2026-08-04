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
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * firestore.rules, actually executed.
 *
 * This is the one test that exercises the real security boundary. The route
 * guards in app/_layout.tsx are a convenience; the client SDK's local cache
 * happily accepts writes the server would reject. Only this file finds out what
 * the server actually does.
 *
 * Needs the emulators, so run it with:
 *
 *     npm run rules:test
 *
 * A JDK 21 or newer has to be on your PATH — the emulators are Java processes
 * and firebase-tools 15 refuses to start on anything older.
 */

const ALICE = 'uid-alice';
const BOB = 'uid-bob';

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

  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(doc(db, 'users', ALICE), {
      email: 'alice@example.com',
      displayName: 'Alice',
      photoURL: null,
      onboarded: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    await setDoc(doc(db, 'tasks/alice-task'), {
      text: 'alice task',
      isComplete: false,
      createdAt: Timestamp.now(),
      searchTokens: ['alice', 'task'],
      ownerId: ALICE,
    });
  });
});

const alice = () => testEnv.authenticatedContext(ALICE).firestore();
const bob = () => testEnv.authenticatedContext(BOB).firestore();
const anon = () => testEnv.unauthenticatedContext().firestore();

const validTask = (ownerId: string) => ({
  text: 'write a migration',
  isComplete: false,
  createdAt: serverTimestamp(),
  searchTokens: ['write', 'a', 'migration'],
  ownerId,
});

describe('/users/{uid}', () => {
  it('lets a user read their own document', async () => {
    await assertSucceeds(getDoc(doc(alice(), 'users', ALICE)));
  });

  it('denies reading someone else’s', async () => {
    await assertFails(getDoc(doc(bob(), 'users', ALICE)));
    await assertFails(getDoc(doc(anon(), 'users', ALICE)));
  });

  it('denies listing the collection', async () => {
    // No `list` rule at all. Allowing it would let any signed-in user
    // enumerate every account in the project.
    await assertFails(getDocs(collection(alice(), 'users')));
  });

  it('requires onboarded === false on create', async () => {
    // Otherwise a client could sign up already onboarded and skip the flow.
    await assertFails(
      setDoc(doc(bob(), 'users', BOB), {
        email: 'bob@example.com',
        displayName: null,
        photoURL: null,
        onboarded: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    );

    await assertSucceeds(
      setDoc(doc(bob(), 'users', BOB), {
        email: 'bob@example.com',
        displayName: null,
        photoURL: null,
        onboarded: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    );
  });

  it('allows only the four mutable fields on update', async () => {
    await assertSucceeds(
      updateDoc(doc(alice(), 'users', ALICE), {
        displayName: 'Ada',
        updatedAt: serverTimestamp(),
      })
    );

    // `email` mirrors the Auth record. Letting the client edit it here would
    // put the two out of step with nothing to reconcile them.
    await assertFails(
      updateDoc(doc(alice(), 'users', ALICE), {
        email: 'someone-else@example.com',
        updatedAt: serverTimestamp(),
      })
    );
  });
});

describe('/tasks', () => {
  it('lets an owner read their own task', async () => {
    await assertSucceeds(getDoc(doc(alice(), 'tasks/alice-task')));
  });

  it('denies reading a task owned by someone else', async () => {
    await assertFails(getDoc(doc(bob(), 'tasks/alice-task')));
  });

  it('rejects an UNSCOPED query even for a signed-in user', async () => {
    // The most important assertion in this file, and the thing that most
    // surprises people arriving from Postgres. A read rule is evaluated against
    // the QUERY: Firestore refuses any it cannot prove in advance is limited to
    // documents the rule allows. It does not filter — it refuses.
    await assertFails(
      getDocs(query(collection(alice(), 'tasks'), orderBy('createdAt', 'desc')))
    );
  });

  it('accepts the same query once it is scoped to the owner', async () => {
    // Which is why hooks/useTasks.ts and the search screen both carry this
    // filter, and why removing it breaks the screen outright.
    await assertSucceeds(
      getDocs(
        query(
          collection(alice(), 'tasks'),
          where('ownerId', '==', ALICE),
          orderBy('createdAt', 'desc'),
          limit(50)
        )
      )
    );
  });

  it('rejects a query scoped to someone else', async () => {
    await assertFails(
      getDocs(query(collection(bob(), 'tasks'), where('ownerId', '==', ALICE)))
    );
  });

  it('rejects creating a task owned by someone else', async () => {
    await assertFails(addDoc(collection(bob(), 'tasks'), validTask(ALICE)));
    await assertSucceeds(addDoc(collection(bob(), 'tasks'), validTask(BOB)));
  });

  it('rejects a forged createdAt', async () => {
    await assertFails(
      addDoc(collection(alice(), 'tasks'), {
        ...validTask(ALICE),
        createdAt: Timestamp.fromDate(new Date('2020-01-01')),
      })
    );
  });

  it('rejects an unknown field', async () => {
    await assertFails(
      addDoc(collection(alice(), 'tasks'), {
        ...validTask(ALICE),
        isAdmin: true,
      })
    );
  });

  it('rejects handing a task to another user', async () => {
    // `resource` stops you editing someone else's task; `request.resource`
    // stops you giving yours away. Both halves are needed.
    await assertFails(
      updateDoc(doc(alice(), 'tasks/alice-task'), { ownerId: BOB })
    );
  });

  it('denies deleting someone else’s task', async () => {
    await assertFails(deleteDoc(doc(bob(), 'tasks/alice-task')));
    await assertSucceeds(deleteDoc(doc(alice(), 'tasks/alice-task')));
  });

  it('denies everything to a signed-out client', async () => {
    await assertFails(getDoc(doc(anon(), 'tasks/alice-task')));
    await assertFails(addDoc(collection(anon(), 'tasks'), validTask(ALICE)));
  });
});

describe('everything else', () => {
  it('is denied, because there is no catch-all match', async () => {
    // The absence of `match /{document=**}` is load-bearing. Without this
    // assertion, someone adding one back "to fix a permission error" would
    // open every future collection and no test would notice.
    await assertFails(getDocs(collection(alice(), 'secrets')));
    await assertFails(setDoc(doc(alice(), 'secrets/s1'), { value: 1 }));
  });
});
