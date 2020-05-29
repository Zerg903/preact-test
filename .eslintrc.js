module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'preact',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    indent: 'off',
    semi: [2, 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}