var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/dbConfig');
var jwt = require('express-jwt');
var dotenv = require('dotenv');
var BPromise = require('bluebird');
var fb = require('fb');
var aws = require('aws-lib');
var fs = require('fs');

//load .env file
dotenv.load();
var app = express();

// configure the server with all the middleware and the routing
require('./config/middleware')(app, express);

var prodAdv = aws.createProdAdvClient(process.env.AMAZON_CLIENT_ID, process.env.AMAZON_CLIENT_SECRET, process.env.AMAZON_ASSOCIATE_TAG);

mongoose.connect(db.url);
mongoose.connection.once('connected', function(){
  console.log('Nifty gifty db is connected!');
});

// will change this later for production
var port = process.env.PORT || 3000;
app.listen(port);

console.log('Magical gifts on port ' + port);
module.exports = app;
