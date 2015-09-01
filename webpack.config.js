var webpack = require('webpack');
var path = require('path');

<<<<<<< HEAD
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

/*module.exports = {
  entry: path.resolve(__dirname, 'client/app/main.js'),
=======
module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    path.resolve(__dirname, 'client/app/main.js')
  ],
>>>>>>> add react hot loader and set up webpack
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: 'bundle.js'
  },
<<<<<<< HEAD
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
=======
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'], include: path.join(__dirname, 'client') }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
>>>>>>> add react hot loader and set up webpack
