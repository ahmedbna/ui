import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger.js';

export async function copyTemplate(
  templatePath: string,
  targetPath: string
): Promise<void> {
  try {
    await fs.ensureDir(targetPath);
    await fs.copy(templatePath, targetPath, {
      filter: (src) => {
        // Skip node_modules and other build artifacts
        const relativePath = path.relative(templatePath, src);
        const shouldSkip = /node_modules|\.git|dist|build/.test(relativePath);
        return !shouldSkip;
      },
    });
  } catch (error) {
    logger.error('Failed to copy template:', error);
    throw error;
  }
}

export async function writeFile(
  filePath: string,
  content: string
): Promise<void> {
  try {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content, 'utf8');
  } catch (error) {
    logger.error(`Failed to write file ${filePath}:`, error);
    throw error;
  }
}

export async function readFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    logger.error(`Failed to read file ${filePath}:`, error);
    throw error;
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function createDirectory(dirPath: string): Promise<void> {
  try {
    await fs.ensureDir(dirPath);
  } catch (error) {
    logger.error(`Failed to create directory ${dirPath}:`, error);
    throw error;
  }
}

export function replaceInFile(
  filePath: string,
  replacements: Record<string, string>
): Promise<void> {
  return fs
    .readFile(filePath, 'utf8')
    .then((content) => {
      let newContent = content;
      Object.entries(replacements).forEach(([search, replace]) => {
        newContent = newContent.replace(new RegExp(search, 'g'), replace);
      });
      return fs.writeFile(filePath, newContent, 'utf8');
    })
    .catch((error) => {
      logger.error(`Failed to replace content in file ${filePath}:`, error);
      throw error;
    });
}
