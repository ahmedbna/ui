/**
 * `components.json` — per-project CLI settings.
 *
 * Optional by design. Every command works without one, on the same defaults it
 * used before this file existed; the config only removes repetition (`add`
 * having to be told `--registry` every time) and makes install targets
 * relocatable.
 */
import path from 'path';
import { CliError } from './errors.js';
import { pathExists, readJson, writeJson } from './filesystem.js';
import type { PackageManager } from './package-manager.js';

export const CONFIG_FILENAME = 'components.json';

export interface ComponentsConfig {
  $schema?: string;
  /** Registry to fetch from. Overridden by `--registry`. */
  registry?: string;
  /**
   * The directory `@/` points at, relative to the project root.
   *
   * Normally read from `tsconfig.json`'s `@/*` mapping. Set this only when that
   * reading is wrong — an alias declared in an extended base config, say.
   */
  baseDir?: string;
  /**
   * Where each kind of file lands, relative to the `@/` alias root.
   *
   * Registry payloads carry a `target` like `components/ui/button.tsx`. These
   * remap the leading directory — and `add` rewrites the matching import
   * specifiers in the copied source, so the files still resolve afterwards.
   *
   * Note these are *not* project-root-relative. In a project whose `@/*` maps
   * to `./src/*`, components already land under `src/`; naming this
   * `src/components` would nest them twice.
   */
  aliases?: {
    components?: string;
    hooks?: string;
    providers?: string;
    theme?: string;
    lib?: string;
  };
  packageManager?: PackageManager;
}

export const DEFAULT_ALIASES = {
  components: 'components',
  hooks: 'hooks',
  providers: 'providers',
  theme: 'theme',
  lib: 'lib',
} as const;

export type AliasKind = keyof typeof DEFAULT_ALIASES;

const ALIAS_KINDS = Object.keys(DEFAULT_ALIASES) as AliasKind[];

export function configPath(projectPath: string): string {
  return path.join(projectPath, CONFIG_FILENAME);
}

/** Returns null when the project has no config, which is not an error. */
export async function readConfig(
  projectPath: string
): Promise<ComponentsConfig | null> {
  const file = configPath(projectPath);
  if (!(await pathExists(file))) return null;

  try {
    return await readJson<ComponentsConfig>(file);
  } catch (error) {
    throw new CliError(`${CONFIG_FILENAME} is not valid JSON.`, {
      hint: `Fix or delete ${file} and run again.`,
      cause: error,
    });
  }
}

export async function writeConfig(
  projectPath: string,
  config: ComponentsConfig
): Promise<void> {
  await writeJson(configPath(projectPath), {
    $schema: 'https://ui.ahmedbna.com/schema.json',
    ...config,
  });
}

/**
 * Drops a redundant alias root from alias values written before they were
 * `@/`-relative.
 *
 * `{ components: 'src/components' }` in a project whose `@/*` maps to `./src/*`
 * meant "put components under src/" when the CLI ignored that mapping. Now that
 * it does not, honouring the value literally would nest them twice. Reports the
 * kinds it touched so the caller can say so once.
 */
export function normalizeAliases(
  aliases: ComponentsConfig['aliases'],
  aliasRoot: string
): { aliases: ComponentsConfig['aliases']; legacy: AliasKind[] } {
  if (!aliases || !aliasRoot) return { aliases, legacy: [] };

  const prefix = `${aliasRoot}/`;
  const normalized: ComponentsConfig['aliases'] = {};
  const legacy: AliasKind[] = [];

  for (const kind of ALIAS_KINDS) {
    const value = aliases[kind];
    if (value === undefined) continue;

    if (value.startsWith(prefix)) {
      normalized[kind] = value.slice(prefix.length);
      legacy.push(kind);
    } else {
      normalized[kind] = value;
    }
  }

  return { aliases: normalized, legacy };
}

/**
 * The import specifiers a shipped file can make, anchored on the opening quote.
 *
 * The registry freezes these at build time (`fixImport` in its `build.ts`), so
 * relocating a file without rewriting them leaves it importing a path that no
 * longer exists.
 */
const IMPORT_SPECIFIER = /(['"])@\/(components|hooks|providers|theme|lib)\//g;

/**
 * Repoints a file's own imports at the project's aliases.
 *
 * One pass, so a value that happens to equal another kind's default —
 * `{ components: 'hooks' }` — is written in and never rescanned.
 */
export function rewriteImports(
  content: string,
  aliases: ComponentsConfig['aliases']
): string {
  if (!aliases) return content;

  const remapped = new Map<string, string>();
  for (const kind of ALIAS_KINDS) {
    const value = aliases[kind];
    if (value && value !== DEFAULT_ALIASES[kind]) remapped.set(kind, value);
  }
  // The overwhelmingly common case: nothing to do, and the content stays the
  // exact string the registry served.
  if (remapped.size === 0) return content;

  return content.replace(IMPORT_SPECIFIER, (match, quote: string, kind) => {
    const alias = remapped.get(kind as string);
    return alias ? `${quote}@/${alias}/` : match;
  });
}

/**
 * Rewrites a payload's target through the project's aliases.
 *
 * Only the first path segment is remapped, and only when it is one we know:
 * `components/ui/button.tsx` follows `aliases.components`, but the `ui/`
 * beneath it is part of the registry's own layout and stays put. The result is
 * relative to the `@/` alias root, not to the project root.
 */
export function applyAliases(
  target: string,
  aliases: ComponentsConfig['aliases']
): string {
  if (!aliases) return target;

  const segments = target.split('/');
  const [head, ...rest] = segments;
  if (!head || rest.length === 0) return target;

  const mapped = aliases[head as keyof typeof DEFAULT_ALIASES];
  if (!mapped || mapped === head) return target;

  return [mapped, ...rest].join('/');
}
