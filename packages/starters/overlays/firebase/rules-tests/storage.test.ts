import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { deleteObject, getBytes, ref, uploadBytes } from 'firebase/storage';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/** storage.rules, actually executed. See rules-tests/firestore.test.ts. */

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'bna-rules-test',
    storage: {
      rules: readFileSync(
        path.resolve(__dirname, '..', 'storage.rules'),
        'utf8'
      ),
      host: '127.0.0.1',
      port: 9199,
    },
  });
});

afterAll(async () => {
  await testEnv?.cleanup();
});

beforeEach(async () => {
  await testEnv.clearStorage();
});

const png = () => new Uint8Array([0x89, 0x50, 0x4e, 0x47]);

describe('/uploads', () => {
  it('accepts a small image', async () => {
    const storage = testEnv.unauthenticatedContext().storage();

    await assertSucceeds(
      uploadBytes(ref(storage, 'uploads/a.png'), png(), {
        contentType: 'image/png',
      })
    );
  });

  it('rejects a non-image contentType', async () => {
    const storage = testEnv.unauthenticatedContext().storage();

    await assertFails(
      uploadBytes(ref(storage, 'uploads/a.pdf'), png(), {
        contentType: 'application/pdf',
      })
    );
  });

  it('rejects a file over the size limit', async () => {
    const storage = testEnv.unauthenticatedContext().storage();

    await assertFails(
      uploadBytes(
        ref(storage, 'uploads/big.png'),
        new Uint8Array(6 * 1024 * 1024),
        {
          contentType: 'image/png',
        }
      )
    );
  });

  it('lets anyone read', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await uploadBytes(ref(context.storage(), 'uploads/a.png'), png(), {
        contentType: 'image/png',
      });
    });

    const storage = testEnv.unauthenticatedContext().storage();

    await assertSucceeds(getBytes(ref(storage, 'uploads/a.png')));
  });

  it('denies delete, since there is no owner to check', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await uploadBytes(ref(context.storage(), 'uploads/a.png'), png(), {
        contentType: 'image/png',
      });
    });

    const storage = testEnv.unauthenticatedContext().storage();

    // Deliberate, and the reason `create` is spelled out separately from
    // `write`: with no signed-in user, nothing distinguishes the uploader from
    // anyone else, so nobody may remove an object.
    await assertFails(deleteObject(ref(storage, 'uploads/a.png')));
  });
});

describe('paths outside /uploads', () => {
  it('are denied', async () => {
    const storage = testEnv.unauthenticatedContext().storage();

    await assertFails(
      uploadBytes(ref(storage, 'elsewhere/a.png'), png(), {
        contentType: 'image/png',
      })
    );
  });
});
