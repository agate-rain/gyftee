import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../Components/navbar';
import PORT from '../../config/port';
import WishList from '../Components/wishlist'

var PinnedGiftList = React.createClass({

  render: function() {
    if(this.state){
      return (
          <div className="gift">
            <NavBar />
            <WishList wishlist={this.state.wishlist}/>
          </div>
      );
    }else{
      return (
        <div className="gift">
          <NavBar />
          Fetching Wishlist Items...
        </div>
      );
    }
  },

  setInitialState: function(){
    return {
      wishlist: ''
    }
  },

  componentDidMount: function(){
    //fetch friend wish list from database, getting all ASIN of wish list item
    //ping Amazon API to get all those book detail
    //and render on the page
    var friendId = window.location.href.split('/')[4];
    var userId = this.props.user.profile.identities[0].user_id;
    this.getWishList(friendId, userId);

  },

  getWishList: function(friendId, userId){
     $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/getwishlist/" + friendId + "/" + userId,
      method: 'GET',
      success: function(data) {
        this.getGiftFromAmazon(data);
        // = JSON.parse(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/getWishlist", status, err.toString());
      }
    });

  },

  getGiftFromAmazon: function(giftArr){
     $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/gifts/itemlookup/",
      method: 'POST',
      data: {giftArr : giftArr},
      success: function(data) {
        this.setState({wishlist : data});
        // = JSON.parse(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  }

});

var mapStateToProps = function(state) {
  return {
    // export the portion of the state from index.js Reducers
    user : state.user
  }
};

export default connect(mapStateToProps)(PinnedGiftList);
