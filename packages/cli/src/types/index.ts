// packages/cli/src/types/index.ts
export interface Config {
  typescript: boolean;
  tailwind: boolean;
  src: string;
  components: string;
  utils: string;
  lib: string;
  hooks: string;
  theme: string;
}

export interface ComponentRegistry {
  [key: string]: {
    name: string;
    files: Array<{
      path: string;
      template: string;
    }>;
    dependencies: string[];
    devDependencies?: string[];
  };
}

export interface InitOptions {
  template?: string;
  typescript?: boolean;
  overwrite?: boolean;
}

export interface AddOptions {
  all?: boolean;
  overwrite?: boolean;
}

export interface ProjectInfo {
  name: string;
  path: string;
  packageManager: 'npm' | 'yarn' | 'pnpm';
}

export interface TemplateVariables {
  [key: string]: any;
}
