var Preference  = require('./preferenceModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js'),
    yelp    = require('./yelp.js'),
    jwt  = require('jwt-simple'),
    User = require('../users/userModel.js');

module.exports = {
  findUrl: function (req, res, next, code) {
    var findLink = Q.nbind(Link.findOne, Link);
    findLink({code: code})
      .then(function (link) {
        if (link) {
          req.navLink = link;
          next();
        } else {
          next(new Error('Link not added yet'));
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  allLinks: function (req, res, next) {
  var findAll = Q.nbind(Link.find, Link);

  findAll({})
    .then(function (links) {
      res.json(links);
    })
    .fail(function (error) {
      next(error);
    });
  },

  // ######## This will query yelp based on user preferences #########
  queryYelp: function (req, res, next) {
    console.log("-- TRYING TO QUERY YELP --- ")
    console.log(req.body);
    var currentUser = util.findCurrentUser(req);
    yelp.queryYelp(req.body, function(data){
      // console.log(data);
      util.filterUserPrefs(data, currentUser, function(filteredData){
        res.json(filteredData);
      })
    })
  },
  sayHi: function(req, res, next){
    console.log("WELL HELLO THERE");
  },
  // ######## This will log an entry in the database based on user input #########
  newPreference: function (req, res, next) {
    var business = req.body;
    var currentUser = util.findCurrentUser(req);
    util.addBusinessToUser(business, currentUser);
    res.send(200);
  }
}