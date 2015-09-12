var giftController = require('./giftController.js');

module.exports = function(app) {
  // app is the userrouter injected from middleware file
  app.post('/gettagsfromclarifai', giftController.getTagsFromClarifai);
  app.post('/gettagsfrommetamind', giftController.getTagsFromMetamind);
  app.post('/searchEtsy', giftController.searchEtsy);
  app.post('/searchbykeyword', giftController.lookupItemByKeyword);
  app.post('/itemlookup', giftController.itemLookup)
  app.post('/searchsimilargifts', giftController.getSimilarItems);
  app.post('/getevents', giftController.getEvents);
  app.post('/getartistimage', giftController.getArtistImage);
};
