'use client';

import * as React from 'react';

import { trackEvent, type Event } from '@/lib/events';

/**
 * Text to copy, either in hand or fetched on demand when the click happens.
 */
type CopySource = string | (() => Promise<string>);

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

  const copyToClipboard = React.useCallback(
    (value: CopySource, event?: Event) => {
      if (typeof navigator === 'undefined' || !navigator.clipboard) return;

      const succeed = () => {
        if (event) trackEvent(event);
        setIsCopied(true);
      };

      if (typeof value === 'string') {
        navigator.clipboard.writeText(value);
        succeed();
        return;
      }

      // Deferred text. Safari revokes the user activation that `writeText`
      // requires as soon as you `await`, so hand `ClipboardItem` the pending
      // promise and let the browser hold the gesture open while it settles.
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard.write) {
        navigator.clipboard
          .write([
            new ClipboardItem({
              'text/plain': value().then(
                (text) => new Blob([text], { type: 'text/plain' })
              ),
            }),
          ])
          .then(succeed, () => setIsCopied(false));
        return;
      }

      value()
        .then((text) => navigator.clipboard.writeText(text))
        .then(succeed, () => setIsCopied(false));
    },
    []
  );

  React.useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), timeout);
    return () => clearTimeout(timer);
  }, [isCopied, timeout]);

  return { isCopied, copyToClipboard };
}
