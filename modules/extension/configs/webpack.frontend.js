const path = require("path");
const webpack = require("webpack");
const { OUTPUT_PATH, ENV, std } = require("./webpack.common");

// export our configurations
module.exports = (env, argv) => [
  // Configure our frontend
  {
    ...std,
    mode: "development",
    entry: {
      main: [
        "webpack-dev-server/client?http://localhost:9000",
        "webpack/hot/only-dev-server",
        "react-hot-loader/patch",
        path.resolve(__dirname, "../frontend/src/main.js")
      ]
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
      ...std.resolve,
      modules: ["node_modules", path.resolve(__dirname, "../frontend/src")],
      extensions: [".js", ".json"]
    },
    devServer: {
      contentBase: OUTPUT_PATH + "/frontend",
      compress: true,
      port: 9000,
      public: "localhost:9000",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization"
      }
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

    plugins: [...std.plugins]
  }
];
