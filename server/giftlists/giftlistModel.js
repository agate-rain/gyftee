var model = require('mongoose').model;
var Schema = require('mongoose').Schema;

var GiftListSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // giftee
  friendId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  gifts: [{
    type: Schema.Types.ObjectId,
    ref: 'Gift'
  }]
});

module.exports = model('GiftList', GiftListSchema);
