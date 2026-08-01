import { runScaffold } from '../scaffold/index.js';
import {
  initializeConvex,
  type ConvexOptions,
} from '../scaffold/steps/convex.js';
import { authRequested, type ScaffoldConfig } from '../scaffold/types.js';

export type InitConvexOptions = ConvexOptions;

const convexScaffold: ScaffoldConfig<InitConvexOptions> = {
  defaultProjectName: 'bna-convex-app',
  title: (options) =>
    authRequested(options)
      ? 'Welcome to BNA — Expo + Convex + Auth'
      : 'Welcome to BNA — Expo + Convex',
  template: (options) =>
    authRequested(options) ? 'start-convex-auth' : 'start-convex',
  creatingMessage: 'Creating your BNA Convex project...',
  backend: {
    name: 'convex',
    when: (ctx) => !ctx.options.skipConvex,
    run: initializeConvex,
  },
  nextSteps: (ctx) => {
    const withAuth = authRequested(ctx.options);

    return {
      headline: withAuth
        ? `Successfully created ${ctx.projectName} with Convex Auth! 🎉`
        : `Successfully created ${ctx.projectName} with Convex! 🎉`,
      // Only worth listing when `--skip-convex` meant we never ran them.
      steps: ctx.options.skipConvex
        ? withAuth
          ? ['npx convex dev', 'npx @convex-dev/auth']
          : ['npx convex dev']
        : undefined,
      sections: ctx.options.skipConvex
        ? undefined
        : [
            {
              title: 'Convex commands',
              lines: [
                'npx convex dev        Start the Convex development server',
                'npx convex dashboard  Open the Convex dashboard',
              ],
            },
          ],
      notes: withAuth
        ? [
            {
              // Email OTP and password reset fail silently without this, and
              // nothing else in the flow asks for it.
              title: 'Before email sign-in works, set your Resend key:',
              lines: [
                'npx convex env set AUTH_RESEND_KEY re_your_key_here',
                'https://ui.ahmedbna.com/docs/installation/convex-auth',
              ],
            },
          ]
        : undefined,
      signOff: 'Happy coding with Convex! 🚀',
    };
  },
};

export function initConvexCommand(
  projectName?: string,
  options: InitConvexOptions = {}
) {
  return runScaffold(convexScaffold, projectName, options);
}
