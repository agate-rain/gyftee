var model = require('mongoose').model;
var Schema = require('mongoose').Schema;

// represents all users of the app, both gifters and giftees 
var UserSchema = new Schema({
  birthdate: {
    // may need to change to Date, using String bc we don't know what FB will give us
    type: String,
    required: true
  },
  fbToken: {
    type: String
  },
  fbId: {
    type: String
  },
  friendsList: [{ // array that represents users, stored by _id that reference the target user
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  facebookFriends: [{
    // keep this flexible for now; check to see what the
    name: {
      type: String
    },
    id: {
      type: Number
    }
  }]
});

module.exports = model('User', UserSchema);
