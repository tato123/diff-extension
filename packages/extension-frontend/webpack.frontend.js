const path = require('path');
const webpack = require('webpack');

const Dotenv = require('dotenv-webpack');
const npmPackage = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const WEB_OUTPUT_PATH = `dist/${npmPackage.version}`;

module.exports = {
  mode: ENV,

  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  devtool: ENV === 'development' ? 'source-map' : 'none',

  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__dirname, WEB_OUTPUT_PATH),
    publicPath: '/js/latest/'
  },

  // Our home directory
  context: path.resolve(__dirname, './src'),

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, './src')],
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      { test: /\.jpg$/, use: ['file-loader'] },
      { test: /\.png$/, use: ['url-loader?mimetype=image/png'] },
      {
        test: /\.svg$/,
        use: {
          loader: 'text-loader',
          options: {}
        }
      }
    ]
  },

  optimization: {
    sideEffects: false
  },

  devServer: {
    port: 9000,
    compress: true,
    hot: true,
    https: true,
    disableHostCheck: true
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `../../.env.${ENV}`)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin()
  ]
};
