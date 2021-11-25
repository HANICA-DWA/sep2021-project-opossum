module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['prettier', 'jest'],
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-underscore-dangle': 'warn',
    'no-unused-vars': 'warn',
  },
};
