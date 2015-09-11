import React from 'react';
import { connect } from 'react-redux';
import { fetchFriend, saveImageUrl } from '../Actions/friend'
import { saveGifts } from '../Actions/gifts'
import Slider from 'react-slick';
import FriendHeader from '../Components/friendHeader';
import Thumbnail from '../Components/thumbnail';
import RecommendationFilters from '../Components/recommendationFilters';
import BookList from '../Components/bookList';
import ConcertList from '../Components/concertList';
import PORT from '../../config/port.js';
import NavBar from '../Components/navbar';

var GiftRecommendations = React.createClass({

  render: function() {
    /*var concerts = this.filterGifts("concert");
    var books = this.filterGifts("book");*/

    return (
        <div className="recommendations">
          <NavBar />
          <FriendHeader friend={this.props.friend.friend} url={this.props.friend.image_url} />
          <BookList amazonBooks={this.props.gifts} />
          <ConcertList concerts={this.props.gifts} />
        </div>
    );
  },

  filterGifts: function(category){
    var result = [];
    result = this.props.gifts.filter(function(gift) { return gift.category === category; });
    return result;
  },

  getInitialState: function() {
    return { friend: [], gifts: []}
  },

  getUserData: function(category) {
    console.log("FRIEND", this.props.friend.friend);
    var friendData = this.props.friend.friend;
    switch(category){
      case 'books': return friendData.books.data;
      case 'music': return friendData.music.data;
      case 'location': return friendData.location.name;
      case 'birthday': return friendData.birthday;
      default: return friendData.books;
    }
  },

  getConcerts: function(loc, date, range, artistArr) {

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
        // console.log("CONCERT RESULTS------>", JSON.stringify(data));
        //this.props.dispatch(saveGifts(gifts));
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("NOT WORKING BOO");
        //console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });

  },

  getMusic : function(friendId) {
    // 126455562499
    var that = this;
    var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
    FB.api('/v2.4/' + friendId + '/music',
            'GET',
            {"fields":"data,paging", "access_token": access_token},
            function(response) {
              console.log(">>>>>>>>>>>>>> Music response",response);
              // that.getPage(response.data[0].id);
    });
  },

  getPage : function(pageId) {
    // 126455562499
    var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
    FB.api('/v2.4/' + pageId,
            'GET',
            {"fields":"about,artists_we_like,band_members,band_interests", "access_token": access_token},
            function(response) {
              console.log(">>>>>>>>>>>>>> Page response",response);
    });
  },

  componentDidMount: function() {
    var friendId = window.location.href.split('/')[4];
    this.fetchFriendById(friendId);
    this.fetchImageUrlById(friendId);
    this.getConcerts();
    // this.getMusic(friendId);
  },

  /* AMAZON BOOKS */
  generateRandomKeyword: function(userArray){
    var randomIndex = Math.floor(Math.random() * (userArray.length - 1) + 1);
    var keyWord = userArray[randomIndex].name;
    this.fetchGiftByKeyWord(keyWord);
  },

  fetchFriendById: function(friendId) {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/" + friendId,
      method: 'POST',
      data: {access_token: JSON.parse(localStorage.getItem('access_token')).access_token},
      // need to pass in the access token
      success: function(data) {
        this.props.dispatch(fetchFriend(JSON.parse(data)));
        this.generateRandomKeyword(this.getUserData("books"));
        // console.log("MUSIC TASTE ------->", this.getUserData('music').map(function(item) { return item.name; }));
        var bandArr = this.getUserData('music').map(function(item) { return item.name; })
        console.log("MUSIC TASTE ------->", bandArr);
        var userLocation = this.getUserData('location');
        var birthday = this.getUserData('birthday');
        var range = 365;
        this.getConcerts(userLocation,birthday,range,bandArr);

      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  fetchImageUrlById: function(friendId) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/friends/image",
      method: 'POST',
      data: {friendId : friendId,
             access_token: JSON.parse(localStorage.getItem('access_token')).access_token}, // need to pass in the access token
      success: function(data) {
        this.props.dispatch(saveImageUrl(data));
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  fetchGiftByKeyWord: function(keyword) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/gifts/searchbykeyword",
      method: 'POST',
      data: {keyword : keyword}, // need to pass in the access token
      success: function(gift) {
        this.getSimilarItem(gift.Items.Item[0]);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  //PUT THIS INTO ANOTHER JSX FILE
  getSimilarItem: function(gift) {
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
        this.props.dispatch(saveGifts(gifts));
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  }
});

var mapStateToProps = function(state) {
  return {
    friend : state.friend, // export the portion of the state from index.js Reducers
    gifts : state.gifts,
    image_url : state.image_url
  }
};

export default connect(mapStateToProps)(GiftRecommendations);
