/**
 * Parses an incoming Firebase action link.
 *
 * Password resets, email-address verification and email-link sign-in all come
 * back as a URL carrying `mode` and `oobCode` query parameters. The SDK has a
 * helper for exactly one of them (`isSignInWithEmailLink`), so the rest has to
 * be read off the URL.
 *
 * Pure, and free of any runtime `firebase/*` import, so it can be unit-tested
 * without the SDK, a project, or a network — see `__tests__/auth-link.test.ts`.
 * Handling deep links wrong is the sort of bug that only shows up on a real
 * device with a real email, which is a slow way to find it.
 */

export type AuthLink =
  | { kind: 'resetPassword'; oobCode: string }
  | { kind: 'verifyEmail'; oobCode: string }
  | { kind: 'recoverEmail'; oobCode: string };

/**
 * Reads query parameters from any URL shape a link may arrive in.
 *
 * `new URL()` is not enough on its own: a custom-scheme deep link like
 * `myapp://?mode=…` parses inconsistently across platforms, and Firebase also
 * nests the real link inside a `link=` parameter when it comes through a
 * Hosting domain. So this reads the query string directly and unwraps one
 * level of nesting.
 */
function paramsOf(url: string): URLSearchParams | null {
  const queryStart = url.indexOf('?');
  if (queryStart === -1) return null;

  const params = new URLSearchParams(url.slice(queryStart + 1));

  // Firebase wraps the actual action URL in `link=` when the email was sent
  // through a Hosting link domain. The outer URL has no oobCode of its own.
  const nested = params.get('link');
  if (nested && !params.get('oobCode')) {
    return paramsOf(decodeURIComponent(nested));
  }

  return params;
}

export function parseAuthLink(url: string): AuthLink | null {
  const params = paramsOf(url);
  if (!params) return null;

  const oobCode = params.get('oobCode');
  if (!oobCode) return null;

  switch (params.get('mode')) {
    case 'resetPassword':
      return { kind: 'resetPassword', oobCode };
    case 'verifyEmail':
      return { kind: 'verifyEmail', oobCode };
    case 'recoverEmail':
      return { kind: 'recoverEmail', oobCode };
    default:
      // `signIn` deliberately falls through: `isSignInWithEmailLink` in the SDK
      // is the authority on those and the provider asks it first.
      return null;
  }
}
