var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
  app.post('/signout', userController.signout);
  app.get('/stats', userController.stats);
  app.post('/statchange', userController.statChange);
  app.get('/leaderboard', userController.leaderboard);


};
