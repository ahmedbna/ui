#!/usr/bin/env node

import { createRequire } from 'module';
import { Command, Option } from 'commander';
import { reportFatal } from './utils/errors.js';
import { logger } from './utils/logger.js';
import { theme } from './utils/theme.js';
import { checkForUpdate, reportUpdate } from './utils/update-check.js';

const require = createRequire(import.meta.url);
// Read from package.json rather than a literal: this was hardcoded to '1.0.0'
// while the package was on 2.0.4, so `bna-ui --version` reported the wrong one.
const { version } = require('../package.json') as { version: string };

const program = new Command();

/**
 * Every command module is imported on demand.
 *
 * Loading all of them eagerly meant `bna-ui --version` and `bna-ui --help` paid
 * for the prompt library, the spinner and the registry client before printing
 * a single line.
 */
const lazy =
  <Args extends unknown[]>(load: () => Promise<(...args: Args) => unknown>) =>
  async (...args: Args) => {
    const command = await load();
    await command(...args);
  };

/** Flags shared by every command that installs something. */
function packageManagerOptions(command: Command): Command {
  return command
    .option('--npm', 'Install with npm')
    .option('--yarn', 'Install with yarn')
    .option('--pnpm', 'Install with pnpm')
    .option('--bun', 'Install with bun');
}

/**
 * Registered per command rather than on the program.
 *
 * Commander rejects unknown options on a subcommand, so a program-level
 * `--verbose` would only be accepted before the command name — and nobody types
 * `bna-ui --verbose add button`.
 */
function commonOptions(command: Command): Command {
  return command.addOption(
    new Option('--verbose', 'Print the full error stack on failure')
  );
}

function examples(command: Command, lines: string[]): Command {
  return command.addHelpText(
    'after',
    `\n${theme.heading('Examples')}\n${lines
      .map((line) => `  ${theme.dim('$')} ${line}`)
      .join('\n')}\n`
  );
}

program
  .name('bna-ui')
  .description('Expo React Native CLI and UI components library')
  .version(version, '-v, --version', 'Print the installed version')
  // Commander's default on a bad command is a bare error with no orientation.
  .showHelpAfterError('(run `bna-ui --help` to see the available commands)')
  .configureOutput({
    outputError: (message, write) =>
      write(
        `${theme.danger(theme.glyph.error)} ${message.replace(/^error: /, '')}`
      ),
  })
  .addHelpText(
    'after',
    `\n${theme.heading('Getting started')}\n` +
      `  ${theme.dim('$')} ${theme.code('npx bna-ui init my-app')}     ${theme.dim('scaffold a new Expo app')}\n` +
      `  ${theme.dim('$')} ${theme.code('npx bna-ui list')}            ${theme.dim('see what components exist')}\n` +
      `  ${theme.dim('$')} ${theme.code('npx bna-ui add button')}      ${theme.dim('add one to your project')}\n` +
      `\n${theme.heading('Environment')}\n` +
      `  ${theme.code('BNA_UI_REGISTRY')}        ${theme.dim('registry to fetch from')}\n` +
      `  ${theme.code('NO_COLOR')}               ${theme.dim('disable all colour')}\n` +
      `  ${theme.code('NO_UPDATE_NOTIFIER')}     ${theme.dim('silence the update check')}\n` +
      `\n${theme.dim('Docs: https://ui.ahmedbna.com/docs')}\n`
  );

examples(
  commonOptions(
    packageManagerOptions(
      program
        .command('init')
        .description('Scaffold a new Expo app with BNA UI set up')
        .argument(
          '[project-name]',
          'Name of the project, or `.` for the current directory'
        )
    )
  ).option(
    '--skip-install',
    'Create the project without installing dependencies'
  ),
  [
    'bna-ui init my-app',
    'bna-ui init .                  # scaffold into the current directory',
    'bna-ui init my-app --pnpm --skip-install',
  ]
).action(lazy(async () => (await import('./commands/init.js')).initCommand));

examples(
  commonOptions(
    packageManagerOptions(
      program
        .command('convex')
        .description('Scaffold a new Expo app with a Convex backend')
        .argument('[project-name]', 'Name of the project')
    )
  )
    .option(
      '--skip-install',
      'Create the project without installing dependencies'
    )
    .option('--skip-convex', 'Skip provisioning the Convex backend')
    .option('--no-auth', 'Scaffold Convex without authentication'),
  [
    'bna-ui convex my-app',
    'bna-ui convex my-app --no-auth',
    'bna-ui convex my-app --skip-convex   # wire it up yourself later',
  ]
).action(
  lazy(async () => (await import('./commands/convex.js')).initConvexCommand)
);

