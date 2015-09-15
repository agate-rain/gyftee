var should = require('should');
var utils = require('./serverUtils'); // import the moongoose helper utilities
var app = require('../../server/server');
var request = require('supertest')(app);
var async = require('async');


describe('====== Gifts Controller ======', function() {

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

  describe('Looking up gifts', function() {

    it('should retrieve book items from Amazon API based on a keyword', function(done) {

      var keyword = "Garfield";

      request
        .post('/api/gifts/searchbykeyword')
        .send({keyword: keyword})
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          should.not.exist(err);
          done();
        });

    });

    it('should retrieve book items from Amazon API based on an ASIN number', function(done) {

      var books = ["0446310786", "1503290565", "1503292738"];

      request
        .post('/api/gifts/itemlookup')
        .send({books: books})
        .expect(200)
        .end(function(err, res) {
          //console.log(JSON.stringify(res, null, "\t"));
          if (err) {
            return done(err);
          }
          should.not.exist(err);
          done();
        });

    });

    it('should retrieve similar book items from Amazon API based on an ASIN number', function(done) {

      var ASIN = "0446310786";

      request
        .post('/api/gifts/searchsimilargifts')
        .send({ASIN: ASIN})
        .expect(200)
        .end(function(err, res) {
          //console.log(res.body.Items.Item);
          if (err) {
            return done(err);
          }
          res.body.Items.Item.should.be.instanceof(Array);
          should.not.exist(err);
          done();
        });

    });

    it('should retrieve events from BandsInTown API', function(done) {

      var startDate = "2015-09-30";
      var endDate = "2015-12-01";
      var loc = "San+Francisco";
      var artistArr = ["Janet Jackson", "Empire of the Sun"];

      request
        .post('/api/gifts/getevents')
        .send({startDate: startDate, endDate: endDate, loc: loc, artistArr:artistArr})
        .expect(200)
        .end(function(err, res) {
          //console.log(res.body[0]);
          if (err) {
            return done(err);
          }
          // make sure an array is returned
          res.body[0].should.be.instanceof(Array);
          should.not.exist(err);
          done();
        });

    });

    it('should retrieve an artist\'s photo from BandsInTown API', function(done) {

      var artist = [escape("Janet Jackson")];

      request
        .post('/api/gifts/getartistimage')
        .send({artist: artist})
        .expect(200)
        .end(function(err, res) {
          //console.log(res.body[0]);
          if (err) {
            return done(err);
          }
          // make sure an array is returned
          res.body[0].name.should.equal("Janet Jackson");
          should.not.exist(err);
          done();
        });

    });

  });

});

