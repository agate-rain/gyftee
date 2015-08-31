var aws = require("aws-lib");
require('dotenv').load();

var prodAdv = aws.createProdAdvClient(process.env.AMAZON_CLIENT_ID, process.env.AMAZON_CLIENT_SECRET, process.env.AMAZON_ASSOCIATE_TAG);

// console.log(">>>>>>>>>>>prodAdv",prodAdv.client.call)

 // var options = {ItemId: '1118531647', ResponseGroup: 'Offers, ItemAttributes, Images'}

var options = {SearchIndex: "Books", Keywords: "best sellers 2015", ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'}

// prodAdv.call("SimilarityLookup", options, function(err, result) {
prodAdv.call("ItemSearch", options, function(err, result) {
  // console.log(">>>>>>>>>>",result.Items.Item[0].ItemLinks);
  // console.log(">>>>>>>>>>",result.Items.Item[0]);
  console.log('#####################################')
  result.Items.Item.forEach(function(item){
    console.log(JSON.stringify(item, null, '\t'));
  });
  //get the price 
  //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result.Items.Item[0].OfferSummary.LowestNewPrice.FormattedPrice);
})