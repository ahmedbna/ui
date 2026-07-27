// src/utils/registry.ts
import path from 'path';
import fs from 'fs-extra';
import { logger } from './logger.js';

/**
 * Everything that used to live here — dependency resolution, conflict
 * detection over the registry graph, template reads off disk — moved to the
 * registry itself. The CLI now receives a flattened, self-contained payload
 * from `ui.ahmedbna.com/r/<name>.json`, so all that remains is verifying the
 * target project before writing into it.
 */
export async function validateProjectStructure(
  projectPath: string
): Promise<boolean> {
  const packageJsonPath = path.join(projectPath, 'package.json');

  if (!(await fs.pathExists(packageJsonPath))) {
    logger.error('Required file not found: package.json');
    return false;
  }

  try {
    const packageJson = await fs.readJson(packageJsonPath);

    const hasReactNative =
      packageJson.dependencies?.['react-native'] ||
      packageJson.devDependencies?.['react-native'];
    const hasExpo =
      packageJson.dependencies?.['expo'] ||
      packageJson.devDependencies?.['expo'];

    if (!hasReactNative && !hasExpo) {
      logger.error("This doesn't appear to be a React Native or Expo project");
      return false;
    }
  } catch (error) {
    logger.error('Failed to validate project structure:', error);
    return false;
  }

  return true;
}
