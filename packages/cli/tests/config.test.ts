import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  CONFIG_FILENAME,
  DEFAULT_ALIASES,
  applyAliases,
  readConfig,
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
      applyAliases('components/ui/button.tsx', { components: 'src/components' })
    ).toBe('src/components/ui/button.tsx');
  });

  it('leaves kinds with no alias alone', () => {
    expect(
      applyAliases('hooks/useColor.ts', { components: 'src/components' })
    ).toBe('hooks/useColor.ts');
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
    expect(
      applyAliases('app/_layout.tsx', { components: 'src/components' })
    ).toBe('app/_layout.tsx');
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
