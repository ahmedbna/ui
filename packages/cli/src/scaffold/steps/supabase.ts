import { execSync } from 'child_process';
import path from 'path';
import inquirer from 'inquirer';
import { softFail } from '../../utils/errors.js';
import { writeFile } from '../../utils/filesystem.js';
import { logger } from '../../utils/logger.js';
import { theme } from '../../utils/theme.js';
import { runExternalSequence } from '../external.js';
import {
  authRequested,
  type ScaffoldContext,
  type ScaffoldOptions,
} from '../types.js';

export interface SupabaseOptions extends ScaffoldOptions {
  skipSupabase?: boolean;
  /** Commander's `--no-auth` negation. */
  auth?: boolean;
}

export interface SupabaseCredentials {
  url: string;
  publishableKey: string;
}

/** `https://abcdefgh.supabase.co` -> `abcdefgh` */
export function projectRefFromUrl(url: string): string | null {
  const match = /^https?:\/\/([a-z0-9]+)\.supabase\.(co|red)/i.exec(url.trim());
  return match ? (match[1] ?? null) : null;
}

function hasSupabaseCli(cwd: string): boolean {
  try {
    execSync('npx --no-install supabase --version', {
      cwd,
      stdio: 'ignore',
      timeout: 20000,
    });
    return true;
  } catch {
    return false;
  }
}

async function promptForCredentials(): Promise<SupabaseCredentials | null> {
  logger.newline();
  logger.header('Connecting to Supabase');
  logger.plain(
    theme.dim('  Find these under Project Settings → API in your dashboard.')
  );
  logger.plain(
    theme.dim('  Press enter to skip and fill in .env.local yourself later.')
  );
  logger.newline();

  const { url } = await inquirer.prompt<{ url: string }>([
    {
      type: 'input',
      name: 'url',
      message: 'Supabase project URL:',
      validate: (input: string) => {
        if (!input.trim()) return true; // skipping is allowed
        return (
          projectRefFromUrl(input) !== null ||
          'Expected something like https://abcdefgh.supabase.co'
        );
      },
    },
  ]);

  if (!url.trim()) {
    logger.warn('Skipped. Copy .env.example to .env.local when you have them.');
    return null;
  }

  const { publishableKey } = await inquirer.prompt<{ publishableKey: string }>([
    {
      type: 'input',
      name: 'publishableKey',
      message: 'Publishable key (sb_publishable_…):',
      validate: (input: string) => {
        const value = input.trim();
        if (!value) return 'A key is required now that a URL was given.';
        if (value.startsWith('sb_secret_')) {
          // Worth stopping for: a secret key bypasses row level security, and
          // EXPO_PUBLIC_ variables are compiled into the shipped app bundle.
          return 'That is a secret key. It would ship inside your app — use the publishable key.';
        }
        return true;
      },
    },
  ]);

  return { url: url.trim(), publishableKey: publishableKey.trim() };
}

/**
 * Collects credentials, writes `.env.local`, and drives the Supabase CLI when
 * it is available.
 *
 * Every part of this degrades. A user who skips the prompts, or has no Supabase
 * CLI, still ends up with a working project and the exact commands they need.
 */
export async function connectSupabase(
  ctx: ScaffoldContext<SupabaseOptions>
): Promise<SupabaseCredentials | null> {
  const credentials = await promptForCredentials();
  if (!credentials) return null;

  try {
    await writeFile(
      path.join(ctx.projectPath, '.env.local'),
      `EXPO_PUBLIC_SUPABASE_URL=${credentials.url}\n` +
        `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${credentials.publishableKey}\n`
    );
    logger.success('Wrote .env.local');
  } catch (error) {
    softFail('Could not write .env.local.', {
      hint: 'Copy .env.example to .env.local and fill it in by hand.',
      cause: error,
    });
    return credentials;
  }

  // Non-null: `promptForCredentials` only returns a URL that parses.
  const projectRef = projectRefFromUrl(credentials.url)!;

  if (!hasSupabaseCli(ctx.projectPath)) {
    logger.newline();
    logger.warn('The Supabase CLI is not installed, so the database is empty.');
    logger.plain(theme.dim('  Install it, then run these from your project:'));
    for (const line of [
      'npm install -g supabase',
      `npx supabase link --project-ref ${projectRef}`,
      'npx supabase db push',
      'npm run db:types',
      ...(authRequested(ctx.options) ? ['npm run functions:deploy'] : []),
    ]) {
      logger.plain(theme.dim('  ') + theme.code(line));
    }
    return credentials;
  }

  const linkedAndPushed = runExternalSequence(
    [
      {
        title: 'Linking your Supabase project',
        command: `npx supabase link --project-ref ${projectRef}`,
        heads_up: 'You may be asked for your database password.',
        // Everything after this needs a link.
        required: true,
      },
      {
        title: 'Applying migrations',
        detail: [
          'Creates the tables, row level security policies and buckets.',
        ],
        command: 'npx supabase db push',
        required: true,
      },
    ],
    { cwd: ctx.projectPath }
  );

  if (!linkedAndPushed) return credentials;

  await generateTypes(ctx.projectPath);
  return credentials;
}

/**
 * Regenerates `lib/database.types.ts` from the linked schema.
 *
 * Kept out of the sequence because it captures stdout rather than inheriting
 * it: the generated types go through Node rather than a shell redirect so this
 * behaves identically on Windows.
 */
async function generateTypes(projectPath: string): Promise<void> {
  logger.info('Generating TypeScript types from your schema');
  try {
    const types = execSync('npx supabase gen types typescript --linked', {
      cwd: projectPath,
      encoding: 'utf-8',
    });
    await writeFile(path.join(projectPath, 'lib', 'database.types.ts'), types);
    logger.success('Types written to lib/database.types.ts');
    logger.newline();
  } catch (error) {
    softFail('Could not generate types.', {
      hint: 'The checked-in types still match the shipped migrations. Rerun with: npm run db:types',
      cause: error,
    });
  }
}
