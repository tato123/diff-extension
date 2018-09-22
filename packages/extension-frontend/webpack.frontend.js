const path = require("path");
const npmPackage = require("./package.json");

const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const WEB_OUTPUT_PATH = `frontend/${npmPackage.version}`;

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, "./src/index.js")
  },

  output: {
    path: path.join(common.output.path, WEB_OUTPUT_PATH),
    publicPath: "/js/latest/"
  },

  // Our home directory
  context: path.resolve(__dirname, "./src"),

  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "../src")],
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  externals: [
    "react",
    "rxjs",
    "react-dom",
    "@diff/shared-components",
    "firebase"
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
  },

  devServer: {
    compress: true, // enable gzip compression
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false // true for self-signed, object for cert authority
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
});
