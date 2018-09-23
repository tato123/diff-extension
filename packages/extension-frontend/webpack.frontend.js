const path = require("path");
const npmPackage = require("./package.json");

const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const Jarvis = require("webpack-jarvis");

const WEB_OUTPUT_PATH = `frontend/${npmPackage.version}`;

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, "./src/index.js")
  },
  devtool: "source-map",
  output: {
    path: path.join(common.output.path, WEB_OUTPUT_PATH),
    publicPath: "/js/latest/"
  },

  // Our home directory
  context: path.resolve(__dirname, "./src"),

  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "./src")],
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  devServer: {
    port: 9000,
    compress: true,
    hot: true,
    https: true,
    disableHostCheck: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Jarvis({
      port: 1337 // optional: set a port
    })
  ]
});
