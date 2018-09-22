const path = require("path");
const Dotenv = require("dotenv-webpack");

const ENV = (exports.ENV = process.env.NODE_ENV || "development");

// For dependencies that are internal to the chrome extension
const OUTPUT_PATH = path.resolve(__dirname, "../dist");

// Our standard build settings that will be
// consistent across each of our build configurations
module.exports = {
  mode: ENV,
  devtool: ENV === "development" ? "source-map" : "none",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `./.env.${ENV}`)
    })
  ],
  target: "web",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].bundle.js",
    path: OUTPUT_PATH
  }
};
