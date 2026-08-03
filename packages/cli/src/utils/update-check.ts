/**
 * "A newer bna-ui is available."
 *
 * Deliberately not the `update-notifier` package, which would add roughly ten
 * transitive dependencies and a background daemon to print one line. This
 * reuses the `~/.cache/bna-ui` directory the registry client already owns.
 *
 * Every failure is silent. A version check is never worth a warning, let alone
 * a non-zero exit.
 */
import os from 'os';
import path from 'path';
import { readJson, writeJson } from './filesystem.js';
import { logger } from './logger.js';
import { theme } from './theme.js';

const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 2000;
const PACKAGE_NAME = 'bna-ui';

interface UpdateCache {
  checkedAt: number;
  latest: string;
}

function cacheFile(): string {
  return path.join(os.homedir(), '.cache', 'bna-ui', 'update-check.json');
}

/**
 * Markers for a runner that re-resolves the package on every invocation.
 *
 * `npx` also covers npm's `_npx` cache directory, `--bunx` is the directory
 * `bunx` installs into (`/tmp/bna-ui@latest--bunx/`), and `dlx` covers both
 * `pnpm dlx` and `yarn dlx`.
 */
const EPHEMERAL_RUNNERS = ['npx', '--bunx', 'dlx'];

/**
 * Whether it is worth asking npm at all.
 *
 * `npx` and friends resolve the latest version on every run, so telling those
 * users to update is noise — the notice is for global and project-local
 * installs.
 *
 * Only `npm_config_user_agent` and `npm_execpath` used to be consulted, and
 * `bunx` sets neither. So `bunx --bun bna-ui init` — the documented way to run
 * this under bun — ended every scaffold with a banner telling the user to
 * `npm install -g bna-ui@latest`, which was both pointless and the wrong
 * package manager. `process.argv[1]` is the signal that actually survives:
 * every one of these runners executes the CLI out of a path it names.
 */
function shouldCheck(): boolean {
  if (process.env.NO_UPDATE_NOTIFIER) return false;
  if (process.env.CI) return false;
  if (process.env.NODE_ENV === 'test') return false;
  // Only a terminal can act on it.
  if (!process.stdout.isTTY) return false;

  const haystack = [
    process.env.npm_config_user_agent,
    process.env.npm_execpath,
    process.argv[1],
  ]
    .filter(Boolean)
    .join(' ');
  if (EPHEMERAL_RUNNERS.some((marker) => haystack.includes(marker))) {
    return false;
  }

  return true;
}

/** `1.2.10` > `1.2.9`, without pulling in semver. */
function isNewer(latest: string, current: string): boolean {
  const parse = (v: string) => v.split('-')[0]?.split('.').map(Number) ?? [];
  const a = parse(latest);
  const b = parse(current);

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const left = a[i] ?? 0;
    const right = b[i] ?? 0;
    if (Number.isNaN(left) || Number.isNaN(right)) return false;
    if (left !== right) return left > right;
  }
  return false;
}

async function readCachedVersion(): Promise<string | null> {
  try {
    const cached = await readJson<UpdateCache>(cacheFile());
    if (Date.now() - cached.checkedAt < CHECK_INTERVAL_MS) return cached.latest;
  } catch {
    // No cache, or an unreadable one. Either way, ask npm.
  }
  return null;
}

async function fetchLatestVersion(): Promise<string | null> {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/${PACKAGE_NAME}/latest`,
      {
        headers: { accept: 'application/vnd.npm.install-v1+json' },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      }
    );
    if (!response.ok) return null;

    const { version } = (await response.json()) as { version?: string };
    if (!version) return null;

    await writeJson(cacheFile(), {
      checkedAt: Date.now(),
      latest: version,
    } satisfies UpdateCache);

    return version;
  } catch {
    // Offline, slow, rate limited, or an unwritable home directory.
    return null;
  }
}

/**
 * Resolves the newest published version, or null.
 *
 * Separated from the printing so a caller can await it concurrently with the
 * command itself and print afterwards.
 */
export async function checkForUpdate(
  currentVersion: string
): Promise<string | null> {
  if (!shouldCheck()) return null;

  const latest = (await readCachedVersion()) ?? (await fetchLatestVersion());
  if (!latest || !isNewer(latest, currentVersion)) return null;

  return latest;
}

/** Printed after the command's own output, never before it. */
export function reportUpdate(current: string, latest: string): void {
  logger.newline();
  logger.plain(
    `  ${theme.badge('UPDATE')} ${theme.dim(current)} ${theme.dim('→')} ${theme.brand(latest)}`
  );
  logger.plain(
    `  ${theme.dim('Run')} ${theme.code(`npm install -g ${PACKAGE_NAME}@latest`)}`
  );
  logger.newline();
}

/** Exposed for tests. */
export const __internals = { isNewer, shouldCheck, cacheFile };
