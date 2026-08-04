// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/*',
      // Vendored BNA UI source. These files are copied in by `npx bna-ui add`
      // and replaced wholesale on the next one, so linting them fails your
      // build on someone else's style rules and any fix you make is lost.
      // Everything you write — app/, hooks/, lib/ — is still linted.
      'components/ui/**',
      'components/charts/**',
      'theme/**',
      'hooks/useColor*',
      'hooks/useKeyboardHeight*',
      'hooks/useModeToggle*',
      'hooks/useBottomTabOverflow*',
    ],
  },
]);
