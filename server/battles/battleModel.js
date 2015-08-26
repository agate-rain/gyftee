var mongoose = require('mongoose'),
    Q        = require('q'),
    crypto   = require('crypto');
    fs       = require('fs');


var BattleSchema = new mongoose.Schema({
  
  roomhash: {
    type: String
  },

  challengeLevel: {
    type: Number,
    default: 8
  },

  challengeName: {
    type: String
  }
  
});

BattleSchema.methods.generateHash = function () {
  var rand = Math.random().toString();
  var shasum = crypto.createHash('sha1');
  shasum.update(rand);
  return shasum.digest('hex').slice(0, 10);
};

BattleSchema.methods.pickChallenge = function (challengeLevel, callback) {
  var challengeName;
  var filePath = __dirname + '/../challenges/Level-' + challengeLevel;
  // console.log("FILEPATH: ", filePath);
  fs.readFile(filePath, function(err, data){
    var challenges = data.toString().split('\n');
    var randomPick = Math.floor(Math.random()*challenges.length);
    console.log("RANDOM PICK ", randomPick);
    var challenge = challenges[randomPick];
    var challengeSlug = challenge.split('/kata/')[1]; // separates slug from full url
    // console.log("CHALLENGE SLUG: ", challengeSlug);
    callback(challengeSlug);
  })
};

BattleSchema.pre('save', function (next) {
  var roomhash = this.generateHash();
  var that = this;
  this.roomhash = roomhash;
  this.pickChallenge(this.challengeLevel, function(challengeName){
    that.challengeName = challengeName;
    console.log("CHALLENGE PRE SAVE NAME: ", that.challengeName);
    next();
  });
});

module.exports = mongoose.model('battles', BattleSchema);