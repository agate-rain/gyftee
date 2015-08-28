var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/dbConfig');

var app = express();

mongoose.connect(db.url);
mongoose.connection.once('connected', function(){
  console.log('Nifty gifty db is connected!');
});

// will change this later for production
var port = process.env.PORT || 3000;

app.listen(port);

console.log('Magical gifts on port ' + port);
module.exports = app; 
