import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  checkExistingDependencies,
  getDependencyInfo,
  isExpoProject,
  parseDependency,
} from '../src/utils/dependencies.js';

describe('parseDependency', () => {
  it('reads a bare name as "latest"', () => {
    expect(parseDependency('expo-haptics')).toEqual({
      name: 'expo-haptics',
      version: 'latest',
    });
  });

  it('splits an explicit version off', () => {
    expect(parseDependency('expo-haptics@57.0.1')).toEqual({
      name: 'expo-haptics',
      version: '57.0.1',
    });
  });

  /**
   * The regression this guards: splitting on the first `@` treats a scoped
   * package's leading `@` as a version delimiter and yields an empty name, so
   * the package never matches anything already in package.json.
   */
  it('does not mistake a scope for a version', () => {
    expect(parseDependency('@expo/vector-icons')).toEqual({
      name: '@expo/vector-icons',
      version: 'latest',
    });
    expect(parseDependency('@react-native-masked-view/masked-view')).toEqual({
      name: '@react-native-masked-view/masked-view',
      version: 'latest',
    });
  });

  it('handles a scoped package with a version', () => {
    expect(parseDependency('@expo/vector-icons@15.0.2')).toEqual({
      name: '@expo/vector-icons',
      version: '15.0.2',
    });
  });
});

describe('project inspection', () => {
  let dir: string;

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'bna-deps-'));
  });

  afterEach(async () => {
    await fs.remove(dir);
  });

  const write = (pkg: Record<string, unknown>) =>
    fs.writeJson(path.join(dir, 'package.json'), pkg);

  it('detects an Expo project', async () => {
    await write({ dependencies: { expo: '~57.0.8' } });
    expect(isExpoProject(dir)).toBe(true);
  });

  it('does not treat a plain project as Expo', async () => {
    await write({ dependencies: { react: '19.2.3' } });
    expect(isExpoProject(dir)).toBe(false);
  });

  it('reports no Expo project when package.json is missing', () => {
    expect(isExpoProject(dir)).toBe(false);
  });

  it('skips scoped packages that are already installed', async () => {
    await write({ dependencies: { '@expo/vector-icons': '^15.0.2' } });

    expect(
      checkExistingDependencies(['@expo/vector-icons', 'expo-haptics'], dir)
    ).toEqual(['expo-haptics']);

    expect(
      getDependencyInfo(['@expo/vector-icons', 'expo-haptics'], dir)
    ).toEqual({
      missing: ['expo-haptics'],
      existing: ['@expo/vector-icons'],
    });
  });
});
