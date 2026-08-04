import { messageFor } from '@/lib/errors';

describe('messageFor', () => {
  it('does not distinguish a wrong password from an unknown account', () => {
    // Firebase collapses both into `auth/invalid-credential` when email
    // enumeration protection is on — the default since September 2023 — so the
    // sign-in form cannot be used to discover who has an account. Saying
    // "no such user" here would give away exactly what that protects.
    const message = messageFor({ code: 'auth/invalid-credential' });

    expect(message).toBe('That email and password do not match an account.');
    expect(message).not.toMatch(/no account|not found|does not exist/i);
  });

  it('explains what requires-recent-login actually wants', () => {
    expect(messageFor({ code: 'auth/requires-recent-login' })).toContain(
      'sign in again'
    );
  });

  it('turns a Firestore code into something actionable', () => {
    expect(messageFor({ code: 'permission-denied' })).toContain(
      'checked against the query'
    );
  });

  it('strips the product prefix codes carry', () => {
    // Storage reports `storage/unauthorized` and Auth reports
    // `auth/invalid-email`, while Firestore reports a bare `permission-denied`.
    // One lookup table has to cope with all three.
    expect(messageFor({ code: 'storage/unauthorized' })).toContain('uid');
    expect(messageFor({ code: 'auth/invalid-email' })).toContain(
      'email address'
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
