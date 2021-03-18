module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'brace-style': [ 2, 'stroustrup', ],
    'keyword-spacing': [ 'error', { 'before': true, }, ],
    'no-undef': 1,
    'no-unused-vars': 'warn',
    'react/prop-types': 0,
    'space-in-parens': [ 'error', 'always', ],
    'semi': [ 'error', 'always', ],
    'space-before-function-paren': [ 'error', 'always', ],
    'space-before-blocks': [ 'error', { 'functions': 'always', 'keywords': 'never', 'classes': 'always', }, ],
    'lines-between-class-members': [ 'error', 'always', ],
    'quotes': [ 2, 'single', ],
    'no-trailing-spaces': 'error',
    'key-spacing': [ 'error', { 'afterColon': true, }, ],
    'indent': [ 'error', 2, ],
    'comma-spacing': [ 2, { 'before': false, 'after': true, }, ],
    'comma-dangle': [ 'error', {
      'arrays': 'always',
      'objects': 'always',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }, ],
    'arrow-spacing': 'error',
    'array-bracket-spacing': [ 'error', 'always', ],
    'react/jsx-curly-spacing': [ 'warn', { 'when': 'always', 'children': {
      'when': 'always',
    }, }, ],
    'object-curly-spacing': [ 'error', 'always', ],
    'template-curly-spacing': [ 'error', 'always', ],
    'space-infix-ops': [ 'error', { 'int32Hint': false, }, ],
    'no-multiple-empty-lines': [ 'error', { 'max': 1, 'maxEOF': 0, }, ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return', },
    ],
    'jsx-a11y/anchor-is-valid': [ 'error', {
      'components': [ 'Link', ],
      'specialLink': [ 'hrefLeft', 'hrefRight', ],
      'aspects': [ 'invalidHref', 'preferButton', ],
    }, ],
  },
};
