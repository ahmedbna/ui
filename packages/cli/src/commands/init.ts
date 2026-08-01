import { runScaffold } from '../scaffold/index.js';
import type { ScaffoldConfig, ScaffoldOptions } from '../scaffold/types.js';

export type InitOptions = ScaffoldOptions;

const initScaffold: ScaffoldConfig<InitOptions> = {
  defaultProjectName: 'bna-app',
  title: () => 'Welcome to BNA — Expo React Native Starter',
  template: () => 'start',
  creatingMessage: 'Creating your BNA project...',
  nextSteps: (ctx) => ({
    headline: `Successfully created ${ctx.projectName}! 🎉`,
    signOff: 'Happy coding! 🚀',
  }),
};

export function initCommand(projectName?: string, options: InitOptions = {}) {
  return runScaffold(initScaffold, projectName, options);
}
