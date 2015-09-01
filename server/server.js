var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/dbConfig');
var cors = require('cors');
var jwt = require('express-jwt');
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var BPromise = require('bluebird');
var fb = require('fb');
var facebookApi = require('./config/facebook-api');

//load .env file
dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});
var app = express();

// configure the server with all the middleware and the routing
require('./config/middleware')(app, express);



 // Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/secured', authenticate);
app.use(cors());

app.get('/ping', function(req, res) {
  res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

app.post('/secured/ping', function(req, res) {
    BPromise.all([
        facebookApi.friends(req.body.access_token),
        facebookApi.invitableFriends(req.body.access_token)
    ])
    .spread(function(friendsResponse, invitableFriendsResponse) {
        var friends = friendsResponse.data.map(function(userData) {
            console.log(userData);
            return {
                id: userData.id,
                name: userData.name,
                pictureUrl: userData.picture.data.url,
            };
        });
        var invitableFriends = invitableFriendsResponse.data.map(function(userData) {
            return {
                id: userData.id,
                name: userData.name,
                pictureUrl: userData.picture.data.url
            };
        });
        var allFriends = friends.concat(invitableFriends);
        res.send(JSON.stringify(allFriends));
    })
    .catch(function(err) {
        log.error('Error building friends response: ' + util.inspect(err));
        next(err);
    });
});

mongoose.connect(db.url);
mongoose.connection.once('connected', function(){
  console.log('Nifty gifty db is connected!');
});

// will change this later for production
var port = process.env.PORT || 3000;

app.listen(port);

console.log('Magical gifts on port ' + port);
module.exports = app;
