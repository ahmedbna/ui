import { execSync } from 'child_process';
import { detect, getUserAgent } from 'package-manager-detector';
import { logger } from './logger.js';
import { createSpinner, failSpinner, succeedSpinner } from './theme.js';

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

const SUPPORTED = new Set<PackageManager>(['npm', 'yarn', 'pnpm', 'bun']);

/** Narrow whatever the detector reports to a manager we can drive. */
function asSupported(name: string | null | undefined): PackageManager | null {
  return name && SUPPORTED.has(name as PackageManager)
    ? (name as PackageManager)
    : null;
}

/** The `--npm` / `--yarn` / `--pnpm` / `--bun` flags every command accepts. */
export interface PackageManagerFlags {
  npm?: boolean;
  yarn?: boolean;
  pnpm?: boolean;
  bun?: boolean;
}

export interface PackageManagerChoice {
  manager: PackageManager;
  /** `flag` when the user asked for it, `detected` when we inferred it. */
  source: 'flag' | 'detected';
}

/**
 * Which package manager to install with.
 *
 * Precedence, in order:
 *
 *   1. An explicit flag.
 *   2. `packageManager` in the project's `components.json`.
 *   3. How this process was launched — `npx`, `pnpm dlx`, `bunx`. Usually the
 *      only signal available to `init`, where the project does not exist yet.
 *   4. The project's own lockfile or `packageManager` field. This is what the
 *      hand-rolled detection never looked at, so `bna-ui add` inside a pnpm
 *      project could install with npm and leave a stray package-lock.json.
 *   5. npm.
 *
 * Reports *how* it decided rather than logging, because the scaffold commands
 * announce a detected manager while `add` stays quiet.
 */
export async function resolvePackageManager(
  flags: PackageManagerFlags,
  cwd: string = process.cwd(),
  /** From `components.json`. Loses to a flag, beats every detected signal. */
  configured?: PackageManager
): Promise<PackageManagerChoice> {
  if (flags.npm) return { manager: 'npm', source: 'flag' };
  if (flags.yarn) return { manager: 'yarn', source: 'flag' };
  if (flags.pnpm) return { manager: 'pnpm', source: 'flag' };
  if (flags.bun) return { manager: 'bun', source: 'flag' };

  const fromConfig = asSupported(configured);
  if (fromConfig) return { manager: fromConfig, source: 'flag' };

  const fromInvocation = asSupported(getUserAgent());
  if (fromInvocation) return { manager: fromInvocation, source: 'detected' };

  const fromProject = asSupported((await detect({ cwd }))?.name);
  if (fromProject) return { manager: fromProject, source: 'detected' };

  return { manager: 'npm', source: 'detected' };
}

export function getInstallCommand(packageManager: PackageManager): string {
  switch (packageManager) {
    case 'yarn':
      return 'yarn install';
    case 'pnpm':
      return 'pnpm install';
    case 'bun':
      return 'bun install';
    default:
      return 'npm install';
  }
}

export function getRunCommand(
  packageManager: PackageManager,
  script: string
): string {
  switch (packageManager) {
    case 'yarn':
      return `yarn ${script}`;
    case 'pnpm':
      return `pnpm ${script}`;
    case 'bun':
      return `bun run ${script}`;
    default:
      return `npm run ${script}`;
  }
}

export async function installDependencies(
  projectPath: string,
  packageManager: PackageManager
): Promise<void> {
  const installCommand = getInstallCommand(packageManager);

  const spinner = createSpinner(
    `Installing dependencies with ${packageManager}...`
  ).start();

  try {
    execSync(installCommand, {
      cwd: projectPath,
      stdio: 'pipe',
      timeout: 300000, // 5 minutes timeout
    });
    succeedSpinner(spinner, 'Dependencies installed successfully!');
  } catch (error) {
    failSpinner(spinner, 'Failed to install dependencies');
    logger.error('Installation error:', error);
    throw error;
  }
}

export function validatePackageManager(pm: string): pm is PackageManager {
  return ['npm', 'yarn', 'pnpm', 'bun'].includes(pm);
}
