import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { REGISTRY, listComponents, resolveAllDependencies } from '../index.js';
import { findDependencyCycle } from '../resolve.js';
import { componentRegistrySchema, REGISTRY_SCHEMA_VERSION } from '../schema.js';
import { getEntryFiles, getPayload, getSource } from '../server.js';
import baseline from './registry-baseline.json' with { type: 'json' };

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Dependency declarations that were intentionally *removed* relative to the
 * pre-migration baseline. Everything else may only grow — see the equivalence
 * suite below for why that is the invariant worth enforcing.
 */
const INTENTIONAL_REMOVALS: Record<string, string[]> = {
  // Never existed in the registry; the old resolver silently no-op'd on it,
  // and the demo actually uses React Native's ActivityIndicator.
  'audio-recorder-cloud': ['loading-spinner'],

  // popover.tsx imports Reanimated zero times — it positions itself with
  // `ref.measure()` and `Dimensions.get()`. The declaration was stale. Pruned
  // during the SDK 57 upgrade so the entry doesn't inherit Reanimated 4's new
  // `react-native-worklets` requirement for a dependency it never had.
  popover: ['react-native-reanimated'],

  // The hook no longer imports `@/hooks/useColorScheme`. It reads the resolved
  // scheme off the mode context instead, which is the single source of truth
  // for the toggle on every platform — see `providers/mode-provider.tsx`.
  useModeToggle: ['useColorScheme'],

  // SDK 56 forked React Navigation into Expo Router: `useBottomTabBarHeight`
  // and friends now come from `expo-router/js-tabs`, so the standalone
  // `@react-navigation/bottom-tabs` dependency was replaced by `expo-router`.
  useBottomTabOverflow: ['@react-navigation/bottom-tabs'],

  // Copy-paste artifact from line-chart's template (the one chart that
  // legitimately uses gesture-handler, for its pan-to-tooltip gesture) — none
  // of these 14 import react-native-gesture-handler. AUDIT_CHECKLIST.md Phase 6.
  'bubble-chart': ['react-native-gesture-handler'],
  'candlestick-chart': ['react-native-gesture-handler'],
  'column-chart': ['react-native-gesture-handler'],
  'doughnut-chart': ['react-native-gesture-handler'],
  'heatmap-chart': ['react-native-gesture-handler'],
  'pie-chart': ['react-native-gesture-handler'],
  'polar-area-chart': ['react-native-gesture-handler'],
  'progress-ring-chart': ['react-native-gesture-handler'],
  'radar-chart': ['react-native-gesture-handler'],
  'radial-bar-chart': ['react-native-gesture-handler'],
  'scatter-chart': ['react-native-gesture-handler'],
  'stacked-area-chart': ['react-native-gesture-handler'],
  'stacked-bar-chart': ['react-native-gesture-handler'],
  'treemap-chart': ['react-native-gesture-handler'],

  // carousel.tsx imports Text from nowhere — it never renders text itself.
  carousel: ['text'],

  // combobox.tsx imports Text/View from react-native core, not the registry's
  // @/components/ui/text or @/components/ui/view wrappers.
  combobox: ['text', 'view'],

  // scroll-view.tsx wraps RN's ScrollView directly; it never imports the
  // registry's @/components/ui/view wrapper.
  'scroll-view': ['view'],

  // chart-container.tsx has no Image usage at all (confirmed via the
  // generated build payload) — both the npm package and the registry's own
  // image wrapper were undeclared dead weight.
  'chart-container': ['expo-image', 'image'],
};

/**
 * Identity fields (beyond `type`, see SANCTIONED_TYPE_CHANGES) that were
 * intentionally corrected relative to the pre-migration baseline, because the
 * baseline itself carried the bug forward from the old repo.
 */
const SANCTIONED_DESCRIPTION_CHANGES = new Set([
  // Was a verbatim copy-paste of view's description — tabs.tsx is a
  // swipeable, animated tab component, not a plain View wrapper.
  'tabs',
]);

