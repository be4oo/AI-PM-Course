import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// Course-shell guard: forbid using a `--module-*` color token as a background
// fill anywhere under src/course/**. Per spec FR-004, module color may appear
// only as a 2px marker — never as a `background`/`background-color` fill.
// Enforced at the JS/JSX layer via no-restricted-syntax; CSS-side enforcement
// is covered by the runtime computed-style test (tasks.md T028) because flat
// ESLint does not parse CSS files. Keep both gates in lock-step.
const MODULE_COLOR_BG_PATTERN =
  /background(?:-color)?\s*:\s*var\(\s*--module-/u
const moduleColorBgGuards = [
  {
    selector: `Literal[value=/${MODULE_COLOR_BG_PATTERN.source}/]`,
    message:
      'src/course: module color tokens (--module-*) MUST NOT be used as a background fill (spec FR-004). Apply as border-inline-start, outline-color, or SVG stroke instead.',
  },
  {
    selector: `TemplateElement[value.raw=/${MODULE_COLOR_BG_PATTERN.source}/]`,
    message:
      'src/course: module color tokens (--module-*) MUST NOT be used as a background fill (spec FR-004). Apply as border-inline-start, outline-color, or SVG stroke instead.',
  },
  {
    // JSX inline-style: <div style={{ background: 'var(--module-1)' }} />
    selector:
      'JSXAttribute[name.name="style"] Property[key.name=/^background(Color)?$/] Literal[value=/var\\(\\s*--module-/]',
    message:
      'src/course: module color tokens (--module-*) MUST NOT be used as a JSX inline-style background (spec FR-004).',
  },
]

export default defineConfig([
  globalIgnores(['dist', '.agent/**', '.agents/**', '.claude/**']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // Scoped override: enforce the module-color-as-marker invariant under src/course/
  {
    files: ['src/course/**/*.{js,jsx}'],
    rules: {
      'no-restricted-syntax': ['error', ...moduleColorBgGuards],
    },
  },
])
