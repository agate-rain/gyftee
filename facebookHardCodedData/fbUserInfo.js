// search for facebook information for a particular user
// Javascript SDK
// https://developers.facebook.com/docs/javascript
// https://developers.facebook.com/docs/graph-api/using-graph-api/v2.4#fieldexpansion

FB.api(
  '/me',
  'GET',
  {"fields":"id,name,birthday,friends,location,books,music,movies"},
  function(response) {
      // Insert your code here
  }
);