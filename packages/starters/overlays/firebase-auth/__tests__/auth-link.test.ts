import { parseAuthLink } from '@/lib/auth-link';

/**
 * Deep-link parsing is the sort of thing that only breaks on a real device with
 * a real email, which is a slow way to find a bug. `lib/auth-link.ts` is pure
 * so these cases can be asserted in milliseconds instead.
 */
describe('parseAuthLink', () => {
  it('recognises a password reset link', () => {
    expect(
      parseAuthLink(
        'https://demo.firebaseapp.com/__/auth/action?mode=resetPassword&oobCode=ABC123&apiKey=xyz'
      )
    ).toEqual({ kind: 'resetPassword', oobCode: 'ABC123' });
  });

  it('recognises an email verification link', () => {
    expect(
      parseAuthLink(
        'https://demo.firebaseapp.com/__/auth/action?mode=verifyEmail&oobCode=XYZ'
      )
    ).toEqual({ kind: 'verifyEmail', oobCode: 'XYZ' });
  });

  it('unwraps the nested link Hosting domains produce', () => {
    // Firebase wraps the real action URL in `link=` when the email was sent
    // through a Hosting link domain — the outer URL carries no oobCode of its
    // own, so reading only the top level finds nothing.
    const inner = encodeURIComponent(
      'https://demo.firebaseapp.com/__/auth/action?mode=resetPassword&oobCode=NESTED'
    );

    expect(
      parseAuthLink(`https://demo.page.link/?link=${inner}&apn=com.example`)
    ).toEqual({ kind: 'resetPassword', oobCode: 'NESTED' });
  });

  it('parses a custom-scheme deep link', () => {
    // `new URL()` handles these inconsistently across platforms, which is why
    // the query string is read directly rather than through a URL object.
    expect(parseAuthLink('myapp://?mode=verifyEmail&oobCode=SCHEME')).toEqual({
      kind: 'verifyEmail',
      oobCode: 'SCHEME',
    });
  });

  it('ignores a sign-in link', () => {
    // `isSignInWithEmailLink` in the SDK is the authority on those, and the
    // provider asks it first. Claiming them here would double-handle the flow.
    expect(
      parseAuthLink(
        'https://demo.firebaseapp.com/__/auth/action?mode=signIn&oobCode=SIGNIN'
      )
    ).toBeNull();
  });

  it('returns null for anything that is not an action link', () => {
    expect(parseAuthLink('myapp://tasks/123')).toBeNull();
    expect(parseAuthLink('https://example.com')).toBeNull();
    expect(parseAuthLink('')).toBeNull();
    // A mode with no code is not actionable.
    expect(parseAuthLink('myapp://?mode=resetPassword')).toBeNull();
    // A code with no mode is not either.
    expect(parseAuthLink('myapp://?oobCode=ABC')).toBeNull();
  });
});
