// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the whole workspace so edits in packages/registry trigger a rebuild.
config.watchFolders = [workspaceRoot];

// Note: the `nodeModulesPaths` / `disableHierarchicalLookup` overrides this file
// used to carry are gone. `expo/metro-config` resolves workspace packages on its
// own now, and SDK 55 turned on `autolinkingModuleResolution` for monorepos by
// default — `expo-doctor` flags the overrides as a config mismatch. `watchFolders`
// is the one thing Expo can't infer.
//
// The `@/…` aliases that map into packages/registry are declared in
// tsconfig.json. Expo's Metro reads tsconfig `paths` natively, so they need no
// duplication here.

module.exports = config;
