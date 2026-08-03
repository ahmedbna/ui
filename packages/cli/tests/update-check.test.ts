import { afterEach, describe, expect, it, vi } from 'vitest';
import { __internals } from '../src/utils/update-check.js';

const { isNewer, shouldCheck } = __internals;

/**
 * `shouldCheck` reads the environment, `process.stdout.isTTY` and `argv`, none
 * of which vitest gives us by default — the runner is not a TTY and sets
 * `NODE_ENV=test`, both of which short-circuit the function. So each case
 * builds the "would notify" baseline and then changes one thing.
 */
function withRunner(argv1: string, env: Record<string, string> = {}) {
  vi.stubEnv('NODE_ENV', 'production');
  vi.stubEnv('CI', '');
  vi.stubEnv('NO_UPDATE_NOTIFIER', '');
  vi.stubEnv('npm_config_user_agent', '');
  vi.stubEnv('npm_execpath', '');
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);

  vi.stubGlobal('process', {
    ...process,
    argv: [process.argv[0] ?? 'node', argv1],
    stdout: { ...process.stdout, isTTY: true },
    env: process.env,
  });

  return shouldCheck();
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('shouldCheck', () => {
  it('notifies a global install', () => {
    expect(withRunner('/usr/local/lib/node_modules/bna-ui/bin/bna-ui.js')).toBe(
      true
    );
  });

  it('notifies a project-local install', () => {
    expect(withRunner('/home/me/app/node_modules/.bin/bna-ui')).toBe(true);
  });

  // bunx sets neither npm_config_user_agent nor npm_execpath, so the install
  // path is the only signal. Without it every `bunx --bun bna-ui init` ended
  // with a banner telling the user to `npm install -g` a package bunx had just
  // resolved to latest.
  it('stays quiet under bunx', () => {
    expect(
      withRunner(
        '/private/tmp/bna-ui@latest--bunx/node_modules/bna-ui/bin/bna-ui.js'
      )
    ).toBe(false);
  });

  it('stays quiet under npx', () => {
    expect(withRunner('/home/me/.npm/_npx/a1b2/node_modules/.bin/bna-ui')).toBe(
      false
    );
  });

  it('stays quiet under pnpm dlx', () => {
    expect(
      withRunner('/home/me/.cache/pnpm/dlx/9f3c/node_modules/.bin/bna-ui')
    ).toBe(false);
  });

  it('still honours the user agent when argv says nothing', () => {
    expect(
      withRunner('/usr/local/bin/bna-ui', {
        npm_config_user_agent: 'npm/10.8.2 npx/10.8.2 node/v22.19.0',
      })
    ).toBe(false);
  });

  it('respects NO_UPDATE_NOTIFIER', () => {
    expect(
      withRunner('/usr/local/bin/bna-ui', { NO_UPDATE_NOTIFIER: '1' })
    ).toBe(false);
  });

  it('stays quiet in CI', () => {
    expect(withRunner('/usr/local/bin/bna-ui', { CI: 'true' })).toBe(false);
  });
});

describe('isNewer', () => {
  it('compares numerically, not lexically', () => {
    // The reason this exists rather than a `semver` dependency: '1.2.10' sorts
    // before '1.2.9' as a string.
    expect(isNewer('1.2.10', '1.2.9')).toBe(true);
    expect(isNewer('1.2.9', '1.2.10')).toBe(false);
  });

  it('handles differing segment counts and prereleases', () => {
    expect(isNewer('4.1', '4.0.9')).toBe(true);
    expect(isNewer('4.0.0', '4.0.0')).toBe(false);
    expect(isNewer('4.1.0-beta.1', '4.0.0')).toBe(true);
  });

  it('refuses to compare nonsense', () => {
    expect(isNewer('not-a-version', '4.0.0')).toBe(false);
  });
});
