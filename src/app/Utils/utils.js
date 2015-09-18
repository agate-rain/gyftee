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
      },
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
      data: {keyword : keyword},
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
        if (similargifts && similargifts.Items && similargifts.Items.Item) {
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
        // console.log(typeof data),
        // console.dir(data);
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/" + friendId, status, err.toString());
      }
    });
  },

  getConcerts: function(loc, date, range, artistArr, callback) {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    var mdy = date.split("/");
    var upcomingBday = new Date(currentYear, mdy[0]-1, mdy[1]);
    if (upcomingBday < currentDate){
      upcomingBday = new Date(currentYear+1, mdy[0]-1, mdy[1]);
    }

    range = range || 365;
    artistArr = artistArr;
    loc = loc || "San Francisco, California";
    var jsDate = new Date(upcomingBday);
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

        var artistArr = [];
        var concertGifts = [];

        concerts.forEach(function(concert){
          artistArr.push(concert.artists[0].name)
        })

      this.getArtistImage(artistArr, function(artist){
        for(var i in artist){
          concertGifts.push({
            basedOn: {
              artist_name : artist[i].name,
              facebook_page_url: artist[i].facebook_page_url,
              facebook_tour_dates_url: artist[i].facebook_tour_dates_url,
              thumb_url: artist[i].thumb_url,
              image_url: artist[i].image_url
            },
            category: "concert",
            details: concerts[i]
          });
        }
        if(concertGifts.length === concerts.length){
          callback(concertGifts)
        }
      });

      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/gifts/getevents", status, err.toString());
      }
    });
  },

  getArtistImage: function(artist, callback) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/gifts/getartistimage",
      method: 'POST',
      data: {artist : artist}, // need to pass in the access token
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/gifts/getartistimage", status, err.toString());

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
  },

  searchEtsy: function(keyword, tagArr, callback){
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/searchEtsy',
      method: 'POST',
      data: {keyword : keyword},
      success: function(data) {
        // console.log('TAG ARR>>>>>>>>',tagArr )
        var resultArr = data.results;
        var etsyArr = [];
        for(var etsy in resultArr){
          etsyArr.push({
            basedOn: {keyword: keyword, image: [tagArr[0].image,tagArr[1].image]},
            category: "etsy",
            details: resultArr[etsy]
          })
        }
        callback(etsyArr);
        //this.props.dispatch(saveGifts(gifts));
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("NOT WORKING", xhr, status, err);
        //console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  assembleImage : function(albumArr,callback){
    // var albumArr = this.props.friend.friend.albums.data;
    ////////////////////////////////////////////////////////////////////
    var promises = [];
    var resultImageArr;

    var fetchImageSync = function(albumId){
      var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
      return new Promise(function(resolve, reject){
        FB.api('/v2.4/' + albumId + '/photos',
            'GET',
            {"fields":"source,url,message,place", "access_token": access_token}, function(result) {
              resolve(result);
            });
      });
    };

    albumArr.forEach(function(album){
      promises.push(fetchImageSync(album.id));
    });

    Promise.all(promises).then(function(result){
      return result = result.map(function(item){
        return item.data.map(function(photo){
          return photo;
        });
      });
    }).then(function(result){
      callback(result)
      // resultImageArr = result;
      // this.setState({imageArr : resultImageArr});
      // this.getTags(resultImageArr);
    }.bind(this));

    /////////////////////////////////////////////////////


    // var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
    // albumArr.forEach(function(album){
    //   this.getImage(album.id,access_token);
    // }.bind(this));
  },

  getTagFromClarifai: function(imageArr, callback) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/gifts/gettagsfromclarifai",
      method: 'POST',
      data: {
        imageArr : imageArr
      },
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/gifts/gettagsfromclarifai", status, err.toString());
        return null; // stock image if unsuccessful
      }
    });
  },

  calculateTagFrequency: function(arr,callback) {
    var tagArr = [];
    arr.forEach(function(obj){
      tagArr.push(obj.tag);
    })
    tagArr = tagArr.reduce(function(a, b){
     return a.concat(b);
    });
    var storage = [];

    for(var i = 0; i < tagArr.length; i++){
      if(storage.indexOf(tagArr[i]) === -1){
        storage.push(tagArr[i])
      }
    }
    var rand1 = Math.floor(Math.random() * storage.length) + 1;
    var rand2 = Math.floor(Math.random() * storage.length) + 1;

    callback(storage[rand1] + ' ' + storage[rand2]);
  },

};
