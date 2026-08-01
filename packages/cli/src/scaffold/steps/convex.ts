import { logger } from '../../utils/logger.js';
import { runExternalSequence, type ExternalStep } from '../external.js';
import {
  authRequested,
  type ScaffoldContext,
  type ScaffoldOptions,
} from '../types.js';

export interface ConvexOptions extends ScaffoldOptions {
  skipConvex?: boolean;
  /** Commander's `--no-auth` negation. */
  auth?: boolean;
}

/**
 * Provisions the Convex backend and, with auth, wires up the redirect targets.
 *
 * The first step is `required`: everything after it talks to a deployment that
 * would not exist.
 */
export async function initializeConvex(
  ctx: ScaffoldContext<ConvexOptions>
): Promise<void> {
  logger.newline();
  logger.header('Setting up Convex');
  logger.plain('The Convex CLI will take over — follow its prompts.');
  logger.newline();

  const steps: ExternalStep[] = [
    {
      title: 'Provisioning your Convex backend',
      command: 'npx convex dev --once',
      heads_up: 'A browser window will open for you to log in or sign up.',
      required: true,
    },
  ];

  // Everything below is authentication: the `@convex-dev/auth` initializer and
  // the two env vars that allow-list OAuth redirect targets. None of it applies
  // to a Convex-only project.
  if (authRequested(ctx.options)) {
    steps.push(
      {
        title: 'Configuring Convex Auth',
        detail: ['This adds authentication files to your project.'],
        command: 'npx @convex-dev/auth',
      },
      {
        title: 'Setting EXPO_URL',
        detail: ['Required for authentication redirects to reach the app.'],
        command: `npx convex env set EXPO_URL ${ctx.projectName}://`,
      },
      {
        title: 'Setting SITE_URL',
        detail: ['Used by web-based authentication flows.'],
        command: 'npx convex env set SITE_URL http://localhost:3000/',
      }
    );
  }

  runExternalSequence(steps, { cwd: ctx.projectPath });
}
