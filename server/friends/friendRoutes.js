var friendController = require('./friendController.js');
var BPromise = require('bluebird');
var facebookApi = require('../config/facebook-api.js');

module.exports = function(app) {
  // app is the userrouter injected from middleware file

  // app.post('/signin', userController.signin);
  // app.post('/signout', userController.signout);
  app.post('/', friendController.getFriend);
  app.post('/savegift', friendController.saveGift);
  app.post('/image', friendController.getImageUrl);
  app.post('/invitableFriends', friendController.getInvitableFriend);
  app.post('/:friendId', friendController.getFriendById);
};
