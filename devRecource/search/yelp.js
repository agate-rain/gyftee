var yelp = require("yelp").createClient({
  "consumer_key": "t5QFqaLoD3xJ65F46Vm6rA",
  "consumer_secret": "_NtoUJ1xlr3vaTcfND_6U_dJMYk",
  "token": "28aTDbsMFOXRWB7pcm_euOqdlLl-J4zk",
  "token_secret": "mT6o0o9QXDSXUCXxX7FO5sv2DX4"
});

exports.queryYelp = function(params, callback){
  console.log("PARAMS: ", params);
  var location = extractLocation(params);
  var distance = extractDistance(params);
  yelp.search({term: "restaurants", location: location, radius_filter: distance, sort: 2, offset: 0 }, function(err, data){
    if (err) throw err;
    var results = data.businesses.map(function(business){
      return business.name;
    })
    console.log(results);
    callback(data);
  });
}

var extractLocation = function(params){
  return params.location.text;
}

var extractDistance = function(params){
  // 80 meters radius per minute walking 

  return 80 * params.distance.walkingtime || 600;
}