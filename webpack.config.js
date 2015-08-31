var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    path.resolve(__dirname, 'client/app/main.js')
  ],
  output: {
    path: path.resolve(__dirname, '/build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'client'), exclude: /(node_modules|bower_components)/ },
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader'},
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
