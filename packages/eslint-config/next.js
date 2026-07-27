import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

/** @type {import('eslint').Linter.Config[]} */
export const next = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: [
      '**/.next/**',
      '**/.source/**',
      '**/node_modules/**',
      '**/.turbo/**',
    ],
  },
];

export default next;
