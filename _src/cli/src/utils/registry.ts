// src/utils/registry.ts (Enhanced version)
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs-extra';
import { ComponentRegistry } from '../registry/schema/index.js';
import { logger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function validateProjectStructure(
  projectPath: string
): Promise<boolean> {
  const requiredFiles = ['package.json'];

  for (const file of requiredFiles) {
    const filePath = path.join(projectPath, file);
    if (!(await fs.pathExists(filePath))) {
      logger.error(`Required file not found: ${file}`);
      return false;
    }
  }

  // Check if it's a React Native/Expo project
  try {
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);

    const hasReactNative =
      packageJson.dependencies?.['react-native'] ||
      packageJson.devDependencies?.['react-native'];
    const hasExpo =
      packageJson.dependencies?.['expo'] ||
      packageJson.devDependencies?.['expo'];

    if (!hasReactNative && !hasExpo) {
      logger.error("This doesn't appear to be a React Native or Expo project");
      return false;
    }
  } catch (error) {
    logger.error('Failed to validate project structure:', error);
    return false;
  }

  return true;
}

export async function getComponentTemplate(filePath: string): Promise<string> {
  const templatePath = path.resolve(__dirname, '../../', filePath);

  if (!(await fs.pathExists(templatePath))) {
    throw new Error(`Template file not found: ${filePath}`);
  }

  return await fs.readFile(templatePath, 'utf8');
}

export async function installComponent(
  component: ComponentRegistry,
  targetPath: string,
  options: {
    overwrite?: boolean;
    dryRun?: boolean;
  } = {}
): Promise<void> {
  const { overwrite = false, dryRun = false } = options;

  // Check if component files already exist
  const existingFiles: string[] = [];

  for (const file of component.files) {
    const filePath = path.join(targetPath, file.target);
    if (await fs.pathExists(filePath)) {
      existingFiles.push(filePath);
    }
  }

  if (existingFiles.length > 0 && !overwrite) {
    logger.warn(`The following files already exist for ${component.name}:`);
    existingFiles.forEach((file) =>
      logger.plain(`  ${path.relative(targetPath, file)}`)
    );
    logger.plain(`Use --overwrite to replace existing files`);
    return;
  }

  if (dryRun) {
    logger.info(
      `Dry run - would install ${component.name} with the following files:`
    );
    component.files.forEach((file) => {
      logger.plain(`  ${file.target}`);
    });
    return;
  }

  // Install component files
  for (const file of component.files) {
    try {
      const sourcePath = path.resolve(__dirname, '../../', file.path);
      const targetFilePath = path.join(targetPath, file.target);

      // Ensure target directory exists
      await fs.ensureDir(path.dirname(targetFilePath));

      // Copy file
      await fs.copy(sourcePath, targetFilePath);
      logger.success(`Added ${file.target}`);
    } catch (error) {
      logger.error(`Failed to install ${file.target}:`, error);
      throw error;
    }
  }
}

export function resolveComponentDependencies(
  componentName: string,
  registry: Record<string, ComponentRegistry>
): string[] {
  const visited = new Set<string>();
  const resolved: string[] = [];
  const visiting = new Set<string>();

  function resolve(name: string) {
    if (visited.has(name)) return;

    if (visiting.has(name)) {
      throw new Error(`Circular dependency detected: ${name}`);
    }

    visiting.add(name);

    const component = registry[name];
    if (!component) {
      logger.warn(`Component dependency not found: ${name}`);
      visiting.delete(name);
      return;
    }

    // Resolve registry dependencies first
    const deps = component.registryDependencies || [];
    for (const dep of deps) {
      resolve(dep);
    }

    visiting.delete(name);
    visited.add(name);
    resolved.push(name);
  }

  resolve(componentName);
  return resolved;
}

export async function updateComponentsIndex(
  projectPath: string,
  components: string[]
): Promise<void> {
  const indexPath = path.join(projectPath, 'components/ui/index.ts');

  try {
    // Ensure components/ui directory exists
    await fs.ensureDir(path.dirname(indexPath));

    // Check if index file exists
    const indexExists = await fs.pathExists(indexPath);

    if (!indexExists) {
      // Create new index file
      const exports = components
        .map((name) => `export * from './${name}';`)
        .join('\n');

      await fs.writeFile(indexPath, exports + '\n');
      logger.success('Created components/ui/index.ts');
    } else {
      // Read existing index file
      const existingContent = await fs.readFile(indexPath, 'utf8');

      // Add new exports that don't already exist
      const newExports: string[] = [];

      for (const component of components) {
        const exportLine = `export * from './${component}';`;
        if (!existingContent.includes(exportLine)) {
          newExports.push(exportLine);
        }
      }

      if (newExports.length > 0) {
        const updatedContent =
          existingContent + '\n' + newExports.join('\n') + '\n';
        await fs.writeFile(indexPath, updatedContent);
        logger.success('Updated components/ui/index.ts');
      }
    }
  } catch (error) {
    logger.warn('Failed to update components index:', error);
  }
}

export async function checkComponentConflicts(
  components: string[],
  projectPath: string,
  registry: Record<string, ComponentRegistry>
): Promise<{
  conflicts: Array<{
    component: string;
    files: string[];
  }>;
}> {
  const conflicts: Array<{
    component: string;
    files: string[];
  }> = [];

  for (const componentName of components) {
    const component = registry[componentName];
    if (!component) continue;

    const conflictingFiles: string[] = [];

    for (const file of component.files) {
      const fullPath = path.join(projectPath, file.target);

      if (await fs.pathExists(fullPath)) {
        conflictingFiles.push(file.target);
      }
    }

    if (conflictingFiles.length > 0) {
      conflicts.push({
        component: componentName,
        files: conflictingFiles,
      });
    }
  }

  return { conflicts };
}

export function getComponentsByType(
  type: 'registry:ui' | 'registry:example',
  registry: Record<string, ComponentRegistry>
): ComponentRegistry[] {
  return Object.values(registry)
    .filter((comp) => comp.type === type)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getComponentExamples(
  componentName: string,
  registry: Record<string, ComponentRegistry>
): ComponentRegistry[] {
  return Object.values(registry)
    .filter(
      (comp) =>
        comp.type === 'registry:example' && comp.name.startsWith(componentName)
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}
