/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['chakra-ui', '@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: { '@typescript-eslint/no-floating-promises': 'error' },
    },
  ],
  ignorePatterns: ['node_modules', '.cache', 'dist', 'build', 'public/build'],
}
