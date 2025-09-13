import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { logger } from '../utils/logger.js';
import {
  validateProjectName,
  validateProjectPath,
  sanitizeProjectName,
} from '../utils/validation.js';
import { copyTemplate, replaceInFile } from '../utils/filesystem.js';
import {
  detectPackageManagerFromInvocation,
  installDependencies,
  getRunCommand,
  type PackageManager,
} from '../utils/package-manager.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface InitConvexOptions {
  template?: string;
  npm?: boolean;
  yarn?: boolean;
  pnpm?: boolean;
  bun?: boolean;
  skipInstall?: boolean;
  skipConvex?: boolean;
}

export async function initConvexCommand(
  projectName?: string,
  options: InitConvexOptions = {}
) {
  // Show the banner first
  logger.banner();
  logger.header('🚀 Welcome to BNA - Expo React Native Starter with Convex');

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
          default: 'bna-convex-app',
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

      // Validate current directory name as project name
      const nameValidation = validateProjectName(currentDirName);
      if (!nameValidation.valid) {
        logger.error(
          `Current directory name "${currentDirName}" is not a valid project name.`
        );
        logger.error(nameValidation.message!);

        // Ask for a different project name
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'Please enter a valid project name:',
            default: 'bna-convex-app',
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

    // Validate and sanitize project name
    const nameValidation = validateProjectName(
      finalProjectName ?? 'bna-convex'
    );
    if (!nameValidation.valid) {
      logger.error(nameValidation.message!);
      process.exit(1);
    }

    const sanitizedName = sanitizeProjectName(finalProjectName ?? 'bna-convex');
    let projectPath: string;

    if (useCurrentDirectory) {
      projectPath = process.cwd();

      // Check if current directory is empty or only contains safe files
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

      // Validate project path
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
      // Detect from how the CLI was invoked
      packageManager = detectPackageManagerFromInvocation();
      logger.info(`Detected package manager: ${packageManager}`);
    }

    // Create project
    const spinner = ora('Creating your BNA Convex project...').start();

    try {
      // Copy template files
      const templatePath = path.resolve(
        __dirname,
        '../../templates/start-convex'
      );
      await copyTemplate(templatePath, projectPath);

      // Update package.json
      await updatePackageJson(projectPath, sanitizedName);

      // Update app.json
      await updateAppJson(projectPath, sanitizedName);

      spinner.succeed('Project created successfully!');

      // Install dependencies
      if (!options.skipInstall) {
        await installDependencies(projectPath, packageManager);
      }

      // Initialize Convex
      if (!options.skipConvex) {
        await initializeConvex(projectPath, packageManager, sanitizedName);
      }

      // Show success message
      showSuccessMessage(
        sanitizedName,
        packageManager,
        options.skipInstall ?? false,
        options.skipConvex ?? false,
        useCurrentDirectory
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
    // Read the package.json file
    const fileContent = fs.readFileSync(packageJsonPath, 'utf-8');

    // Parse the JSON content into a JavaScript object
    const packageJson = JSON.parse(fileContent);

    // Update the 'name' property
    packageJson.name = projectName;

    // Convert the object back to a nicely formatted JSON string
    const updatedContent = JSON.stringify(packageJson, null, 2);

    // Write the updated content back to the file
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
    // Read the file content
    const fileContent = fs.readFileSync(appJsonPath, 'utf-8');

    // Parse the JSON into a JavaScript object
    const appConfig = JSON.parse(fileContent);

    // Modify the desired properties within the 'expo' object
    appConfig.expo.name = projectName;
    appConfig.expo.slug = projectName;
    appConfig.expo.scheme = projectName;

    // Convert the modified object back to a formatted JSON string
    const updatedContent = JSON.stringify(appConfig, null, 2);

    // Write the updated content back to the file
    fs.writeFileSync(appJsonPath, updatedContent, 'utf-8');
  } catch (error) {
    logger.error(`Failed to update app.json for project: ${projectName}`);
    logger.debug(error as string);
    // Re-throw the error to stop the initialization process if app.json is crucial
    throw new Error('Could not update app.json.');
  }
}

async function initializeConvex(
  projectPath: string,
  packageManager: PackageManager,
  projectName: string
): Promise<void> {
  logger.newline();
  logger.info('Initializing Convex...');
  logger.plain(
    'The next steps are interactive. Please follow the prompts from the Convex CLI.'
  );
  logger.newline();

  // --- Initialize Convex Backend ---
  try {
    logger.info('1. Setting up your Convex backend...');
    logger.warn('A browser window will open for you to log in or sign up.');

    execSync('npx convex dev --once', {
      cwd: projectPath,
      stdio: 'inherit',
    });

    logger.success('✅ Convex backend initialized!');
    logger.newline();
  } catch (error) {
    logger.error('❌ Failed to initialize Convex backend.');
    logger.warn(
      'You can try running "npx convex dev" in your project directory later.'
    );
    logger.debug('Convex init error:', error);
    // Exit here, as the next steps will fail if the backend isn't set up.
    return;
  }

  // --- Initialize Convex Auth ---
  try {
    logger.info('2. Setting up Convex Auth...');
    logger.warn(
      'This will add authentication files to your project. Please follow the prompts.'
    );

    execSync('npx @convex-dev/auth', {
      cwd: projectPath,
      stdio: 'inherit',
    });

    logger.success('✅ Convex Auth configured!');
    logger.newline();
  } catch (error) {
    logger.error('❌ Failed to set up Convex Auth.');
    logger.warn(
      'You can try running "npx @convex-dev/auth" in your project directory later.'
    );
    logger.debug('Convex Auth error:', error);
  }

  // ---  Set EXPO_URL Environment Variable ---
  try {
    logger.info('3. Setting the Expo URL environment variable in Convex...');
    logger.plain(
      'This is required for authentication redirects to work correctly.'
    );

    // Construct the command dynamically with the project name
    const command = `npx convex env set EXPO_URL ${projectName}://`;

    execSync(command, {
      cwd: projectPath,
      stdio: 'inherit', // Show output directly to the user
    });

    logger.success('✅ EXPO_URL environment variable set!');
    logger.newline();
  } catch (error) {
    logger.error('❌ Failed to set the EXPO_URL environment variable.');
    logger.warn(
      `You can set it manually by running this command in your project directory:`
    );
    logger.plain(`   npx convex env set EXPO_URL ${projectName}://`);
    logger.debug('Convex env set error:', error);
  }

  // --- Set SITE_URL Environment Variable ---
  try {
    logger.info('4. Setting the SITE_URL environment variable in Convex...');
    logger.plain('This is used for web-based authentication flows.');

    const command = 'npx convex env set SITE_URL http://localhost:3000/';

    execSync(command, {
      cwd: projectPath,
      stdio: 'inherit',
    });

    logger.success('✅ SITE_URL environment variable set!');
    logger.newline();
  } catch (error) {
    logger.error('❌ Failed to set the SITE_URL environment variable.');
    logger.warn(
      'You can set it manually by running this command in your project directory:'
    );
    logger.plain('   npx convex env set SITE_URL http://localhost:3000/');
    logger.debug('Convex env set error:', error);
  }
}

function showSuccessMessage(
  projectName: string,
  packageManager: PackageManager,
  skipInstall: boolean,
  skipConvex: boolean,
  useCurrentDirectory: boolean
): void {
  logger.newline();
  logger.success(`🎉 Successfully created ${projectName} with Convex!`);
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

  if (skipConvex) {
    logger.plain(`  npx convex dev`);
    logger.plain(`  npx @convex-dev/auth`);
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

  if (!skipConvex) {
    logger.info('Convex commands:');
    logger.plain(`  npx convex dev        Start Convex development server`);
    logger.plain(`  npx convex dashboard  Open Convex dashboard`);
    logger.newline();
  }

  logger.info('Happy coding with Convex! 🚀');
}
