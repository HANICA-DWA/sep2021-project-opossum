import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: ['src/lib/single-file/index.js'],
    output: [
      {
        file: 'dist/single-file/single-file.js',
        format: 'umd',
        name: 'singlefile',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/lib/single-file/single-file-frames.js'],
    output: [
      {
        file: 'dist/single-file/single-file-frames.js',
        format: 'umd',
        name: 'singlefile',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/lib/single-file/single-file-bootstrap.js'],
    output: [
      {
        file: 'dist/single-file/single-file-bootstrap.js',
        format: 'umd',
        name: 'singlefileBootstrap',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/common/ui/content/content-infobar.js'],
    output: [
      {
        file: 'dist/single-file/infobar.js',
        format: 'umd',
        name: 'infobar',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/extension/core/content/content-bootstrap.js'],
    output: [
      {
        file: 'dist/single-file/extension-bootstrap.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/extension/core/content/content-frames.js'],
    output: [
      {
        file: 'dist/single-file/extension-frames.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/extension/core/content/content.js'],
    output: [
      {
        file: 'dist/single-file/extension.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/lib/single-file/processors/hooks/content/content-hooks-web.js'],
    output: [
      {
        file: 'dist/single-file/web/hooks/hooks-web.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/lib/single-file/processors/hooks/content/content-hooks-frames-web.js'],
    output: [
      {
        file: 'dist/single-file/web/hooks/hooks-frames-web.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/common/ui/content/content-infobar-web.js'],
    output: [
      {
        file: 'dist/single-file/web/infobar-web.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/extension/ui/content/content-ui-editor-init-web.js'],
    output: [
      {
        file: 'dist/single-file/web/editor/editor-init-web.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/extension/ui/content/content-ui-editor-web.js'],
    output: [
      {
        file: 'dist/single-file/web/editor/editor-web.js',
        format: 'iife',
        plugins: [],
      },
    ],
  },
  {
    input: ['src/extension/ui/content/content-ui-editor-helper-web'],
    output: [
      {
        file: 'dist/single-file/web/editor/editor-helper-web.js',
        format: 'umd',
        name: 'singlefile',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/extension/lib/single-file/browser-polyfill/chrome-browser-polyfill.js'],
    output: [
      {
        file: 'dist/single-file/chrome-browser-polyfill.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/extension/core/bg/index.js'],
    output: [
      {
        file: 'dist/single-file/extension-background.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
  {
    input: ['src/extension/lib/single-file/background.js'],
    output: [
      {
        file: 'dist/single-file/single-file-background.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
  },
]
