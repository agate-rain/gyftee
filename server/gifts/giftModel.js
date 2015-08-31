var mongoose = require('mongoose');

var GiftSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model('Gift', GiftSchema);