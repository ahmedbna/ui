// src/utils/registry.ts
import path from 'path';
import { CliError } from './errors.js';
import { pathExists, readFile, readJson } from './filesystem.js';

/**
 * Everything that used to live here — dependency resolution, conflict
 * detection over the registry graph, template reads off disk — moved to the
 * registry itself. The CLI now receives a flattened, self-contained payload
 * from `ui.ahmedbna.com/r/<name>.json`, so all that remains is verifying the
 * target project before writing into it.
 */

/** Strip `//` and block comments so a commented tsconfig still parses. */
function parseJsonc(text: string): unknown {
  const withoutComments = text
    .replace(
      /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
      (match, comment) => (comment ? ' ' : match)
    )
    // Trailing commas are legal in tsconfig and fatal to JSON.parse.
    .replace(/,(\s*[}\]])/g, '$1');
  return JSON.parse(withoutComments);
}

/**
 * True when `tsconfig.json` maps `@/*` onto the project root.
 *
 * Every shipped component imports through `@/components/ui/...`,
 * `@/hooks/...` and `@/theme/...`. Without the alias `add` writes perfectly
 * good files that cannot resolve, and the failure surfaces later as a wall of
 * Metro errors with nothing pointing back at this command — historically the
 * most common way a first `bna-ui add` in an existing project went wrong.
 */
async function hasPathAlias(projectPath: string): Promise<boolean> {
  for (const name of ['tsconfig.json', 'jsconfig.json']) {
    const configPath = path.join(projectPath, name);
    if (!(await pathExists(configPath))) continue;

    try {
      const config = parseJsonc(await readFile(configPath)) as {
        compilerOptions?: { paths?: Record<string, unknown> };
      };
      const paths = config.compilerOptions?.paths;
      if (paths && Object.keys(paths).some((key) => key === '@/*')) return true;
    } catch {
      // An unparseable config is not proof the alias is missing; say nothing
      // rather than block the install on our own parser.
      return true;
    }
  }
  return false;
}

/**
 * Throws unless `projectPath` is somewhere components can actually be written.
 */
export async function assertUsableProject(projectPath: string): Promise<void> {
  const packageJsonPath = path.join(projectPath, 'package.json');

  if (!(await pathExists(packageJsonPath))) {
    throw new CliError('No package.json here.', {
      hint: 'Run this inside your app, or scaffold one first with `bna-ui init <name>`.',
    });
  }

  let packageJson: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  try {
    packageJson = await readJson(packageJsonPath);
  } catch (error) {
    throw new CliError('Could not read package.json.', {
      hint: 'It may be malformed — check that it is valid JSON.',
      cause: error,
    });
  }

  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (!deps['react-native'] && !deps['expo']) {
    throw new CliError(
      "This doesn't look like a React Native or Expo project.",
      {
        hint: 'BNA UI components are React Native. Start one with `bna-ui init <name>`.',
      }
    );
  }

  if (!(await hasPathAlias(projectPath))) {
    throw new CliError('Your tsconfig.json has no `@/*` path alias.', {
      hint:
        'Components import through `@/components/ui/...`, so add this to compilerOptions and run again:\n' +
        '    "paths": { "@/*": ["./*"] }',
    });
  }
}
