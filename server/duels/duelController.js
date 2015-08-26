var request = require('request');
var Battle = require('../battles/battleModel.js')

module.exports = {
  getDuel: function(req, res) {
    // if(Battle) console.log("BATTLE MODEL EXISTS");
    console.log("REQ BODY: ", req.body);
    Battle.findOne({roomhash: req.body.battleHash}, function(err, battleRoom){
      console.log("BATTLEROOM: ", battleRoom);
      var options = {
        // url: 'https://www.codewars.com/api/v1/code-challenges/5513795bd3fafb56c200049e/javascript/train',
        url: 'https://www.codewars.com/api/v1/code-challenges/'+ battleRoom.challengeName + '/javascript/train',
        headers: {
          'Authorization': process.env.CODEWARS_AUTHORIZATION
        }
      };
      request.post(options, function(error, response, body) {
        res.send(response);
      });
    });
  },

  attemptDuel: function(req, res) {
    // Init a poll counter, so that if we poll too many times, it times out.
    var pollCounter = 0;
    
    // Poll the api
    var poll = function(dmid) {
      // Poll it with a get request, including the dmid
      request.get({
        url: 'https://www.codewars.com/api/v1/deferred/' + dmid,
        headers: {
          'Authorization': process.env.CODEWARS_AUTHORIZATION
        }
      }, function(error, response, body) {
        // parse the json response
        body = JSON.parse(body); 

        if (body && body.success) {
          // if poll body exists, and the poll is successful, we're good to go.
          res.send(body);
        } else {
          // otherwise, we need to keep polling...
          if (pollCounter++ >= 20) {
            // however, we should safety check here so that we don't overpoll
            // the api and run into endless loop. If we cross 20 polls,
            // something is definitely wrong...
            console.log('-----> Too many polls...');
            res.send({reason: 'Too many polls...'});
          } else {
            // as long as we're under the poll limit, keep on polling every
            // 0.5 seconds with the generated dmid from the initial post
            // request.
            console.log('poll # ', pollCounter);
            setTimeout(function() {
              poll(dmid);
            }, 500);
          }
        }
      });
    };

    // kick things off here with the first post request to the api, passing in
    // the project id and solution id. This will return the dmid which we can
    // use for polling.
    request.post({
      url: 'https://www.codewars.com/api/v1/code-challenges/projects/' + req.body.projectId + '/solutions/' + req.body.solutionId + '/attempt',
      json: {
        code: req.body.code,
        output_format: 'raw'
      },
      headers: {
        'Authorization': process.env.CODEWARS_AUTHORIZATION
      }
    }, function(error, response, body) {
      if (error) {
        console.log('-----> Error when doing initial attempt...');
        res.end();
      }

      // run the initial poll with the fetched dmid.
      poll(body.dmid);
    });
  },

  submitChallenge: function(req, res) {
    // TODO: Needs to be able to submit a challenge and test it
  },

  getAllChallenges: function(req, res) {
    // TODO: Be able to get all challenges here
    res.send('need to somehow get all challenges');
  }
};