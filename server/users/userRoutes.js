var userController = require('./userController.js');

module.exports = function(app) {
  // app is the userrouter injected from middleware file
  app.post('/signin', userController.signin);
  app.post('/signout', userController.signout);
  app.post('/add', userController.addUser);
};
