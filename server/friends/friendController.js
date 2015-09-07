// var User = require('./userModel.js');
var BPromise = require('bluebird');
var facebookApi = require('../config/facebook-api.js');
var User = require('../users/userModel');

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
      var friends = friendsResponse.data.map(function(friend) {
          return {
            id: friend.id,
            name: friend.name,
            pictureUrl: friend.picture.data.url,
            birthday : friend.birthday,
            fav_atheletes : friend.favorite_athletes,
            inspirational_people : friend.inspirational_people,
            sports : friend.sports,
            books: friend.books,
            albums: friend.albums
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
      var invitableFriends = invitableFriendsResponse.data.map(function(friend) {
          return {
            id: friend.id,
            name: friend.name,
            pictureUrl: friend.picture.data.url,
          };
      });
      res.send(JSON.stringify(invitableFriends));
    })
    .catch(function(err) {
        console.log('Error building invitableFriends response');
        next(err);
    });
  },

  getFriendById: function(req, res, next) {
    var friendId = req.body.friendId;
    console.log('friendId',friendId);
    BPromise.promisifyAll(facebookApi.friends(req.body.access_token))
    .then(function(friendsResponse){
      var friend = friendsResponse.data.filter(function(friend) {
        if(friend.id === friendId){
            return {
              id: friend.id,
              name: friend.name,
              pictureUrl: friend.picture.data.url,
              birthday : friend.birthday,
              fav_atheletes : friend.favorite_athletes,
              inspirational_people : friend.inspirational_people,
              sports : friend.sports,
              books: friend.books,
              albums: friend.albums
            };
        }
      });
      res.send(JSON.stringify(friend));
    })
    .catch(function(err) {
        console.log('Error requesting friend response with friendId');
        next(err);
    });
  },

};
