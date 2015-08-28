var model = require('mongoose').model;
var Schema = require('mongoose').Schema;

var GiftListSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  // giftee
  friendId: {
    type: ObjectId,
    ref: 'User'
  },
  gifts: [{
    type: ObjectId,
    ref: 'Gift'
  }]
});

module.exports = model('GiftList', GiftListSchema);
