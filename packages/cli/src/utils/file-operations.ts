// packages/cli/src/utils/file-operations.ts
import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger';

export class FileOperations {
  async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error}`);
    }
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    try {
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write file ${filePath}: ${error}`);
    }
  }

  async copyFile(src: string, dest: string): Promise<void> {
    try {
      await fs.ensureDir(path.dirname(dest));
      await fs.copyFile(src, dest);
    } catch (error) {
      throw new Error(`Failed to copy file from ${src} to ${dest}: ${error}`);
    }
  }

  async ensureDir(dirPath: string): Promise<void> {
    try {
      await fs.ensureDir(dirPath);
    } catch (error) {
      throw new Error(`Failed to create directory ${dirPath}: ${error}`);
    }
  }

  async removeFile(filePath: string): Promise<void> {
    try {
      await fs.remove(filePath);
    } catch (error) {
      logger.warn(`Failed to remove file ${filePath}: ${error}`);
    }
  }

  async readJsonFile<T>(filePath: string): Promise<T> {
    try {
      return await fs.readJson(filePath);
    } catch (error) {
      throw new Error(`Failed to read JSON file ${filePath}: ${error}`);
    }
  }

  async writeJsonFile(filePath: string, data: any): Promise<void> {
    try {
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeJson(filePath, data, { spaces: 2 });
    } catch (error) {
      throw new Error(`Failed to write JSON file ${filePath}: ${error}`);
    }
  }

  async listFiles(dirPath: string, extension?: string): Promise<string[]> {
    try {
      const files = await fs.readdir(dirPath);
      if (extension) {
        return files.filter((file) => file.endsWith(extension));
      }
      return files;
    } catch (error) {
      throw new Error(`Failed to list files in ${dirPath}: ${error}`);
    }
  }
}

export const fileOps = new FileOperations();
