import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import includePaths from 'rollup-plugin-includepaths';
import resolve from 'rollup-plugin-node-resolve';

const includePathOptions = {
  paths: ['src'],
  extensions: ['.js', '.json', '.ts', '.tsx', '.html']
};

const common = {
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts']
    }),
    commonjs(),
    includePaths(includePathOptions),
    filesize()
  ],
  external: [
    'rxjs',
    'firebase',
    'firebase/app',
    'firebase/firestore',
    'firebase/auth',
    'firebase/storage',
    'lodash-es',
    'jwt-decode'
  ]
};

export default [
  {
    input: 'src/_all.js',
    output: [
      {
        format: 'esm',
        file: 'dist/common.es.js'
      }
    ],
    ...common
  },
  {
    input: 'src/_actionsCreators.js',
    output: [
      {
        format: 'esm',
        file: 'dist/actions.js'
      }
    ],
    ...common
  },
  {
    input: 'src/browser/index.js',
    output: [
      {
        format: 'esm',
        file: 'dist/browser.js'
      }
    ],
    ...common
  }
];
