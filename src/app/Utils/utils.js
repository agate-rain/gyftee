import PORT from '../../config/port.js';

module.exports = {
  formatDate: function(bday) {
    if(bday === "Unknown" || bday === undefined) {
      return "Unknown"
    } else {
      return bday.slice(0,5);
    }
  },

  getUserData: function(category, friend, callback) {
    var userInfo;
    if (category === 'books' && friend.books) {
      callback(friend.books.data);
    } else if (category === 'music' && friend.music) {
      callback(friend.music.data);
    } else if (category === 'location' && friend.location) {
      callback(friend.location.name);
    } else if (category === 'birthday') {
      callback(friend.birthday);
    } else {
      callback(friend.books);
    }
  },

  fetchImageUrlById: function(friendId, callback) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/friends/image",
      method: 'POST',
      data: {
        friendId : friendId,
        access_token: this.getUserAccessToken()
      }, // need to pass in the access token
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/image", status, err.toString());
        return null; // stock image if unsuccessful
      }
    });
  },

  getUserAccessToken: function() {
    return JSON.parse(localStorage.getItem('access_token')).access_token;
  },

  fetchGiftByKeyWord: function(keyword, cb) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/gifts/searchbykeyword",
      method: 'POST',
      data: {keyword : keyword}, // need to pass in the access token
      success: function(gift) {
        if (gift.Items.Item) {
          this.getSimilarItem(gift.Items.Item[0], function(gift) {
            cb(gift);
          });
        }
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  getSimilarItem: function(gift, callback) {
    var ASIN = gift.ASIN;
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/searchsimilargifts',
      method: 'POST',
      data: {ASIN : ASIN},
      success: function(similargifts) {
        var gifts = [];
        if (similargifts.Items.Item) {
          similargifts.Items.Item.forEach(function(recommendedGift) {
            gifts.push({category: "book", details: recommendedGift, basedOn: gift});
          });
          callback(gifts);
        } else {
          callback(gifts);
        }
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/searchsimilargifts", status, err.toString());
        return null;
      }
    });
  },

  getPage: function(pageId) {
    var access_token = this.getUserAccessToken();
    FB.api('/v2.4/' + pageId,
      'GET',
      {"fields":"about,artists_we_like,band_members,band_interests", "access_token": access_token},
      function(response) {
      }
    );
  },

  getMusic: function(friendId) {
    var access_token = this.getUserAccessToken();
    FB.api('/v2.4/' + friendId + '/music',
      'GET',
      {"fields":"data,paging", "access_token": access_token},
      function(response) {
        this.getPage(response.data[0].id);
    }.bind(this));
  },

  fetchFriendById: function(friendId, callback) {
    var access_token = this.getUserAccessToken();
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/" + friendId,
      method: 'POST',
      data: {access_token: access_token},
      dataType: "json",
      success: function(data) {
        console.log(typeof data),
        console.dir(data);
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/" + friendId, status, err.toString());
      }
    });
  },

  getConcerts: function(loc, date, range, artistArr, callback) {
    date = '10/10/2015';
    range = range || 365;
    artistArr = artistArr;
    loc = loc || "San Francisco, California";
    var jsDate = new Date(date);
    var startDate = new Date(jsDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
    var endDate = new Date(jsDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);

    // format the location
    loc = loc.split(" ").join("+").split(",+").join(",");

    // query
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/getevents',
      method: 'POST',
      data: {loc: loc, startDate: startDate, endDate: endDate, artistArr: artistArr},
      success: function(data) {
        // Format the data to conform to the gift object structure
        var concerts = data.reduce(function(a, b) {
            return a.concat(b);
          }, []);
        var concertGifts = [];

        for (var concert in concerts){
          concertGifts.push({
            basedOn: {},
            category: "concert",
            details: concerts[concert]
          });
        }
        callback(concertGifts);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/gifts/getevents", status, err.toString());
      }
    });
  },

  generateRandomKeyword: function(userArray, callback){
    if(!userArray){
      callback(null)
    }else{
      var randomIndex = Math.floor(Math.random() * (userArray.length - 1) + 1);
      if(userArray[randomIndex]){
        var keyWord = userArray[randomIndex].name;
        callback(keyWord);
      }
    }
  }

};
