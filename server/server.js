var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/dbConfig');
var 

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
