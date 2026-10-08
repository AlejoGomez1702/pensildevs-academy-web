// @ts-check
import css from '@eslint/css';
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import boundaries from 'eslint-plugin-boundaries';
import sonarjs from 'eslint-plugin-sonarjs';
import { defineConfig } from 'eslint/config';
import { tailwind4 } from 'tailwind-csstree';
import tseslint from 'typescript-eslint';

const sameModule = { module: '{{from.element.captured.module}}' };
const kernel = { element: { type: 'kernel' } };
const externalPackages = { module: { origin: ['external', 'core'] } };
const otherModulePublicApi = { element: { type: 'module', fileInternalPath: 'index.ts' } };

/** Allows importing the given layers of the importer's own module. */
const ownLayers = (...types) => ({
  element: { types: { anyOf: types }, captured: sameModule },
});

export default defineConfig([
  {
    ignores: ['dist/', 'coverage/', '.angular/'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      sonarjs.configs.recommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/prefer-output-emitter-ref': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      // Presentational Angular components can legitimately have an empty class body.
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      'sonarjs/cognitive-complexity': ['error', 15],
      'max-params': ['error', 3],
      'no-console': ['error', { allow: ['error'] }],
    },
  },
  {
    // Architecture: hexagonal per module, vertical slicing between modules. See CLAUDE.md.
    files: ['src/**/*.ts'],
    plugins: { boundaries },
    settings: {
      'import/resolver': { typescript: { alwaysTryTypes: true } },
      'boundaries/elements': [
        { type: 'kernel', pattern: 'src/app/shared/kernel' },
        { type: 'shared-ui', pattern: 'src/app/shared/ui' },
        { type: 'shared-infrastructure', pattern: 'src/app/shared/infrastructure' },
        { type: 'layout', pattern: 'src/app/layout' },
        { type: 'domain', pattern: 'src/app/*/domain', capture: ['module'] },
        { type: 'application', pattern: 'src/app/*/application', capture: ['module'] },
        { type: 'infrastructure', pattern: 'src/app/*/infrastructure', capture: ['module'] },
        { type: 'ui', pattern: 'src/app/*/ui', capture: ['module'] },
        { type: 'module', pattern: 'src/app/*', capture: ['module'] },
        { type: 'app', pattern: 'src' },
      ],
      'boundaries/files': [{ category: 'test', pattern: '**/*.spec.ts' }],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          checkAllOrigins: true,
          policies: [
            { from: { element: { type: 'kernel' } }, allow: { to: kernel } },
            {
              from: { element: { type: 'domain' } },
              allow: { to: [kernel, ownLayers('domain')] },
            },
            {
              from: { element: { type: 'application' } },
              allow: { to: [kernel, ownLayers('domain', 'application'), otherModulePublicApi] },
            },
            {
              from: { element: { type: 'infrastructure' } },
              allow: {
                to: [
                  kernel,
                  { element: { type: 'shared-infrastructure' } },
                  ownLayers('domain', 'application', 'infrastructure'),
                  externalPackages,
                ],
              },
            },
            {
              from: { element: { type: 'ui' } },
              allow: {
                to: [
                  kernel,
                  { element: { type: 'shared-ui' } },
                  ownLayers('domain', 'application', 'ui'),
                  otherModulePublicApi,
                  externalPackages,
                ],
              },
            },
            {
              from: { element: { type: 'module' } },
              allow: {
                to: [
                  kernel,
                  { element: { types: { anyOf: ['shared-ui', 'shared-infrastructure'] } } },
                  ownLayers('domain', 'application', 'infrastructure', 'ui', 'module'),
                  otherModulePublicApi,
                  externalPackages,
                ],
              },
            },
            {
              from: { element: { types: { anyOf: ['shared-ui', 'shared-infrastructure'] } } },
              allow: {
                to: [
                  kernel,
                  { element: { type: '{{from.element.type}}' } },
                  externalPackages,
                ],
              },
            },
            {
              from: { element: { type: 'layout' } },
              allow: {
                to: [
                  kernel,
                  { element: { types: { anyOf: ['layout', 'shared-ui'] } } },
                  otherModulePublicApi,
                  externalPackages,
                ],
              },
            },
            {
              from: { element: { type: 'app' } },
              allow: {
                to: [
                  { element: { types: { anyOf: ['app', 'layout', 'shared-ui', 'shared-infrastructure'] } } },
                  { element: { type: 'module', fileInternalPath: '*.{routes,providers}.ts' } },
                  externalPackages,
                ],
              },
            },
            {
              // Pure layers: no Angular, no RxJS, no SDKs. Policies are evaluated in order; the last match wins.
              from: { element: { types: { anyOf: ['kernel', 'domain', 'application'] } } },
              disallow: { to: externalPackages },
              message: '{{from.element.type}} must be framework-free TypeScript; move the dependency to infrastructure/ or ui/',
            },
            {
              // Tests in pure layers may only import the test runner.
              from: { file: { categories: 'test' } },
              allow: { to: { module: { origin: 'external', source: 'vitest' } } },
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/prefer-ngsrc': 'error',
    },
  },
  {
    // Same check as the `suggestCanonicalClasses` warning of Tailwind CSS IntelliSense, but blocking
    // and project-wide. `npm run lint -- --fix` rewrites the classes to their canonical form.
    files: ['src/**/*.ts', 'src/**/*.html', 'src/**/*.css'],
    plugins: { 'better-tailwindcss': betterTailwindcss },
    settings: { 'better-tailwindcss': { entryPoint: 'src/styles.css' } },
    rules: { 'better-tailwindcss/enforce-canonical-classes': 'error' },
  },
  {
    // Parses CSS (with Tailwind's at-rules) so the rule above also checks `@apply`.
    files: ['src/**/*.css'],
    plugins: { css },
    language: 'css/css',
    languageOptions: { customSyntax: tailwind4, tolerant: true },
  },
]);
