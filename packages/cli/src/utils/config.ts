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
   * Where each kind of file lands, relative to the project root.
   *
   * Registry payloads carry a `target` like `components/ui/button.tsx`. These
   * remap the leading directory, so a project that keeps its UI under `src/`
   * does not have to move files after every `add`.
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
 * Rewrites a payload's target through the project's aliases.
 *
 * Only the first path segment is remapped, and only when it is one we know:
 * `components/ui/button.tsx` follows `aliases.components`, but the `ui/`
 * beneath it is part of the registry's own layout and stays put.
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
