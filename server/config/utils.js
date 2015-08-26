var request = require('request'),
    Q       = require('q'),
    jwt  = require('jwt-simple'),
    User = require('../users/userModel.js');

module.exports = {

  findCurrentUser: function(req){
    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, 'secret');
    return user.username;
  }

};

