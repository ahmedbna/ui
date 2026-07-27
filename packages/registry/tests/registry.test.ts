import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { REGISTRY, listComponents, resolveAllDependencies } from '../index.js';
import { findDependencyCycle } from '../resolve.js';
import { componentRegistrySchema, REGISTRY_SCHEMA_VERSION } from '../schema.js';
import { getPayload } from '../server.js';
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
};

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

  it('has exactly the same set of entries', () => {
    expect(Object.keys(REGISTRY).sort()).toEqual(Object.keys(base).sort());
  });

  it('identity fields are unchanged, modulo the templates/ -> src/ path move', () => {
    const diffs: string[] = [];

    for (const key of Object.keys(base)) {
      const before = {
        name: base[key].name,
        description: base[key].description,
        type: base[key].type,
        category: base[key].category,
        preview: base[key].preview,
        // The only sanctioned mechanical change: the registry package root moved.
        files: base[key].files.map((f: any) => ({
          ...f,
          path: f.path.replace(/^templates\//, 'src/'),
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
  const LOCAL_IMPORT = /from '@\/((?:components|hooks|theme)\/[\w/-]+)'/g;

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
    const files = await fs.readdir(path.join(ROOT, 'generated', 'r'));
    // +1 for index.json
    expect(files.length).toBe(Object.keys(REGISTRY).length + 1);
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
