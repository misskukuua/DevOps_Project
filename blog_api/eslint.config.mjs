import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginJest from 'eslint-plugin-jest';

const jestConfig = {
  plugins: {
    jest: pluginJest,
  },
  languageOptions: {
    globals: {
      describe: 'readonly',
      test: 'readonly',
      expect: 'readonly',
      beforeAll: 'readonly',
      afterEach: 'readonly',
      afterAll: 'readonly',
    },
  },
  rules: {
    // Jest-specific rules
  },
};

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      // Include all plugins here
    },
    rules: {
      // General rules
    },
  },
  {
    files: ['tests/**/*.js'],
    ...jestConfig,
  },
];
