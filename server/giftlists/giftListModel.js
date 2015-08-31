var mongoose = require('mongoose');

var GiftListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // giftee
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  gifts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift'
  }]
});

module.exports = mongoose.model('GiftList', GiftListSchema);