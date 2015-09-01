var userController = require('./userController.js');

module.exports = function(app) {
  // app is the userrouter injected from middleware file
  app.post('/signin', userController.signin);
  app.post('/signout', userController.signout);
  app.post('/add', userController.addUser);

  app.get('/ping', function(req, res) {
    console.log(req)
    res.send(200, {text: "All good. You don't need to be authenticated to call this"});
  });

  app.get('/secured/ping', function(req, res) {
    res.send(200, {text: "All good. You only get this message if you're authenticated"});
  })

};