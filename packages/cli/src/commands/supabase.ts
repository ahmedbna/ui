import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import ora from 'ora';
import { copyTemplate, writeFile } from '../utils/filesystem.js';
import { logger } from '../utils/logger.js';
import {
  detectPackageManagerFromInvocation,
  installDependencies,
  getRunCommand,
  type PackageManager,
} from '../utils/package-manager.js';
import {
  validateProjectName,
  validateProjectPath,
  sanitizeProjectName,
} from '../utils/validation.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface InitSupabaseOptions {
  template?: string;
  npm?: boolean;
  yarn?: boolean;
  pnpm?: boolean;
  bun?: boolean;
  skipInstall?: boolean;
  skipSupabase?: boolean;
  /** Commander's `--no-auth` negation: true unless the flag was passed. */
  auth?: boolean;
}

/** What the two prompts collect, when the user answers them. */
interface SupabaseCredentials {
  url: string;
  publishableKey: string;
}

export async function initSupabaseCommand(
  projectName?: string,
  options: InitSupabaseOptions = {}
) {
  // `--no-auth` scaffolds a Supabase backend with no sign-in; the default is
  // the auth starter, matching `bna-ui convex`.
  const withAuth = options.auth !== false;

  // Show the banner first
  logger.banner();
  logger.header(
    withAuth
      ? '🚀 Welcome to BNA - Expo React Native Starter with Supabase Auth'
      : '🚀 Welcome to BNA - Expo React Native Starter with Supabase'
  );

  try {
    // Get project name
    let finalProjectName = projectName;
    let useCurrentDirectory = false;

    if (!finalProjectName) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What is your project name?',
          default: 'bna-supabase-app',
          validate: (input: string) => {
            if (input === '.') {
              return true; // Allow current directory
            }
            const validation = validateProjectName(input);
            return (
              validation.valid || validation.message || 'Invalid project name'
            );
          },
        },
      ]);
      finalProjectName = answers.projectName;
    }

    // Check if user wants to use current directory
    if (finalProjectName === '.') {
      useCurrentDirectory = true;
      const currentDirName = path.basename(process.cwd());

      const nameValidation = validateProjectName(currentDirName);
      if (!nameValidation.valid) {
        logger.error(
          `Current directory name "${currentDirName}" is not a valid project name.`
        );
        logger.error(nameValidation.message!);

        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'Please enter a valid project name:',
            default: 'bna-supabase-app',
            validate: (input: string) => {
              const validation = validateProjectName(input);
              return (
                validation.valid || validation.message || 'Invalid project name'
              );
            },
          },
        ]);
        finalProjectName = answers.projectName;
      } else {
        finalProjectName = currentDirName;
      }
    }

    const nameValidation = validateProjectName(
      finalProjectName ?? 'bna-supabase'
    );
    if (!nameValidation.valid) {
      logger.error(nameValidation.message!);
      process.exit(1);
    }

    const sanitizedName = sanitizeProjectName(
      finalProjectName ?? 'bna-supabase'
    );
    let projectPath: string;

    if (useCurrentDirectory) {
      projectPath = process.cwd();

      const files = fs.readdirSync(projectPath);
      const safeFiles = [
        '.git',
        '.gitignore',
        'README.md',
        'LICENSE',
        '.DS_Store',
      ];
      const conflictingFiles = files.filter(
        (file) => !safeFiles.includes(file)
      );

      if (conflictingFiles.length > 0) {
        logger.warn('Current directory is not empty. Found:');
        conflictingFiles.forEach((file) => logger.plain(`  ${file}`));

        const { proceed } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'proceed',
            message: 'Continue anyway?',
            default: false,
          },
        ]);

        if (!proceed) {
          logger.info('Initialization cancelled.');
          process.exit(0);
        }
      }
    } else {
      projectPath = path.resolve(process.cwd(), sanitizedName);

      const pathValidation = validateProjectPath(projectPath);
      if (!pathValidation.valid) {
        logger.error(pathValidation.message!);
        process.exit(1);
      }
    }

    // Determine package manager based on CLI flags or invocation method
    let packageManager: PackageManager;

    if (options.npm) packageManager = 'npm';
    else if (options.yarn) packageManager = 'yarn';
    else if (options.pnpm) packageManager = 'pnpm';
    else if (options.bun) packageManager = 'bun';
    else {
      packageManager = detectPackageManagerFromInvocation();
      logger.info(`Detected package manager: ${packageManager}`);
    }

    const spinner = ora('Creating your BNA Supabase project...').start();

    try {
      // dist/commands -> dist/templates (populated by scripts/copy-starters.mjs)
      const templatePath = path.resolve(
        __dirname,
        withAuth
          ? '../templates/start-supabase-auth'
          : '../templates/start-supabase'
      );
      await copyTemplate(templatePath, projectPath);

      await updatePackageJson(projectPath, sanitizedName);
      await updateAppJson(projectPath, sanitizedName);
      await updateSupabaseConfig(projectPath, sanitizedName);

      spinner.succeed('Project created successfully!');

      if (!options.skipInstall) {
        await installDependencies(projectPath, packageManager);
      }

      let credentials: SupabaseCredentials | null = null;
      if (!options.skipSupabase) {
        credentials = await connectSupabase(projectPath, withAuth);
      }

      showSuccessMessage(
        sanitizedName,
        packageManager,
        options.skipInstall ?? false,
        options.skipSupabase ?? false,
        useCurrentDirectory,
        withAuth,
        credentials
      );
    } catch (error) {
      spinner.fail('Failed to create project');
      throw error;
    }
  } catch (error) {
    logger.error('An error occurred:', error);
    process.exit(1);
  }
}

