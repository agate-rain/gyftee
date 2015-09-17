var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  context: path.join(__dirname, 'src'),
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve:{
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules', 'lib']
  },
  resolveLoader: {root: node_modules_dir},
  module: {
    loaders: [{
      test: /\.jsx?$/,

      // There is not need to run the loader through
      // vendors\
      include: [path.join(__dirname, 'src')],
      exclude: [node_modules_dir],
      loader: 'babel'
    }]
  }
};

module.exports = config;
