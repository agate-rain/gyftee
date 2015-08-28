var model = require('mongoose').model;
var Schema = require('mongoose').Schema;

var GiftSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number
  }
});

module.exports = model('Gift', GiftSchema);
