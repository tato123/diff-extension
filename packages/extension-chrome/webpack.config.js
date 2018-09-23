const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteAssetsWebpackPlugin = require("write-assets-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const ENV = (exports.ENV = process.env.NODE_ENV || "development");

module.exports = {
  entry: {
    background: path.resolve(__dirname, "src/background/index.js"),
    contentScript: path.resolve(__dirname, "src/content/index.ts")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist/chrome"),
    publicPath: "http://localhost:9000/js/"
  },
  // Our home directory
  context: path.resolve(__dirname, "./src"),

  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "./src")],
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/shells/chrome"),
        to: path.resolve(__dirname, "dist/chrome"),
        toType: "dir"
      }
    ]),
    new WriteAssetsWebpackPlugin({ force: true, extension: ["js", "json"] }),
    new Dotenv({
      path: path.resolve(__dirname, `../../.env.${ENV}`)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
