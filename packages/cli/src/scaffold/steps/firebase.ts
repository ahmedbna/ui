import { execSync } from 'child_process';
import path from 'path';
import { softFail } from '../../utils/errors.js';
import { pathExists, readFile, writeFile } from '../../utils/filesystem.js';
import { logger } from '../../utils/logger.js';
import { input } from '../../utils/prompts.js';
import { theme } from '../../utils/theme.js';
import { runExternalSequence } from '../external.js';
import {
  authRequested,
  type ScaffoldContext,
  type ScaffoldOptions,
} from '../types.js';

export interface FirebaseOptions extends ScaffoldOptions {
  skipFirebase?: boolean;
  /** Commander's `--no-auth` negation. */
  auth?: boolean;
}

export interface FirebaseCredentials {
  projectId: string;
  apiKey: string;
  authDomain: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

/**
 * The two config values that are derivable from the project id.
 *
 * Offered as prompt defaults rather than assumed, because `storageBucket`
 * changed suffix: projects created before October 2024 use `.appspot.com`, and
 * silently writing the wrong one produces uploads that fail with a 404 much
 * later. Deriving-but-overridable is the honest middle.
 */
export function deriveFirebaseDefaults(projectId: string): {
  authDomain: string;
  storageBucket: string;
} {
  const id = projectId.trim();
  return {
    authDomain: `${id}.firebaseapp.com`,
    storageBucket: `${id}.firebasestorage.app`,
  };
}

/** Google enforces 6–30 characters, lowercase letters, digits and hyphens. */
export function isValidProjectId(value: string): boolean {
  return /^[a-z][a-z0-9-]{4,28}[a-z0-9]$/.test(value.trim());
}

function hasFirebaseCli(cwd: string): boolean {
  try {
    execSync('npx --no-install firebase-tools --version', {
      cwd,
      stdio: 'ignore',
      timeout: 20000,
    });
    return true;
  } catch {
    return false;
  }
}

async function promptForCredentials(): Promise<FirebaseCredentials | null> {
  logger.newline();
  logger.header('Connecting to Firebase');
  logger.plain(
    theme.dim(
      '  Find these under Project settings → General → Your apps → SDK setup.'
    )
  );
  logger.plain(
    theme.dim('  Press enter to skip and fill in .env.local yourself later.')
  );
  logger.newline();

  const projectId = await input({
    message: 'Firebase project ID:',
    validate: (value: string) => {
      if (!value.trim()) return true; // skipping is allowed
      return (
        isValidProjectId(value) ||
        'Expected something like my-app-1234 — lowercase letters, digits and hyphens.'
      );
    },
  });

  if (!projectId.trim()) {
    logger.warn('Skipped. Copy .env.example to .env.local when you have them.');
    return null;
  }

  const id = projectId.trim();
  const defaults = deriveFirebaseDefaults(id);

  const apiKey = await input({
    message: 'Web API key:',
    validate: (raw: string) => {
      const value = raw.trim();
      if (!value) return 'An API key is required now that a project was given.';
      // A Firebase web API key is public by design — it identifies the project
      // rather than granting access to it. A service account key is neither,
      // and would be catastrophic in an EXPO_PUBLIC_ variable.
      if (value.startsWith('-----BEGIN')) {
        return 'That is a private key. It would ship inside your app — use the Web API key from SDK setup.';
      }
      return true;
    },
  });

  const appId = await input({
    message: 'App ID:',
    validate: (raw: string) =>
      raw.trim() ? true : 'Required — it looks like 1:123456789:web:abc123.',
  });

  const messagingSenderId = await input({
    message: 'Messaging sender ID:',
    validate: (raw: string) =>
      raw.trim() ? true : 'Required — the numeric project number.',
  });

  const authDomain = await input({
    message: 'Auth domain:',
    default: defaults.authDomain,
  });

  const storageBucket = await input({
    message: 'Storage bucket:',
    default: defaults.storageBucket,
  });

  return {
    projectId: id,
    apiKey: apiKey.trim(),
    appId: appId.trim(),
    messagingSenderId: messagingSenderId.trim(),
    authDomain: authDomain.trim() || defaults.authDomain,
    storageBucket: storageBucket.trim() || defaults.storageBucket,
  };
}

/** The `.env.local` body, kept pure so the ordering is testable. */
export function envFileFor(credentials: FirebaseCredentials): string {
  return (
    `EXPO_PUBLIC_FIREBASE_API_KEY=${credentials.apiKey}\n` +
    `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=${credentials.authDomain}\n` +
    `EXPO_PUBLIC_FIREBASE_PROJECT_ID=${credentials.projectId}\n` +
    `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=${credentials.storageBucket}\n` +
    `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${credentials.messagingSenderId}\n` +
    `EXPO_PUBLIC_FIREBASE_APP_ID=${credentials.appId}\n`
  );
}

/**
 * Rewrites `.firebaserc`'s default project.
 *
 * Pure so it can be unit-tested, like `patchSupabaseConfigText`. Unlike the
 * Supabase config patch this cannot run as a scaffold patch: those execute
 * before the backend step, and the Firebase project id is only known once the
 * user has been prompted for it.
 */
export function patchFirebaseRcText(
  content: string,
  projectId: string
): string {
  try {
    const parsed = JSON.parse(content) as {
      projects?: Record<string, string>;
    };
    return `${JSON.stringify(
      { ...parsed, projects: { ...parsed.projects, default: projectId } },
      null,
      2
    )}\n`;
  } catch {
    // Hand-edited into something unparseable. Replacing it wholesale is better
    // than throwing — the file has one job.
    return `${JSON.stringify({ projects: { default: projectId } }, null, 2)}\n`;
  }
}

/**
 * Collects the web config, writes `.env.local` and `.firebaserc`, and drives
 * firebase-tools when it is available.
 *
 * Every part of this degrades. A user who skips the prompts, or has no
 * firebase-tools, still ends up with a working project and the exact commands
 * they need.
 */
export async function connectFirebase(
  ctx: ScaffoldContext<FirebaseOptions>
): Promise<FirebaseCredentials | null> {
  const credentials = await promptForCredentials();
  if (!credentials) return null;

  try {
    await writeFile(
      path.join(ctx.projectPath, '.env.local'),
      envFileFor(credentials)
    );
    logger.success('Wrote .env.local');
  } catch (error) {
    softFail('Could not write .env.local.', {
      hint: 'Copy .env.example to .env.local and fill it in by hand.',
      cause: error,
    });
    return credentials;
  }

  // Best effort: the CLI reads this to know which project to deploy to, but a
  // failure here is a one-line manual fix, not a broken scaffold.
  const firebaseRc = path.join(ctx.projectPath, '.firebaserc');
  try {
    if (await pathExists(firebaseRc)) {
      await writeFile(
        firebaseRc,
        patchFirebaseRcText(await readFile(firebaseRc), credentials.projectId)
      );
      logger.success('Set the default project in .firebaserc');
    }
  } catch (error) {
    logger.debug(`Could not patch .firebaserc: ${String(error)}`);
  }

  const deployCommands = [
    `npx firebase-tools use ${credentials.projectId}`,
    'npx firebase-tools deploy --only firestore,storage',
  ];

  if (!hasFirebaseCli(ctx.projectPath)) {
    logger.newline();
    logger.warn(
      'firebase-tools is not installed, so your rules and indexes are not deployed yet.'
    );
    logger.plain(
      theme.dim('  Until they are, every query fails. Install it, then run:')
    );
    for (const line of [
      'npm install -g firebase-tools',
      'npx firebase-tools login',
      ...deployCommands,
    ]) {
      logger.plain(theme.dim('  ') + theme.code(line));
    }
    return credentials;
  }

  runExternalSequence(
    [
      {
        title: 'Selecting your Firebase project',
        command: `npx firebase-tools use ${credentials.projectId}`,
        heads_up:
          'If you are not signed in, run `npx firebase-tools login` first.',
        // Nothing after this works without a selected project.
        required: true,
      },
      {
        title: 'Deploying security rules and indexes',
        detail: [
          'Until these exist, every query fails with permission-denied or a missing index.',
        ],
        command: 'npx firebase-tools deploy --only firestore,storage',
      },
    ],
    { cwd: ctx.projectPath }
  );

  if (authRequested(ctx.options)) {
    logger.newline();
    logger.plain(
      theme.dim(
        '  Remember to enable Email/Password under Authentication → Sign-in method.'
      )
    );
  }

  return credentials;
}
