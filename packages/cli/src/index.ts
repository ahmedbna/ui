#!/usr/bin/env node

import { createRequire } from 'module';
import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { initConvexCommand } from './commands/convex.js';
import { infoCommand } from './commands/info.js';
import { initCommand } from './commands/init.js';
import { initSupabaseCommand } from './commands/supabase.js';
import { logger } from './utils/logger.js';

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
  .option('-t, --template <template>', 'Template to use', 'default')
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
  .option('-t, --template <template>', 'Template to use', 'default')
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
  .option('-t, --template <template>', 'Template to use', 'default')
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

program.parse();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});
