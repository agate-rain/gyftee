var BPromise = require('bluebird');
var facebookApi = require('../config/facebook-api.js');
var User = require('../users/userModel');
var http = require('http');
var request = require('request');

module.exports = {

  getFriend: function(req, res, next) {
    BPromise.promisifyAll(facebookApi.friends(req.body.access_token))
    .then(function(friendsResponse) {
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
        next(err);
    });
  },

   saveGift: function(req, res, next) {
    var friendId = req.body.friendId;
    var userId = req.body.userId;

    User.findOne({fbId:userId})
      .exec(function(err, user) {
          if (user) {
            user.giftsList.forEach(function(gift) {
              if (gift.fbId === friendId) {
                if (req.body.type === 'book') {
                  var ASIN = req.body.giftId;
                  if (gift.pinnedGifts.books.indexOf(ASIN) === -1) {
                    gift.pinnedGifts.books.push(ASIN);
                    user.markModified('giftsList');
                    user.save();
                    res.status(200).send("Book successfully saved to database");
                  }
                }
                else if (req.body.type === 'music') {
                  for (var i = 0; i < gift.pinnedGifts.music.length; i++) {
                    if(gift.pinnedGifts.music[i] === req.body.giftId) {
                      res.status(200).send('CONCERT ALREADY EXIST');
                    }
                  }
                  gift.pinnedGifts.music.push(req.body.giftDetail);
                  user.markModified('giftsList');
                  user.save();
                  res.status(200).send('Concert successfully saved to database', req.body.giftDetail);
                }
                else if (req.body.type === 'etsy') {
                  for (var i = 0; i < gift.pinnedGifts.etsy.length; i++) {
                    if(gift.pinnedGifts.etsy[i] === req.body.giftId) {
                      res.status(200).send('ETSY ALREADY EXIST');
                    }
                  }
                  gift.pinnedGifts.etsy.push(req.body.giftDetail);
                  user.markModified('giftsList');
                  user.save();
                  res.status(200).send('Etsy successfully saved to database', req.body.giftDetail);
              }
            }

          })
        } else {
           res.status(500).send("Unable to save gift to database");
        }
    });
  },
  // TODO: Refactor to remove concert or book items
  removeGift: function(req, res, next) {
    var friendId = req.body.friendId;
    var userId = req.body.userId;
    var giftId = req.body.giftId;
    var giftObj = req.body.giftObj;

    // Find the user
    User.findOne({fbId:userId})
      .exec(function(err, user) {
          if (user) {
            // Find the friend
            user.giftsList.forEach(function(gift) {
              if (gift.fbId === friendId){
                // Look for the boox
                if (req.body.type === 'book') {
                  var giftToRemoveIdx = gift.pinnedGifts.books.indexOf(giftId);
                  if (giftToRemoveIdx !== -1) {
                    // Remove the book
                    gift.pinnedGifts.books.splice(giftToRemoveIdx, 1);
                  }
                }
                if (req.body.type === 'music') {
                  for (var i = 0; i < gift.pinnedGifts.music.length; i++) {
                    if(gift.pinnedGifts.music[0].giftId === giftId) {
                      var temp = gift.pinnedGifts.music[i];
                      gift.pinnedGifts.music.splice(i,1);
                    }
                  }
                }
                if (req.body.type === 'etsy') {
                  for (var i = 0; i < gift.pinnedGifts.etsy.length; i++) {
                    if (gift.pinnedGifts.etsy[0].giftId === giftId) {
                      var temp = gift.pinnedGifts.etsy[i];
                      gift.pinnedGifts.etsy.splice(i,1);
                    }
                  }
                }
              }
            });
            // Save the modified document
            user.markModified('giftsList');
            user.save();
            res.status(200).send("Gift removed from database");
          } else {
           res.status(500).send("Unable to remove gift from database");
          }
    });
  },

  getWishList: function(req, res, next) {
    var userId = req.params.userId;
    var friendId = req.params.friendId;
    User.findOne({fbId: userId}).exec(function(err, user) {
      if (user) {
        user.giftsList.forEach(function(friend) {
          if(friend.fbId === friendId) {
           res.status(200).send(friend.pinnedGifts);
          }
        });
      } else {
        res.status(500).send(err);
      }
    })
  },

  getInvitableFriend: function(req, res, next) {
    BPromise.promisifyAll(facebookApi.invitableFriends(req.body.access_token))
    .then(function(invitableFriendsResponse) {
      var invitableFriends = invitableFriendsResponse.data.map(function(friend) {
        return {
          id: friend.id,
          name: friend.name,
          pictureUrl: friend.picture.data.url
        };
      });
      res.send(JSON.stringify(invitableFriends));
    })
    .catch(function(err) {
        next(err);
    });
  },

  getFriendById: function(req, res, next) {
    var friendId = req.params.friendId;
    BPromise.promisifyAll(facebookApi.friends(req.body.access_token))
    .then(function(friendsResponse) {
      var friend = friendsResponse.data.filter(function(friend) {
        if (friend.id === friendId) {
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
      res.status(200).send(JSON.stringify(friend[0]));
    })
    .catch(function(err) {
        next(err);
    });
  },

  getImageUrl: function(req, res, next) {
    var options = {
      url: 'https://graph.facebook.com/' + req.body.friendId +'/picture?type=large',
      headers: {
        'access_token': req.body.access_token
      }
    }
    var result;
    request(options).on('response', function(response) {
        result = response.request.uri.href;
        res.send(result);
    });
  }
};
