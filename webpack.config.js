var path = require('path');

var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

/*module.exports = {
  entry: path.resolve(__dirname, 'client/app/main.js'),
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: 'bundle.js'
  },
  module {
    loaders: []
  }
};*/


// webpack.config.js

module.exports = {
  cache: true,
  entry: {
    recommendedGifts:  './client/app/components/recommendedGifts.jsx'
  },
  output: {
    path: './client/build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
      {test: /\.js$/ , loader: 'jsx-loader?harmony'}
    ]
  },
  plugins: [
    definePlugin,
    commonsPlugin
  ]
};