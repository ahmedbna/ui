import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * The scaffolds bundled in the npm tarball.
 *
 * These stay bundled rather than being fetched like components: `init` has to
 * work before any network trust exists, and they are mostly binary assets.
 * `scripts/copy-starters.mjs` populates `dist/templates/` at build time from
 * `@bna-ui/starters`.
 */
export const TEMPLATES = [
  'start',
  'start-convex',
  'start-convex-auth',
  'start-supabase',
  'start-supabase-auth',
] as const;

export type TemplateName = (typeof TEMPLATES)[number];

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Where the bundled templates live.
 *
 * Resolved relative to this module. `dist/scaffold/` and `dist/commands/` both
 * sit one level under `dist/`, so `../templates` works from either — but that is
 * a load-bearing coincidence, and getting it wrong fails at runtime with an
 * ENOENT from `copyTemplate` rather than at build time. The CI e2e job runs a
 * real `init`, which is what catches it.
 *
 * `BNA_UI_TEMPLATES` overrides the root, so you can scaffold from freshly built
 * starters without rebuilding the CLI:
 *
 *     BNA_UI_TEMPLATES=packages/starters/dist bna-ui init demo
 */
export function templateRoot(): string {
  return process.env.BNA_UI_TEMPLATES
    ? path.resolve(process.env.BNA_UI_TEMPLATES)
    : path.resolve(__dirname, '../templates');
}

/** Absolute path to one bundled template. */
export function templateDir(name: TemplateName): string {
  return path.join(templateRoot(), name);
}
