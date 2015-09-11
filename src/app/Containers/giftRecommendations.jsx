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
import utils from '../Utils/utils'

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


  componentDidMount: function() {
    var friendId = window.location.href.split('/')[4];
    utils.fetchFriendById(friendId, function(friend){
      this.props.dispatch(friend);

      this.generateRandomKeyword(utils.getUserData("books", this.props.friend.friend ));
      var bandArr = utils.getUserData('music', this.props.friend.friend).map(function(item) { return item.name; })
      console.log("MUSIC TASTE ------->", bandArr);
      var userLocation = utils.getUserData('location', this.props.friend.friend);
      var birthday = utils.getUserData('birthday', this.props.friend.friend);
      var range = 365;
      utils.getConcerts(userLocation,birthday,range,bandArr, function(data){
                // console.log("CONCERT RESULTS------>", JSON.stringify(data));
      });
    }.bind(this));

    utils.fetchImageUrlById(friendId, function(imageURLByID){
      this.props.dispatch(saveImageUrl(imageURLByID));
    }.bind(this));
    // this.getConcerts();
    // this.getMusic(friendId);
  },
  /* AMAZON BOOKS */
  generateRandomKeyword: function(userArray){
    var randomIndex = Math.floor(Math.random() * (userArray.length - 1) + 1);
    var keyWord = userArray[randomIndex].name;
    utils.fetchGiftByKeyWord(keyWord, function(gift){
      this.props.dispatch(saveGifts(gift));
    }.bind(this));
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
