import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger } from '../utils/logger';
import { fileOps } from '../utils/file-operations';
import { configManager } from '../utils/config-manager';
import { dependencyManager } from '../utils/dependency-manager';
import { InitOptions } from '../types';

const execAsync = promisify(exec);

export async function initCommand(projectName: string, options: InitOptions) {
  try {
    logger.info(`Initializing ${projectName} with BNA UI Library...`);

    const projectPath = path.join(process.cwd(), projectName);

    // Check if directory already exists
    if (await fileOps.exists(projectPath)) {
      if (!options.overwrite) {
        logger.error(
          `Directory ${projectName} already exists. Use --overwrite to continue.`
        );
        process.exit(1);
      }

      logger.warn('Overwriting existing directory...');
    }

    // Create project directory
    // await fileOps.ensureDir(projectPath);

    // Create Expo project
    await createExpoProject(projectName);

    // Navigate to project directory and set up UI library
    process.chdir(projectPath);

    // Initialize config
    const config = await configManager.initConfig();

    // Create directory structure
    await createDirectoryStructure(config);

    // Copy template files
    await copyTemplateFiles(config);

    // Install required dependencies
    await installDependencies();

    // Setup additional configurations
    await setupAdditionalConfigs();

    logger.break();
    logger.success('🎉 Project created successfully!');
    logger.break();
    logger.log('Next steps:');
    logger.log(`  cd ${projectName}`);
    logger.log('  npx expo start');
    logger.break();
    logger.log('To add components:');
    logger.log('  npx bna add button');
    logger.log('  npx bna add input');
    logger.log('  npx bna add --all');
  } catch (error) {
    logger.error(`Failed to initialize project: ${error}`);
    process.exit(1);
  }
}

async function createExpoProject(projectName: string) {
  logger.startSpinner('Creating Expo project...');

  try {
    // Use latest Expo CLI with SDK 51+ support
    await execAsync(
      `npx create-expo-app@latest ${projectName} --template blank-typescript`
    );
    logger.succeedSpinner('Expo project created');
  } catch (error) {
    logger.failSpinner('Failed to create Expo project');
    throw error;
  }
}

async function createDirectoryStructure(config: any) {
  logger.startSpinner('Creating directory structure...');

  const directories = [
    config.src,
    config.components,
    path.join(config.components, 'ui'),
    path.join(config.components, 'layout'),
    config.lib,
    config.utils,
    config.hooks,
    config.theme,
    path.join(config.src, 'constants'),
    path.join(config.src, 'types'),
  ];

  try {
    for (const dir of directories) {
      await fileOps.ensureDir(dir);
    }
    logger.succeedSpinner('Directory structure created');
  } catch (error) {
    logger.failSpinner('Failed to create directory structure');
    throw error;
  }
}

async function copyTemplateFiles(config: any) {
  logger.startSpinner('Setting up theme and utilities...');

  try {
    // Create theme files
    await createThemeFiles(config);

    // Create utility files
    await createUtilityFiles(config);

    // Create hook files
    await createHookFiles(config);

    // Create type definitions
    await createTypeFiles(config);

    logger.succeedSpinner('Theme and utilities set up');
  } catch (error) {
    logger.failSpinner('Failed to set up theme and utilities');
    throw error;
  }
}

async function createThemeFiles(config: any) {
  const themeIndexPath = path.join(config.theme, 'index.ts');
  const themeContent = `export const defaultTheme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    background: '#ffffff',
    foreground: '#0a0a0a',
    card: '#ffffff',
    cardForeground: '#0a0a0a',
    popover: '#ffffff',
    popoverForeground: '#0a0a0a',
    secondary: '#f1f5f9',
    secondaryForeground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    accent: '#f1f5f9',
    accentForeground: '#0f172a',
    destructive: '#ef4444',
    destructiveForeground: '#fef2f2',
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: '#0ea5e9',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  borderRadius: {
    none: 0,
    sm: 2,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    full: 9999,
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 5,
    },
  },
};

// Dark theme variant
export const darkTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#0a0a0a',
    foreground: '#fafafa',
    card: '#0a0a0a',
    cardForeground: '#fafafa',
    popover: '#0a0a0a',
    popoverForeground: '#fafafa',
    secondary: '#27272a',
    secondaryForeground: '#fafafa',
    muted: '#27272a',
    mutedForeground: '#a1a1aa',
    accent: '#27272a',
    accentForeground: '#fafafa',
    border: '#27272a',
    input: '#27272a',
  },
};

export type Theme = typeof defaultTheme;
`;

  await fileOps.writeFile(themeIndexPath, themeContent);
}

