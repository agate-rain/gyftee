var mongoose = require('mongoose');
var db = require('../../server/config/dbConfig');

process.env.NODE_ENV = 'test';

beforeEach(function(done) {
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove();
    }
    return done();
  }
  function reconnect() {
    console.log(db.url);
    mongoose.connect(db.url, function(err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  }
  function checkState() {
    switch (mongoose.connection.readyState) {
    case 0:
      reconnect();
      break;
    case 1:
      clearDB();
      break;
    default:
      process.nextTick(checkState);
    }
  }

  checkState();
});

afterEach(function(done) {
  mongoose.disconnect();
  return done();
});
