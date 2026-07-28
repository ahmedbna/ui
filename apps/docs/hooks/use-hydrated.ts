import * as React from 'react';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` while rendering on the server and during the hydration pass, `true`
 * afterwards — the standard guard for values that only exist in the browser.
 *
 * Implemented with `useSyncExternalStore` rather than a `useState` +
 * `useEffect(() => setState(true), [])` pair: the effect version schedules a
 * second render that React now flags as a cascading render
 * (`react-hooks/set-state-in-effect`).
 */
export function useHydrated(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
