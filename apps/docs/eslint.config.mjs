import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * Next 16 removed the `next lint` command and `eslint-config-next` now ships
 * flat configs directly, so this is consumed by the ESLint CLI with no
 * `FlatCompat` shim. `core-web-vitals` already spreads the base config.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'prefer-const': 'off',
      'prefer-rest-params': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // `next lint` used to apply these implicitly; the CLI needs them spelled out.
    ignores: ['.next/**', '.source/**', 'public/**', 'node_modules/**'],
  },
];

export default eslintConfig;
