var friendController = require('./friendController.js');

module.exports = function(app) {
  // app is the friend router injected from middleware file

  app.post('/', friendController.getFriend);
  app.post('/savegift', friendController.saveGift);
  app.post('/removegift', friendController.removeGift);

  app.get('/wishlist/:friendId/:userId', friendController.getWishList)
  app.post('/image', friendController.getImageUrl);
  app.post('/invitableFriends', friendController.getInvitableFriend);
  app.post('/:friendId', friendController.getFriendById);
};
