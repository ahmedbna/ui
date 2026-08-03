// src/commands/add.ts
import path from 'path';
import {
  DEFAULT_ALIASES,
  applyAliases,
  normalizeAliases,
  readConfig,
  rewriteImports,
} from '../utils/config.js';
import {
  checkExistingDependencies,
  installPackageDependencies,
} from '../utils/dependencies.js';
import { CliError, cancelled, toCliError } from '../utils/errors.js';
import { createDirectory, fileExists, writeFile } from '../utils/filesystem.js';
import { logger } from '../utils/logger.js';
import {
  resolvePackageManager,
  type PackageManagerFlags,
} from '../utils/package-manager.js';
import { checkbox, confirm, select } from '../utils/prompts.js';
import {
  fetchRegistryIndex,
  fetchRegistryItem,
  resolveRegistryUrl,
  type RegistryFile,
} from '../utils/registry-client.js';
import { assertUsableProject } from '../utils/registry.js';
import {
  createSpinner,
  failSpinner,
  succeedSpinner,
  theme,
} from '../utils/theme.js';

interface AddCommandOptions extends PackageManagerFlags {
  overwrite?: boolean;
  dryRun?: boolean;
  yes?: boolean;
  registry?: string;
}

export async function addCommand(
  components: string[],
  options: AddCommandOptions
): Promise<void> {
  try {
    const projectPath = process.cwd();
    const config = await readConfig(projectPath);
    const { aliasRoot, source: aliasRootSource } = await assertUsableProject(
      projectPath,
      config?.baseDir
    );

    // Registry targets are relative to wherever `@/` points, not to the project
    // root — the imports inside every shipped file are frozen to `@/...` before
    // the CLI ever sees them. A project mapping `@/*` to `./src/*` therefore
    // installs into `src/`.
    const installRoot = path.join(projectPath, aliasRoot);
    const { aliases, legacy } = normalizeAliases(config?.aliases, aliasRoot);

    const registryUrl = resolveRegistryUrl(options.registry, config?.registry);

    if (aliasRoot) {
      logger.info(
        `Installing into ${theme.code(`${aliasRoot}/`)} ${theme.dim(
          aliasRootSource === 'components.json'
            ? '(baseDir in components.json)'
            : `(${aliasRootSource} maps @/* there)`
        )}`
      );
    }

    if (legacy.length > 0) {
      logger.warn(
        `components.json aliases (${legacy.join(', ')}) are read as relative to ${theme.code('@/')}, ` +
          `so the leading ${theme.code(`${aliasRoot}/`)} in them is ignored. Drop it to silence this.`
      );
    }

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
          // Remapped once, here, so conflict detection, the dry run and the
          // write all agree on where a file is going. Content is repointed at
          // the same time, or a relocated file would import its siblings from
          // where they used to live.
          const target = applyAliases(file.target, aliases);
          assertInside(installRoot, target);
          if (!files.has(target)) {
            files.set(target, {
              ...file,
              target,
              content: rewriteImports(file.content, aliases),
            });
          }
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

    const { manager: packageManager } = await resolvePackageManager(
      options,
      projectPath,
      config?.packageManager
    );

    // Conflict handling, on the files actually about to be written.
    const conflicts: string[] = [];
    for (const target of files.keys()) {
      if (await fileExists(path.join(installRoot, target))) {
        conflicts.push(target);
      }
    }

    // Before the alias root was honoured, `add` wrote to the project root. Any
    // files left there are now orphaned — outside `@/`, and never touched again
    // by this command. Say so once, rather than let the user wonder why editing
    // them changes nothing.
    if (aliasRoot) {
      const stale = path.join(
        projectPath,
        applyAliases('components/ui', config?.aliases)
      );
      const current = path.join(
        installRoot,
        applyAliases('components/ui', aliases)
      );
      if (stale !== current && (await fileExists(stale))) {
        logger.warn(
          `${theme.code(path.relative(projectPath, stale))} is outside your ${theme.code('@/')} alias root — ` +
            'it predates this CLI honouring the root, and nothing there is updated any more. Move it or delete it.'
        );
      }
    }

    // Before any prompting: a dry run must never ask a question, or it cannot
    // be used from a script.
    if (options.dryRun) {
      reportDryRun({
        resolvedNames,
        targets: [...files.keys()],
        packageDeps,
        conflicts,
        aliasRoot,
      });
      return;
    }

    const skip = new Set<string>();
    let overwriteAll = options.overwrite || false;

    // Targets are `@/`-relative; every path shown to the user is from the
    // project root, so it matches what they see in their editor.
    const display = (target: string) =>
      aliasRoot ? `${aliasRoot}/${target}` : target;

    if (conflicts.length > 0 && !overwriteAll) {
      logger.warn('The following files already exist:');
      conflicts.forEach((file) => logger.plain(`  ${display(file)}`));

      if (!options.yes) {
        const choice = await select<
          'overwrite-all' | 'skip-conflicts' | 'individual' | 'cancel'
        >({
          message: 'How would you like to handle existing files?',
          default: 'skip-conflicts',
          choices: [
            { name: 'Skip existing files', value: 'skip-conflicts' },
            { name: 'Overwrite all existing files', value: 'overwrite-all' },
            { name: 'Choose for each file individually', value: 'individual' },
            { name: 'Cancel', value: 'cancel' },
          ],
        });

        if (choice === 'cancel') {
          throw cancelled('Nothing was written.');
        } else if (choice === 'overwrite-all') {
          overwriteAll = true;
        } else if (choice === 'individual') {
          for (const target of conflicts) {
            const shouldOverwrite = await confirm({
              message: `Overwrite ${display(target)}?`,
              default: false,
            });
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
        const dest = path.join(installRoot, file.target);
        await createDirectory(path.dirname(dest));
        await writeFile(dest, file.content);
      }
      succeedSpinner(writeSpinner, 'Components installed successfully!');
    } catch (error) {
      failSpinner(writeSpinner, 'Failed to write components');
      throw error;
    }

    logger.newline();
    logger.success(
      `Added ${components.length} component${components.length === 1 ? '' : 's'}:`
    );
    for (const name of components) {
      logger.plain(`  ${theme.ok(theme.glyph.success)} ${name}`);
    }

    const extras = [...resolvedNames].filter((n) => !components.includes(n));
    if (extras.length > 0) {
      logger.plain(
        theme.dim(`  plus its dependencies: ${extras.sort().join(', ')}`)
      );
    }

    if (skip.size > 0) {
      logger.warn(
        `Kept ${skip.size} existing file${skip.size === 1 ? '' : 's'}. Pass --overwrite to replace them.`
      );
    }

    // Read from the config rather than hardcoded: a project that relocated its
    // components would otherwise be told the wrong import path. Normalised, so
    // it names the specifier that now actually resolves.
    const componentsAlias = aliases?.components ?? DEFAULT_ALIASES.components;
    logger.newline();
    logger.info(
      `Import from ${theme.code(`@/${componentsAlias}/ui`)} — docs at https://ui.ahmedbna.com/docs/components`
    );
  } catch (error) {
    // Rethrown for `reportFatal`; the raw `Error` dump this replaced buried the
    // registry client's carefully written multi-line messages.
    throw toCliError(error);
  }
}

/**
 * Guards against a payload target escaping the install root.
 *
 * The registry types `target` as a bare string, so nothing upstream stops a
 * `../` from turning `add` into an arbitrary write. Checked while resolving,
 * before any dependency is installed.
 */
function assertInside(installRoot: string, target: string): void {
  const dest = path.resolve(installRoot, target);
  if (dest !== installRoot && !dest.startsWith(installRoot + path.sep)) {
    throw new CliError(`The registry asked to write outside your project.`, {
      hint: `Refusing to write ${target}. Please report this at https://github.com/ahmedbna/ui/issues.`,
    });
  }
}

function reportDryRun({
  resolvedNames,
  targets,
  packageDeps,
  conflicts,
  aliasRoot,
}: {
  resolvedNames: Set<string>;
  targets: string[];
  packageDeps: Set<string>;
  conflicts: string[];
  aliasRoot: string;
}): void {
  const existing = new Set(conflicts);

  logger.info('Dry run — nothing will be written.');
  logger.newline();
  logger.plain(`  ${theme.heading('Components')}`);
  logger.plain(`    ${[...resolvedNames].sort().join(', ')}`);

  logger.newline();
  logger.plain(`  ${theme.heading('Files')}`);
  for (const target of targets) {
    // Marked rather than omitted: what `add` would do to a file that already
    // exists depends on --overwrite, and the dry run should show both.
    const note = existing.has(target) ? theme.dim('  (already exists)') : '';
    // Shown from the project root, which is what the write does — a dry run
    // that printed a different path than the one it would write is worthless.
    const shown = aliasRoot ? `${aliasRoot}/${target}` : target;
    logger.plain(`    ${theme.code(shown)}${note}`);
  }

  if (packageDeps.size > 0) {
    logger.newline();
    logger.plain(`  ${theme.heading('npm packages')}`);
    logger.plain(`    ${[...packageDeps].sort().join(', ')}`);
  }

  logger.newline();
  if (conflicts.length > 0) {
    logger.warn(
      `${conflicts.length} of these already exist. Without --overwrite they are kept.`
    );
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

  const selectedComponents = await checkbox<string>({
    message: 'Select components to add:',
    choices,
    pageSize: 15,
  });

  if (selectedComponents.length === 0) {
    throw cancelled('No components selected.');
  }

  return selectedComponents;
}
