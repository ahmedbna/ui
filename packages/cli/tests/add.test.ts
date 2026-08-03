import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { addCommand } from '../src/commands/add.js';
import { writeConfig, type ComponentsConfig } from '../src/utils/config.js';
import {
  clearRegistryCache,
  SUPPORTED_SCHEMA_VERSION,
} from '../src/utils/registry-client.js';

/**
 * Drives the real `add` against a stubbed registry in a temp project.
 *
 * The payload carries no npm dependencies, which keeps this off the installer
 * path — no subprocess, no network beyond the stubbed fetch.
 */

const REGISTRY = 'http://registry.test/r';

let workdir: string;
let cwd: string;

const BUTTON_SOURCE = [
  "import { Text } from '@/components/ui/text';",
  "import { useColor } from '@/hooks/useColor';",
  'export const Button = () => null;',
].join('\n');

const payload = {
  $schemaVersion: SUPPORTED_SCHEMA_VERSION,
  name: 'button',
  type: 'registry:ui',
  description: 'A button',
  dependencies: [],
  registryDependencies: [],
  files: [
    {
      type: 'registry:ui',
      path: 'src/components/ui/button.tsx',
      target: 'components/ui/button.tsx',
      content: BUTTON_SOURCE,
    },
    {
      type: 'registry:hook',
      path: 'src/hooks/useColor.ts',
      target: 'hooks/useColor.ts',
      content: "export const useColor = () => '#000';\n",
    },
  ],
};

function stubFetch(body: unknown = payload) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: { get: () => null },
      json: async () => body,
    })
  );
}

/** A minimal Expo-shaped project, with the given `@/*` mapping. */
async function project(mapping: string, config?: ComponentsConfig) {
  await fs.writeFile(
    path.join(workdir, 'package.json'),
    JSON.stringify({ name: 'app', dependencies: { expo: '^54.0.0' } })
  );
  await fs.writeFile(
    path.join(workdir, 'tsconfig.json'),
    JSON.stringify({ compilerOptions: { paths: { '@/*': [mapping] } } })
  );
  // Pins package-manager resolution so nothing shells out to detect one.
  if (config) await writeConfig(workdir, { packageManager: 'npm', ...config });
}

const read = (relative: string) =>
  fs.readFile(path.join(workdir, relative), 'utf8');

const exists = (relative: string) =>
  fs
    .access(path.join(workdir, relative))
    .then(() => true)
    .catch(() => false);

beforeEach(async () => {
  cwd = process.cwd();
  workdir = await fs.mkdtemp(path.join(os.tmpdir(), 'bna-add-'));
  process.chdir(workdir);
  await clearRegistryCache(REGISTRY);
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  stubFetch();
});

afterEach(async () => {
  process.chdir(cwd);
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  await clearRegistryCache(REGISTRY);
  await fs.rm(workdir, { recursive: true, force: true });
});

describe('add', () => {
  it('installs under src/ when @/* maps there', async () => {
    // The reported bug: files landed at the project root, outside `@/`.
    await project('./src/*', {});
    await addCommand(['button'], { registry: REGISTRY, npm: true });

    expect(await exists('src/components/ui/button.tsx')).toBe(true);
    expect(await exists('src/hooks/useColor.ts')).toBe(true);
    expect(await exists('components/ui/button.tsx')).toBe(false);
  });

  it('leaves the imports alone, so they resolve through the same @/', async () => {
    await project('./src/*', {});
    await addCommand(['button'], { registry: REGISTRY, npm: true });

    // `@/components/ui/text` now points at `src/components/ui/text`, which is
    // where the sibling file went.
    expect(await read('src/components/ui/button.tsx')).toBe(BUTTON_SOURCE);
  });

  it('still installs at the project root by default', async () => {
    await project('./*', {});
    await addCommand(['button'], { registry: REGISTRY, npm: true });

    expect(await read('components/ui/button.tsx')).toBe(BUTTON_SOURCE);
    expect(await exists('hooks/useColor.ts')).toBe(true);
    expect(await exists('src')).toBe(false);
  });

  it('relocates a file and repoints its imports for a custom alias', async () => {
    await project('./src/*', { aliases: { components: 'ui-kit' } });
    await addCommand(['button'], { registry: REGISTRY, npm: true });

    expect(await read('src/ui-kit/ui/button.tsx')).toBe(
      BUTTON_SOURCE.replace('@/components/ui/text', '@/ui-kit/ui/text')
    );
    // Unaliased kinds keep both their location and their specifier.
    expect(await exists('src/hooks/useColor.ts')).toBe(true);
  });

  it('ignores an alias root a pre-existing config already spelled out', async () => {
    // Written when the CLI ignored the mapping; must not nest twice.
    await project('./src/*', { aliases: { components: 'src/components' } });
    await addCommand(['button'], { registry: REGISTRY, npm: true });

    expect(await exists('src/components/ui/button.tsx')).toBe(true);
    expect(await exists('src/src')).toBe(false);
  });

  it('lets baseDir override the tsconfig', async () => {
    await project('./*', { baseDir: 'src' });
    await addCommand(['button'], { registry: REGISTRY, npm: true });

    expect(await exists('src/components/ui/button.tsx')).toBe(true);
  });

  it('prints the path it would write, and writes nothing', async () => {
    await project('./src/*', {});
    const lines: string[] = [];
    vi.spyOn(console, 'log').mockImplementation((...args) => {
      lines.push(args.join(' '));
    });

    await addCommand(['button'], {
      registry: REGISTRY,
      npm: true,
      dryRun: true,
    });

    expect(lines.join('\n')).toContain('src/components/ui/button.tsx');
    expect(await exists('src/components/ui/button.tsx')).toBe(false);
  });

  it('detects a conflict under the alias root, not at the project root', async () => {
    await project('./src/*', {});
    await fs.mkdir(path.join(workdir, 'src/components/ui'), {
      recursive: true,
    });
    await fs.writeFile(
      path.join(workdir, 'src/components/ui/button.tsx'),
      'mine\n'
    );

    // `--yes` keeps existing files rather than clobbering them.
    await addCommand(['button'], { registry: REGISTRY, npm: true, yes: true });
    expect(await read('src/components/ui/button.tsx')).toBe('mine\n');
    expect(await exists('src/hooks/useColor.ts')).toBe(true);
  });

  it('refuses a target that escapes the project', async () => {
    stubFetch({
      ...payload,
      files: [{ ...payload.files[0], target: '../escaped.tsx' }],
    });
    await project('./src/*', {});

    await expect(
      addCommand(['button'], { registry: REGISTRY, npm: true })
    ).rejects.toThrow(/outside your project/i);
  });
});
