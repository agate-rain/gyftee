var should = require('should');
var utils = require('./serverUtils'); // import the moongoose helper utilities
var app = require('../../server/server');
var request = require('supertest')(app);

describe('users: routes', function() {

  describe('POST /add', function() {

    it('should create and save a new User', function(done) {

      var user = {
        fbId: 1,
        fbToken: 'someToken'
      };
      request
        .post('/api/users/add')
        .send(user)
        .expect(200)
        .end(function(err, res) {
          console.log(res);
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
