var giftController = require('./giftController.js');

module.exports = function(app) {
  // app is the userrouter injected from middleware file
  app.post('/lookup', giftController.lookupItemByKeyword);
  app.post('/getsimilar', giftController.getSimilarItems);
};