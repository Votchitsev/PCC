module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
