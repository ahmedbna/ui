#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';

const program = new Command();

program
  .name('bna')
  .description('CLI for Expo React Native UI Library')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new Expo project with UI library')
  .argument('<project-name>', 'Name of the project')
  .option('-t, --template <template>', 'Template to use', 'default')
  .action(initCommand);

program
  .command('add')
  .description('Add UI components to your project')
  .argument('<components...>', 'Components to add')
  .option('-a, --all', 'Add all components')
  .action(addCommand);

program.parse();
