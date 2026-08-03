// src/utils/registry.ts
import path from 'path';
import { CliError } from './errors.js';
import { pathExists, readFile, readJson } from './filesystem.js';
import { logger } from './logger.js';

/**
 * Everything that used to live here — dependency resolution, conflict
 * detection over the registry graph, template reads off disk — moved to the
 * registry itself. The CLI now receives a flattened, self-contained payload
 * from `ui.ahmedbna.com/r/<name>.json`, so all that remains is verifying the
 * target project before writing into it.
 */

/** Strip `//` and block comments so a commented tsconfig still parses. */
function parseJsonc(text: string): unknown {
  const withoutComments = text
    .replace(
      /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
      (match, comment) => (comment ? ' ' : match)
    )
    // Trailing commas are legal in tsconfig and fatal to JSON.parse.
    .replace(/,(\s*[}\]])/g, '$1');
  return JSON.parse(withoutComments);
}

/** Where a project's `@/` alias points, and how we worked that out. */
export interface ProjectPaths {
  /**
   * The directory `@/` resolves to, relative to the project root, with `/`
   * separators and no trailing slash. `''` means the project root itself.
   */
  aliasRoot: string;
  source: 'tsconfig.json' | 'jsconfig.json' | 'components.json' | 'default';
}

const ALIAS_KEY = '@/*';

/** `'./src/*'` relative to `base` → `'src'`; `'./*'` → `''`. */
function toAliasRoot(
  projectPath: string,
  base: string,
  mapping: string
): string | null {
  const withoutGlob = mapping.replace(/\/?\*$/, '');
  const absolute = path.resolve(base, withoutGlob);
  const relative = path.relative(projectPath, absolute);

  // A mapping that climbs out of the project would send every write somewhere
  // the user did not ask for. Refuse it rather than follow it.
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;

  return relative.split(path.sep).filter(Boolean).join('/');
}

/**
 * Reads the `@/*` mapping out of `tsconfig.json`, falling back to
 * `jsconfig.json`.
 *
 * Every shipped component imports through `@/components/ui/...`,
 * `@/hooks/...` and `@/theme/...`, and the registry freezes those specifiers at
 * build time. So the mapping is not merely a validity check — it is the only
 * thing that says where the files belong. A project with `"@/*": ["./src/*"]`
 * needs them under `src/`, and writing them at the root instead produces
 * perfectly good files that cannot resolve, a failure that surfaces later as a
 * wall of Metro errors with nothing pointing back at this command.
 *
 * Returns `null` when no config declares the alias at all, which is fatal;
 * `undefined` when a config exists but could not be parsed, which is not.
 */
async function readAliasRoot(
  projectPath: string
): Promise<ProjectPaths | null | undefined> {
  for (const name of ['tsconfig.json', 'jsconfig.json'] as const) {
    const configPath = path.join(projectPath, name);
    if (!(await pathExists(configPath))) continue;

    let config: {
      compilerOptions?: { baseUrl?: unknown; paths?: Record<string, unknown> };
    };
    try {
      config = parseJsonc(await readFile(configPath)) as typeof config;
    } catch {
      // An unparseable config is not proof the alias is missing; say nothing
      // rather than block the install on our own parser.
      return undefined;
    }

    const mappings = config.compilerOptions?.paths?.[ALIAS_KEY];
    if (!Array.isArray(mappings)) continue;

    // TypeScript resolves a non-relative mapping against `baseUrl` when one is
    // set, and against the config's own directory otherwise.
    const baseUrl = config.compilerOptions?.baseUrl;
    const base =
      typeof baseUrl === 'string'
        ? path.resolve(projectPath, baseUrl)
        : projectPath;

    // Only the first mapping is honoured. Later entries are fallbacks for
    // resolution, and picking one to write into would be a guess.
    const first = mappings.find((entry) => typeof entry === 'string');
    if (typeof first !== 'string') continue;

    const aliasRoot = toAliasRoot(projectPath, base, first);
    if (aliasRoot === null) {
      logger.warn(
        `${name} maps ${ALIAS_KEY} outside the project — installing at the project root instead.`
      );
      return { aliasRoot: '', source: 'default' };
    }

    return { aliasRoot, source: name };
  }

  return null;
}

/**
 * Throws unless `projectPath` is somewhere components can actually be written,
 * and reports where under it they go.
 *
 * `baseDirOverride` comes from `components.json`; it wins outright, for the
 * projects whose alias lives in an extended base config or whose tsconfig we
 * otherwise read wrong.
 */
export async function assertUsableProject(
  projectPath: string,
  baseDirOverride?: string
): Promise<ProjectPaths> {
  const packageJsonPath = path.join(projectPath, 'package.json');

  if (!(await pathExists(packageJsonPath))) {
    throw new CliError('No package.json here.', {
      hint: 'Run this inside your app, or scaffold one first with `bna-ui init <name>`.',
    });
  }

  let packageJson: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  try {
    packageJson = await readJson(packageJsonPath);
  } catch (error) {
    throw new CliError('Could not read package.json.', {
      hint: 'It may be malformed — check that it is valid JSON.',
      cause: error,
    });
  }

  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (!deps['react-native'] && !deps['expo']) {
    throw new CliError(
      "This doesn't look like a React Native or Expo project.",
      {
        hint: 'BNA UI components are React Native. Start one with `bna-ui init <name>`.',
      }
    );
  }

  if (baseDirOverride !== undefined) {
    const aliasRoot = baseDirOverride
      .split(/[\\/]/)
      .filter((segment) => segment && segment !== '.')
      .join('/');
    return { aliasRoot, source: 'components.json' };
  }

  const resolved = await readAliasRoot(projectPath);

  if (resolved === null) {
    throw new CliError('Your tsconfig.json has no `@/*` path alias.', {
      hint:
        'Components import through `@/components/ui/...`, so add this to compilerOptions and run again:\n' +
        '    "paths": { "@/*": ["./*"] }        // components at the project root\n' +
        '    "paths": { "@/*": ["./src/*"] }    // components under src/',
    });
  }

  return resolved ?? { aliasRoot: '', source: 'default' };
}
