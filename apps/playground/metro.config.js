// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch the whole workspace so edits in packages/registry trigger a rebuild.
config.watchFolders = [workspaceRoot];

// 2. Resolve modules from the app first, then the workspace root.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Don't walk up past the workspace root looking for node_modules.
config.resolver.disableHierarchicalLookup = true;

// Note: the `@/…` aliases that map into packages/registry are declared in
// tsconfig.json. Expo's Metro reads tsconfig `paths` natively
// (config.resolver.unstable_enablePackageExports / tsconfigPaths experiment,
// on by default since SDK 49), so they need no duplication here.

module.exports = config;
