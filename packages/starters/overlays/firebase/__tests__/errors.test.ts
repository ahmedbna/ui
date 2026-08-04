import { messageFor } from '@/lib/errors';

describe('messageFor', () => {
  it('turns a Firestore code into something actionable', () => {
    expect(messageFor({ code: 'permission-denied' })).toContain(
      'firestore.rules'
    );
  });

  it('strips the product prefix Storage codes carry', () => {
    // Storage reports `storage/unauthorized`, Firestore reports bare
    // `permission-denied`. One lookup table has to cope with both.
    expect(messageFor({ code: 'storage/unauthorized' })).toContain(
      'storage.rules'
    );
  });

  it('passes a missing-index error through with its console URL intact', () => {
    // The single most useful thing the SDK ever tells you: the URL creates
    // exactly the index the failed query needs. Replacing it with friendly
    // prose throws that away.
    const url =
      'https://console.firebase.google.com/project/demo/firestore/indexes?create_composite=abc';
    const message = messageFor({
      code: 'failed-precondition',
      message: `The query requires an index. You can create it here: ${url}`,
    });

    expect(message).toContain(url);
    expect(message).toContain('firestore.indexes.json');
  });

  it('falls back to the raw message for an unmapped code', () => {
    expect(messageFor({ code: 'some/unmapped', message: 'raw detail' })).toBe(
      'raw detail'
    );
  });

  it('never returns empty for a value that is not an error at all', () => {
    expect(messageFor(undefined)).toBe('Something went wrong.');
    expect(messageFor({})).toBe('Something went wrong.');
  });
});
