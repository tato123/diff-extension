import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import includePaths from "rollup-plugin-includepaths";
import autoExternal from "rollup-plugin-auto-external";

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
      format: "esm"
    }
  ],
  plugins: [
    includePaths(includePathOptions),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs(),
    filesize(),
    autoExternal()
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
    "color",
    "@blueprintjs/core/lib/esm/components/tabs/tabs",
    "@blueprintjs/core/lib/esm/components/tabs/tab"
  ]
};
