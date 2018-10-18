const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteAssetsWebpackPlugin = require('write-assets-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode,
  devtool: argv.mode === 'development' ? 'source-map' : 'none',
  entry: {
    background: path.resolve(__dirname, 'src/background/index.js'),
    contentScript: path.resolve(__dirname, 'src/content/index.js'),
    options: path.resolve(__dirname, 'src/options/index.js'),
    popup: path.resolve(__dirname, 'src/popup/index.js'),
    loginReturn: path.resolve(__dirname, 'src/loginReturn/index.js')
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
    new EncodingPlugin({
      encoding: 'utf-8'
    }),
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
      path: path.resolve(__dirname, `../../.env.${argv.mode}`)
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
});
