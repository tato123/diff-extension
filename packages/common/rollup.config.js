import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import includePaths from "rollup-plugin-includepaths";
import autoExternal from "rollup-plugin-auto-external";
import { plugin as analyze } from "rollup-plugin-analyzer";
import visualizer from "rollup-plugin-visualizer";

const includePathOptions = {
  include: {},
  paths: ["src"],
  external: [],
  extensions: [".js", ".json", ".ts", ".tsx", ".html"]
};

export default {
  input: "src/index.js",
  output: [
    {
      format: "es",
      file: "dist/common.es.js",
      sourceMap: "inline"
    }
  ],

  plugins: [
    includePaths(includePathOptions),
    babel({
      exclude: "node_modules/**"
    }),
    filesize(),
    commonjs()
  ],
  external: [
    "rxjs",
    "firebase",
    "firebase/app",
    "firebase/firestore",
    "firebase/auth",
    "firebase/storage",
    "lodash-es"
  ]
};
