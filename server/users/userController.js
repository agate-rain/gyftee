var User = require('./userModel.js');
var GiftSchema = require('../gifts/giftModel');
var mongoose = require('mongoose');
var Gift = mongoose.model('Gift', GiftSchema);

module.exports = {

  // signin: function(req, res, next) {
  // // look up user in database
  //   // if user does not exist, create and save in db
  //   // else, let user sign in
  // },

  // signout: function(req, res, next) {
  // // remove session
  // },

  saveUser: function(req, res) {
    User.findOne({fbId: req.body.user.user_id})
      .exec(function(err, found) {
        if (found) {
          res.send(200, 'User already existed!');
        } else {
          var newUser = new User({
            fbId: req.body.user.user_id,
            birthdate : req.body.user.birthday,
            mutual_friends : req.body.user.mutual_friends
          });
          var newUser = new User({
              fbId: req.body.user.user_id,
              birthdate : req.body.user.birthday,
              mutual_friends : req.body.user.mutual_friends,
              giftsList: []
            });
          console.log(newUser)
            req.body.user.mutual_friends.forEach(function(friend){
              var newGift = new Gift({fbId: friend.id,
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

          newUser.save(function(err, user) {
            if (err) {
              res.status(500).send('Error saving user to DB\n\n' + err);
            } else {
              res.status(200).send(user);
            }
          });
        }
      });
  }
};
