var userController = require('./userController.js');

module.exports = function(app) {
  // app is the user router injected from middleware file
  app.post('/save', userController.saveUser);
  app.post('/friends', function(req, res, next) {
    BPromise.promisifyAll(facebookApi.friends(req.body.access_token))
    .then(function(friendsResponse){
      var friends = friendsResponse.data.map(function(userData) {
          return {
            id: userData.id,
            name: userData.name,
            pictureUrl: userData.picture.data.url,
            birthday : userData.birthday,
            fav_atheletes : userData.favorite_athletes,
            inspirational_people : userData.inspirational_people,
            sports : userData.sports,
            books: userData.books,
            albums: userData.albums
          };
      });
      res.send(JSON.stringify(friends));
    })
    .catch(function(err) {
        console.log('Error building friends response');
        next(err);
    });
  });

};
