// load .env as soon as possible
require('dotenv').load();

// boot up express express and mongoose
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);

// mongoose.connect('mongodb://localhost/battlescript');

var uristring = 
process.env.MONGOLAB_URI || 
process.env.MONGOHQ_URL || 
'mongodb://localhost/battlescript';

mongoose.connect(uristring, function (err, res) {
    if (err) { 
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});


// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// listen on port 8000
server.listen(process.env.PORT || 8000);

////////////////////////////////////////////////////////////
// init socket stuff
////////////////////////////////////////////////////////////

// Declare io for the socket... Just creating an instance of the sokcet library
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  var handler = socket.handshake.query.handler;
  if (handler === 'dashboard') dashboardHandler(socket, io);
  if (handler === 'battle') battleHandler(socket, io);
});

// set up two handlers for separate sockets
var battleHandler = require('./config/battleHandler.js');
var dashboardHandler = require('./config/dashboardHandler.js');


// For handling various sockets, goto socket battleHandler in config js
// io.on('connection', function(socket){
//   var handler = socket.handshake.query.handler;
//   if (handler === 'battle') battleHandler(socket, io);
//   
// });

// export our app for testing and flexibility, required by index.js
module.exports = app;

/* Walkthrough of the server

  Express, mongoose, and our server are initialzed here
  Next, we then inject our server and express into our config/middleware.js file for setup.
    We also exported our server for easy testing

  middleware.js requires all express middleware and sets it up
  our authentication is set up there as well
  we also create individual routers for are two main features, links and users
  each feature has its own folder with a model, controller, and route file
    the respective file is required in middleware.js and injected with its mini router
    that route file then requires the respective controller and sets up all the routes
    that controller then requires the respective model and sets up all our endpoints which respond to requests

*/