describe('registry integrity', () => {
  it('every entry satisfies the schema', () => {
    for (const [key, entry] of Object.entries(REGISTRY)) {
      const parsed = componentRegistrySchema.safeParse(entry);
      expect(
        parsed.success,
        `${key}: ${JSON.stringify(parsed.error?.issues)}`
      ).toBe(true);
    }
  });

  it('entry name always matches its key', () => {
    for (const [key, entry] of Object.entries(REGISTRY)) {
      expect(entry.name, `key "${key}"`).toBe(key);
    }
  });

  it('every registryDependency resolves', () => {
    for (const [key, entry] of Object.entries(REGISTRY)) {
      for (const dep of entry.registryDependencies ?? []) {
        expect(REGISTRY[dep], `"${key}" -> unknown "${dep}"`).toBeDefined();
      }
    }
  });

  it('has no dependency cycles', () => {
    expect(findDependencyCycle(REGISTRY)).toBeNull();
  });

  it('every declared file exists on disk', async () => {
    for (const [key, entry] of Object.entries(REGISTRY)) {
      for (const file of entry.files) {
        await expect(
          fs.access(path.join(ROOT, file.path)),
          `"${key}" -> ${file.path}`
        ).resolves.toBeUndefined();
      }
    }
  });

  it('all source paths live under src/', () => {
    for (const [key, entry] of Object.entries(REGISTRY)) {
      for (const file of entry.files) {
        expect(file.path.startsWith('src/'), `"${key}": ${file.path}`).toBe(
          true
        );
      }
    }
  });
});

