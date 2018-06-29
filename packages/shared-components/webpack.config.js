const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

// export our configurations
module.exports = {
  mode: "development",
  entry: {
    turbocharge: path.resolve(__dirname, "./src/components/index.js")
  },
  output: {
    path: path.resolve(__dirname, "./build/components"),
    filename: "index.js",
    library: "",
    libraryTarget: "commonjs"
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
