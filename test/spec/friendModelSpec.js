var should = require('should');
var utils = require('./serverUtils'); // import the moongoose helper utilities
var app = require('../../server/server');
var request = require('supertest')(app);
var async = require('async');


describe('====== Friends Controller ======', function() {

  beforeEach(function(done) {

    async.series([
      // make sure we're connected
      utils.checkState,
      // save the dummy user
      utils.saveDummyUser,
      // save the dummy friend
      utils.saveDummyFriend
    ], done);

  });

  afterEach(function(done) {

    async.series([
      // remove the dummy user
      utils.removeDummyUser,
      // save the dummy friend
      utils.removeDummyFriend,
      // disconnect from mongo
      utils.disconnect
    ], done);

  });

  describe('Adding a Gift to the Gift List', function() {

    afterEach(function(done){
      utils.removeDummyGift(done);
      done();
    });

    it('should add a gift to a friend\'s list', function(done) {
      //app.post('/savegift', friendController.saveGift);

      request
        .post('/api/friends/savegift')
        .send({friendId: utils.dummyFriend.user_id, userId: utils.dummyUser.user_id, ASIN: utils.dummyGift})
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          should.not.exist(err);
          done();
        });

    });
  });

  describe('Removing a Gift from the Gift List', function() {

    beforeEach(function(done){
      utils.saveDummyGift(done);
      done();
    });

    it('should remove a gift from a friend\'s list', function(done) {

      request
        .post('/api/friends/removegift')
        .send({friendId: utils.dummyFriend.user_id, userId: utils.dummyUser.user_id, ASIN: utils.dummyGift})
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          should.not.exist(err);
          done();
        });

    });
  });

  describe('Retrieving a Gift List', function() {

   /* it('should retrieve a friend\'s list', function(done) {
    //app.get('/wishlist/:friendId/:userId', friendController.getWishList)
    });*/

    beforeEach(function(done){
      utils.saveDummyGift(done);
      done();
    });

    afterEach(function(done){
      utils.removeDummyGift(done);
      done();
    });

    it('should remove a gift from a friend\'s list', function(done) {

      request
        .get('/api/friends/wishlist/'+utils.dummyFriend.user_id+'/'+utils.dummyUser.user_id)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.books.indexOf(utils.dummyGift).should.not.equal(-1)
          should.not.exist(err);
          done();
        });

    });


  });


});