describe('equivalence with the pre-migration registry', () => {
  const base = baseline as Record<string, any>;

  /**
   * Entries added since the baseline was taken.
   *
   * `mode` extracts the light/dark/system state out of `useModeToggle`, which
   * held it in local `useState` alongside a global `Appearance.setColorScheme`
   * call. That split state desynced across toggle instances on native, and did
   * nothing at all on web — react-native-web's `Appearance` is read-only, so
   * there was no setter for the override to go through. It has to be its own
   * entry rather than part of `theme-provider`: `useColorScheme` reads it, and
   * `theme-provider` already depends on `useColorScheme`.
   */
  const SANCTIONED_ADDITIONS = new Set(['mode-provider']);

  it('has exactly the same set of entries', () => {
    const added = Object.keys(REGISTRY).filter(
      (key) => !(key in base) && !SANCTIONED_ADDITIONS.has(key)
    );
    expect(added).toEqual([]);

    const removed = Object.keys(base).filter((key) => !(key in REGISTRY));
    expect(removed).toEqual([]);
  });

  /**
   * Entries whose identity changed on purpose since the baseline was taken.
   *
   * These seven are demos that were mistyped `registry:ui`. That made them
   * appear in the `bna-ui add` picker as if they were components, gave each one
   * a documentation page it does not have, and would have earned each an agent
   * bundle describing a demo as an installable component.
   */
  const SANCTIONED_TYPE_CHANGES = new Set([
    'combobox-demo',
    'combobox-disabled',
    'combobox-form',
    'combobox-groups',
    'combobox-large',
    'combobox-multiple',
    'combobox-search',
  ]);

  /**
   * Entries whose files moved to a different folder on purpose.
   *
   * `theme/` held both palette data (`colors`, `globals`) and a React provider.
   * Providers now live under `providers/`, so the folder a file sits in says
   * what kind of thing it is. This changes the `@/…` specifier consumers import
   * through, which is why it ships as a breaking release rather than quietly.
   */
  const SANCTIONED_FILE_MOVES: Record<string, [from: string, to: string]> = {
    'theme-provider': ['theme/', 'providers/'],
  };

  it('identity fields are unchanged, modulo the templates/ -> src/ path move', () => {
    const diffs: string[] = [];

    for (const key of Object.keys(base)) {
      const move = SANCTIONED_FILE_MOVES[key];
      const relocate = (value: string) =>
        move ? value.replace(move[0], move[1]) : value;

      const before = {
        name: base[key].name,
        description: SANCTIONED_DESCRIPTION_CHANGES.has(key)
          ? REGISTRY[key].description
          : base[key].description,
        type: SANCTIONED_TYPE_CHANGES.has(key)
          ? REGISTRY[key].type
          : base[key].type,
        category: base[key].category,
        preview: base[key].preview,
        // Sanctioned mechanical changes: the registry package root moved, the
        // mistyped demos above were retyped on their files too, and the entries
        // in SANCTIONED_FILE_MOVES changed folder.
        files: base[key].files.map((f: any) => ({
          ...f,
          path: relocate(f.path.replace(/^templates\//, 'src/')),
          target: relocate(f.target),
          type: SANCTIONED_TYPE_CHANGES.has(key) ? 'registry:example' : f.type,
        })),
      };
      const a = REGISTRY[key];
      const after = {
        name: a.name,
        description: a.description,
        type: a.type,
        category: a.category,
        preview: a.preview,
        files: a.files,
      };

      if (JSON.stringify(before) !== JSON.stringify(after)) diffs.push(key);
    }

    expect(diffs).toEqual([]);
  });

  /**
   * Dependency declarations were under-specified before the migration: many
   * entries imported `@/…` modules they never declared, so `bna-ui add` wrote
   * files that could not compile. Fixing that means declarations grew. What
   * must never happen is a declaration silently *disappearing* — that would
   * mean the migration dropped something a component genuinely needs.
   */
  it('no dependency declaration was silently dropped', () => {
    const dropped: string[] = [];

    for (const key of Object.keys(base)) {
      const after = REGISTRY[key];
      const allowed = new Set(INTENTIONAL_REMOVALS[key] ?? []);

      for (const field of [
        'registryDependencies',
        'hooks',
        'theme',
        'dependencies',
      ] as const) {
        const beforeDeps: string[] = base[key][field] ?? [];
        const afterDeps = new Set<string>(after[field] ?? []);
        for (const dep of beforeDeps) {
          if (!afterDeps.has(dep) && !allowed.has(dep)) {
            dropped.push(`${key}.${field}: lost "${dep}"`);
          }
        }
      }
    }

    expect(dropped).toEqual([]);
  });

  it('removes exactly the declarations we meant to remove', () => {
    for (const [key, removed] of Object.entries(INTENTIONAL_REMOVALS)) {
      for (const dep of removed) {
        expect(REGISTRY[key].registryDependencies ?? []).not.toContain(dep);
      }
    }
  });
});

describe('payload self-containment', () => {
  const LOCAL_IMPORT =
    /from '@\/((?:components|hooks|theme|providers)\/[\w/-]+)'/g;

  it('every payload ships every module its files import', async () => {
    const violations: string[] = [];

    for (const name of Object.keys(REGISTRY)) {
      const payload = await getPayload(name);
      if (!payload) {
        violations.push(`${name}: no payload`);
        continue;
      }
      const targets = payload.files.map((f) =>
        f.target.replace(/\.[jt]sx?$/, '')
      );

      for (const file of payload.files) {
        for (const [, spec] of file.content.matchAll(LOCAL_IMPORT)) {
          if (!targets.includes(spec)) {
            violations.push(`${name}: ${file.target} imports @/${spec}`);
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });
});

describe('generated payloads', () => {
  it('button carries its full transitive closure with content', async () => {
    const payload = await getPayload('button');
    expect(payload).not.toBeNull();
    expect(payload!.$schemaVersion).toBe(REGISTRY_SCHEMA_VERSION);

    const targets = payload!.files.map((f) => f.target);
    expect(targets).toContain('components/ui/button.tsx');
    expect(targets).toContain('components/ui/text.tsx');
    expect(targets).toContain('components/ui/icon.tsx');
    expect(targets).toContain('components/ui/spinner.tsx');

    for (const file of payload!.files) {
      expect(file.content.length, file.target).toBeGreaterThan(0);
    }
    expect(payload!.dependencies).toContain('expo-haptics');
  });

  it('dependencies come before dependents', async () => {
    const payload = await getPayload('button');
    const targets = payload!.files.map((f) => f.target);
    expect(targets.indexOf('components/ui/text.tsx')).toBeLessThan(
      targets.indexOf('components/ui/button.tsx')
    );
  });

  it('emits a payload for every entry', async () => {
    const entries = await fs.readdir(path.join(ROOT, 'generated', 'r'), {
      withFileTypes: true,
    });
    // Install payloads are the files directly in `r/`; `ai/` is a sibling
    // directory of agent bundles, emitted only for installable entries.
    const payloads = entries.filter((entry) => entry.isFile());
    // +1 for index.json
    expect(payloads.length).toBe(Object.keys(REGISTRY).length + 1);
  });

  it('emits an AI bundle for every installable entry', async () => {
    const documented = new Set([
      'registry:ui',
      'registry:hook',
      'registry:theme',
    ]);
    const expected = Object.values(REGISTRY).filter((entry) =>
      documented.has(entry.type)
    );
    const files = await fs.readdir(path.join(ROOT, 'generated', 'r', 'ai'));

    // +1 for index.json
    expect(files.length).toBe(expected.length + 1);
  });

  it('rejects path traversal in payload names', async () => {
    expect(await getPayload('../../package')).toBeNull();
    expect(await getPayload('foo/bar')).toBeNull();
  });

  it('no payload leaks a source path that escapes the package', async () => {
    for (const name of listComponents().map((c) => c.name)) {
      const payload = await getPayload(name);
      for (const file of payload!.files) {
        expect(file.path.includes('..'), `${name}: ${file.path}`).toBe(false);
      }
    }
  });
});

/**
 * The docs render "the source of <name>" straight out of these. Indexing the
 * payload by position instead once served `hooks/useColorScheme.ts` — the
 * leaf-most dependency of almost every entry — on 473 of 479 component pages.
 */
describe('own-file resolution', () => {
  it('returns exactly the files an entry declares, in order', async () => {
    const violations: string[] = [];

    for (const [name, entry] of Object.entries(REGISTRY)) {
      const resolved = await getEntryFiles(name);
      const got = resolved.map((f) => f.path);
      const want = entry.files.map((f) => f.path);

      if (got.join('|') !== want.join('|')) {
        violations.push(`${name}: got [${got}] want [${want}]`);
      }
      for (const file of resolved) {
        if (!file.content.length)
          violations.push(`${name}: ${file.path} empty`);
      }
    }

    expect(violations).toEqual([]);
  });

  it('never serves a dependency in place of the entry', async () => {
    const accordion = await getSource('accordion');
    expect(accordion).toContain('AccordionTrigger');
    expect(accordion).not.toContain('useRNColorScheme');

    const demo = await getSource('accordion-demo');
    expect(demo).toContain('AccordionDemo');
    expect(demo).not.toContain('useRNColorScheme');
  });

  it('selects among an entry with several files', async () => {
    const native = await getSource('useColorScheme');
    const web = await getSource(
      'useColorScheme',
      'hooks/useColorScheme.web.ts'
    );

    expect(native).toContain('useRNColorScheme');
    expect(native).not.toContain('useState');
    expect(web).toContain('hasHydrated');
    expect(await getSource('useColorScheme', 'hooks/nope.ts')).toBeNull();
  });

  it('returns nothing for an unknown entry', async () => {
    expect(await getEntryFiles('does-not-exist')).toEqual([]);
    expect(await getSource('does-not-exist')).toBeNull();
  });
});

describe('resolution helpers', () => {
  it('resolves button to its full transitive chain', () => {
    // button -> [text, icon, spinner]; text -> [view]. Order is
    // dependencies-before-dependents, which the CLI relies on when writing files.
    expect(resolveAllDependencies('button')).toEqual([
      'text',
      'view',
      'icon',
      'spinner',
      'button',
    ]);
  });

  it('lists only installable ui components', () => {
    expect(listComponents().every((c) => c.type === 'registry:ui')).toBe(true);
    expect(listComponents().length).toBeGreaterThan(40);
  });
});
