// search for facebook information for a particular user
// Javascript SDK
// https://developers.facebook.com/docs/javascript
// https://developers.facebook.com/docs/graph-api/using-graph-api/v2.4#fieldexpansion

FB.api(
  '/me',
  'GET',
<<<<<<< HEAD
  {"fields":"id,name,birthday,friends,location,books,music,movies,picture"},
=======
  {"fields":"id,name,birthday,friends,location,books,music,movies"},
>>>>>>> built friendManager and related basic React components
  function(response) {
      // Insert your code here
  }
);