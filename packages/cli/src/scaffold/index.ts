/**
 * The one path a project gets created by.
 *
 * Nothing here calls `process.exit`; failures throw and `reportFatal` in
 * `index.ts` decides how they are printed and what the exit code is.
 */
import { copyTemplate } from '../utils/filesystem.js';
import { logger } from '../utils/logger.js';
import {
  installDependencies,
  resolvePackageManager,
} from '../utils/package-manager.js';
import { createSpinner, failSpinner, succeedSpinner } from '../utils/theme.js';
import { renderNextSteps } from './next-steps.js';
import { setAppIdentity, setPackageName } from './patches.js';
import { resolveTarget } from './prompts.js';
import { templateDir } from './templates.js';
import type {
  ScaffoldConfig,
  ScaffoldContext,
  ScaffoldOptions,
} from './types.js';

export async function runScaffold<O extends ScaffoldOptions, R>(
  config: ScaffoldConfig<O, R>,
  projectName: string | undefined,
  options: O
): Promise<void> {
  logger.banner();
  logger.header(config.title(options));

  const target = await resolveTarget(projectName, config.defaultProjectName);

  const { manager, source } = await resolvePackageManager(options);
  if (source === 'detected') {
    logger.info(`Detected package manager: ${manager}`);
  }

  const ctx: ScaffoldContext<O> = {
    projectName: target.projectName,
    projectPath: target.projectPath,
    inPlace: target.inPlace,
    packageManager: manager,
    options,
  };

  const spinner = createSpinner(
    config.creatingMessage ?? 'Creating your BNA project...'
  ).start();

  try {
    await copyTemplate(templateDir(config.template(options)), ctx.projectPath);

    // Identity first: every other patch may depend on the project being named.
    await setPackageName(ctx);
    await setAppIdentity(ctx);
    for (const patch of config.patches ?? []) {
      await patch(ctx);
    }

    succeedSpinner(spinner, 'Project created successfully!');
  } catch (error) {
    failSpinner(spinner, 'Failed to create project');
    throw error;
  }

  if (!options.skipInstall) {
    await installDependencies(ctx.projectPath, manager);
  }

  let result: R | undefined;
  const { backend } = config;
  if (backend && (backend.when?.(ctx) ?? true)) {
    logger.debug(`Running scaffold step: ${backend.name}`);
    result = await backend.run(ctx);
  }

  renderNextSteps(ctx, config.nextSteps(ctx, result));
}