async function createUtilityFiles(config: any) {
  // Create cn utility (className utility)
  const cnPath = path.join(config.utils, 'cn.ts');
  const cnContent = `import { StyleSheet } from 'react-native';

type Style = any;

export function cn(...styles: (Style | false | null | undefined)[]): Style {
  return StyleSheet.flatten(styles.filter(Boolean));
}

export function createStyles<T extends Record<string, Style>>(styles: T): T {
  return StyleSheet.create(styles);
}

// Utility for merging theme-based styles
export function mergeStyles<T>(base: T, ...overrides: (Partial<T> | undefined)[]): T {
  return Object.assign({}, base, ...overrides.filter(Boolean));
}
`;

  await fileOps.writeFile(cnPath, cnContent);

  // Create color utilities
  const colorUtilsPath = path.join(config.utils, 'colors.ts');
  const colorUtilsContent = `export function hexToRgba(hex: string, alpha: number = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
}

export function lighten(color: string, amount: number): string {
  // Enhanced lighten function
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * amount);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16)
    .slice(1);
}

export function darken(color: string, amount: number): string {
  // Enhanced darken function
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * amount);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  
  return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
    (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
    (B > 255 ? 255 : B < 0 ? 0 : B))
    .toString(16)
    .slice(1);
}

export function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
}
`;

  await fileOps.writeFile(colorUtilsPath, colorUtilsContent);

  // Create index file
  const utilsIndexPath = path.join(config.utils, 'index.ts');
  const utilsIndexContent = `export * from './cn';
export * from './colors';
`;

  await fileOps.writeFile(utilsIndexPath, utilsIndexContent);
}

async function createHookFiles(config: any) {
  // Create useTheme hook
  const useThemePath = path.join(config.hooks, 'useTheme.ts');
  const useThemeContent = `import { useContext } from 'react';
import { ThemeContext } from '@/lib/theme-context';

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
`;

  await fileOps.writeFile(useThemePath, useThemeContent);

  // Create useColorScheme hook with better implementation
  const useColorSchemePath = path.join(config.hooks, 'useColorScheme.ts');
  const useColorSchemeContent = `import { useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

export function useColorScheme(): {
  colorScheme: ColorSchemeName;
  isDark: boolean;
  setColorScheme: (scheme: ColorSchemeName) => void;
} {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      setColorScheme(newColorScheme);
    });

    return () => subscription?.remove();
  }, []);

  return {
    colorScheme,
    isDark: colorScheme === 'dark',
    setColorScheme,
  };
}
`;

  await fileOps.writeFile(useColorSchemePath, useColorSchemeContent);

  // Create hooks index
  const hooksIndexPath = path.join(config.hooks, 'index.ts');
  const hooksIndexContent = `export * from './useTheme';
export * from './useColorScheme';
`;

  await fileOps.writeFile(hooksIndexPath, hooksIndexContent);

  // Create theme context and provider with better implementation
  const themeContextPath = path.join(config.lib, 'theme-context.tsx');
  const themeContextContent = `import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { defaultTheme, darkTheme, Theme } from '@/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setDarkMode: (isDark: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  followSystemTheme?: boolean;
}

export function ThemeProvider({ 
  children, 
  initialTheme = defaultTheme,
  followSystemTheme = true 
}: ThemeProviderProps) {
  const { isDark: systemIsDark } = useColorScheme();
  const [isDark, setIsDark] = useState(systemIsDark);
  const [theme, setTheme] = useState<Theme>(isDark ? darkTheme : initialTheme);

  useEffect(() => {
    if (followSystemTheme) {
      setIsDark(systemIsDark);
    }
  }, [systemIsDark, followSystemTheme]);

  useEffect(() => {
    setTheme(isDark ? darkTheme : defaultTheme);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const setDarkMode = (dark: boolean) => {
    setIsDark(dark);
  };

  const value = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
    setDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
`;

  await fileOps.writeFile(themeContextPath, themeContextContent);
}

async function createTypeFiles(config: any) {
  const typesPath = path.join(config.src, 'types', 'index.ts');
  const typesContent = `import { Theme } from '@/theme';

export interface ComponentProps {
  style?: any;
  testID?: string;
}

export interface ButtonVariantProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export interface InputVariantProps {
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export type ThemeColors = Theme['colors'];
export type ThemeSpacing = Theme['spacing'];
export type ThemeBorderRadius = Theme['borderRadius'];
export type ThemeTypography = Theme['typography'];
export type ThemeShadows = Theme['shadows'];
`;

  await fileOps.writeFile(typesPath, typesContent);
}