async function updatePackageJson(
  projectPath: string,
  projectName: string
): Promise<void> {
  const packageJsonPath = path.join(projectPath, 'package.json');

  try {
    const fileContent = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(fileContent);

    packageJson.name = projectName;

    const updatedContent = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync(packageJsonPath, updatedContent, 'utf-8');
  } catch (error) {
    logger.error(`Failed to update package.json for project: ${projectName}`);
    logger.debug(error as string);
    throw new Error('Could not update package.json.');
  }
}

async function updateAppJson(
  projectPath: string,
  projectName: string
): Promise<void> {
  const appJsonPath = path.join(projectPath, 'app.json');

  try {
    const fileContent = fs.readFileSync(appJsonPath, 'utf-8');
    const appConfig = JSON.parse(fileContent);

    appConfig.expo.name = projectName;
    appConfig.expo.slug = projectName;
    // The deep-link scheme OAuth and magic links return to. It has to match the
    // redirect URLs registered in Supabase, which is why the final message
    // spells them out using this exact name.
    appConfig.expo.scheme = projectName;

    const updatedContent = JSON.stringify(appConfig, null, 2);
    fs.writeFileSync(appJsonPath, updatedContent, 'utf-8');
  } catch (error) {
    logger.error(`Failed to update app.json for project: ${projectName}`);
    logger.debug(error as string);
    throw new Error('Could not update app.json.');
  }
}

/**
 * Rewrites the scheme in the local stack's auth allow-list.
 *
 * `supabase start` reads config.toml, and a `site_url` still pointing at `bna`
 * silently rejects every redirect once the app's scheme is the project name.
 * Purely local — a linked project reads its allow-list from the dashboard.
 */
