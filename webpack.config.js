/* global __dirname, require, module*/
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2
const pkg = require("./package.json");
const CleanWebpackPlugin = require("clean-webpack-plugin");

let libraryName = pkg.name;

let plugins = [new Dotenv(), new CleanWebpackPlugin(["dist"])];
let outputFile;

if (env === "build") {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + ".min.js";
} else {
  outputFile = libraryName + ".js";
}

const config = {
  entry: {
    background: path.resolve(__dirname, "src/Background/index.js"),
    contentScript: path.resolve(__dirname, "src/Content/index.js"),
    bridge: path.resolve(__dirname, "src/Bridge/index.js"),
    app: path.resolve(__dirname, "src/App/index.js")
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./extension")
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  },
  plugins: plugins
};

module.exports = config;
