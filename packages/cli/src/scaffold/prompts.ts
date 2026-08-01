/**
 * Deciding where a new project goes.
 *
 * All three scaffold commands asked this the same way and each inlined its own
 * shorter `safeFiles` list, while `validateCurrentDirectory()` — with the
 * better list, including lockfiles and `.npmrc` — sat unused in
 * `utils/validation.ts`.
 */
import path from 'path';
import { CliError, cancelled } from '../utils/errors.js';
import { logger } from '../utils/logger.js';
import { confirm, input } from '../utils/prompts.js';
import { theme } from '../utils/theme.js';
import {
  sanitizeProjectName,
  validateCurrentDirectory,
  validateProjectName,
  validateProjectPath,
} from '../utils/validation.js';

export interface ScaffoldTarget {
  projectName: string;
  projectPath: string;
  inPlace: boolean;
}

async function promptForName(defaultName: string): Promise<string> {
  return input({
    message: 'What is your project name?',
    default: defaultName,
    validate: (value: string) => {
      // `.` means "here", which is not a package name but is a valid answer.
      if (value.trim() === '.') return true;
      const validation = validateProjectName(value);
      return validation.valid || validation.message || 'Invalid project name';
    },
  });
}

/** Scaffolding into the cwd, which may already hold files. */
async function resolveInPlace(defaultName: string): Promise<ScaffoldTarget> {
  const projectPath = process.cwd();
  const directoryName = path.basename(projectPath);

  // The directory name becomes the package name, and directory names are not
  // bound by npm's rules — so fall back to asking rather than failing.
  let projectName = directoryName;
  const validation = validateProjectName(directoryName);
  if (!validation.valid) {
    logger.warn(
      `"${directoryName}" is not a valid package name: ${validation.message}`
    );
    projectName = await promptForName(defaultName);
  }

  const state = validateCurrentDirectory();
  if (!state.valid) {
    logger.warn('This directory is not empty. Found:');
    for (const file of state.conflictingFiles ?? []) {
      logger.plain(theme.dim(`  ${file}`));
    }

    const proceed = await confirm({
      message: 'Continue anyway?',
      default: false,
    });
    if (!proceed) throw cancelled('Nothing was created.');
  }

  return {
    projectName: sanitizeProjectName(projectName),
    projectPath,
    inPlace: true,
  };
}

/**
 * Resolve the project name and directory, prompting only when needed.
 *
 * Passing a name argument must stay a zero-prompt path: CI drives
 * `bna-ui init app --skip-install` with no TTY.
 */
export async function resolveTarget(
  projectName: string | undefined,
  defaultName: string
): Promise<ScaffoldTarget> {
  const requested = projectName ?? (await promptForName(defaultName));

  if (requested.trim() === '.') return resolveInPlace(defaultName);

  // Sanitize first, then validate the result. The old order validated the raw
  // input and exited, so `bna-ui init "My Cool App"` failed outright and
  // `sanitizeProjectName` only ever ran on names that were already valid —
  // meaning its lowercasing could never fire. Folding the name is friendlier,
  // and it also flattens `../../etc` into a plain segment.
  const sanitized = sanitizeProjectName(requested);

  if (!sanitized) {
    throw new CliError(`"${requested}" has no usable characters for a name.`, {
      hint: 'Project names follow npm package rules: lowercase letters, digits and dashes.',
    });
  }

  const validation = validateProjectName(sanitized);
  if (!validation.valid) {
    throw new CliError(validation.message ?? 'Invalid project name.', {
      hint: 'Project names follow npm package rules: lowercase letters, digits and dashes.',
    });
  }

  if (sanitized !== requested) {
    // Silently renaming the user's project is worse than saying so.
    logger.info(`Using ${theme.code(sanitized)} as the project name.`);
  }

  const projectPath = path.resolve(process.cwd(), sanitized);
  const pathValidation = validateProjectPath(projectPath);
  if (!pathValidation.valid) {
    throw new CliError(
      pathValidation.message ?? 'That directory already exists.',
      {
        hint: `Pick another name, or scaffold into it with \`cd ${sanitized} && bna-ui init .\``,
      }
    );
  }

  return { projectName: sanitized, projectPath, inPlace: false };
}
