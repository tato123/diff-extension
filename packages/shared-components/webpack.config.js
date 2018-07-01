const path = require("path");
const nodeExternals = require("webpack-node-externals");

// export our configurations
module.exports = {
  mode: "development",
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
