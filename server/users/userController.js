var User = require('./userModel.js');

module.exports = {

  // signin: function(req, res, next) {
  // // look up user in database
  //   // if user does not exist, create and save in db
  //   // else, let user sign in
  // },

  // signout: function(req, res, next) {
  // // remove session
  // },

  saveUser: function(req, res, next) {
    // User.findOne({fbId: req.body.user_id})
    //     .exec(function(err, found) {
    //       if (found) {
    //         res.send(200, 'User already existed!');
    //       } else {

    console.log(req.body);
    var newUser = new User({
      fbId: req.body.user.user_id,
      birthdate : req.body.user.birthday,
      mutual_friends : req.body.user.mutual_friends
    });

    newUser.save(function(err,savedUser) {
      if (err) {
        res.send(500, 'Error saving user to DB' + err);
      } else {
        console.log(">> new User",savedUser);
        res.send(200,newUser);
      }
    });
  }
  //       });
  // }
}
