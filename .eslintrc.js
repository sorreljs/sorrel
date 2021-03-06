module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  rules: {
    'prettier/prettier': 2,
    '@typescript-eslint/explicit-member-accessibility': [
      1,
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'no-public',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit'
        }
      }
    ],
    '@typescript-eslint/member-ordering': 1,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': [1, {functions: false}],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/semi': 1,
    'array-bracket-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'never'],
    'comma-dangle': [2, 'never'],
    'brace-style': [2, '1tbs', {allowSingleLine: true}],
    'comma-spacing': [2, {before: false, after: true}],
    'computed-property-spacing': [2, 'never'],
    eqeqeq: [2, 'allow-null'],
    'key-spacing': [2, {beforeColon: false, afterColon: true}],
    quotes: [2, 'single'],
    'space-before-function-paren': [0, 'always'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {words: true, nonwords: false}],
    'no-empty': 1,
    'no-multi-spaces': 2,
    'keyword-spacing': 2,
    'spaced-comment': ['error', 'always', {exceptions: ['-', '+']}],
    'no-trailing-spaces': [1, {skipBlankLines: true}],
    'no-multiple-empty-lines': [1, {max: 1, maxBOF: 0, maxEOF: 0}],
    'eol-last': 1,
    'guard-for-in': 2,
    'func-call-spacing': 2
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  root: true,
  env: {
    node: true
  }
};
