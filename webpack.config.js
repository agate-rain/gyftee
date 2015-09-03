'use strict';

var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  path = require('path');

var TARGET = process.env.npm_lifecycle_event;

//webpack requires absolute paths
var SRC_PATH = path.join(__dirname, 'src');

var common = {
  context: SRC_PATH,
  entry: path.join(SRC_PATH, 'main.jsx'),
  // to enable requiring files without specifying the extension
  // you must add a resolve.extensions parameter specifying files webpack
  // searches for; can use require('file') instead of require('file.jsx')
  resolve: {
    root: SRC_PATH,
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'build'), // This is where images AND js will go
    publicPath: '', // This is used to generate URLs to e.g. images
    filename: '[name].js', // template name based on keys in entry
    pathInfo: true
  },

  module: {
    loaders: [ // webpack's equivalent of browserify transforms and RequireJS plugins is a loader
      {
        test: /\.jsx$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: [path.join(SRC_PATH, 'main.jsx'), path.join(SRC_PATH, 'app')]
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        include: path.join(SRC_PATH, 'css')
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192" // inline base64 URLs for <=8k images, direct URLs for the rest
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  // webpack dev server automatically refreshes content inthe browser
  module.exports = merge(common, {
    devtool: 'eval',
    devServer: {
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      debug: true,
      port: 3000
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('common.js'),
      new HtmlWebpackPlugin({
        inject: true, // injects script tag for js at end of body
        template: 'src/index.html'
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
