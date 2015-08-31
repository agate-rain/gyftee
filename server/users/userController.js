var User = require('./userModel.js');

module.exports = {
  // TODO get username and pw from FB API

  signin: function(req, res, next) {
  // look up user in database
    // if user does not exist, create and save in db
    // else, let user sign in
  },

  signout: function(req, res, next) {
  // remove session
  },

  addUser: function(req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
      if (err) {
        console.log(err);
      }
      res.status(200).json({_id: user._id});
    });
  }
};