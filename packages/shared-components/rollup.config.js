import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import image from "rollup-plugin-img";
import filesize from "rollup-plugin-filesize";
import includePaths from "rollup-plugin-includepaths";

const includePathOptions = {
  include: {},
  paths: ["src"],
  external: [],
  extensions: [".js", ".json", ".html"]
};

export default {
  input: "src/index.js",
  output: [
    { file: "dist/bundle.js", format: "cjs", sourcemap: true },
    { file: "dist/bundle.es.js", format: "es", sourcemap: true }
  ],
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true
    }),
    babel({
      exclude: "node_modules/**"
    }),
    image({
      limit: 10000
    }),
    commonjs(),
    filesize(),
    includePaths(includePathOptions)
  ],
  // indicate which modules should be treated as external
  external: [
    "rebass",
    "polished",
    "prop-types",
    "react",
    "react-dom",
    "react-icons-kit",
    "react-spring",
    "styled-components"
  ]
};
