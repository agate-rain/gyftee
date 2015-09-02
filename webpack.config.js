'use strict';
// var path = require('path');
// var webpack = require('webpack');

// var definePlugin = new webpack.DefinePlugin({
//   __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
//   __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
// });

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

// webpack.config.js

// module.exports = {
//   cache: true,
//   entry: {
//     components: './client/app/components/*.jsx'
//     // recommendedGifts: './client/app/components/recommendedGifts.jsx'
//   },
//   output: {
//     path: './client/build',
//     filename: '[name].js'
//   },
//   module: {
//     loaders: [
//       {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
//       {test: /\.js$/ , loader: 'jsx-loader?harmony'}
//     ]
//   },
//   plugins: [
//     definePlugin,
//     commonsPlugin
//   ]
// };

// module.exports = {
//   entry: ['client/app/views/boot.jsx'],
//   output: {
//     path: './build',
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       { test: /\.jsx$/, loader: 'jsx-loader' }
//     ]
//   }
// };


var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  srcPath = path.join(__dirname, 'src');

module.exports = {
  target: 'web',
  cache: true,
  entry: {
    module: path.join(srcPath, 'app/views/boot.jsx'),
    common: ['react', 'react-router']
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js', 'jsx'],
    modulesDirectories: ['node_modules', 'src']
  },
  output: {
    path: path.join(__dirname, 'tmp'),
    publicPath: '',
    filename: '[name].js',
    library: ['Example', '[name]'],
    pathInfo: true
  },

  module: {
    loaders: [
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ],

  debug: true,
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './tmp',
    historyApiFallback: true
  }
};
