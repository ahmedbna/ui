// src/commands/add.ts
import path from 'path';
import inquirer from 'inquirer';
import {
  checkExistingDependencies,
  installPackageDependencies,
} from '../utils/dependencies.js';
import { CliError, cancelled, toCliError } from '../utils/errors.js';
import { createDirectory, fileExists, writeFile } from '../utils/filesystem.js';
import { logger } from '../utils/logger.js';
import { detectPackageManagerFromInvocation } from '../utils/package-manager.js';
import {
  fetchRegistryIndex,
  fetchRegistryItem,
  resolveRegistryUrl,
  type RegistryFile,
} from '../utils/registry-client.js';
import { assertUsableProject } from '../utils/registry.js';
import { createSpinner, failSpinner, succeedSpinner } from '../utils/theme.js';

interface AddCommandOptions {
  overwrite?: boolean;
  dryRun?: boolean;
  yes?: boolean;
  npm?: boolean;
  yarn?: boolean;
  pnpm?: boolean;
  bun?: boolean;
  registry?: string;
}

export async function addCommand(
  components: string[],
  options: AddCommandOptions
): Promise<void> {
  try {
    const projectPath = process.cwd();
    const registryUrl = resolveRegistryUrl(options.registry);

    await assertUsableProject(projectPath);

    if (components.length === 0) {
      components = await selectComponentsInteractively(registryUrl);
    }

    // Each payload arrives with its transitive closure — components, hooks and
    // theme files — already flattened, so this is one request per requested
    // component regardless of how deep the dependency graph goes.
    const spinner = createSpinner('Resolving components...').start();
    const files = new Map<string, RegistryFile>();
    const packageDeps = new Set<string>();
    const resolvedNames = new Set<string>();
    const unknown: string[] = [];

    try {
      for (const name of components) {
        const payload = await fetchRegistryItem(registryUrl, name);
        if (!payload) {
          unknown.push(name);
          continue;
        }

        payload.dependencies.forEach((dep) => packageDeps.add(dep));
        payload.registryDependencies.forEach((dep) => resolvedNames.add(dep));
        resolvedNames.add(payload.name);

        // Later entries win, but content is identical for a shared dependency,
        // so first-write-wins vs last-write-wins is immaterial here.
        for (const file of payload.files) {
          if (!files.has(file.target)) files.set(file.target, file);
        }
      }
      spinner.stop();
    } catch (error) {
      failSpinner(spinner, 'Could not resolve components');
      throw error;
    }

    if (unknown.length > 0) {
      throw new CliError(`Unknown components: ${unknown.join(', ')}`, {
        hint: 'Run `bna-ui list` to see everything, or `bna-ui add` with no arguments to browse interactively.',
      });
    }

    const packageManager = getPackageManager(options);

    // Conflict handling, on the files actually about to be written.
    const conflicts: string[] = [];
    for (const target of files.keys()) {
      if (await fileExists(path.join(projectPath, target))) {
        conflicts.push(target);
      }
    }

    const skip = new Set<string>();
    let overwriteAll = options.overwrite || false;

    if (conflicts.length > 0 && !overwriteAll) {
      logger.warn('The following files already exist:');
      conflicts.forEach((file) => logger.plain(`  ${file}`));

      if (!options.yes) {
        const { choice } = await inquirer.prompt([
          {
            type: 'list',
            name: 'choice',
            message: 'How would you like to handle existing files?',
            choices: [
              { name: 'Overwrite all existing files', value: 'overwrite-all' },
              { name: 'Skip existing files', value: 'skip-conflicts' },
              {
                name: 'Choose for each file individually',
                value: 'individual',
              },
              { name: 'Cancel operation', value: 'cancel' },
            ],
            default: 'skip-conflicts',
          },
        ]);

        if (choice === 'cancel') {
          throw cancelled('Nothing was written.');
        } else if (choice === 'overwrite-all') {
          overwriteAll = true;
        } else if (choice === 'individual') {
          for (const target of conflicts) {
            const { shouldOverwrite } = await inquirer.prompt([
              {
                type: 'confirm',
                name: 'shouldOverwrite',
                message: `Overwrite ${target}?`,
                default: false,
              },
            ]);
            if (!shouldOverwrite) skip.add(target);
          }
        } else {
          conflicts.forEach((file) => skip.add(file));
        }
      } else {
        // `--yes` keeps existing files rather than clobbering them silently.
        conflicts.forEach((file) => skip.add(file));
      }
    }

    const toWrite = [...files.values()].filter((f) => !skip.has(f.target));

    if (toWrite.length === 0) {
      throw cancelled('Every file already exists — nothing to write.');
    }

    if (options.dryRun) {
      logger.info('Dry run — would install the following:');
      logger.plain(`Components: ${[...resolvedNames].sort().join(', ')}`);
      logger.plain(`Files:`);
      toWrite.forEach((f) => logger.plain(`    ${f.target}`));
      if (packageDeps.size > 0) {
        logger.plain(`Package dependencies: ${[...packageDeps].join(', ')}`);
      }
      if (skip.size > 0) {
        logger.plain(`Skipped files: ${[...skip].join(', ')}`);
      }
      return;
    }

    const missingDeps = checkExistingDependencies(
      [...packageDeps],
      projectPath
    );
    if (missingDeps.length > 0) {
      logger.info(`Installing package dependencies: ${missingDeps.join(', ')}`);
      await installPackageDependencies(
        missingDeps,
        projectPath,
        packageManager
      );
    }

    const writeSpinner = createSpinner('Writing components...').start();
    try {
      for (const file of toWrite) {
        const dest = path.join(projectPath, file.target);
        await createDirectory(path.dirname(dest));
        await writeFile(dest, file.content);
      }
      succeedSpinner(writeSpinner, 'Components installed successfully!');
    } catch (error) {
      failSpinner(writeSpinner, 'Failed to write components');
      throw error;
    }

    logger.success(`Successfully added ${components.length} component(s):`);
    components.forEach((name) => logger.plain(`  ✓ ${name}`));

    const extras = [...resolvedNames].filter((n) => !components.includes(n));
    if (extras.length > 0) {
      logger.info(`Also installed dependencies: ${extras.sort().join(', ')}`);
    }

    if (skip.size > 0) {
      logger.warn(`Skipped ${skip.size} existing file(s)`);
    }

    logger.newline();
    logger.info('Next steps:');
    logger.plain('  Import components from @/components/ui');
    logger.plain('  Check the documentation for usage examples');
  } catch (error) {
    // Rethrown for `reportFatal`; the raw `Error` dump this replaced buried the
    // registry client's carefully written multi-line messages.
    throw toCliError(error);
  }
}

async function selectComponentsInteractively(
  registryUrl: string
): Promise<string[]> {
  const spinner = createSpinner('Loading registry...').start();
  let choices: { name: string; value: string }[];

  try {
    const index = await fetchRegistryIndex(registryUrl);
    choices = index.items
      .filter((item) => item.type === 'registry:ui')
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item) => ({
        name: `${item.name} - ${item.description}`,
        value: item.name,
      }));
    spinner.stop();
  } catch (error) {
    failSpinner(spinner, 'Failed to load the registry');
    throw error;
  }

  const { selectedComponents } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedComponents',
      message: 'Select components to add:',
      choices,
      pageSize: 15,
    },
  ]);

  if (selectedComponents.length === 0) {
    throw cancelled('No components selected.');
  }

  return selectedComponents;
}

function getPackageManager(options: AddCommandOptions) {
  if (options.npm) return 'npm';
  if (options.yarn) return 'yarn';
  if (options.pnpm) return 'pnpm';
  if (options.bun) return 'bun';

  return detectPackageManagerFromInvocation();
}
