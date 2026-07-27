import validateNpmPackageName from 'validate-npm-package-name';
import { existsSync, readdirSync } from 'fs';
import path from 'path';

export function validateProjectName(name: string): {
  valid: boolean;
  message?: string;
} {
  if (!name) {
    return { valid: false, message: 'Project name is required' };
  }

  if (name.length === 0) {
    return { valid: false, message: 'Project name cannot be empty' };
  }

  // Allow "." for current directory
  if (name === '.') {
    return { valid: true };
  }

  const validation = validateNpmPackageName(name);

  if (!validation.validForNewPackages) {
    const errors = validation.errors || [];
    const warnings = validation.warnings || [];
    const issues = [...errors, ...warnings];

    return {
      valid: false,
      message: `Invalid project name: ${issues.join(', ')}`,
    };
  }

  return { valid: true };
}

export function validateProjectPath(projectPath: string): {
  valid: boolean;
  message?: string;
} {
  if (existsSync(projectPath)) {
    return {
      valid: false,
      message: `Directory ${path.basename(projectPath)} already exists`,
    };
  }

  return { valid: true };
}

export function validateCurrentDirectory(): {
  valid: boolean;
  message?: string;
  conflictingFiles?: string[];
} {
  const currentPath = process.cwd();
  const files = readdirSync(currentPath);

  // Define safe files that can exist in the target directory
  const safeFiles = [
    '.git',
    '.gitignore',
    'README.md',
    'LICENSE',
    '.DS_Store',
    '.npmrc',
    '.yarnrc',
    '.yarnrc.yml',
    'pnpm-workspace.yaml',
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
  ];

  const conflictingFiles = files.filter((file) => !safeFiles.includes(file));

  if (conflictingFiles.length > 0) {
    return {
      valid: false,
      message: 'Current directory is not empty',
      conflictingFiles,
    };
  }

  return { valid: true };
}

export function sanitizeProjectName(name: string): string {
  // Don't sanitize if it's current directory
  if (name === '.') {
    return path.basename(process.cwd());
  }

  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function isValidDirectoryName(name: string): boolean {
  // Check for invalid characters in directory names
  const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
  return !invalidChars.test(name) && name !== '.' && name !== '..';
}

export function getProjectNameFromPath(projectPath: string): string {
  return path.basename(projectPath);
}
