import React from 'react';
import { connect } from 'react-redux';
import { fetchFriend, saveImageUrl } from '../Actions/friend'
import { saveGifts } from '../Actions/gifts'
import Slider from 'react-slick';
import FriendHeader from '../Components/userHeader';
import Thumbnail from '../Components/thumbnail';
import RecommendationFilters from '../Components/recommendationFilters';
import BookList from '../Components/bookList';
import PORT from '../../config/port.js';

var GiftRecommendations = React.createClass({

  render: function() {
    return (
        <div className="recommendations">
          <FriendHeader user={this.props.friend} url ={this.props.friend.image_url} />
          <RecommendationFilters />
          <BookList amazonBooks={this.props.gifts} />
        </div>
    );

  },

  getInitialState: function() {
    return { friend: [], gifts: []}
  },

  componentDidMount: function() {
    var friendId = window.location.href.split('/')[4];
    this.fetchFriendById(friendId);
    this.fetchImageUrlById(friendId);

    // this.generateRandomKeyword(this.props.friend[0].books.data)
  },

  generateRandomKeyword: function(userArray){
    var randomIndex = Math.floor(Math.random() * (userArray.length - 1) + 1);
    var keyWord = userArray[randomIndex].name;
    this.fetchGiftByKeyWord(keyWord);
  },

  fetchFriendById: function(friendId) {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/" + friendId,
      method: 'POST',
      data: {access_token: JSON.parse(localStorage.getItem('access_token')).access_token,
            friendId : friendId}, // need to pass in the access token
      success: function(data) {
        this.props.dispatch(fetchFriend(JSON.parse(data)));
        this.generateRandomKeyword(this.props.friend.friend[0].books.data);
        // = JSON.parse(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  fetchImageUrlById: function(friendId) {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/image",
      method: 'POST',
      data: {friendId : friendId,
             access_token: JSON.parse(localStorage.getItem('access_token')).access_token}, // need to pass in the access token
      success: function(data) {
        this.props.dispatch(saveImageUrl(data));
        // this.generateRandomKeyword(this.props.friend[0].books.data);
        // = JSON.parse(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  fetchGiftByKeyWord: function(keyword) {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/gifts/searchbykeyword",
      method: 'POST',
      data: {keyword : keyword}, // need to pass in the access token
      success: function(gift) {
        var ASIN = gift.Items.Item[0].ASIN;
        this.getSimilarItem(ASIN);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  //PUT THIS INTO ANOTHER JSX FILE
  getSimilarItem: function(ASIN){
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/searchsimilargifts',
      method: 'POST',
      data: {ASIN : ASIN},
      success: function(similargifts) {
        var gifts = []
        similargifts.Items.Item.forEach(function(gift){
          gifts.push({category: "book", details: gift});
        });
        this.props.dispatch(saveGifts(gifts));
      }.bind(this),
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
