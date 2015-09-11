import PORT from '../../config/port.js';

module.exports = {
  formatDate: function(bday) {
    return bday === "Unknown" ? "Unknown" : bday.slice(0,5);
  },

  getUserData: function(category, friend) {
    console.log("GET USER DATA FROM UTILS");
    console.log("FRIEND", friend);
    switch(category){
      case 'books': return friend.books.data;
      case 'music': return friend.music.data;
      case 'location': return friend.location.name;
      case 'birthday': return friend.birthday;
      default: return friend.books;
    }
  },

  fetchImageUrlById: function(friendId, callback) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/friends/image",
      method: 'POST',
      data: {friendId : friendId,
             access_token: this.getUserAccessToken()}, // need to pass in the access token
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/image", status, err.toString());
        return null;
      }
    });
  },

  getUserAccessToken: function(){
    return JSON.parse(localStorage.getItem('access_token')).access_token;
  },

  fetchGiftByKeyWord: function(keyword, cb) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/gifts/searchbykeyword",
      method: 'POST',
      data: {keyword : keyword}, // need to pass in the access token
      success: function(gift) {
        this.getSimilarItem(gift.Items.Item[0], function(gift){
          cb(gift);
        });
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  getSimilarItem: function(gift, callback) {
    var ASIN = gift.ASIN;
    $.ajax({
      context: this,
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/searchsimilargifts',
      method: 'POST',
      data: {ASIN : ASIN},
      success: function(similargifts) {
        var gifts = []
        similargifts.Items.Item.forEach(function(recommendedGift){
          gifts.push({category: "book", details: recommendedGift, basedOn: gift});
        });
        callback(gifts);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/searchsimilargifts", status, err.toString());
        return null;
      }
    });
  },

  getPage : function(pageId) {
    // 126455562499
    var access_token = this.getUserAccessToken();
    FB.api('/v2.4/' + pageId,
            'GET',
            {"fields":"about,artists_we_like,band_members,band_interests", "access_token": access_token},
            function(response) {
              console.log(">>>>>>>>>>>>>> Page response",response);
    });
  },

  getMusic : function(friendId) {
    // 126455562499
    var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
    FB.api('/v2.4/' + friendId + '/music',
            'GET',
            {"fields":"data,paging", "access_token": access_token},
            function(response) {
              console.log(">>>>>>>>>>>>>> Music response",response);
              this.getPage(response.data[0].id);
    }.bind(this));
  },

  fetchFriendById: function(friendId, callback) {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/" + friendId,
      method: 'POST',
      data: {access_token: this.getUserAccessToken()},
      // need to pass in the access token
      success: function(data) {
        callback(JSON.parse(data));
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  getConcerts: function(loc, date, range, artistArr, callback) {

    // set defaults for testing
    date = '10/10/2015';
    range = range || 365;
    artistArr = artistArr;
     // || ["Janet Jackson", "Marina and The Diamonds"];
    loc = loc || "San Francisco, California";
    // get dates
    var jsDate = new Date(date);
    var startDate = new Date(jsDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
    var endDate = new Date(jsDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);

    // format the location
    loc = loc.split(" ").join("+").split(",+").join(",");
    // artist = artist.split(" ").join("+");

    // query
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/getevents',
      method: 'POST',
      data: {loc: loc, startDate: startDate, endDate: endDate, artistArr: artistArr},
      success: function(data) {
        callback(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("NOT WORKING BOO");
        //console.error("http://localhost:" + PORT.PORT + "/api/gifts/getevents", status, err.toString());
      }
    });

  },

};
