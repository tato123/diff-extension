const path = require("path");
const nodeExternals = require("webpack-node-externals");

// export our configurations
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    turbocharge: path.resolve(__dirname, "./src/index.js")
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "./src")],
    extensions: [".js", ".json"]
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "index.js",
    libraryTarget: "commonjs"
  },
  externals: [nodeExternals(), "react", "react-dom", "styled-components"],
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
      },
      { test: /\.png$/, use: ["url-loader?mimetype=image/png"] },
      {
        test: /\.svg$/,
        use: {
          loader: "text-loader",
          options: {}
        }
      }
    ]
  }
};
