// `ConvexReactClient`'s constructor throws at import time when this is
// missing — deliberately, so a misconfigured app fails loudly rather than at
// the first query. Tests that import anything downstream of `app/_layout.tsx`
// need it set.
process.env.EXPO_PUBLIC_CONVEX_URL = 'https://test.convex.cloud';
