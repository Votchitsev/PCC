module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    semi: [2, 'always'],
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/display-name': 'off',
    'max-len': [
      "error", {
        "code": 80,
      }
    ]
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
