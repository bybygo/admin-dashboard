import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import eslintConfigBase from './eslint.config.base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigBase,
  prettierPluginRecommended,
  prettierConfig,
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
];
