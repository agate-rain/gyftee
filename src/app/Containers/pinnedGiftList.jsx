import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../Components/navbar';
import PORT from '../../config/port';
import WishList from '../Components/wishlist'

var PinnedGiftList = React.createClass({

  render: function() {
    if(this.state.wishlist !== '') {
      return (
          <div className="gift">
            <NavBar />
            <WishList user={this.props.user} wishlist={this.state.wishlist} friend={this.props.friend} removeItem={this.removeFromList}/>
          </div>
      );
    } else {
      return (
        <div className="gift">
          <NavBar />
          Fetching Wishlist Items...
        </div>
      );
    }
  },

  removeFromList: function(ASIN) {
    // send the clicked book to the server to save on the user's gift list
    // should the req object just be Book's rendered view? this.props.book[0]

    var friendId = this.props.friend.friend.id;
    var userId = this.props.user.profile.identities[0].user_id;

    console.log(">>>>>> FRIEND ID", this.props.friend);
    console.log(">>>>>> USER ID", userId);
    console.log(">>>>>> ASIN", ASIN);

    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/removegift",
      method: 'POST',
      data: {ASIN : ASIN,
            friendId : friendId,
            userId: userId}, // need to pass in the access token
      success: function(data) {
        var newWishList = this.state.wishlist.filter(function(gift) { return gift.ASIN !== ASIN; });
        this.setState({wishlist : newWishList});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  getInitialState: function() {
    return {
      wishlist: ''
    };
  },

  componentDidMount: function() {
    //fetch friend wish list from database, getting all ASIN of wish list item
    //ping Amazon API to get all those book detail
    //and render on the page
    var friendId = this.props.params.friendId;
    var userId = this.props.user.profile.identities[0].user_id;
    this.getWishList(friendId, userId);
  },

  getWishList: function(friendId, userId) {
     $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/friends/wishlist/" + friendId + "/" + userId,
      method: 'GET',
      success: function(data) {
        console.log('GET WISH LIST DATA',data)
        this.getGiftFromAmazon(data);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/wishlist", status, err.toString());
      }
    });

  },

  getGiftFromAmazon: function(giftArr) {
     $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/gifts/itemlookup",
      method: 'POST',
      data: {giftArr : giftArr},
      success: function(data) {
        this.setState({wishlist : data});
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
