const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteAssetsWebpackPlugin = require("write-assets-webpack-plugin");
const { OUTPUT_PATH, std } = require("./webpack.common");

const CHROME_DIR = OUTPUT_PATH + "/chrome";

// export our configurations
module.exports = (env, argv) => [
  {
    ...std,
    plugins: [
      ...std.plugins,
      new CleanWebpackPlugin(["dist"]),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "../shells/chrome"),
          to: CHROME_DIR,
          toType: "dir"
        }
      ]),
      new WriteAssetsWebpackPlugin({ force: true, extension: ["js", "json"] })
    ],
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
        }
      ]
    },
    entry: {
      background: path.resolve(__dirname, "../background/index.js"),
      contentScript: path.resolve(__dirname, "../content/index.js")
    },
    output: {
      filename: "[name].js",
      path: CHROME_DIR,
      publicPath: "http://localhost:9000/js/"
    }
  }
];
