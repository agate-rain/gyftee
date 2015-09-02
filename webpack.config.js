'use strict';

var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  path = require('path');

var TARGET = process.env.npm_lifecycle_event;

//webpack requires absolute paths
var SRC_PATH = path.join(__dirname, 'src');

var common = {
  target: 'web',
  cache: true,
  entry: {
    module: path.join(SRC_PATH, 'app/views/boot'),
    common: ['react', 'react-router']
  },
  // to enable requiring files without specifying the extension
  // you must add a resolve.extensions parameter specifying which files
  // webpack searches for... can use require('file') instead of require('file.jsx')
  resolve: {
    root: [path.join(SRC_PATH, 'app/components'), path.join(SRC_PATH, 'app/views')],
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
        loader: 'jsx-loader',
        include: path.join(SRC_PATH, 'app')
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader', // use ! to chain loaders
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
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
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
