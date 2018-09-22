const path = require("path");
const package = require("../package.json");
const webpack = require("webpack");
const { OUTPUT_PATH, ENV, std } = require("./webpack.common");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const WEB_OUTPUT_PATH = `${OUTPUT_PATH}/frontend/${package.version}`;
const groupsOptions = {
  chunks: "all",
  minSize: 0,
  minChunks: 1,
  reuseExistingChunk: true,
  enforce: true
};

// export our configurations
module.exports = (env, argv) => [
  // Configure our frontend
  {
    ...std,
    entry: {
      main:
        ENV === "production"
          ? [path.resolve(__dirname, "../frontend/src/index.js")]
          : [
              "webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr",
              path.resolve(__dirname, "../frontend/src/index.js")
            ]
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name].bundle.js",
      // the chrome extension is served from a remote server
      // to avoid needing constant updates
      path: WEB_OUTPUT_PATH,
      publicPath: "http://localhost:8080/js/latest"
    },
    resolve: {
      ...std.resolve,
      modules: ["node_modules", path.resolve(__dirname, "../frontend/src")],
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.(tsx?)|(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                "@babel/typescript",
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: ["last 2 Chrome versions"]
                    },
                    modules: false
                  }
                ]
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "react-hot-loader/babel"
              ]
            }
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

    plugins:
      ENV === "production"
        ? [...std.plugins]
        : [
            ...std.plugins,
            new BundleAnalyzerPlugin({ openAnalyzer: true }),
            new webpack.HotModuleReplacementPlugin()
          ]
  }
];
