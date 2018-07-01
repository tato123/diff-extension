const path = require("path");
const package = require("../package.json");
const webpack = require("webpack");
const { OUTPUT_PATH, ENV, std } = require("./webpack.common");

const WEB_OUTPUT_PATH = `${OUTPUT_PATH}/frontend/${package.version}`;

// export our configurations
module.exports = (env, argv) => [
  // Configure our frontend
  {
    ...std,
    mode: "development",
    entry: {
      main: [path.resolve(__dirname, "../frontend/src/main.js")]
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name].bundle.js",
      // the chrome extension is served from a remote server
      // to avoid needing constant updates
      path: WEB_OUTPUT_PATH,
      publicPath: "http://localhost:9000/js/"
    },
    resolve: {
      ...std.resolve,
      modules: ["node_modules", path.resolve(__dirname, "../frontend/src")],
      extensions: [".js", ".json"]
    },
    devServer: {
      contentBase: WEB_OUTPUT_PATH,
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
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        }
      ]
    },

    plugins: [...std.plugins]
  }
];
