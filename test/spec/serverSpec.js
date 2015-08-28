var request = require('supertest'),
    express = require('express'),
    expect  = require('chai').expect,
    app     = require('../../server/server.js');


describe('information at root directory of server',
  function() {
  it('is connecting locally', function(done) {
  // pass in our server to supertest
  request(app)
    .get('/')
    // test passes if statusCode is 200
    .expect(200, function(err, data) {
      // display error in terminal
      console.log('error: ', err);
      // data is everything we get back from the server
      console.log('data: ', data);
    })
    // test will timeout without end
    .end(done);
  });

});
