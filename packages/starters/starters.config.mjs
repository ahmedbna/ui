/**
 * What each starter pulls from the registry.
 *
 * These files used to be checked in twice (once per starter) and hand-synced
 * with the registry — 13 components x 2, plus hooks and theme. They are now
 * generated, so a component fix reaches the scaffolds automatically.
 */
export const starters = {
  start: {
    /** Registry entries to materialise; their dependencies come along. */
    components: [
      'avoid-keyboard',
      'button',
      'card',
      'icon',
      'input',
      'input-otp',
      'link',
      'mode-toggle',
      'scroll-view',
      'spinner',
      'tabs',
      'text',
      'view',
    ],
    hooks: ['useColor', 'useColorScheme', 'useKeyboardHeight', 'useModeToggle'],
    theme: ['colors', 'globals', 'theme-provider'],
  },
};

/**
 * `start-convex` is `start` plus a Convex backend. Only the delta is checked
 * in (see `overlays/convex/`); the shared app shell is copied from `start`.
 */
export const overlays = {
  'start-convex': { base: 'start', overlay: 'overlays/convex' },
};
