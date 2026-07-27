// src/utils/dependencies.ts
import { execSync } from 'child_process';
import ora from 'ora';
import { ComponentDependency } from '../registry/schema/index.js';
import { PackageManager } from './package-manager.js';
import { logger } from './logger.js';
import path from 'path';
import fs from 'fs-extra';

export async function installPackageDependencies(
  dependencies: string[],
  targetPath: string,
  packageManager: PackageManager
): Promise<void> {
  if (dependencies.length === 0) return;

  // Convert string dependencies to ComponentDependency objects
  const componentDeps = dependencies.map((dep) => {
    if (dep.includes('@')) {
      const [name, version] = dep.split('@');
      return { name, version };
    }
    return { name: dep, version: 'latest' };
  });

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

    const installCmd = getPackageInstallCommand(
      packageManager,
      packages,
      isDev
    );

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

    return dependencies.filter((dep) => {
      // Handle dependencies with version specifiers
      const depName = dep.includes('@') ? dep.split('@')[0] : dep;
      return !existing.has(depName);
    });
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
      const depName = dep.includes('@') ? dep.split('@')[0] : dep;
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