examples(
  commonOptions(
    packageManagerOptions(
      program
        .command('supabase')
        .description('Scaffold a new Expo app with a Supabase backend')
        .argument('[project-name]', 'Name of the project')
    )
  )
    .option(
      '--skip-install',
      'Create the project without installing dependencies'
    )
    .option(
      '--skip-supabase',
      'Skip linking the project and applying migrations'
    )
    .option('--no-auth', 'Scaffold Supabase without authentication'),
  [
    'bna-ui supabase my-app',
    'bna-ui supabase my-app --no-auth',
    'bna-ui supabase my-app --skip-supabase',
  ]
).action(
  lazy(async () => (await import('./commands/supabase.js')).initSupabaseCommand)
);

examples(
  commonOptions(
    packageManagerOptions(
      program
        .command('add')
        .description('Add components to an existing project')
        .argument(
          '[components...]',
          'Component names. Omit to pick interactively.'
        )
    )
  )
    .option('--overwrite', 'Replace files that already exist')
    .option('--dry-run', 'Show what would be written, and write nothing')
    .option('-y, --yes', 'Skip prompts, keeping any existing files')
    .option('--registry <url>', 'Registry to fetch from'),
  [
    'bna-ui add button',
    'bna-ui add button input card',
    'bna-ui add                     # browse and pick',
    'bna-ui add button --dry-run',
    'bna-ui add button --registry http://localhost:3000/r',
  ]
).action(lazy(async () => (await import('./commands/add.js')).addCommand));

examples(
  commonOptions(
    program
      .command('list')
      .alias('ls')
      .description('List every component, chart, hook and theme file')
      .option('--type <type>', 'Narrow to ui, chart, hook or theme')
      .option('--json', 'Emit as JSON, for scripts and agents')
      .option('--registry <url>', 'Registry to read from')
  ),
  ['bna-ui list', 'bna-ui list --type chart', 'bna-ui list --json']
).action(lazy(async () => (await import('./commands/list.js')).listCommand));

examples(
  commonOptions(
    program
      .command('search')
      .description('Search the registry by name or description')
      .argument('<query>', 'Search term, e.g. "chart" or "date"')
      .option('--json', 'Emit as JSON, for scripts and agents')
      .option('--registry <url>', 'Registry to read from')
  ),
  ['bna-ui search chart', 'bna-ui search "date picker"']
).action(lazy(async () => (await import('./commands/list.js')).searchCommand));

examples(
  commonOptions(
    program
      .command('info')
      .description("Print a component's props, source and examples")
      .argument('<component>', 'Component name, e.g. button')
      .option('--json', 'Emit the full bundle as JSON, for scripts and agents')
      .option('--registry <url>', 'Registry to fetch from')
  ),
  ['bna-ui info button', 'bna-ui info button --json | jq .meta']
).action(lazy(async () => (await import('./commands/info.js')).infoCommand));

examples(
  program
    .command('mcp')
    .description('Run an MCP server so AI assistants can browse the registry')
    .option('--registry <url>', 'Registry to serve from'),
  ['claude mcp add bna-ui -- npx -y bna-ui mcp']
).action(lazy(async () => (await import('./commands/mcp.js')).mcpCommand));

// Registered before parsing, not after. These used to sit below `program.parse()`,
// so anything thrown while commander dispatched a command escaped them entirely.
process.on('unhandledRejection', (reason) => {
  reportFatal(reason);
});
process.on('uncaughtException', (error) => {
  reportFatal(error);
});

// Bare `bna-ui` should orient someone, not error.
if (process.argv.length <= 2) {
  logger.banner();
  program.outputHelp();
  process.exit(0);
}

// Started before the command runs and awaited after, so the network round trip
// overlaps with the real work instead of delaying it.
const updatePromise = checkForUpdate(version);

// `parseAsync`, not `parse`: commander does not await an async `.action()`
// handler under `parse()`, so a rejecting command was caught only by whichever
// microtask happened to run first.
await program.parseAsync().catch(reportFatal);

// Last, so it never pushes the command's own output off screen. `mcp` is
// excluded because its stdout is a protocol channel.
const latest = await updatePromise;
if (latest && !process.argv.includes('mcp')) reportUpdate(version, latest);
