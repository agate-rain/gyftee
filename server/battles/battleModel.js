var mongoose = require('mongoose'),
    Q        = require('q'),
    crypto   = require('crypto');
    fs       = require('fs');


var ImageSchema = new mongoose.Schema({
  
  imagehash: {
    type: String
  },

  url: {
    type: String,
  },

  tags: {
    type: String
  }
  
});

ImageSchemamethods.generateHash = function () {
  var rand = Math.random().toString();
  var shasum = crypto.createHash('sha1');
  shasum.update(rand);
  return shasum.digest('hex').slice(0, 10);
};


ImageSchema.pre('save', function (next) {
  var imagehash = this.generateHash();
  var that = this;
  this.imagehash = imagehash;
});

module.exports = mongoose.model('images', ImageSchema);