import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

// ESLint 9 requires flat config — this repo never had an .eslintrc, so
// `npm run lint` was silently broken before this file existed.
export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // react-hooks 7's "recommended" set adds React Compiler-oriented
      // purity/immutability checks that don't understand React Three
      // Fiber's idiomatic patterns — useFrame is *meant* to imperatively
      // mutate refs/the camera every frame outside React's render cycle,
      // and this project doesn't use the compiler. Both are false
      // positives across every canvas/ component here.
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',
      // R3F's <mesh>, <pointLight>, etc. are three.js JSX intrinsics with
      // their own prop set (args, intensity, emissive, ...), not DOM
      // elements — this rule only knows the HTML/SVG attribute list.
      'react/no-unknown-property': 'off',
    },
  },
];
