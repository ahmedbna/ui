/**
 * Post-copy edits to a freshly scaffolded project.
 *
 * There is no template engine here on purpose: starters are real, runnable Expo
 * apps that must typecheck and boot inside this repo, which placeholder syntax
 * would break. The handful of values that genuinely vary are patched afterwards.
 */
import path from 'path';
import { DEFAULT_ALIASES, writeConfig } from '../utils/config.js';
import { CliError } from '../utils/errors.js';
import {
  pathExists,
  readFile,
  readJson,
  writeFile,
} from '../utils/filesystem.js';
import { logger } from '../utils/logger.js';
import type { ScaffoldContext, ScaffoldPatch } from './types.js';

/** Read, transform, write — preserving two-space JSON formatting. */
async function editJson(
  filePath: string,
  what: string,
  edit: (json: Record<string, unknown>) => void
): Promise<void> {
  let json: Record<string, unknown>;
  try {
    json = await readJson<Record<string, unknown>>(filePath);
  } catch (error) {
    throw new CliError(`Could not read ${what}.`, {
      hint: 'The bundled template may be corrupt — try reinstalling bna-ui.',
      cause: error,
    });
  }

  edit(json);

  try {
    await writeFile(filePath, JSON.stringify(json, null, 2) + '\n');
  } catch (error) {
    throw new CliError(`Could not write ${what}.`, { cause: error });
  }
}

/** Every starter ships as `"name": "bna"`. */
export const setPackageName: ScaffoldPatch = async (ctx) => {
  await editJson(
    path.join(ctx.projectPath, 'package.json'),
    'package.json',
    (json) => {
      json.name = ctx.projectName;
    }
  );
};

/**
 * Sets the Expo name, slug and scheme.
 *
 * `scheme` is the deep link OAuth and magic links return to, so it has to match
 * the redirect URLs the success message tells the user to allow-list.
 */
export const setAppIdentity: ScaffoldPatch = async (ctx) => {
  await editJson(path.join(ctx.projectPath, 'app.json'), 'app.json', (json) => {
    const expo = json.expo as Record<string, unknown> | undefined;
    if (!expo) {
      throw new CliError('The template\'s app.json has no "expo" block.', {
        hint: 'The bundled template may be corrupt — try reinstalling bna-ui.',
      });
    }
    expo.name = ctx.projectName;
    expo.slug = ctx.projectName;
    expo.scheme = ctx.projectName;
  });
};

/**
 * Rewrites the project id and deep-link scheme in `supabase/config.toml`.
 *
 * Pure, so it can be tested without touching disk — the regexes are the whole
 * behaviour and they are easy to get subtly wrong.
 */
export function patchSupabaseConfigText(
  content: string,
  projectName: string
): string {
  return content
    .replace(/^project_id = ".*"$/m, `project_id = "${projectName}"`)
    .replace(/\bbna:\/\//g, `${projectName}://`);
}

/**
 * `supabase start` reads config.toml, and a `site_url` still pointing at `bna`
 * silently rejects every redirect once the app's scheme is the project name.
 * Local-stack only — a linked project reads its allow-list from the dashboard,
 * which is why this is not allowed to fail the scaffold.
 */
export const patchSupabaseConfig: ScaffoldPatch = async (
  ctx: ScaffoldContext
) => {
  const configPath = path.join(ctx.projectPath, 'supabase', 'config.toml');
  try {
    if (!(await pathExists(configPath))) return;
    const original = await readFile(configPath);
    await writeFile(
      configPath,
      patchSupabaseConfigText(original, ctx.projectName)
    );
  } catch (error) {
    logger.debug('Could not update supabase/config.toml:', error);
  }
};

/**
 * Seeds `components.json` so later `add` runs inherit the project's choices.
 *
 * Written with defaults rather than left absent: an empty-but-present config is
 * discoverable and editable, where a missing one leaves users guessing that the
 * feature exists at all.
 */
export const writeComponentsConfig: ScaffoldPatch = async (ctx) => {
  await writeConfig(ctx.projectPath, {
    aliases: { ...DEFAULT_ALIASES },
    packageManager: ctx.packageManager,
  });
};
