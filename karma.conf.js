var webpackConfig = require(__dirname + '/webpack.config');
webpackConfig.devtool = 'inline-source-map'; // override the devtool value to get sourcemap

module.exports = function (config) {
  config.set({
    autoWatch: false,
    browsers: [ 'Chrome' ], //run in Chrome
    colors: true,
    frameworks: [ 'jasmine' ], //use the jasmine test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'nyan' ], //report results in this format
    singleRun: true, //just run once by default
    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
