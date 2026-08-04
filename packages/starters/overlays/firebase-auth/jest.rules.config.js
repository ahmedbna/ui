/**
 * Security rules tests, run against the Firestore and Storage emulators.
 *
 * A separate project from `npm test` on purpose: these run under Node rather
 * than jest-expo, they need the emulators up, and they are the one place the
 * rules files are actually executed. Drive them with `npm run rules:test`,
 * which starts the emulators, runs this config, and shuts them down again.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/rules-tests/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['babel-jest', { presets: ['babel-preset-expo'] }],
  },
  // The emulator is not instant to talk to, and a cold rules evaluation on the
  // first assertion regularly takes longer than jest's 5s default.
  testTimeout: 20000,
};
