import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import NavBar from '../Components/navbar';
import PORT from '../../config/port';
import WishList from '../Components/wishlist'
import { saveWishlist } from '../Actions/friend'

var PinnedGiftList = React.createClass({

  mixins: [ Navigation ],

  render: function() {
    var items = this.getWishListLength();
    return (
        <div className="pinned-gifts-container">
          <NavBar />
          {(() => {
            if (this.props.friend!== null && items >= 0) {
              return (
                <WishList items={items} user={this.props.user} wishlist={this.state}
                  friend={this.props.friend} removeItem={this.removeFromList}
                  navToFriendRecs={this.navToFriendRecs} />
              );
            } else {
              return (
                <div>Fetching Wishlist Items...</div>
              );
            }
          })()}
        </div>
    );
  },

  getInitialState: function() {
    return {
      books: [],
      music: [],
      etsy: []
    };
  },

  getWishListLength: function() {
    var count = 0;
    for (var category in this.state) {
      count += this.state[category].length;
    }
    return count;
  },

  componentDidMount: function() {
    //fetch friend wish list from database, getting all ASIN of wish list item
    //ping Amazon API to get all those book detail
    //and render on the page
    var friendId = this.props.params.friendId;
    var userId = this.props.user.profile.identities[0].user_id;
    this.getWishList(friendId, userId);
  },

  navToFriendRecs: function(id) {
    this.transitionTo(`/friends/${id}`);
  },

  removeFromList: function(giftId, type, giftObj) {
    // send the clicked book to the server to save on the user's gift list
    // should the req object just be Book's rendered view? this.props.book[0]
    var friendId = this.props.friend.friend.id;
    var userId = this.props.user.profile.identities[0].user_id;

    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/removegift",
      method: 'POST',
      data: {
        type: type,
        giftId : giftId,
        friendId : friendId,
        userId: userId,
        giftObj: giftObj
      },
      success: function(data) {
        // look for the id in each of the categories
        console.log('STATE',this.state)
        for (var category in this.state){
          var list = this.state[category];
          list = list.filter(function(gift) { return gift.giftId !== giftId; });
          var newState = {};
          newState[category] = list;
          this.setState(newState);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  getWishList: function(friendId, userId) {
     $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/friends/wishlist/" + friendId + "/" + userId,
      method: 'GET',
      success: function(data) {
        this.setState({
            music: data.music,
            etsy: data.etsy,
        });
        this.props.dispatch(saveWishlist(data));
        if(data.books && data.books.length > 0){
          this.getGiftFromAmazon(data.books);
        }
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/wishlist", status, err.toString());
      }
    });
  },

  getGiftFromAmazon: function(books) {
     $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/gifts/itemlookup",
      method: 'POST',
      data: {books : books},
      success: function(data) {
        this.setState({books : data});
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/gifts/itemlookup", status, err.toString());
      }
    });
  }

});

var mapStateToProps = function(state) {
  return {
    // export the portion of the state from index.js Reducers
    user : state.user,
    friend: state.friend
  }
};

export default connect(mapStateToProps)(PinnedGiftList);
