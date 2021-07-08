module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['only-warn', 'prettier'],
  env: {
    browser: true,
    jest: true,
  },
  globals: {},
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', '**/*.test.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'max-len': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
