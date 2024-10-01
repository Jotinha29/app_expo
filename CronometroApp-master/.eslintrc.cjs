// Configurações principais do ESLint
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  // Extensões e configurações recomendadas
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],

  // Ignora os arquivos e pastas a seguir
  ignorePatterns: ['dist', 'postcss.config.js', '.eslintrc.cjs'],

  // Configurações específicas para React
  settings: {
    react: {
      version: '18.2',
    },
  },

  // Plugins utilizados
  plugins: ['react-refresh', 'prettier'],

  // Regras personalizadas
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },

  // Globais disponíveis
  globals: {
    process: true,
  },
};
