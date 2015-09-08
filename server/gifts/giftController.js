var Gift = require('./giftModel.js');
var aws = require('aws-lib');
require('dotenv').load();
var prodAdv = aws.createProdAdvClient(process.env.AMAZON_CLIENT_ID, process.env.AMAZON_CLIENT_SECRET, process.env.AMAZON_ASSOCIATE_TAG);

module.exports = {
  // call to Amazon API to get a friend's 'liked' item on facebook
  // passing in keyword (ie book title) that we get from facebook, and category, with the req body
  // TODO: need to add category parameter to the clicked object in client side
  lookupItemByKeyword: function(req, res) {
    // hard coding for testing will refactor lataer
    var temp = req.body.keywordArray;
    console.log(temp);

    // var temp = JSON.parse(req.body.friend);
    // // console.log('REQ BODY', temp[1].books.data[0].name);
    // var bookKeyword = temp[1].books.data[0].name;

    // var options = {SearchIndex: 'Books', Keywords: bookKeyword, ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'}
    // prodAdv.call('ItemSearch', options, function(err, result) {
    //   res.send(result);
    // });
  },

  // call to Amazon API to get similar items based on the 'liked' item
  getSimilarItems: function(req, res) {
    var ASIN = req.body.ASIN;
    var options = {ItemId: ASIN, ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'}

    // var options = {SearchIndex: 'Books', Keywords: bookKeyword, ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'}
    prodAdv.call('SimilarityLookup', options, function(err, result) {
      res.send(result);
    });
  }
  // TODO: search etsy using image tags or other facebook metadata
  // and get surprise gifts (grab bag feature)

};
