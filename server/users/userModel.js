var mongoose = require('mongoose');

// represents all users of the app, both gifters and giftees
var UserSchema = new mongoose.Schema({
  birthdate: {
    // http://stackoverflow.com/questions/18128532/how-to-correctly-jsonify-a-mongoose-model-with-a-birthday
    // FACEBOOK GRAPH API: The person's birthday. This is a fixed format string, like MM/DD/YYYY. However, people can control who can see the year they were born separately from the month and day so this string can be only the year (YYYY) or the month + day (MM/DD)
    type: String // MM/DD/YYYY
  },
  // user profile photo from fb nested in friend's picture object
  pictureUrl: {
    type: String
  },
  fbId: {
    type: String
  },
  friendsList: [{ // array that represents users, stored by _id that reference the target user
    fbId: {
      type: String,
      pinnedGifts: [{
              books: [{
                        type: mongoose.Schema.Types.Mixed
                      }],
              music: [{
                        type: mongoose.Schema.Types.Mixed
                      }],
              etsy: [{
                        type: mongoose.Schema.Types.Mixed
                      }]
          }]
    }
  }],
  facebookFriends: [{
    // keep this flexible for now; check to see what the
    name: {
      type: String
    },
    fbId: {
      type: Number
    }
  }]
});

module.exports = mongoose.model('User', UserSchema);
