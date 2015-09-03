// var User = require('./userModel.js');
var BPromise = require('bluebird');
var facebookApi = require('../config/facebook-api.js');

module.exports = {
  // signin: function(req, res, next) {
  // // look up user in database
  //   // if user does not exist, create and save in db
  //   // else, let user sign in
  // },

  // signout: function(req, res, next) {
  // // remove session
  // },

  getFriend: function(req, res, next) {
    BPromise.promisifyAll(facebookApi.friends(req.body.access_token))
    .then(function(friendsResponse){
      var friends = friendsResponse.data.map(function(userData) {
          // console.log(JSON.stringify(userData,null, '\t'));
          return {
            id: userData.id,
            name: userData.name,
            pictureUrl: userData.picture.data.url,
            birthday : userData.birthday,
            fav_atheletes : userData.favorite_athletes,
            inspirational_people : userData.inspirational_people,
            sports : userData.sports,
            books: userData.books,
            albums: userData.albums
          };
      });
      res.send(JSON.stringify(friends));
    })
    .catch(function(err) {
        console.log('Error building friends response');
        next(err);
    });
  },

  getInvitableFriend: function(req, res, next){
    BPromise.promisifyAll(facebookApi.invitableFriends(req.body.access_token))
    .then(function(invitableFriendsResponse){
      var invitableFriends = invitableFriendsResponse.data.map(function(userData) {
          // console.log(JSON.stringify(userData,null, '\t'));
          return {
            id: userData.id,
            name: userData.name,
            pictureUrl: userData.picture.data.url,
          };
      });
      res.send(JSON.stringify(invitableFriends));
    })
    .catch(function(err) {
        console.log('Error building invitableFriends response');
        next(err);
    });
  }

};
