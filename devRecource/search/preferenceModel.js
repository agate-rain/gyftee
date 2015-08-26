var mongoose = require('mongoose'),
    crypto   = require('crypto');

var PreferenceSchema = new mongoose.Schema({
 url: String,
 name: String,
 visited: Boolean,
 liked: Boolean
});

PreferenceSchema.pre('save', function(next){
  // var code = createSha(this.url);
  // this.code = code;
  next();
});

module.exports = mongoose.model('Preference', PreferenceSchema);
