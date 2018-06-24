const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const WriteAssetsWebpackPlugin = require("write-assets-webpack-plugin");
const { OUTPUT_PATH, ENV, std } = require("./webpack.common");

// export our configurations
module.exports = (env, argv) => [
  {
    ...std,
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "../shells/chrome/manifest.json"),
          to: OUTPUT_PATH,
          toType: "dir"
        }
      ]),
      new WriteAssetsWebpackPlugin({ force: true, extension: ["js", "json"] })
    ],
    entry: {
      background: path.resolve(__dirname, "../background/index.js"),
      contentScript: path.resolve(__dirname, "../content/index.js")
    },
    output: {
      filename: "[name].js",
      path: OUTPUT_PATH,
      publicPath: "http://localhost:9000/js/"
    }
  }
];
