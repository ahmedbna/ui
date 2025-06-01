#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';

const program = new Command();

program
  .name('bna')
  .description('BNA UI Library CLI for Expo Projects')
  .version('1.0.0');

program
  .command('init')
  .argument('[project-name]', 'Name of the project')
  .option('-o, --overwrite', 'Overwrite existing directory')
  .description('Initialize a new project with BNA UI Library')
  .action(async (projectName, options) => {
    await initCommand(projectName, options);
  });

program
  .command('add')
  .description('Add UI components to your project')
  .argument('<components...>', 'Components to add')
  .option('-a, --all', 'Add all components')
  .action(addCommand);

program.parse();
