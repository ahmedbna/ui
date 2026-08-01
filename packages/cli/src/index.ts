#!/usr/bin/env node

import { createRequire } from 'module';
import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { initConvexCommand } from './commands/convex.js';
import { infoCommand } from './commands/info.js';
import { initCommand } from './commands/init.js';
import { listCommand, searchCommand } from './commands/list.js';
import { initSupabaseCommand } from './commands/supabase.js';
import { reportFatal } from './utils/errors.js';
import { checkForUpdate, reportUpdate } from './utils/update-check.js';

const require = createRequire(import.meta.url);
// Read from package.json rather than a literal: this was hardcoded to '1.0.0'
// while the package was on 2.0.4, so `bna-ui --version` reported the wrong one.
const { version } = require('../package.json') as { version: string };

const program = new Command();

program
  .name('bna-ui')
  .description('BNA UI - Expo React Native CLI, UI Components Library')
  .version(version);

program
  .command('init')
  .description('Initialize a new BNA project')
  .argument('[project-name]', 'Name of the project')
  .option('--npm', 'Use npm as package manager')
  .option('--yarn', 'Use yarn as package manager')
  .option('--pnpm', 'Use pnpm as package manager')
  .option('--bun', 'Use bun as package manager')
  .option('--skip-install', 'Skip package installation')
  .action(initCommand);

program
  .command('convex')
  .description('Initialize a new BNA project with Convex backend')
  .argument('[project-name]', 'Name of the project')
  .option('--npm', 'Use npm as package manager')
  .option('--yarn', 'Use yarn as package manager')
  .option('--pnpm', 'Use pnpm as package manager')
  .option('--bun', 'Use bun as package manager')
  .option('--skip-install', 'Skip package installation')
  .option('--skip-convex', 'Skip Convex initialization')
  .option('--no-auth', 'Scaffold a Convex backend without authentication')
  .action(initConvexCommand);

program
  .command('supabase')
  .description('Initialize a new BNA project with a Supabase backend')
  .argument('[project-name]', 'Name of the project')
  .option('--npm', 'Use npm as package manager')
  .option('--yarn', 'Use yarn as package manager')
  .option('--pnpm', 'Use pnpm as package manager')
  .option('--bun', 'Use bun as package manager')
  .option('--skip-install', 'Skip package installation')
  .option('--skip-supabase', 'Skip linking the project and applying migrations')
  .option('--no-auth', 'Scaffold a Supabase backend without authentication')
  .action(initSupabaseCommand);

program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Component names to add')
  .option('--overwrite', 'Overwrite existing files')
  .option('--dry-run', 'Show what would be installed without installing')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--npm', 'Use npm as package manager')
  .option('--yarn', 'Use yarn as package manager')
  .option('--pnpm', 'Use pnpm as package manager')
  .option('--bun', 'Use bun as package manager')
  .option(
    '--registry <url>',
    'Registry to fetch components from (default: https://ui.ahmedbna.com/r)'
  )
  .action(addCommand);

program
  .command('list')
  .alias('ls')
  .description('List every component, chart, hook and theme file')
  .option('--type <type>', 'Narrow to ui, chart, hook or theme')
  .option('--json', 'Emit the list as JSON, for scripts and agents')
  .option('--registry <url>', 'Registry to read from')
  .action(listCommand);

program
  .command('search')
  .description('Search the registry by name or description')
  .argument('<query>', 'Search term, e.g. "chart" or "date"')
  .option('--json', 'Emit matches as JSON, for scripts and agents')
  .option('--registry <url>', 'Registry to read from')
  .action(searchCommand);

program
  .command('info')
  .description("Print a component's props, source and examples")
  .argument('<component>', 'Component name, e.g. button')
  .option('--json', 'Emit the full bundle as JSON, for scripts and agents')
  .option('--registry <url>', 'Registry to fetch from')
  .action(infoCommand);

program
  .command('mcp')
  .description(
    'Run an MCP server so AI assistants can browse and read the registry'
  )
  .option('--registry <url>', 'Registry to serve from')
  .action(async (options) => {
    // Imported lazily: the MCP SDK is a sizeable dependency and every other
    // command starts faster without it.
    const { mcpCommand } = await import('./commands/mcp.js');
    await mcpCommand(options);
  });

// Registered before parsing, not after. These used to sit below `program.parse()`,
// so anything thrown while commander dispatched a command escaped them entirely.
process.on('unhandledRejection', (reason) => {
  reportFatal(reason);
});
process.on('uncaughtException', (error) => {
  reportFatal(error);
});

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
