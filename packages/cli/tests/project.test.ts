import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { assertUsableProject } from '../src/utils/registry.js';

/**
 * Where `add` writes is read from the project's own `@/*` mapping, because the
 * registry freezes every shipped import to `@/...` before the CLI sees it. A
 * project mapping `@/*` to `./src/*` must install into `src/`.
 */

let dir: string;

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'bna-project-'));
  await fs.writeFile(
    path.join(dir, 'package.json'),
    JSON.stringify({ name: 'app', dependencies: { expo: '^54.0.0' } })
  );
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(async () => {
  vi.restoreAllMocks();
  await fs.rm(dir, { recursive: true, force: true });
});

/** Writes a tsconfig with the given compilerOptions, as raw text. */
async function tsconfig(compilerOptions: string, name = 'tsconfig.json') {
  await fs.writeFile(
    path.join(dir, name),
    `{ "compilerOptions": ${compilerOptions} }`
  );
}

describe('alias root resolution', () => {
  it('installs under src/ when @/* maps there', async () => {
    await tsconfig('{ "paths": { "@/*": ["./src/*"] } }');
    expect(await assertUsableProject(dir)).toEqual({
      aliasRoot: 'src',
      source: 'tsconfig.json',
    });
  });

  it('installs at the project root when @/* maps there', async () => {
    // The default every scaffolded project gets. This is the regression bar:
    // an empty root means every path is exactly what it was before.
    await tsconfig('{ "paths": { "@/*": ["./*"] } }');
    expect(await assertUsableProject(dir)).toEqual({
      aliasRoot: '',
      source: 'tsconfig.json',
    });
  });

  it('resolves a bare mapping against baseUrl', async () => {
    await tsconfig('{ "baseUrl": ".", "paths": { "@/*": ["src/*"] } }');
    expect((await assertUsableProject(dir)).aliasRoot).toBe('src');
  });

  it('resolves a root-relative mapping against a nested baseUrl', async () => {
    await tsconfig('{ "baseUrl": "./src", "paths": { "@/*": ["./*"] } }');
    expect((await assertUsableProject(dir)).aliasRoot).toBe('src');
  });

  it('handles a nested alias root', async () => {
    await tsconfig('{ "paths": { "@/*": ["./src/app/*"] } }');
    expect((await assertUsableProject(dir)).aliasRoot).toBe('src/app');
  });

  it('takes the first mapping when several are listed', async () => {
    // The rest are resolution fallbacks; picking one to write into is a guess.
    await tsconfig('{ "paths": { "@/*": ["./src/*", "./*"] } }');
    expect((await assertUsableProject(dir)).aliasRoot).toBe('src');
  });

  it('falls back to jsconfig.json', async () => {
    await tsconfig('{ "paths": { "@/*": ["./src/*"] } }', 'jsconfig.json');
    expect(await assertUsableProject(dir)).toEqual({
      aliasRoot: 'src',
      source: 'jsconfig.json',
    });
  });

  it('reads a tsconfig with comments and trailing commas', async () => {
    await fs.writeFile(
      path.join(dir, 'tsconfig.json'),
      `{
         // Expo scaffolds this commented.
         "compilerOptions": {
           "paths": { "@/*": ["./src/*"], },  /* keep in sync with metro */
         },
       }`
    );
    expect((await assertUsableProject(dir)).aliasRoot).toBe('src');
  });

  it('refuses a mapping that climbs out of the project', async () => {
    await tsconfig('{ "paths": { "@/*": ["../shared/*"] } }');
    expect(await assertUsableProject(dir)).toEqual({
      aliasRoot: '',
      source: 'default',
    });
  });

  it('does not block the install on an unparseable config', async () => {
    // Our own parser being defeated is not proof the alias is missing.
    await fs.writeFile(path.join(dir, 'tsconfig.json'), '{ not json');
    expect(await assertUsableProject(dir)).toEqual({
      aliasRoot: '',
      source: 'default',
    });
  });

  it('still refuses a project with no @/* alias at all', async () => {
    await tsconfig('{ "strict": true }');
    await expect(assertUsableProject(dir)).rejects.toThrow(/@\/\*/);
  });

  it('lets baseDir override the tsconfig', async () => {
    await tsconfig('{ "paths": { "@/*": ["./*"] } }');
    expect(await assertUsableProject(dir, 'src')).toEqual({
      aliasRoot: 'src',
      source: 'components.json',
    });
  });

  it('normalizes a baseDir written with slashes or a leading dot', async () => {
    await tsconfig('{ "paths": { "@/*": ["./*"] } }');
    expect((await assertUsableProject(dir, './src/')).aliasRoot).toBe('src');
    expect((await assertUsableProject(dir, '.')).aliasRoot).toBe('');
  });
});

describe('project validation', () => {
  it('rejects a directory with no package.json', async () => {
    await fs.rm(path.join(dir, 'package.json'));
    await expect(assertUsableProject(dir)).rejects.toThrow(/no package\.json/i);
  });

  it('rejects a project that is not React Native', async () => {
    await fs.writeFile(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'app', dependencies: { next: '^15.0.0' } })
    );
    await tsconfig('{ "paths": { "@/*": ["./*"] } }');
    await expect(assertUsableProject(dir)).rejects.toThrow(
      /React Native or Expo/i
    );
  });
});
