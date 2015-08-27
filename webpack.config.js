var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/app/main.js'),
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: 'bundle.js'
  },
  module {
    loaders: []
  }
};
