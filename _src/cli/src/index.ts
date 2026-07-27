#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { initConvexCommand } from './commands/convex.js';
import { addCommand } from './commands/add.js';
import { logger } from './utils/logger.js';

const program = new Command();

program
  .name('bna-ui')
  .description('BNA UI - Expo React Native CLI, UI Components Library')
  .version('1.0.0');

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
  .action(initConvexCommand);

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
  .action(addCommand);

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
