// packages/cli/src/commands/add.ts
import path from 'path';
import { logger } from '../utils/logger';
import { fileOps } from '../utils/file-operations';
import { configManager } from '../utils/config-manager';
import { dependencyManager } from '../utils/dependency-manager';
import { templateEngine } from '../utils/template-engine';
import { ComponentRegistry, AddOptions } from '../types';
import {
  generateAvatarTemplate,
  generateBadgeTemplate,
  generateButtonTemplate,
  generateCardTemplate,
  generateCheckboxTemplate,
  generateInputTemplate,
  generateModalTemplate,
  generateSpinnerTemplate,
  generateSwitchTemplate,
  generateToastTemplate,
} from '../registry/components';

const REGISTRY_URL =
  'https://raw.githubusercontent.com/your-org/bna/main/packages/templates/components/registry.json';

export async function addCommand(components: string[], options: AddOptions) {
  try {
    // Get project config
    const config = await configManager.getConfig();
    if (!config) {
      logger.error('No bna.json found. Run "bna init" first.');
      process.exit(1);
    }

    // Get component registry
    const registry = await getComponentRegistry();

    if (options.all) {
      const allComponents = Object.keys(registry);
      logger.info(`Adding all components: ${allComponents.join(', ')}`);
      await addComponents(allComponents, registry, config, options);
    } else {
      await addComponents(components, registry, config, options);
    }

    logger.break();
    logger.success('🎉 Components added successfully!');
  } catch (error) {
    logger.error(`Failed to add components: ${error}`);
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

async function addComponents(
  componentNames: string[],
  registry: ComponentRegistry,
  config: any,
  options: AddOptions
) {
  const componentsToAdd = [];
  const missingComponents = [];

  // Validate components exist in registry
  for (const componentName of componentNames) {
    if (registry[componentName]) {
      componentsToAdd.push({
        name: componentName,
        config: registry[componentName],
      });
    } else {
      missingComponents.push(componentName);
    }
  }

  if (missingComponents.length > 0) {
    logger.error(`Components not found: ${missingComponents.join(', ')}`);
    logger.log('Available components:');
    Object.keys(registry).forEach((name) => {
      logger.log(`  - ${name}`);
    });
    process.exit(1);
  }

  // Check for existing components
  if (!options.overwrite) {
    const existingComponents = [];
    for (const { name, config: componentConfig } of componentsToAdd) {
      for (const file of componentConfig.files) {
        const filePath = path.join(config.components, file.path);
        if (await fileOps.exists(filePath)) {
          existingComponents.push(name);
          break;
        }
      }
    }

    if (existingComponents.length > 0) {
      logger.warn(`Components already exist: ${existingComponents.join(', ')}`);
      logger.log('Use --overwrite to replace existing components');
      return;
    }
  }

  // Collect all dependencies
  const allDependencies = new Set<string>();
  const allDevDependencies = new Set<string>();

  componentsToAdd.forEach(({ config: componentConfig }) => {
    componentConfig.dependencies.forEach((dep) => allDependencies.add(dep));
    componentConfig.devDependencies?.forEach((dep) =>
      allDevDependencies.add(dep)
    );
  });

  // Install dependencies
  if (allDependencies.size > 0) {
    await dependencyManager.installDependencies(Array.from(allDependencies));
  }

  if (allDevDependencies.size > 0) {
    await dependencyManager.installDependencies(
      Array.from(allDevDependencies),
      { dev: true }
    );
  }

  // Add components
  for (const { name, config: componentConfig } of componentsToAdd) {
    await addSingleComponent(name, componentConfig, config);
  }
}

async function addSingleComponent(
  name: string,
  componentConfig: ComponentRegistry[string],
  config: any
) {
  logger.startSpinner(`Adding ${name} component...`);

  try {
    for (const file of componentConfig.files) {
      const targetPath = path.join(config.components, file.path);
      const componentContent = await generateComponentContent(
        name,
        file.template
      );

      await fileOps.writeFile(targetPath, componentContent);
    }

    logger.succeedSpinner(`${name} component added`);
  } catch (error) {
    logger.failSpinner(`Failed to add ${name} component`);
    throw error;
  }
}

async function generateComponentContent(
  componentName: string,
  template: string
): Promise<string> {
  // Generate component content based on template name
  switch (template) {
    case 'button.template.tsx':
      return generateButtonTemplate();
    case 'input.template.tsx':
      return generateInputTemplate();
    case 'card.template.tsx':
      return generateCardTemplate();
    case 'modal.template.tsx':
      return generateModalTemplate();
    case 'avatar.template.tsx':
      return generateAvatarTemplate();
    case 'badge.template.tsx':
      return generateBadgeTemplate();
    case 'switch.template.tsx':
      return generateSwitchTemplate();
    case 'spinner.template.tsx':
      return generateSpinnerTemplate();
    case 'toast.template.tsx':
      return generateToastTemplate();
    case 'checkbox.template.tsx':
      return generateCheckboxTemplate();
    default:
      return templateEngine.createComponentTemplate(componentName);
  }
}
