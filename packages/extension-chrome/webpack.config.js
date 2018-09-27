const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteAssetsWebpackPlugin = require('write-assets-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  mode: ENV,
  devtool: ENV === 'development' ? 'source-map' : false,
  entry: {
    background: path.resolve(__dirname, 'src/background/index.js'),
    contentScript: path.resolve(__dirname, 'src/content/index.ts'),
    options: path.resolve(__dirname, 'src/options/index.js'),
    popup: path.resolve(__dirname, 'src/popup/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/chrome/js'),
    publicPath: 'http://localhost:9000/js/'
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, './src')],
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/shells/chrome'),
        to: path.resolve(__dirname, 'dist/chrome'),
        toType: 'dir'
      }
    ]),
    new WriteAssetsWebpackPlugin({ force: true, extension: ['js', 'json'] }),
    new Dotenv({
      path: path.resolve(__dirname, `../../.env.${ENV}`)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
