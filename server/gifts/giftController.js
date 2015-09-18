
var Gift = require('./giftModel.js');
var aws = require('aws-lib');
var request = require('request');
var S = require('string');
var Promise = require('bluebird');
var Clarifai = require('../config/clarifai_node.js');
var url = require('url');
var https = require('https');

require('dotenv').load();
var prodAdv = aws.createProdAdvClient(process.env.AMAZON_CLIENT_ID, process.env.AMAZON_CLIENT_SECRET, process.env.AMAZON_ASSOCIATE_TAG);
Clarifai.initAPI(process.env.CLARIFAI_CLIENT_ID, process.env.CLARIFAI_CLIENT_SECRET);

Clarifai.setThrottleHandler( function( bThrottled, waitSeconds ) {
  console.log( bThrottled ? ["throttled. service available again in",waitSeconds,"seconds"].join(' ') : "not throttled");
});


module.exports = {
  // call to Amazon API to get a friend's 'liked' item on facebook
  // passing in keyword (ie book title) that we get from facebook, and category, with the req body
  // TODO: need to add category parameter to the clicked object in client side
  lookupItemByKeyword: function(req, res) {

    var bookKeyword = req.body.keyword;

    var options = {
      SearchIndex: 'Books',
      Keywords: bookKeyword,
      ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'
    }

    prodAdv.call('ItemSearch', options, function(err, result) {
      res.send(result);
    });
  },

  itemLookup: function(req, res) {

    var books = req.body.books;

    var promises = [];

    var amazonSync = function(bookASIN) {
      var options = {
        SearchIndex: "All",
        IdType: "ISBN",
        ItemId: bookASIN,
        ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'
      }
      return new Promise(function(resolve, reject) {
        prodAdv.call('ItemLookup', options, function(err, result) {
              if (err !== null) {
                return reject(err);
              }
              resolve(result);
        });
      })
    };
    books.forEach(function(ASIN) {
      promises.push(amazonSync(ASIN));
    });
    Promise.all(promises).then(function(result) {
      result = result.map(function(item) {
        if (Array.isArray(item.Items.Item)) {
          return item.Items.Item[0];
        } else {
          return item.Items.Item;
        }
      });
      res.status(200).send(result);
    });
  },

  // call to Amazon API to get similar items based on the 'liked' item
  getSimilarItems: function(req, res) {
    var ASIN = req.body.ASIN;
    var options = {
      ItemId: ASIN,
      ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'
    }

    prodAdv.call('SimilarityLookup', options, function(err, result) {
      res.send(result);
    });
  },

  getArtistImage: function(req, res, next) {

    var promises = [];

    var aristAsync = function(artist) {
      var url = "http://api.bandsintown.com/artists/" + artist
      + "/?api_version=2.0&app_id=jamBandGifts";

      var requestOptions = {
          url: url,
          json: true
      };
      return new Promise(function(resolve, reject) {

        request(requestOptions, function(error, response, body) {
          if (error !== null) {
              return reject(error);
          }
          resolve(body);
        });
      })
    };

    var artistArr = req.body.artist;
    if (artistArr) {
      artistArr.forEach(function(artist) {
        promises.push(aristAsync(artist));
      });

      Promise.all(promises).then(function(result) {
        result = result.map(function(item) {
          return item;
        });
        res.status(200).send(result);
      });
    } else {
      res.status(500).send('No Artist Found!');
    }
  },

  getEvents: function(req, res, next) {
    var promises = [];

    var eventAsync = function(artist) {
      // var options = {SearchIndex: "All", IdType: "ISBN", ItemId: bookASIN, ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'}
      var url = 'http://api.bandsintown.com/events/search.json?artists%5B%5D='
                + artist
                +'&date='
                + req.body.startDate
                + ','
                + req.body.endDate
                + '&location='
                + req.body.loc
                + '&radius=150&app_id=Gyftee';
      var requestOptions = {
        url: url,
        json: true
      };
      return new Promise(function(resolve, reject) {
        request(requestOptions, function(error, response, body) {
          if (error !== null) {
                return reject(error);
          }
          resolve(body);
        });
      })
    };
    var artistArr = req.body.artistArr;
    if (artistArr) {
      artistArr.forEach(function(artist) {
        artist = artist.split(" ").join("+");
        promises.push(eventAsync(artist));
      });

      Promise.all(promises).then(function(result) {
        // console.dir(result);
        result = result.map(function(item) {
          return item;
        });

        // console.log('>>>>>>>>>',result)
        result = result.filter(function(array1) {
          return array1.length !== 0;
        }).filter(function(array2) {
          return Array.isArray(array2) === true;
        });
        // console.log(JSON.stringify(result, null, '\t'));
        res.status(200).send(result);
      });
    } else {
      res.status(500).send(null);
    }

 },

  getTagsFromClarifai: function(req, res, next) {
    var promises = [];
    var i = 0
    var imageArr = req.body.imageArr;
    var arr = [];

    imageArr.forEach(function(image){
      arr.push(image.source);
    })

    var rand;
    var randomGenerateArr = [];
    for(var i = 0; i < 2; i++){
      rand = Math.floor(Math.random() * arr.length) + 1
      var temp = arr.splice(rand, 1);
      randomGenerateArr.push(temp);
    }

    var getTagAsync = function(imageURL) {
      i++;
      return new Promise(function(resolve, reject) {
        Clarifai.tagURL( imageURL , "image" + i ,function(err, result) {
            if (err !== null) {
              return reject(err);
            }
            resolve(result);
        });
      });
    };
      randomGenerateArr.forEach(function(image) {
        promises.push(getTagAsync(image));
      });

      Promise.all(promises).then(function(result) {
        result = result.map(function(item) {
          return item.results[0].result.tag.classes;
        })
        var finalArr = [];
        for(var i = 0; i < result.length; i++) {
          finalArr.push({tag: result[i], image: randomGenerateArr[i][0]})
        }

        res.status(200).send(finalArr);
      });
  },

  getTagsFromMetamind: function(req, res, next) {

    var post_data = JSON.stringify({
      'classifier_id':'imagenet-1k-net',
      'image_url':req.body.imageURL
    });

    // var imageURL = req.body.imageURL;
    var API_KEY = 'Basic ' + process.env.METAMIND_API_KEY;
    var https_options = url.parse('https://www.metamind.io/vision/classify');
    https_options.method = 'POST';
    https_options.headers = {
      'Authorization' : 'Basic aXZxkB3eOMupDZSMNIZSdfD9hxv2zBDpen8qbMOOPLtzYwhx2X',
      'Content-Type'  : 'application/json',
      'Content-Length':  post_data.length
    }
    var post_request = https.request(https_options, function(response) {
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        console.log(chunk);
      });
    });

    post_request.write(post_data);
    post_request.end();
  },

  searchEtsy: function(req, res, next) {
    var terms = req.body.keyword;
    var url = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
      terms + "&limit=12&includes=Images:1&api_key=" + process.env.ETSY_KEY_STRING ;

    var requestOptions = {
      url: url,
      json: true
    };

    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var str = JSON.stringify(response.body, null, '\t').replace(/\\/g, "").substr(6);
        str = JSON.parse(str.slice(0, str.length -3));
        res.send(str);
      } else {
        res.send({
          success: false,
          message: 'Unknown Error getting result from bandsintown api.'
        });
      }
    });
  }

};
