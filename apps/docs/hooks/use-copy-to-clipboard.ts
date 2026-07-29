'use client';

import * as React from 'react';

import { trackEvent, type Event } from '@/lib/events';

/**
 * Copy-to-clipboard with a self-clearing "copied" flag.
 *
 * The reset effect depends on `isCopied`, so the timer starts when a copy
 * happens rather than once on mount — the earlier inline version in
 * `copy-button.tsx` used an empty dependency array, which left its checkmark
 * showing permanently after the first click.
 */
export function useCopyToClipboard({
  timeout = 2000,
}: { timeout?: number } = {}) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = React.useCallback((value: string, event?: Event) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(value);
    if (event) trackEvent(event);
    setIsCopied(true);
  }, []);

  React.useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), timeout);
    return () => clearTimeout(timer);
  }, [isCopied, timeout]);

  return { isCopied, copyToClipboard };
}
