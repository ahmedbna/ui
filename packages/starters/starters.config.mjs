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
 * Every backend scaffold is `start` plus a backend. Only the delta is checked
 * in (see `overlays/`); the shared app shell is copied from `start`.
 *
 * Each overlays `start` independently rather than layering auth on top of the
 * backend-only variant — the two diverge in `_layout.tsx`, the schema,
 * `app.json` and `package.json`, so chaining them would buy a couple of shared
 * files at the cost of a build-order dependency between overlays.
 *
 * An overlay may also declare `components` / `hooks` / `theme`, pulled from the
 * registry exactly as `starters` above. That is for entries the base does not
 * ship: putting them in `start` would bloat every other scaffold, and checking
 * them into the overlay would reintroduce the hand-synced copies this package
 * exists to remove.
 */
export const overlays = {
  /** Convex only: schema, a demo query, no auth. */
  'start-convex': { base: 'start', overlay: 'overlays/convex' },
  /** Convex plus @convex-dev/auth — Google, Apple, password, email OTP. */
  'start-convex-auth': { base: 'start', overlay: 'overlays/convex-auth' },
  /** Supabase only: migrations, RLS, realtime, storage, an edge function. */
  'start-supabase': {
    base: 'start',
    overlay: 'overlays/supabase',
    components: [
      'badge',
      'checkbox',
      'image',
      'media-picker',
      'separator',
      'skeleton',
      'toast',
    ],
  },
  /** Supabase plus auth — password, magic link, email OTP, Google, Apple. */
  'start-supabase-auth': {
    base: 'start',
    overlay: 'overlays/supabase-auth',
    components: [
      'alert-dialog',
      'avatar',
      'badge',
      'checkbox',
      'image',
      'media-picker',
      'onboarding',
      'separator',
      'skeleton',
      'switch',
      'toast',
    ],
  },
};
