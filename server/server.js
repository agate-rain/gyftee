var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/dbConfig');
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

mongoose.connect(db.url);
mongoose.connection.once('connected', function(){
  console.log('Nifty gifty db is connected!');
});

// production config
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 4000;

app.listen(port, '0.0.0.0');

console.log('Magical gifts on port ' + port);
module.exports = app;
