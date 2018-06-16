const Dotenv = require("dotenv-webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
  }
};

// export our configurations
module.exports = (env, argv) => [
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
      ])
    ]
  },
  {
    ...std,
    entry: {
      background: path.resolve(__dirname, "background/index.js"),
      contentScript: path.resolve(__dirname, "content/index.js")
    },
    output: {
      filename: "[name].js",
      path: OUTPUT_PATH
    },
    plugins: [new Dotenv()]
  },
  // Configure our frontend
  {
    ...std,
    entry: {
      frontend: [
        "./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js",
        path.resolve(__dirname, "./frontend/src/index.js")
      ]
    },
    resolve: {
      alias: std.resolve.alias,
      modules: [
        path.resolve("./node_modules"),
        path.resolve(__dirname, "./frontend/src")
      ],
      extensions: [".json", ".js"]
    },
    output: {
      filename: "[name].js",
      path: OUTPUT_PATH
    },
    module: {
      rules: [
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

    plugins: [new Dotenv()]
  }
];
