// packages/cli/src/utils/dependency-manager.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileOps } from './file-operations';
import { logger } from './logger';

const execAsync = promisify(exec);

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export class DependencyManager {
  async detectPackageManager(
    cwd: string = process.cwd()
  ): Promise<PackageManager> {
    const lockFiles = [
      { file: 'pnpm-lock.yaml', manager: 'pnpm' as const },
      { file: 'yarn.lock', manager: 'yarn' as const },
      { file: 'package-lock.json', manager: 'npm' as const },
    ];

    for (const { file, manager } of lockFiles) {
      if (await fileOps.exists(path.join(cwd, file))) {
        return manager;
      }
    }

    return 'npm';
  }

  async installDependencies(
    dependencies: string[],
    options: {
      dev?: boolean;
      cwd?: string;
      packageManager?: PackageManager;
    } = {}
  ): Promise<void> {
    if (dependencies.length === 0) return;

    const { dev = false, cwd = process.cwd(), packageManager } = options;
    const pm = packageManager || (await this.detectPackageManager(cwd));

    const commands = this.getInstallCommands(pm, dependencies, dev);

    logger.startSpinner(`Installing ${dev ? 'dev ' : ''}dependencies...`);

    try {
      for (const command of commands) {
        await execAsync(command, { cwd });
      }
      logger.succeedSpinner(
        `${dev ? 'Dev d' : 'D'}ependencies installed successfully`
      );
    } catch (error) {
      logger.failSpinner(`Failed to install dependencies: ${error}`);
      throw error;
    }
  }

  private getInstallCommands(
    packageManager: PackageManager,
    dependencies: string[],
    dev: boolean
  ): string[] {
    const deps = dependencies.join(' ');

    switch (packageManager) {
      case 'npm':
        return [`npm install ${dev ? '--save-dev' : '--save'} ${deps}`];
      case 'yarn':
        return [`yarn add ${dev ? '--dev' : ''} ${deps}`];
      case 'pnpm':
        return [`pnpm add ${dev ? '--save-dev' : ''} ${deps}`];
      default:
        throw new Error(`Unsupported package manager: ${packageManager}`);
    }
  }

  async isPackageInstalled(
    packageName: string,
    cwd: string = process.cwd()
  ): Promise<boolean> {
    try {
      const packageJsonPath = path.join(cwd, 'package.json');
      if (!(await fileOps.exists(packageJsonPath))) {
        return false;
      }

      const packageJson = await fileOps.readJsonFile<any>(packageJsonPath);
      return !!(
        packageJson.dependencies?.[packageName] ||
        packageJson.devDependencies?.[packageName] ||
        packageJson.peerDependencies?.[packageName]
      );
    } catch {
      return false;
    }
  }

  async getInstalledVersion(
    packageName: string,
    cwd: string = process.cwd()
  ): Promise<string | null> {
    try {
      const packageJsonPath = path.join(cwd, 'package.json');
      if (!(await fileOps.exists(packageJsonPath))) {
        return null;
      }

      const packageJson = await fileOps.readJsonFile<any>(packageJsonPath);
      return (
        packageJson.dependencies?.[packageName] ||
        packageJson.devDependencies?.[packageName] ||
        packageJson.peerDependencies?.[packageName] ||
        null
      );
    } catch {
      return null;
    }
  }

  async updatePackageJson(
    updates: {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      scripts?: Record<string, string>;
    },
    cwd: string = process.cwd()
  ): Promise<void> {
    const packageJsonPath = path.join(cwd, 'package.json');

    try {
      const packageJson = await fileOps.readJsonFile<any>(packageJsonPath);

      if (updates.dependencies) {
        packageJson.dependencies = {
          ...packageJson.dependencies,
          ...updates.dependencies,
        };
      }

      if (updates.devDependencies) {
        packageJson.devDependencies = {
          ...packageJson.devDependencies,
          ...updates.devDependencies,
        };
      }

      if (updates.scripts) {
        packageJson.scripts = { ...packageJson.scripts, ...updates.scripts };
      }

      await fileOps.writeJsonFile(packageJsonPath, packageJson);
    } catch (error) {
      throw new Error(`Failed to update package.json: ${error}`);
    }
  }
}

export const dependencyManager = new DependencyManager();
