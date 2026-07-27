import globals from 'globals';
import { base } from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export const node = [
  ...base,
  {
    files: ['**/*.{ts,js,mjs}'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];

export default node;
