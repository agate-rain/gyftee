var mongoose = require('mongoose');
var db = require('../../server/config/dbConfig');
var User = require('../../server/users/userModel');
var request = require('request');
var GiftSchema = require('../../server/gifts/giftModel');
var Gift = mongoose.model('Gift', GiftSchema);

process.env.NODE_ENV = 'test';

/**************************************/
/******** MONGODB CONNECTION **********/
/**************************************/

// Function to connect to the database
var connect = function(done) {
  console.log(db.url);
  mongoose.connect(db.url, function(err) {
    if (err) {
      throw err;
    }
    return done();
  });
}

// Function to disconnect from the database
var disconnect = function(done) {
  mongoose.disconnect();
  return done();
}

// Function to clear the database completely
var clearDB = function(done) {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove();
  }
  return done();
}

var checkState = function(done) {

  if (!mongoose.connection.readyState){
    connect(done);
  } else {
    return done();
  }
};

/**************************************/
/************** FAKE DATA *************/
/**************************************/

// Dummy user object
var dummyUser = {
  "birthday": "01/01/1999",
  "user_id": "12345",
  "name": "User",
  "mutual_friends": [{
    "id": "67890",
    "name": "Friend"
  }]
};

// Dummy friend object
var dummyFriend = {
  "birthday": "12/31/2000",
  "user_id": "67890",
  "name": "Friend",
  "mutual_friends": [{
    "id": "12345",
    "name": "User"
  }]
};

var dummyGift = "039324721X"; // book

// Helper function to save a user
var saveUser = function(userObj, done){
  var newUser = new User({
    fbId: userObj.fbId,
    birthdate: userObj.birthdate,
    mutual_friends: userObj.mutual_friends,
    giftList: []
  });

  userObj.mutual_friends.forEach(function(friend){
    var newGift = new Gift({
      fbId: friend.id,
      pinnedGifts:
        [
          { books : [],
            music : [],
            etsy: []
          }
        ]
    });
    newUser.giftsList.push(newGift);
  });

  // Save the new user to the database
  newUser.save(function(err, user) {
    if (err) {
      throw err;
    } else {
      return done();
    }
  });
};

// Save the dummy user
var saveDummyUser = function(done){
  saveUser({
    fbId: dummyUser.user_id,
    birthdate: dummyUser.birthday,
    mutual_friends: dummyUser.mutual_friends
  }, done);
};

// Save the dummy friend
var saveDummyFriend = function(done){
  saveUser({
    fbId: dummyFriend.user_id,
    birthdate: dummyFriend.birthday,
    mutual_friends: dummyFriend.mutual_friends
  }, done);
};

var removeUser = function(userId, done){

  User.remove({fbId: userId}, function(err,removed) {
    if (err) { throw err; }
    return done();
  });
};

var removeDummyUser = function(done){
  removeUser(dummyUser.user_id, done);
};

var removeDummyFriend = function(done){
  removeUser(dummyFriend.user_id, done);
};

var saveGift = function(fromId, toId, giftId, done){
  User.findOne({fbId:fromId})
      .exec(function(err, user) {
        if (err) {
          throw err;
        }
        if (user) {
          user.giftsList.forEach(function(friendList){
            if(friendList.fbId === toId){
              friendList.pinnedGifts.books.push(giftId);
            }
          });
          //user.markModified('giftsList');
          user.save();
        }

    });
  //return done();
};

var saveDummyGift = function(done){
  saveGift(dummyUser.user_id, dummyFriend.user_id, dummyGift);
};

var removeGift = function(fromId, toId, giftId, done){
  User.findOne({fbId:fromId})
      .exec(function(err, user) {
        if (err) {
          throw err;
        }
        if (user) {
          user.giftsList.forEach(function(friendList){
            if(friendList.fbId === toId){
              var giftToRemoveIdx = friendList.pinnedGifts.books.indexOf(giftId);
              friendList.pinnedGifts.books.splice(giftToRemoveIdx, 1);
            }
          });
          //user.markModified('giftsList');
          user.save();
        }

    });
  //return done();
};

var removeDummyGift = function(done){
  removeGift(dummyUser.user_id, dummyFriend.user_id, dummyGift);
};

module.exports = {

  connect: connect,
  disconnect: disconnect,
  clearDB: clearDB,
  dummyUser: dummyUser,
  dummyFriend: dummyFriend,
  dummyGift: dummyGift,
  saveDummyUser: saveDummyUser,
  saveDummyFriend: saveDummyFriend,
  removeDummyUser: removeDummyUser,
  removeDummyFriend: removeDummyFriend,
  saveDummyGift: saveDummyGift,
  removeDummyGift: removeDummyGift,
  checkState: checkState

};