async function installDependencies() {
  logger.startSpinner('Installing dependencies...');

  const dependencies = [
    'react-native-vector-icons',
    '@react-native-async-storage/async-storage',
    'react-native-safe-area-context',
    'react-native-gesture-handler',
    '@react-native-community/slider',
  ];

  const devDependencies = [
    '@types/react-native-vector-icons',
    'babel-plugin-module-resolver', // Added for path aliases
  ];

  try {
    await dependencyManager.installDependencies(dependencies);
    await dependencyManager.installDependencies(devDependencies, { dev: true });

    logger.succeedSpinner('Dependencies installed');
  } catch (error) {
    logger.failSpinner('Failed to install dependencies');
    throw error;
  }
}

async function setupAdditionalConfigs() {
  // Setup TypeScript config if needed
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  if (!(await fileOps.exists(tsconfigPath))) {
    const tsconfigContent = {
      extends: 'expo/tsconfig.base',
      compilerOptions: {
        strict: true,
        baseUrl: '.',
        paths: {
          '@/*': ['./src/*'],
          '@/components/*': ['./src/components/*'],
          '@/lib/*': ['./src/lib/*'],
          '@/hooks/*': ['./src/hooks/*'],
          '@/utils/*': ['./src/utils/*'],
        },
      },
      include: ['**/*.ts', '**/*.tsx', '.expo/types/**/*.ts', 'expo-env.d.ts'],
    };

    await fileOps.writeFile(
      tsconfigPath,
      JSON.stringify(tsconfigContent, null, 2)
    );
  }

  // Setup Metro config for path aliases
  const metroConfigPath = path.join(process.cwd(), 'metro.config.js');
  const metroConfigContent = `const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add path alias support
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
  '@/components': path.resolve(__dirname, 'src/components'),
  '@/lib': path.resolve(__dirname, 'src/lib'),
  '@/hooks': path.resolve(__dirname, 'src/hooks'),
  '@/utils': path.resolve(__dirname, 'src/utils'),
};

module.exports = config;
`;

  await fileOps.writeFile(metroConfigPath, metroConfigContent);

  // Setup Babel config for path aliases
  const babelConfigPath = path.join(process.cwd(), 'babel.config.js');
  const babelConfigContent = `module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/lib': './src/lib',
            '@/hooks': './src/hooks',
            '@/utils': './src/utils',
          },
        },
      ],
    ],
  };
};
`;

  await fileOps.writeFile(babelConfigPath, babelConfigContent);

  // Create .gitignore if it doesn't exist
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  if (!(await fileOps.exists(gitignorePath))) {
    const gitignoreContent = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# TypeScript v1 declaration files
typings/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test
.env.local
.env.development.local
.env.test.local
.env.production.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Expo
.expo/
web-build/
dist/

# Native
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# typescript
*.tsbuildinfo

# bna
bna.json
`;

    await fileOps.writeFile(gitignorePath, gitignoreContent);
  }

  // Create README.md with project documentation
  const readmePath = path.join(process.cwd(), 'README.md');
  const readmeContent = `# Expo UI Library Project

A beautiful React Native Expo project with a custom UI component library similar to shadcn/ui.

## Features

- 🎨 Modern UI components with theming support
- 🔧 TypeScript support
- 📱 Cross-platform (iOS & Android)
- 🎯 Path aliases for clean imports
- 🌙 Light/Dark theme support
- 📦 Component library with CLI tools

## Getting Started

### Development

\`\`\`bash
npx expo start
\`\`\`

### Adding Components

\`\`\`bash
# Add specific components
npx bna add button
npx bna add input

# Add all components
npx bna add --all
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── ui/           # UI components (Button, Input, etc.)
│   └── layout/       # Layout components (Container, etc.)
├── lib/              # Core library files
├── hooks/            # Custom hooks
└── utils/            # Utility functions
\`\`\`

## Available Components

- **Button** - Multiple variants (primary, secondary, outline, ghost)
- **Input** - Text input with label and validation
- **Container** - Layout wrapper with safe area support

## Theming

The project includes a comprehensive theming system supporting light and dark modes. Components automatically adapt to the current theme.

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
`;

  await fileOps.writeFile(readmePath, readmeContent);
}
