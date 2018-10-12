import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import includePaths from 'rollup-plugin-includepaths';
import autoExternal from 'rollup-plugin-auto-external';

const includePathOptions = {
  paths: ['src'],
  extensions: ['.js', '.json', '.html']
};

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.es.js',
      format: 'esm'
    }
  ],
  plugins: [
    includePaths(includePathOptions),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    filesize(),
    autoExternal()
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
    'react-icons-kit',
    'react-spring',
    'styled-components',
    'react-icons-kit/fa/angleDown',
    'lodash-es',
    'date-fns/format',
    'color'
  ]
};
