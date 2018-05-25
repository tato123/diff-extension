/* global __dirname, require, module */
const Dotenv = require("dotenv-webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const OUTPUT_PATH = path.resolve(__dirname, "./extension");
const ENV = process.env.NODE_ENV || "development";

const config = {
  mode: ENV,
  entry: {
    background: path.resolve(__dirname, "src/Background/index.js"),
    contentScript: path.resolve(__dirname, "src/Content/contentScript.js"),
    bridge: path.resolve(__dirname, "src/Bridge/index.js"),
    inject: path.resolve(__dirname, "src/Content/inject.js")
  },
  devtool: ENV === "development" ? "source-map" : "none",
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
    })
  ]
};

module.exports = config;
