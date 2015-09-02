var aws = require('aws-lib');
var fs = require('fs');
require('dotenv').load();

var prodAdv = aws.createProdAdvClient(process.env.AMAZON_CLIENT_ID, process.env.AMAZON_CLIENT_SECRET, process.env.AMAZON_ASSOCIATE_TAG);

// console.log(">>>>>>>>>>>prodAdv",prodAdv.client.call)

 // var options = {ItemId: '1118531647', ResponseGroup: 'Offers, ItemAttributes, Images'}

var options = {SearchIndex: 'Books', Keywords: "best sellers 2015", ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'}

// prodAdv.call("SimilarityLookup", options, function(err, result) {
prodAdv.call('ItemSearch', options, function(err, result) {
	fs.writeFile('../data/amazonHardCodeData/data.txt', 
    JSON.stringify(result.Items.Item, null, "\t"), 
    function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
});
