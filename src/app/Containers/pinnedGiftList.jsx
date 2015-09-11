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
            <WishList wishlist={this.state.wishlist} friend={this.props.friend}/>
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
