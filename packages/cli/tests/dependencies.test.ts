import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  buildInstallCommand,
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
    await fs.rm(dir, { recursive: true, force: true });
  });

  const write = (pkg: Record<string, unknown>) =>
    fs.writeFile(path.join(dir, 'package.json'), JSON.stringify(pkg));

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

describe('buildInstallCommand', () => {
  const expo = { isDev: false, isExpo: true };
  const plain = { isDev: false, isExpo: false };

  it('pins to the SDK with `expo install` in an Expo project', () => {
    expect(buildInstallCommand(['expo-camera'], 'npm', expo)).toBe(
      'npx expo install expo-camera'
    );
  });

  // `bunx --bun bna-ui add camera` never touches Node, so a machine with bun
  // and no Node had no `npx` to call — `add` resolved every file it was about
  // to write and then died on the install.
  it('launches expo through bunx for a bun project', () => {
    expect(buildInstallCommand(['expo-camera'], 'bun', expo)).toBe(
      'bunx expo install expo-camera'
    );
  });

  it('leaves the other managers on npx, which ships with Node', () => {
    for (const manager of ['npm', 'pnpm', 'yarn'] as const) {
      expect(buildInstallCommand(['expo-camera'], manager, expo)).toMatch(
        /^npx expo install/
      );
    }
  });

  it('falls back to the package manager outside an Expo project', () => {
    expect(buildInstallCommand(['zod'], 'bun', plain)).toBe('bun add zod');
    expect(buildInstallCommand(['zod'], 'pnpm', plain)).toBe('pnpm add zod');
    expect(buildInstallCommand(['zod'], 'npm', plain)).toBe('npm install zod');
  });

  // `expo install` has no dev-dependency mode, so dev installs always go
  // through the package manager regardless of project type.
  it('never routes a dev dependency through expo install', () => {
    expect(
      buildInstallCommand(['typescript'], 'bun', { isDev: true, isExpo: true })
    ).toBe('bun add -D typescript');
  });

  it('passes every package in one command', () => {
    expect(
      buildInstallCommand(['expo-camera', 'expo-media-library'], 'bun', expo)
    ).toBe('bunx expo install expo-camera expo-media-library');
  });
});
