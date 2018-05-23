/* global __dirname, require, module*/
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2
const pkg = require("./package.json");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const OUTPUT_PATH = path.resolve(__dirname, "./extension");

const config = {
  mode: "development",
  entry: {
    background: path.resolve(__dirname, "src/Background/index.js"),
    contentScript: path.resolve(__dirname, "src/Content/contentScript.js"),
    bridge: path.resolve(__dirname, "src/Bridge/index.js"),
    inject: path.resolve(__dirname, "src/Content/inject.js")
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: OUTPUT_PATH
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.css$/,
        use: ["text-loader", "postcss-loader"]
      },
      { test: /\.jpg$/, use: ["file-loader"] },
      { test: /\.png$/, use: ["url-loader?mimetype=image/png"] },
      {
        test: /\.svg$/,
        use: {
          loader: "text-loader",
          options: {}
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(["dist"], {
      verbose: true,
      root: path.resolve(__dirname, "..")
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(
          __dirname,
          "./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"
        )
      }
    ])
  ]
};

module.exports = config;
