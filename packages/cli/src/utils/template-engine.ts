// packages/cli/src/utils/template-engine.ts
import path from 'path';
import { fileOps } from './file-operations';
import { TemplateVariables } from '../types';

export class TemplateEngine {
  async processTemplate(
    templatePath: string,
    variables: TemplateVariables = {}
  ): Promise<string> {
    const templateContent = await fileOps.readFile(templatePath);
    return this.interpolateVariables(templateContent, variables);
  }

  private interpolateVariables(
    content: string,
    variables: TemplateVariables
  ): string {
    let result = content;

    // Replace variable placeholders like {{VARIABLE_NAME}}
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      result = result.replace(placeholder, String(value));
    });

    return result;
  }

  async generateFromTemplate(
    templatePath: string,
    outputPath: string,
    variables: TemplateVariables = {}
  ): Promise<void> {
    const processedContent = await this.processTemplate(
      templatePath,
      variables
    );
    await fileOps.writeFile(outputPath, processedContent);
  }

  getTemplateVariables(config: any): TemplateVariables {
    return {
      TYPESCRIPT: config.typescript ? 'true' : 'false',
      TAILWIND: config.tailwind ? 'true' : 'false',
      COMPONENTS_PATH: config.components,
      UTILS_PATH: config.utils,
      LIB_PATH: config.lib,
      HOOKS_PATH: config.hooks,
      THEME_PATH: config.theme,
    };
  }

  async copyTemplateFiles(
    sourceDir: string,
    targetDir: string,
    variables: TemplateVariables = {}
  ): Promise<void> {
    const files = await this.getTemplateFiles(sourceDir);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file.replace('.template', ''));

      if (file.endsWith('.template.tsx') || file.endsWith('.template.ts')) {
        await this.generateFromTemplate(sourcePath, targetPath, variables);
      } else {
        await fileOps.copyFile(sourcePath, targetPath);
      }
    }
  }

  private async getTemplateFiles(dir: string): Promise<string[]> {
    const files: string[] = [];

    const items = await fileOps.listFiles(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = await fileOps.exists(itemPath);

      if (stat) {
        try {
          const subItems = await fileOps.listFiles(itemPath);
          const subFiles = await this.getTemplateFiles(itemPath);
          files.push(...subFiles.map((f) => path.join(item, f)));
        } catch {
          // It's a file, not a directory
          files.push(item);
        }
      }
    }

    return files;
  }

  createComponentTemplate(componentName: string): string {
    return `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../lib/theme';

interface ${componentName}Props {
  children?: React.ReactNode;
}

export function ${componentName}({ children }: ${componentName}Props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Add your styles here
  },
});
`;
  }
}

export const templateEngine = new TemplateEngine();
