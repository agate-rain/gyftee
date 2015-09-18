var path = require('path');

var SRC_PATH = path.resolve(__dirname, 'src');
var BUILD_PATH = path.resolve(__dirname, 'build');
var NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules');

var config = {
  devtool: 'source-map',
  entry: path.resolve(SRC_PATH, 'main.js'),
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [NODE_MODULES_PATH]
    }, {
      test: /\.css$/,
      loader: 'style!css',
      exclude: [NODE_MODULES_PATH]
    }, {
      test: /\.less$/,
      loader: 'style!css!less',
      exclude: NODE_MODULES_PATH
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }]
  }
};

module.exports = config;
