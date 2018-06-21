const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const WriteAssetsWebpackPlugin = require("write-assets-webpack-plugin");

// For dependencies that are internal to the chrome extension
const OUTPUT_PATH = path.resolve(__dirname, "./dist/chrome");

const ENV = process.env.NODE_ENV || "development";

// Our standard build settings that will be
// consistent across each of our build configurations
const std = {
  mode: ENV,
  devtool: ENV === "development" ? "source-map" : "none",
  resolve: {
    modules: [path.resolve("./node_modules")],
    alias: {
      "@diff/common": path.resolve(__dirname, "./common")
    },
    extensions: [".json", ".js"]
  },
  plugins: [new Dotenv()],
  devServer: {
    contentBase: OUTPUT_PATH + "/frontend",
    compress: true,
    port: 9000,
    public: "localhost:9000"
  }
};

// export our configurations
module.exports = (env, argv) => [
  // Configure our frontend
  {
    ...std,
    mode: "development",
    entry: {
      main: [path.resolve(__dirname, "./frontend/src/main.js")]
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name].bundle.js",
      // the chrome extension is served from a remote server
      // to avoid needing constant updates
      path: OUTPUT_PATH + "/frontend",
      publicPath: "http://localhost:9000/js/"
    },
    resolve: {
      modules: [
        path.resolve("./node_modules"),
        path.resolve(__dirname, "./frontend/src")
      ],
      extensions: [".js", ".json"]
    },

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
        {
          test: /\.html$/,
          use: ["html-loader"]
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

    plugins: [...std.plugins, new webpack.HotModuleReplacementPlugin()]
  },
  {
    ...std,
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new CopyWebpackPlugin([
        {
          from: "shells/chrome/manifest.json",
          to: OUTPUT_PATH,
          toType: "dir"
        }
      ]),
      new WriteAssetsWebpackPlugin({ force: true, extension: ["js", "json"] })
    ],
    entry: {
      background: path.resolve(__dirname, "background/index.js"),
      contentScript: path.resolve(__dirname, "content/index.js")
    },
    output: {
      filename: "[name].js",
      path: OUTPUT_PATH,
      publicPath: "http://localhost:9000/js/"
    }
  }
];
