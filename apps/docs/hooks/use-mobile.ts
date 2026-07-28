import * as React from 'react';

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

/**
 * `useSyncExternalStore` is the right primitive here: matchMedia is an external
 * store, and the third argument is the server snapshot, so SSR renders `false`
 * and hydration cannot mismatch. The previous `useState` + `useEffect` pair did
 * the same thing via a cascading render, which React now flags.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
