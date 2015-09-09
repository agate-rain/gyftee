var mongoose = require('mongoose');

var GiftSchema = new mongoose.Schema({
  fbId: {
    type: String,
    required: true
  },
  pinnedGifts: {
                  books: [{
                            type: mongoose.Schema.Types.Mixed
                          }],
                  music: [{
                            type: mongoose.Schema.Types.Mixed
                          }],
                  etsy: [{
                            type: mongoose.Schema.Types.Mixed
                          }]
              }
});

module.exports = GiftSchema;
// module.exports = mongoose.model('Gift', GiftSchema);
