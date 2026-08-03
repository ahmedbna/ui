import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getInstallCommand,
  getRunCommand,
  installEnv,
  resolvePackageManager,
} from '../src/utils/package-manager.js';

let dir: string;

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'bna-pm-'));
  // Neutralise the ambient agent so detection order is what is under test.
  vi.stubEnv('npm_config_user_agent', '');
});

afterEach(async () => {
  vi.unstubAllEnvs();
  await fs.rm(dir, { recursive: true, force: true });
});

describe('resolvePackageManager', () => {
  it('lets an explicit flag win, and says so', async () => {
    for (const manager of ['npm', 'yarn', 'pnpm', 'bun'] as const) {
      expect(await resolvePackageManager({ [manager]: true }, dir)).toEqual({
        manager,
        source: 'flag',
      });
    }
  });

  it('prefers a flag over the configured manager', async () => {
    expect(await resolvePackageManager({ npm: true }, dir, 'pnpm')).toEqual({
      manager: 'npm',
      source: 'flag',
    });
  });

  it('uses the configured manager when no flag was passed', async () => {
    expect(await resolvePackageManager({}, dir, 'yarn')).toEqual({
      manager: 'yarn',
      source: 'flag',
    });
  });

  it('reads how the process was invoked', async () => {
    vi.stubEnv(
      'npm_config_user_agent',
      'pnpm/9.1.0 npm/? node/v22.12.0 darwin arm64'
    );
    expect(await resolvePackageManager({}, dir)).toEqual({
      manager: 'pnpm',
      source: 'detected',
    });
  });

  it("falls back to the project's lockfile", async () => {
    // The signal the hand-rolled detection never looked at, which is how
    // `add` in a pnpm project could install with npm.
    await fs.writeFile(
      path.join(dir, 'pnpm-lock.yaml'),
      'lockfileVersion: 9\n'
    );
    expect(await resolvePackageManager({}, dir)).toEqual({
      manager: 'pnpm',
      source: 'detected',
    });
  });

  it('reads the packageManager field', async () => {
    await fs.writeFile(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'x', packageManager: 'yarn@4.1.0' })
    );
    expect((await resolvePackageManager({}, dir)).manager).toBe('yarn');
  });

  it('lands on npm when there is no signal at all', async () => {
    expect(await resolvePackageManager({}, dir)).toEqual({
      manager: 'npm',
      source: 'detected',
    });
  });
});

describe('command builders', () => {
  it('spells out install for every manager', () => {
    // `yarn` alone is also valid, but three scaffold commands inlined a ternary
    // that printed the bare form while this helper printed `yarn install`.
    expect(getInstallCommand('yarn')).toBe('yarn install');
    expect(getInstallCommand('npm')).toBe('npm install');
    expect(getInstallCommand('pnpm')).toBe('pnpm install');
    expect(getInstallCommand('bun')).toBe('bun install');
  });

  it('uses each manager’s own run syntax', () => {
    expect(getRunCommand('npm', 'start')).toBe('npm run start');
    expect(getRunCommand('yarn', 'start')).toBe('yarn start');
    expect(getRunCommand('pnpm', 'start')).toBe('pnpm start');
    expect(getRunCommand('bun', 'start')).toBe('bun run start');
  });
});

describe('installEnv', () => {
  it('lets yarn write the lockfile it is about to create', () => {
    // Yarn 2+ reads CI as a request for an immutable install, and a project
    // `init` has just written has no lockfile to be immutable against — every
    // `bna-ui init --yarn` on a runner died on YN0028.
    vi.stubEnv('CI', 'true');
    expect(installEnv('yarn')).toMatchObject({
      YARN_ENABLE_IMMUTABLE_INSTALLS: 'false',
    });
  });

  it('inherits the ambient environment for every other manager', () => {
    // `undefined` is execSync's own default, so these spawn exactly as before.
    expect(installEnv('npm')).toBeUndefined();
    expect(installEnv('pnpm')).toBeUndefined();
    expect(installEnv('bun')).toBeUndefined();
  });
});
