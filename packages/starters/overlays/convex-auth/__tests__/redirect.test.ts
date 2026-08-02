import { isAllowedRedirect } from '@/convex/lib/redirect';

// The `redirect` callback in `convex/auth.ts` is the only thing stopping an
// OAuth or magic-link flow from handing a session to an attacker-supplied
// URL. Testing the predicate directly is cheaper than testing it through a
// live sign-in, and just as load-bearing.
describe('isAllowedRedirect', () => {
  const env = {
    siteUrl: 'http://localhost:3000/',
    expoUrl: 'my-app://',
  };

  it('allows an Expo Go dev URL', () => {
    expect(isAllowedRedirect('exp://192.168.1.5:8081', env)).toBe(true);
  });

  it('allows the configured production app scheme', () => {
    expect(isAllowedRedirect('my-app://sign-in', env)).toBe(true);
  });

  it('allows the configured site URL', () => {
    expect(isAllowedRedirect('http://localhost:3000/callback', env)).toBe(true);
  });

  it('rejects an arbitrary URL', () => {
    expect(isAllowedRedirect('https://evil.example.com', env)).toBe(false);
  });

  it('rejects everything when no env vars are configured', () => {
    expect(isAllowedRedirect('http://localhost:3000/', {})).toBe(false);
  });
});
