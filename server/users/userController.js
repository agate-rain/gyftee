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
    User.findOne({fbId: req.body.identities[0].user_id})
        .exec(function(err, found) {
          if (found) {
            res.send(200, 'User already existed!');
          } else {
            var newUser = new User({
              fbId: req.body.identities[0].user_id,
              birthdate : req.body.birthday,
              pictureUrl: req.body.picture
            });
            newUser.save(function(err,newEntry) {
              if (err) {
                res.send(500, err);
              } else {
                res.send(200,newEntry);
              }
          }


    newUser.save(function(err, user) {
      if (err) {
        console.log(err);
      }
      res.status(200).json({_id: user._id});
    });
  }
};
