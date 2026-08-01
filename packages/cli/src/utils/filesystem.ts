/**
 * Filesystem helpers, on `node:fs/promises`.
 *
 * `fs-extra` used to provide these. Every one of its APIs the CLI reached for —
 * `ensureDir`, `copy`, `move`, `remove`, `pathExists`, `readJson`, `writeJson` —
 * has a native equivalent on the supported Node range, so it and its three
 * transitive dependencies are gone.
 */
import fs from 'fs/promises';
import path from 'path';
import { CliError } from './errors.js';

/**
 * Files and directories stored under a dot-less name in the package because npm
 * refuses to publish them verbatim, and restored to their real name on
 * scaffold.
 *
 * npm strips `.gitignore` from tarballs entirely, so shipping one as-is meant
 * every `bna-ui init` produced a project with no `.gitignore` at all.
 *
 * `github` has a second reason: the copy filter below skips anything under a
 * `.git` directory, which a literal `.github/` would trip. Storing it dot-less
 * gets it past the filter, and this map puts the dot back.
 *
 * Top-level only — every entry here sits at the root of a scaffold.
 */
const RENAME_ON_SCAFFOLD: Record<string, string> = {
  gitignore: '.gitignore',
  npmrc: '.npmrc',
  'env.example': '.env.example',
  github: '.github',
};

/** Build artefacts and VCS internals that must never land in a new project. */
const SKIP_SEGMENTS = new Set(['node_modules', '.git', 'dist', 'build']);

/**
 * True when any path segment is one we refuse to copy.
 *
 * Matched per segment rather than as a substring: the previous
 * `/node_modules|\.git|dist|build/` test ran against the whole relative path,
 * so a perfectly ordinary `app/(tabs)/dashboard/` or `components/rebuild.tsx`
 * was silently dropped from the scaffold.
 */
function shouldSkip(relativePath: string): boolean {
  if (!relativePath) return false;
  return relativePath
    .split(path.sep)
    .some((segment) => SKIP_SEGMENTS.has(segment));
}

export async function pathExists(target: string): Promise<boolean> {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

export async function copyTemplate(
  templatePath: string,
  targetPath: string
): Promise<void> {
  if (!(await pathExists(templatePath))) {
    throw new CliError(`Template not found: ${path.basename(templatePath)}`, {
      hint: 'The bna-ui install may be incomplete — try reinstalling it.',
    });
  }

  try {
    await fs.mkdir(targetPath, { recursive: true });
    await fs.cp(templatePath, targetPath, {
      recursive: true,
      filter: (src) => !shouldSkip(path.relative(templatePath, src)),
    });

    for (const [from, to] of Object.entries(RENAME_ON_SCAFFOLD)) {
      const src = path.join(targetPath, from);
      if (await pathExists(src)) {
        await fs.rename(src, path.join(targetPath, to));
      }
    }
  } catch (error) {
    if (error instanceof CliError) throw error;
    throw new CliError('Could not copy the project template.', {
      cause: error,
    });
  }
}

export async function writeFile(
  filePath: string,
  content: string
): Promise<void> {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, 'utf8');
  } catch (error) {
    throw new CliError(`Could not write ${filePath}`, { cause: error });
  }
}

export async function readFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    throw new CliError(`Could not read ${filePath}`, { cause: error });
  }
}

/** Throws on unreadable or malformed JSON; callers add the context. */
export async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await fs.readFile(filePath, 'utf8')) as T;
}

export async function writeJson(
  filePath: string,
  value: unknown
): Promise<void> {
  await writeFile(filePath, JSON.stringify(value, null, 2) + '\n');
}

export async function fileExists(filePath: string): Promise<boolean> {
  return pathExists(filePath);
}

export async function createDirectory(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    throw new CliError(`Could not create ${dirPath}`, { cause: error });
  }
}

export async function remove(target: string): Promise<void> {
  await fs.rm(target, { recursive: true, force: true });
}
