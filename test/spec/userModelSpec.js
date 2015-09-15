var should = require('should');
var utils = require('./serverUtils'); // import the moongoose helper utilities
var app = require('../../server/server');
var request = require('supertest')(app);
var async = require('async');


describe('====== Users Controller ======', function() {

   beforeEach(function(done) {

    async.series([
      // make sure we're connected
      utils.checkState
    ], done);

  });

  afterEach(function(done) {

    async.series([
      // remove the user
      utils.removeDummyUser,
      // disconnect
      utils.disconnect
    ], done);

  });

  describe('Saving a new user', function() {

    it('should create and save a new User', function(done) {

      var user = utils.dummyUser;

      request
        .post('/api/users/save')
        .send({user: user})
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          should.not.exist(err);
          should.exist(res.body._id);
          done();
        });

    });

  });

});

