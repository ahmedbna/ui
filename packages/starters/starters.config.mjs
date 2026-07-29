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
 * Both Convex scaffolds are `start` plus a backend. Only the delta is checked
 * in (see `overlays/`); the shared app shell is copied from `start`.
 *
 * They overlay `start` independently rather than layering auth on top of
 * `start-convex` — the two diverge in `_layout.tsx`, `schema.ts`, `app.json`
 * and `package.json`, so chaining them would buy two shared files at the cost
 * of a build-order dependency between overlays.
 */
export const overlays = {
  /** Convex only: schema, a demo query, no auth. */
  'start-convex': { base: 'start', overlay: 'overlays/convex' },
  /** Convex plus @convex-dev/auth — Google, Apple, password, email OTP. */
  'start-convex-auth': { base: 'start', overlay: 'overlays/convex-auth' },
};
