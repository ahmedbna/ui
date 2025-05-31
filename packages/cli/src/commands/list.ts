// packages/cli/src/commands/list.ts
import path from 'path';
import { logger } from '../utils/logger';
import { fileOps } from '../utils/file-operations';
import { configManager } from '../utils/config-manager';
import { ComponentRegistry } from '../types';

const REGISTRY_URL =
  'https://raw.githubusercontent.com/your-org/bna/main/packages/templates/components/registry.json';

export async function listCommand() {
  try {
    logger.info('📦 Available components:');
    logger.break();

    // Get component registry
    const registry = await getComponentRegistry();
    const config = await configManager.getConfig();

    // Get installed components
    const installedComponents = new Set<string>();
    if (config) {
      for (const [name, componentConfig] of Object.entries(registry)) {
        for (const file of componentConfig.files) {
          const filePath = path.join(config.components, file.path);
          if (await fileOps.exists(filePath)) {
            installedComponents.add(name);
            break;
          }
        }
      }
    }

    // Display components
    const maxNameLength = Math.max(
      ...Object.keys(registry).map((name) => name.length)
    );

    for (const [name, componentConfig] of Object.entries(registry)) {
      const isInstalled = installedComponents.has(name);
      const status = isInstalled ? '✅' : '⬜';
      const nameColumn = name.padEnd(maxNameLength);
      const deps =
        componentConfig.dependencies.length > 0
          ? ` (deps: ${componentConfig.dependencies.join(', ')})`
          : '';

      logger.log(`${status} ${nameColumn} - ${componentConfig.name}${deps}`);
    }

    logger.break();
    logger.log(`Total: ${Object.keys(registry).length} components`);
    logger.log(`Installed: ${installedComponents.size} components`);

    if (installedComponents.size === 0) {
      logger.log('');
      logger.log('💡 Add your first component with: bna add button');
    }
  } catch (error) {
    logger.error(`Failed to list components: ${error}`);
    process.exit(1);
  }
}

async function getComponentRegistry(): Promise<ComponentRegistry> {
  // For now, use local registry. In production, you'd fetch from remote
  const localRegistryPath = path.join(
    __dirname,
    '../../templates/components/registry.json'
  );

  try {
    if (await fileOps.exists(localRegistryPath)) {
      return await fileOps.readJsonFile<ComponentRegistry>(localRegistryPath);
    }
  } catch (error) {
    logger.warn('Could not load local registry, using built-in components');
  }

  // Fallback to built-in registry
  return getBuiltInRegistry();
}

function getBuiltInRegistry(): ComponentRegistry {
  return {
    button: {
      name: 'Button',
      files: [
        {
          path: 'ui/button.tsx',
          template: 'button.template.tsx',
        },
      ],
      dependencies: [],
      devDependencies: [],
    },
    input: {
      name: 'Input',
      files: [
        {
          path: 'ui/input.tsx',
          template: 'input.template.tsx',
        },
      ],
      dependencies: [],
      devDependencies: [],
    },
    card: {
      name: 'Card',
      files: [
        {
          path: 'ui/card.tsx',
          template: 'card.template.tsx',
        },
      ],
      dependencies: [],
      devDependencies: [],
    },
    modal: {
      name: 'Modal',
      files: [
        {
          path: 'ui/modal.tsx',
          template: 'modal.template.tsx',
        },
      ],
      dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
      devDependencies: [],
    },
    avatar: {
      name: 'Avatar',
      files: [
        {
          path: 'ui/avatar.tsx',
          template: 'avatar.template.tsx',
        },
      ],
      dependencies: ['expo-image'],
      devDependencies: [],
    },
    badge: {
      name: 'Badge',
      files: [
        {
          path: 'ui/badge.tsx',
          template: 'badge.template.tsx',
        },
      ],
      dependencies: [],
      devDependencies: [],
    },
    switch: {
      name: 'Switch',
      files: [
        {
          path: 'ui/switch.tsx',
          template: 'switch.template.tsx',
        },
      ],
      dependencies: [],
      devDependencies: [],
    },
    spinner: {
      name: 'Spinner',
      files: [
        {
          path: 'ui/spinner.tsx',
          template: 'spinner.template.tsx',
        },
      ],
      dependencies: ['react-native-reanimated'],
      devDependencies: [],
    },
    toast: {
      name: 'Toast',
      files: [
        {
          path: 'ui/toast.tsx',
          template: 'toast.template.tsx',
        },
      ],
      dependencies: ['react-native-reanimated'],
      devDependencies: [],
    },
    checkbox: {
      name: 'Checkbox',
      files: [
        {
          path: 'ui/checkbox.tsx',
          template: 'checkbox.template.tsx',
        },
      ],
      dependencies: ['@expo/vector-icons'],
      devDependencies: [],
    },
  };
}
