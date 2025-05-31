// packages/cli/src/utils/config-manager.ts
import path from 'path';
import { fileOps } from './file-operations';
import { Config } from '../types';
import { logger } from './logger';

const CONFIG_FILE = 'bna.json';

export class ConfigManager {
  private config: Config | null = null;

  async getConfig(cwd: string = process.cwd()): Promise<Config | null> {
    if (this.config) {
      return this.config;
    }

    const configPath = path.join(cwd, CONFIG_FILE);

    if (await fileOps.exists(configPath)) {
      try {
        this.config = await fileOps.readJsonFile<Config>(configPath);
        return this.config;
      } catch (error) {
        logger.error(`Failed to read config file: ${error}`);
        return null;
      }
    }

    return null;
  }

  async setConfig(config: Config, cwd: string = process.cwd()): Promise<void> {
    const configPath = path.join(cwd, CONFIG_FILE);

    try {
      await fileOps.writeJsonFile(configPath, config);
      this.config = config;
      logger.success(`Configuration saved to ${CONFIG_FILE}`);
    } catch (error) {
      throw new Error(`Failed to save config: ${error}`);
    }
  }

  getDefaultConfig(): Config {
    return {
      typescript: true,
      tailwind: false,
      src: 'src',
      components: 'src/components',
      utils: 'src/lib/utils',
      lib: 'src/lib',
      hooks: 'src/hooks',
      theme: 'src/lib/theme',
    };
  }

  async initConfig(cwd: string = process.cwd()): Promise<Config> {
    const config = this.getDefaultConfig();
    await this.setConfig(config, cwd);
    return config;
  }

  resolveComponentPath(componentPath: string, config: Config): string {
    return path.join(config.components, componentPath);
  }

  resolveUtilsPath(config: Config): string {
    return config.utils;
  }

  resolveLibPath(config: Config): string {
    return config.lib;
  }

  resolveHooksPath(config: Config): string {
    return config.hooks;
  }

  resolveThemePath(config: Config): string {
    return config.theme;
  }
}

export const configManager = new ConfigManager();
