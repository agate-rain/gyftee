// load .env as soon as possible
require('dotenv').load();

// boot up express express and mongoose
var express = require('express');
var cassandra = require('cassandra-driver');
var app = express();
var server = require('http').Server(app);

var client = new cassandra.Client( { contactPoints : [ '127.0.0.1' ] } );


client.connect(function(err, result) {
    console.log('Cassandra Connected.');
});

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

app.use(bodyParser.json());
app.set('json spaces', 2);

app.get('/data', function(req, res) {
    res.send(client.hosts.slice(0).map(function (node) {
        return { address : node.address, rack : node.rack, datacenter : node.datacenter }
    }));
});



// listen on port 8000
server.listen(process.env.PORT || 8000);


// set up two handlers for separate sockets
var battleHandler = require('./config/battleHandler.js');
var dashboardHandler = require('./config/dashboardHandler.js');


module.exports = app;

/* Walkthrough of the server

  Express, cassandra, and our server are initialzed here
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
