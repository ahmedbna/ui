/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest.setup.js'],
  // Everything under node_modules ships untranspiled ESM in the React Native
  // ecosystem, so the default `transformIgnorePatterns` has to be narrowed or
  // the first import fails with "Unexpected token 'export'".
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|convex/.*)',
  ],
  // Jest does not read `paths` from tsconfig.json, so `@/…` has to be mapped
  // again here or every import in a test fails to resolve.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: ['convex/**/*.ts', 'app/**/*.tsx'],
};
