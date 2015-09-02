var giftController = require('./giftController.js');

module.exports = function(app) {
  // app is the userrouter injected from middleware file
  app.post('/searchbykeyword', giftController.lookupItemByKeyword);
  app.post('/searchsimilargifts', giftController.getSimilarItems);
};