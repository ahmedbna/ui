import expoConfig from 'eslint-config-expo/flat.js';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export const expo = [
  ...expoConfig,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/.expo/**',
      '**/node_modules/**',
      '**/.turbo/**',
    ],
  },
];

export default expo;
