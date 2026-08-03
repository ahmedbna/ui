import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  CONFIG_FILENAME,
  DEFAULT_ALIASES,
  applyAliases,
  normalizeAliases,
  readConfig,
  rewriteImports,
  writeConfig,
} from '../src/utils/config.js';
import { resolveRegistryUrl } from '../src/utils/registry-client.js';

let dir: string;

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'bna-config-'));
});

afterEach(async () => {
  await fs.rm(dir, { recursive: true, force: true });
});

describe('readConfig', () => {
  it('returns null when there is no config, which is not an error', async () => {
    // Every command has to keep working in a project that predates this file.
    expect(await readConfig(dir)).toBeNull();
  });

  it('round-trips through writeConfig', async () => {
    await writeConfig(dir, { registry: 'https://example.test/r' });
    expect(await readConfig(dir)).toMatchObject({
      registry: 'https://example.test/r',
      $schema: expect.stringContaining('schema.json'),
    });
  });

  it('reports malformed JSON with the path to fix', async () => {
    await fs.writeFile(path.join(dir, CONFIG_FILENAME), '{ not json');
    await expect(readConfig(dir)).rejects.toThrow(/not valid JSON/i);
  });
});

describe('applyAliases', () => {
  it('remaps only the leading segment', () => {
    // `ui/` belongs to the registry's own layout, not to the alias.
    expect(
      applyAliases('components/ui/button.tsx', { components: 'ui-kit' })
    ).toBe('ui-kit/ui/button.tsx');
  });

  it('leaves kinds with no alias alone', () => {
    expect(applyAliases('hooks/useColor.ts', { components: 'ui-kit' })).toBe(
      'hooks/useColor.ts'
    );
  });

  it('is a no-op without a config, and for the defaults', () => {
    expect(applyAliases('components/ui/button.tsx', undefined)).toBe(
      'components/ui/button.tsx'
    );
    expect(applyAliases('theme/globals.ts', { ...DEFAULT_ALIASES })).toBe(
      'theme/globals.ts'
    );
  });

  it('ignores an unknown leading segment', () => {
    expect(applyAliases('app/_layout.tsx', { components: 'ui-kit' })).toBe(
      'app/_layout.tsx'
    );
  });
});

describe('normalizeAliases', () => {
  it('strips an alias root a pre-existing config already spelled out', () => {
    // Written when the CLI ignored the `@/*` mapping, so it named the full
    // project-relative path. Honouring it literally would nest twice.
    const { aliases, legacy } = normalizeAliases(
      { components: 'src/components', hooks: 'src/hooks' },
      'src'
    );

    expect(aliases).toEqual({ components: 'components', hooks: 'hooks' });
    expect(legacy).toEqual(['components', 'hooks']);
  });

  it('leaves values that only look like the root alone', () => {
    // `src` is not `src/`, so there is no redundant prefix to drop.
    const { aliases, legacy } = normalizeAliases({ components: 'src' }, 'src');
    expect(aliases).toEqual({ components: 'src' });
    expect(legacy).toEqual([]);
  });

  it('is a no-op at the project root, and without a config', () => {
    expect(normalizeAliases({ components: 'src/components' }, '')).toEqual({
      aliases: { components: 'src/components' },
      legacy: [],
    });
    expect(normalizeAliases(undefined, 'src')).toEqual({
      aliases: undefined,
      legacy: [],
    });
  });
});

describe('rewriteImports', () => {
  const source = [
    "import { Text } from '@/components/ui/text';",
    "import { useColor } from '@/hooks/useColor';",
    'export const Button = () => null;',
  ].join('\n');

  it('returns the registry content untouched for the defaults', () => {
    // Byte-identical, not merely equal: the common path must not reformat what
    // the registry served.
    expect(rewriteImports(source, { ...DEFAULT_ALIASES })).toBe(source);
    expect(rewriteImports(source, undefined)).toBe(source);
  });

  it('repoints only the kinds that were aliased', () => {
    expect(rewriteImports(source, { components: 'ui-kit' })).toBe(
      [
        "import { Text } from '@/ui-kit/ui/text';",
        "import { useColor } from '@/hooks/useColor';",
        'export const Button = () => null;',
      ].join('\n')
    );
  });

  it('does not rescan a value that collides with another kind', () => {
    // One pass: `components` becomes `hooks`, and that result is not then
    // treated as a `hooks` import and remapped again.
    expect(rewriteImports(source, { components: 'hooks', hooks: 'lib' })).toBe(
      [
        "import { Text } from '@/hooks/ui/text';",
        "import { useColor } from '@/lib/useColor';",
        'export const Button = () => null;',
      ].join('\n')
    );
  });

  it('handles double quotes and dynamic imports', () => {
    expect(
      rewriteImports('const m = await import("@/theme/globals");', {
        theme: 'styles',
      })
    ).toBe('const m = await import("@/styles/globals");');
  });
});

describe('resolveRegistryUrl precedence', () => {
  const ENV = 'BNA_UI_REGISTRY';
  const original = process.env[ENV];

  afterEach(() => {
    if (original === undefined) delete process.env[ENV];
    else process.env[ENV] = original;
  });

  it('falls back to the public registry', () => {
    delete process.env[ENV];
    expect(resolveRegistryUrl()).toBe('https://ui.ahmedbna.com/r');
  });

  it('prefers the config over the environment', () => {
    process.env[ENV] = 'https://env.test/r';
    expect(resolveRegistryUrl(undefined, 'https://config.test/r')).toBe(
      'https://config.test/r'
    );
  });

  it('prefers an explicit flag over everything', () => {
    process.env[ENV] = 'https://env.test/r';
    expect(
      resolveRegistryUrl('https://flag.test/r', 'https://config.test/r')
    ).toBe('https://flag.test/r');
  });

  it('strips trailing slashes so paths join cleanly', () => {
    expect(resolveRegistryUrl(undefined, 'https://config.test/r///')).toBe(
      'https://config.test/r'
    );
  });
});
