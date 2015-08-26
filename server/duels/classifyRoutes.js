var duelController = require('./duelController.js');

module.exports = function (app) {
  app.post('/getclassification', classifyController.getclassification);
};