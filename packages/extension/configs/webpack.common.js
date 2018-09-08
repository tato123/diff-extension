const path = require("path");
const Dotenv = require("dotenv-webpack");

// For dependencies that are internal to the chrome extension
const OUTPUT_PATH = (exports.OUTPUT_PATH = path.resolve(__dirname, "../dist"));

const ENV = (exports.ENV = process.env.NODE_ENV || "development");

// Our standard build settings that will be
// consistent across each of our build configurations
exports.std = {
  mode: ENV,
  devtool: ENV === "development" ? "source-map" : "none",
  resolve: {
    alias: {
      "@diff/common": path.resolve(__dirname, "../common")
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `./.env.${ENV}`)
    })
  ]
};
