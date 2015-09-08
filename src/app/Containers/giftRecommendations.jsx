import {connect} from 'react-redux';
import {fetchFriend} from '../Actions/friend'

var Slider = require('react-slick');
var React = require('react');
var UserHeader = require('../Components/userHeader');
var Thumbnail = require('../Components/thumbnail');
var RecommendationFilters = require('../Components/recommendationFilters');
var BookList = require('../Components/bookList');
var BOOKS = require('../../../data/hardCoded').BOOKS;
var USER = require('../../../data/hardCoded').USER;
var PORT = require('../../config/port.js');

var GiftRecommendations = React.createClass({

  render: function() {
    return (
        <div className="recommendations">
          <UserHeader user={this.props.friend[0]} />
          <RecommendationFilters />
          <BookList amazonBooks={BOOKS} />
        </div>
    );

  },

  getInitialState: function() {
    return { friend: [], gifts: []}
  },

  componentDidMount: function() {
    var friendId = window.location.href.split('/')[4];
    this.fetchFriendById(friendId);
    console.log(this.props.friend[0]);
    // this.generateRandomKeyword(this.props.friend[0].books.data)
  },

  generateRandomKeyword: function(userArray){
    var randomIndex = Math.floor(Math.random() * (userArray.length - 1) + 1);
    var keyWord;
  },

  fetchFriendById: function(friendId) {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/" + friendId,
      method: 'POST',
      data: {access_token: JSON.parse(localStorage.getItem('access_token')).access_token,
            friendId : friendId}, // need to pass in the access token
      success: function(data) {
        this.props.dispatch(fetchFriend(JSON.parse(data)));
        // = JSON.parse(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  fetchGiftByKeyWord: function(keywordArray) {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/gifts/searchbykeyword" + friendId,
      method: 'POST',
      data: {keywordArray : keywordArray}, // need to pass in the access token
      success: function(gift) {
        // var ASIN = gift.Items.Item[0].ASIN;
        // this.getSimilarItem(ASIN);
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
      data: {ASIN : ASIN}
    }).then(function(similargifts) {
      similargifts.Items.Item.forEach(function(gift){
        console.log(gift);
      })
    });
  },
});

var mapStateToProps = function(state) {
  return {
    friend : state.friend // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(GiftRecommendations);

module.exports = GiftRecommendations;