async function updateSupabaseConfig(
  projectPath: string,
  projectName: string
): Promise<void> {
  const configPath = path.join(projectPath, 'supabase', 'config.toml');

  try {
    if (!fs.existsSync(configPath)) return;

    const original = fs.readFileSync(configPath, 'utf-8');
    const updated = original
      .replace(/^project_id = ".*"$/m, `project_id = "${projectName}"`)
      .replace(/\bbna:\/\//g, `${projectName}://`);

    fs.writeFileSync(configPath, updated, 'utf-8');
  } catch (error) {
    // Not fatal: the app still runs against a hosted project, and the docs
    // cover editing this by hand.
    logger.debug('Could not update supabase/config.toml:', error);
  }
}

/** `https://abcdefgh.supabase.co` -> `abcdefgh` */
function projectRefFromUrl(url: string): string | null {
  const match = /^https?:\/\/([a-z0-9]+)\.supabase\.(co|red)/i.exec(url.trim());
  return match ? match[1] : null;
}

function hasSupabaseCli(projectPath: string): boolean {
  try {
    execSync('npx --no-install supabase --version', {
      cwd: projectPath,
      stdio: 'ignore',
      timeout: 20000,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Collects credentials, writes `.env.local`, and runs the Supabase CLI when it
 * is available.
 *
 * Everything here degrades: a user who skips the prompts, or who has no
 * Supabase CLI installed, still ends up with a working project and a printed
 * list of the exact commands they need. Nothing in this function is allowed to
 * fail the scaffold.
 */
async function connectSupabase(
  projectPath: string,
  withAuth: boolean
): Promise<SupabaseCredentials | null> {
  logger.newline();
  logger.info('Connecting to Supabase...');
  logger.plain(
    'Find these under Project Settings → API in your Supabase dashboard.'
  );
  logger.plain('Press enter to skip and fill in .env.local yourself later.');
  logger.newline();

  const { url } = await inquirer.prompt([
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

  const { publishableKey } = await inquirer.prompt([
    {
      type: 'input',
      name: 'publishableKey',
      message: 'Publishable key (sb_publishable_…):',
      validate: (input: string) => {
        const value = input.trim();
        if (!value) return 'A key is required now that a URL was given.';
        if (value.startsWith('sb_secret_')) {
          // This is worth stopping for: a secret key bypasses RLS, and
          // EXPO_PUBLIC_ variables are compiled into the app bundle.
          return 'That is a secret key. It would ship inside your app — use the publishable key.';
        }
        return true;
      },
    },
  ]);

  const credentials: SupabaseCredentials = {
    url: url.trim(),
    publishableKey: publishableKey.trim(),
  };

  try {
    await writeFile(
      path.join(projectPath, '.env.local'),
      `EXPO_PUBLIC_SUPABASE_URL=${credentials.url}\n` +
        `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${credentials.publishableKey}\n`
    );
    logger.success('✅ Wrote .env.local');
  } catch (error) {
    logger.error('❌ Could not write .env.local.');
    logger.debug('env write error:', error);
    return credentials;
  }

  const projectRef = projectRefFromUrl(credentials.url)!;

  if (!hasSupabaseCli(projectPath)) {
    logger.newline();
    logger.warn('The Supabase CLI is not installed, so the database is empty.');
    logger.plain('Install it, then run these three from your project:');
    logger.plain('  npm install -g supabase');
    logger.plain(`  npx supabase link --project-ref ${projectRef}`);
    logger.plain('  npx supabase db push');
    logger.plain('  npm run db:types');
    if (withAuth) {
      logger.plain('  npm run functions:deploy');
    }
    return credentials;
  }

  // --- Link the project ---
  try {
    logger.info('1. Linking your Supabase project...');
    logger.warn('You may be asked for your database password.');

    execSync(`npx supabase link --project-ref ${projectRef}`, {
      cwd: projectPath,
      stdio: 'inherit',
    });

    logger.success('✅ Project linked!');
    logger.newline();
  } catch (error) {
    logger.error('❌ Failed to link the project.');
    logger.warn('You can run it yourself later:');
    logger.plain(`   npx supabase link --project-ref ${projectRef}`);
    logger.debug('supabase link error:', error);
    // Everything below needs a link, so stop here.
    return credentials;
  }

  // --- Apply the migrations ---
  try {
    logger.info('2. Applying migrations...');
    logger.plain(
      'Creates the tables, row level security policies and buckets.'
    );

    execSync('npx supabase db push', {
      cwd: projectPath,
      stdio: 'inherit',
    });

    logger.success('✅ Migrations applied!');
    logger.newline();
  } catch (error) {
    logger.error('❌ Failed to apply migrations.');
    logger.warn('You can run it yourself later:');
    logger.plain('   npx supabase db push');
    logger.debug('supabase db push error:', error);
    return credentials;
  }

  // --- Generate types ---
  try {
    logger.info('3. Generating TypeScript types from your schema...');

    const types = execSync('npx supabase gen types typescript --linked', {
      cwd: projectPath,
      encoding: 'utf-8',
    });

    // Written through Node rather than a shell redirect so this behaves the
    // same on Windows.
    await writeFile(path.join(projectPath, 'lib', 'database.types.ts'), types);

    logger.success('✅ Types written to lib/database.types.ts');
    logger.newline();
  } catch (error) {
    logger.error('❌ Failed to generate types.');
    logger.warn('The checked-in types still match the shipped migrations.');
    logger.plain('   npm run db:types');
    logger.debug('supabase gen types error:', error);
  }

  return credentials;
}

function showSuccessMessage(
  projectName: string,
  packageManager: PackageManager,
  skipInstall: boolean,
  skipSupabase: boolean,
  useCurrentDirectory: boolean,
  withAuth: boolean,
  credentials: SupabaseCredentials | null
): void {
  logger.newline();
  logger.success(
    withAuth
      ? `🎉 Successfully created ${projectName} with Supabase Auth!`
      : `🎉 Successfully created ${projectName} with Supabase!`
  );
  logger.newline();

  logger.info('Next steps:');

  if (!useCurrentDirectory) {
    logger.plain(`  cd ${projectName}`);
  }

  if (skipInstall) {
    const installCommand =
      packageManager === 'npm'
        ? 'npm install'
        : packageManager === 'yarn'
          ? 'yarn'
          : packageManager === 'bun'
            ? 'bun install'
            : 'pnpm install';

    logger.plain(`  ${installCommand}`);
  }

  if (skipSupabase || !credentials) {
    logger.plain('  cp .env.example .env.local   # then fill it in');
    logger.plain('  npx supabase link --project-ref <your-project-ref>');
    logger.plain('  npx supabase db push');
    logger.plain('  npm run db:types');
  }

  logger.plain(`  ${getRunCommand(packageManager, 'start')}`);
  logger.newline();

  logger.info('Available commands:');
  logger.plain(
    `  ${getRunCommand(
      packageManager,
      'start'
    )}    Start the development server`
  );
  logger.plain(`  ${getRunCommand(packageManager, 'android')}  Run on Android`);
  logger.plain(`  ${getRunCommand(packageManager, 'ios')}      Run on iOS`);
  logger.plain(`  ${getRunCommand(packageManager, 'web')}      Run on Web`);
  logger.newline();

  logger.info('Supabase commands:');
  logger.plain(
    '  npx supabase start      Run the whole stack locally (Docker)'
  );
  logger.plain('  npm run db:push         Apply migrations to your project');
  logger.plain('  npm run db:types        Regenerate lib/database.types.ts');
  logger.plain('  npm run functions:deploy  Deploy the edge functions');
  logger.newline();

  if (withAuth) {
    // OAuth and magic links come back through a deep link, and Supabase
    // rejects any redirect target that is not on this list. Nothing else in
    // the flow can set it — it lives in the dashboard.
    logger.info(
      'Before OAuth and magic links work, allow-list your redirects:'
    );
    logger.plain('  Authentication → URL Configuration → Redirect URLs');
    logger.plain('    exp://localhost:8081');
    logger.plain(`    ${projectName}://`);
    logger.plain(`    ${projectName}://reset-password`);
    logger.newline();
    logger.plain('  https://ui.ahmedbna.com/docs/installation/supabase-auth');
    logger.newline();
  }

  logger.info('Happy coding with Supabase! 🚀');
}
