import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

/**
 * Shared base config. The `import/order` rule here is deliberate: import-order
 * churn was one of the recurring sources of drift between the old repos'
 * duplicated component copies. Enforcing it once removes that class of diff.
 *
 * @type {import('eslint').Linter.Config[]}
 */
export const base = [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'no-unused-vars': 'off',
      // `try { probe() } catch {}` is the idiomatic way to feature-detect a
      // CLI tool; an empty catch there is intent, not an oversight.
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  prettier,
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/.expo/**',
      '**/.source/**',
      '**/node_modules/**',
      '**/.turbo/**',
    ],
  },
];

export default base;
