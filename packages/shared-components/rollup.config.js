import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import includePaths from "rollup-plugin-includepaths";
import autoExternal from "rollup-plugin-auto-external";
import visualizer from "rollup-plugin-visualizer";

const includePathOptions = {
  include: {},
  paths: ["src"],
  external: [],
  extensions: [".js", ".json", ".html"]
};

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.es.js",
      format: "es",
      sourcemap: process.env.BUILD === "development"
    }
  ],
  plugins: [
    includePaths(includePathOptions),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs(),
    filesize(),
    autoExternal(),
    visualizer()
  ],
  external: [
    "react",
    "react-dom",
    "prop-types",
    "react-icons-kit",
    "react-spring",
    "styled-components",
    "react-icons-kit/fa/angleDown",
    "lodash-es",
    "date-fns/format",
    "color"
  ]
};
