/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest.setup.js'],
  // Everything under node_modules ships untranspiled ESM in the React Native
  // ecosystem, so the default `transformIgnorePatterns` has to be narrowed or
  // the first import fails with "Unexpected token 'export'".
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|firebase|@firebase/.*)',
  ],
  // Jest does not read `paths` from tsconfig.json, so `@/…` has to be mapped
  // again here or every import in a test fails to resolve.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  // `rules-tests/` is a separate Node project against the emulator — see
  // jest.rules.config.js. Running it here would try to boot it under Metro.
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/rules-tests/'],
  collectCoverageFrom: ['hooks/**/*.ts', 'lib/**/*.ts', 'app/**/*.tsx'],
};
