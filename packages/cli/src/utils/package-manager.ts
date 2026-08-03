import { execSync } from 'child_process';
import { detect, getUserAgent } from 'package-manager-detector';
import { CliError } from './errors.js';
import { logger } from './logger.js';
import { createSpinner, failSpinner, succeedSpinner, theme } from './theme.js';

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

/**
 * The environment an install subprocess runs in.
 *
 * Yarn 2+ turns `enableImmutableInstalls` on whenever `CI` is set, and an
 * immutable install refuses to create or modify a lockfile. But a project
 * `init` has just scaffolded has no lockfile at all — the very install being
 * refused is the one that would write it — so `bna-ui init --yarn` failed with
 * YN0028 on every CI runner and inside every container, and `bna-ui add`'s
 * `yarn add` hit the same guard for the same reason.
 *
 * Only yarn is touched: npm, pnpm and bun all create a missing lockfile without
 * complaint, and nothing here should be quietly relaxing a user's `--frozen`
 * intent for a manager that never had a problem.
 */
export function installEnv(
  packageManager: PackageManager
): typeof process.env | undefined {
  if (packageManager !== 'yarn') return undefined;
  return { ...process.env, YARN_ENABLE_IMMUTABLE_INSTALLS: 'false' };
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

/**
 * What the package manager itself said, if anything.
 *
 * `execSync` runs with `stdio: 'pipe'` so the spinner is not fighting an
 * install's progress output for the same line, which means the only account of
 * *why* an install failed is on the thrown error. npm and pnpm both put the
 * diagnosis on stderr; bun puts some of it on stdout.
 */
function childOutput(error: unknown): string {
  const { stderr, stdout } = (error ?? {}) as {
    stderr?: Buffer | string;
    stdout?: Buffer | string;
  };
  return [stderr, stdout]
    .map((stream) => stream?.toString().trim())
    .filter(Boolean)
    .join('\n');
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
      env: installEnv(packageManager),
      timeout: 300000, // 5 minutes timeout
    });
    succeedSpinner(spinner, 'Dependencies installed successfully!');
  } catch (error) {
    failSpinner(spinner, `\`${installCommand}\` failed`);

    // The project is already on disk and every file is correct — only the
    // install did not finish. Printing what the package manager said, rather
    // than a raw Error object, is the difference between a fixable message and
    // a stack trace: this is the path a registry outage, a peer conflict or a
    // read-only cache surfaces on.
    const output = childOutput(error);
    if (output) logger.plain(theme.dim(output));

    throw new CliError(`Could not install dependencies in ${projectPath}.`, {
      hint: `Run \`${installCommand}\` there to see the full output.`,
      cause: error,
    });
  }
}

export function validatePackageManager(pm: string): pm is PackageManager {
  return ['npm', 'yarn', 'pnpm', 'bun'].includes(pm);
}
