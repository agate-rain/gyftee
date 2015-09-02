var giftListController = require('./giftListController.js');

module.exports = function(app) {
  // app is the userrouter injected from middleware file
  app.post('/giftlists', giftListController.getListByUser);
};
