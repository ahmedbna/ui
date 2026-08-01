/**
 * The closing message, with the framing shared by all three scaffolds.
 *
 * Each command previously re-typed this block, including its own copy of an
 * install-command ternary that had already drifted: they printed a bare `yarn`
 * where `getInstallCommand('yarn')` returns `yarn install`.
 */
import { logger } from '../utils/logger.js';
import { getInstallCommand, getRunCommand } from '../utils/package-manager.js';
import { theme } from '../utils/theme.js';
import type { NextSteps, ScaffoldContext, ScaffoldOptions } from './types.js';

const RUN_SCRIPTS: Array<[script: string, description: string]> = [
  ['start', 'Start the development server'],
  ['android', 'Run on Android'],
  ['ios', 'Run on iOS'],
  ['web', 'Run on Web'],
];

function section(title: string, lines: string[]): void {
  if (lines.length === 0) return;
  logger.info(theme.heading(title));
  for (const line of lines) logger.plain(theme.dim('  ') + line);
  logger.newline();
}

export function renderNextSteps<O extends ScaffoldOptions>(
  ctx: ScaffoldContext<O>,
  next: NextSteps
): void {
  const { packageManager: pm } = ctx;

  logger.newline();
  logger.success(next.headline);
  logger.newline();

  const steps: string[] = [];
  if (!ctx.inPlace) steps.push(theme.code(`cd ${ctx.projectName}`));
  if (ctx.options.skipInstall) steps.push(theme.code(getInstallCommand(pm)));
  steps.push(...(next.steps ?? []).map((step) => theme.code(step)));
  steps.push(theme.code(getRunCommand(pm, 'start')));
  section('Next steps', steps);

  // Column width is derived rather than hand-padded; `bun run start` and
  // `npm run start` differ in length, and the old fixed padding only lined up
  // for npm.
  const width = Math.max(
    ...RUN_SCRIPTS.map(([s]) => getRunCommand(pm, s).length)
  );
  section(
    'Available commands',
    RUN_SCRIPTS.map(
      ([script, description]) =>
        `${theme.code(getRunCommand(pm, script).padEnd(width))}  ${theme.dim(description)}`
    )
  );

  for (const extra of next.sections ?? []) {
    section(extra.title, extra.lines);
  }

  for (const note of next.notes ?? []) {
    if (note.title) logger.info(note.title);
    for (const line of note.lines) logger.plain(theme.dim('  ') + line);
    logger.newline();
  }

  logger.info(next.signOff);
}
