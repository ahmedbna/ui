// src/utils/dependencies.ts
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import { logger } from './logger.js';
import { PackageManager } from './package-manager.js';

/** Local shape for a package to install; the registry ships plain strings. */
export interface ComponentDependency {
  name: string;
  version: string;
  dev?: boolean;
}

/**
 * Splits `name[@version]` into its parts.
 *
 * The leading `@` of a scoped package is not a version delimiter, so the search
 * for `@` has to start past index 0 — otherwise `@expo/vector-icons` parses as
 * an empty name.
 */
export function parseDependency(spec: string): ComponentDependency {
  const at = spec.indexOf('@', 1);
  if (at === -1) return { name: spec, version: 'latest' };
  return { name: spec.slice(0, at), version: spec.slice(at + 1) };
}

/**
 * True when `targetPath` is an Expo app.
 *
 * Worth knowing because `expo install` resolves each package to the version
 * that matches the project's SDK, where a bare `npm install` resolves to
 * `latest` and quietly pulls a package built for the *next* SDK.
 */
export function isExpoProject(targetPath: string): boolean {
  try {
    const packageJsonPath = path.join(targetPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return false;

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return Boolean(
      packageJson.dependencies?.expo ?? packageJson.devDependencies?.expo
    );
  } catch {
    return false;
  }
}

export async function installPackageDependencies(
  dependencies: string[],
  targetPath: string,
  packageManager: PackageManager
): Promise<void> {
  if (dependencies.length === 0) return;

  const componentDeps = dependencies.map(parseDependency);

  if (componentDeps.length > 0) {
    await installDeps(componentDeps, targetPath, packageManager, false);
  }
}

async function installDeps(
  dependencies: ComponentDependency[],
  targetPath: string,
  packageManager: PackageManager,
  isDev: boolean
): Promise<void> {
  const depType = isDev ? 'dev dependencies' : 'dependencies';
  const spinner = ora(`Installing ${depType}...`).start();

  try {
    const packages = dependencies.map((dep) => {
      return dep.version === 'latest' ? dep.name : `${dep.name}@${dep.version}`;
    });

    // Registry entries declare bare package names, which a plain install
    // resolves to `latest`. In an Expo app that is wrong the moment a new SDK
    // ships: `expo-camera@latest` targets the newest SDK, not the one the
    // project is on. `expo install` pins each package to the project's SDK and
    // passes anything it doesn't recognise through to the package manager, so
    // prefer it whenever the target is an Expo project.
    const installCmd =
      !isDev && isExpoProject(targetPath)
        ? `npx expo install ${packages.join(' ')}`
        : getPackageInstallCommand(packageManager, packages, isDev);

    logger.debug(`Running: ${installCmd}`);

    execSync(installCmd, {
      cwd: targetPath,
      stdio: 'pipe',
      timeout: 300000,
    });

    spinner.succeed(`${depType} installed successfully!`);
  } catch (error) {
    spinner.fail(`Failed to install ${depType}`);
    logger.error('Installation error:', error);
    throw error;
  }
}

function getPackageInstallCommand(
  packageManager: PackageManager,
  packages: string[],
  isDev: boolean
): string {
  const packagesStr = packages.join(' ');

  switch (packageManager) {
    case 'yarn':
      return isDev ? `yarn add -D ${packagesStr}` : `yarn add ${packagesStr}`;
    case 'pnpm':
      return isDev ? `pnpm add -D ${packagesStr}` : `pnpm add ${packagesStr}`;
    case 'bun':
      return isDev ? `bun add -D ${packagesStr}` : `bun add ${packagesStr}`;
    default:
      return isDev
        ? `npm install -D ${packagesStr}`
        : `npm install ${packagesStr}`;
  }
}

export function checkExistingDependencies(
  dependencies: string[],
  targetPath: string
): string[] {
  try {
    const packageJsonPath = path.join(targetPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return dependencies;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const existing = new Set([
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.devDependencies || {}),
    ]);

    return dependencies.filter(
      (dep) => !existing.has(parseDependency(dep).name)
    );
  } catch (error) {
    logger.warn('Failed to check existing dependencies:', error);
    return dependencies; // If can't read package.json, install all
  }
}

export function getDependencyInfo(
  dependencies: string[],
  targetPath: string
): {
  missing: string[];
  existing: string[];
} {
  try {
    const packageJsonPath = path.join(targetPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return { missing: dependencies, existing: [] };
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const existing = new Set([
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.devDependencies || {}),
    ]);

    const missing: string[] = [];
    const existingDeps: string[] = [];

    dependencies.forEach((dep) => {
      const depName = parseDependency(dep).name;
      if (existing.has(depName)) {
        existingDeps.push(dep);
      } else {
        missing.push(dep);
      }
    });

    return { missing, existing: existingDeps };
  } catch (error) {
    logger.warn('Failed to get dependency info:', error);
    return { missing: dependencies, existing: [] };
  }
}
