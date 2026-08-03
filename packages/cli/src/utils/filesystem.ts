/**
 * Filesystem helpers, on `node:fs/promises`.
 *
 * `fs-extra` used to provide these. Every one of its APIs the CLI reached for —
 * `ensureDir`, `copy`, `move`, `remove`, `pathExists`, `readJson`, `writeJson` —
 * has a native equivalent on the supported Node range, so it and its three
 * transitive dependencies are gone.
 *
 * Only the most basic primitives, at that. `copy` is hand-rolled below rather
 * than delegated to `fs.cp`, because this module has to run under Bun as well
 * as Node — see `copyDir`.
 */
import fs from 'fs/promises';
import path from 'path';
import { CliError } from './errors.js';

/**
 * Files and directories stored under a dot-less name in the package because npm
 * refuses to publish them verbatim, and restored to their real name on
 * scaffold.
 *
 * npm deletes exactly four names from a tarball, at any depth and without
 * warning: `.gitignore`, `.npmrc`, `.npmignore` and `.DS_Store`. Shipping one
 * as-is meant every `bna-ui init` produced a project with no `.gitignore` at
 * all. The first three are wanted in a scaffold and are mapped here; `.DS_Store`
 * is never wanted and is in the skip list below instead.
 *
 * `github` has a second reason: the skip list below drops anything named
 * `.git`, which a literal `.github/` would trip. Storing it dot-less gets it
 * past the skip, and this map puts the dot back. `env.example` survives npm
 * untouched and is here only so starters keep one convention.
 *
 * Top-level only — every entry here sits at the root of a scaffold. A nested
 * `.gitignore` would still be stripped with no way back, which is why the
 * starters build refuses to publish one (see `assertPublishable`).
 */
const RENAME_ON_SCAFFOLD: Record<string, string> = {
  gitignore: '.gitignore',
  npmrc: '.npmrc',
  npmignore: '.npmignore',
  'env.example': '.env.example',
  github: '.github',
};

/**
 * Build artefacts and VCS internals that must never land in a new project.
 *
 * Matched against a whole path segment, never as a substring: the original
 * `/node_modules|\.git|dist|build/` test ran against the entire relative path,
 * so a perfectly ordinary `app/(tabs)/dashboard/` or `components/rebuild.tsx`
 * was silently dropped from the scaffold.
 *
 * `.DS_Store` is here for the local path only. npm strips it from tarballs, so
 * a published scaffold could never carry one — but the CLI is also run straight
 * from a checkout (CI's e2e job, and the registry testing flow in CLAUDE.md),
 * and a maintainer who opened `packages/starters/` in Finder would otherwise
 * stamp their Finder state into every project scaffolded from it.
 *
 * Every *other* dotfile is copied. Only names listed here are dropped, so a
 * starter is free to ship `.vscode/`, `.watchmanconfig` or `.editorconfig`.
 */
const SKIP_SEGMENTS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.DS_Store',
]);

export async function pathExists(target: string): Promise<boolean> {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

/**
 * Copies one directory tree, applying the skip list and the top-level renames.
 *
 * Deliberately hand-rolled on `readdir`/`mkdir`/`copyFile` rather than
 * `fs.cp(…, { recursive: true, filter })`. `fs.cp` is the obvious call, but its
 * `filter` callback has to re-enter JS for every entry, and runtimes that
 * implement `node:fs` natively have not always carried it — Bun, which `bunx
 * --bun bna-ui init` runs the CLI under, either threw or silently ignored the
 * filter depending on the release. Ignoring it is the worse outcome: this list
 * is the only thing keeping `node_modules` out of a fresh project. The four
 * primitives below have been present in every Node and Bun release.
 *
 * A scaffold is 44–91 files, so awaiting a directory's entries together is all
 * the parallelism this needs.
 */
async function copyDir(
  src: string,
  dest: string,
  depth: number
): Promise<void> {
  await fs.mkdir(dest, { recursive: true });

  const entries = await fs.readdir(src, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      if (SKIP_SEGMENTS.has(entry.name)) return;

      // Renames are top-level only, and keyed on the *source* name — `github`
      // has not become `.github` yet, so it is still past the `.git` skip above.
      const target =
        depth === 0
          ? (RENAME_ON_SCAFFOLD[entry.name] ?? entry.name)
          : entry.name;

      const from = path.join(src, entry.name);
      const to = path.join(dest, target);

      if (entry.isDirectory()) {
        await copyDir(from, to, depth + 1);
      } else if (entry.isSymbolicLink()) {
        await fs.symlink(await fs.readlink(from), to);
      } else {
        await fs.copyFile(from, to);
      }
    })
  );
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
    await copyDir(templatePath, targetPath, 0);
  } catch (error) {
    if (error instanceof CliError) throw error;
    throw new CliError('Could not copy the project template.', {
      cause: error,
      // A missing `fs` primitive is the runtime's doing, not the template's.
      hint: process.versions.bun
        ? 'Running under Bun. Try `bun upgrade`, or drop `--bun` from `bunx` to scaffold with Node.'
        : undefined,
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
