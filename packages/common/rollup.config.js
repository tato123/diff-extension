import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import includePaths from 'rollup-plugin-includepaths';
import resolve from 'rollup-plugin-node-resolve';

const includePathOptions = {
  include: {},
  paths: ['src'],
  external: [],
  extensions: ['.js', '.json', '.ts', '.tsx', '.html']
};

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'esm',
      file: 'dist/common.es.js'
    }
  ],

  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    includePaths(includePathOptions),
    filesize(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ],
  external: [
    'rxjs',
    'firebase',
    'firebase/app',
    'firebase/firestore',
    'firebase/auth',
    'firebase/storage',
    'lodash-es'
  ]
};
