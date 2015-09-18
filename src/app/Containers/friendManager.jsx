import React from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../Actions/user';
import { fetchFriend } from '../Actions/friend';
import FilterableFriends from '../Components/filterableFriends';
import FriendList from '../Components/friendList';
import NavBar from '../Components/navbar';
import PORT from '../../config/port.js';
import { Navigation } from 'react-router';

var FriendManager = React.createClass({

  mixins: [ Navigation ],

  render: function() {

    return (
      <div className="friend-manager">
      <NavBar />
        <FriendList appFriends={this.props.friends} user={this.props.profile} navToFriendRecs={this.navToFriendRecs}/>
      </div>
    );
  },

  navToFriendRecs: function(id) {
    this.fetchFriendById(id);
    this.transitionTo(`/friends/${id}`);
  },

  componentDidMount: function() {
    this.fetchAppFriends();
  },

  fetchFacebookFriends: function() {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/friends/invitableFriends",
      method: "POST",
      data: {access_token: JSON.parse(localStorage.getItem("access_token")).access_token},
      // need to pass in the access token
      dataType: "json",
      success: function(data) {
        this.setState({fbFriends: data}); // check
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/invitableFriends", status, err.toString());
      }
    });
  },

  fetchAppFriends: function() {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/friends/",
      method: "POST",
      data: {access_token: JSON.parse(localStorage.getItem("access_token")).access_token},
      // need to pass in the access token
      dataType: "json",
      success: function(data) {
        this.props.dispatch(fetchFriends(data));
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  fetchFriendById: function(friendId) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/friends/" + friendId,
      method: "POST",
      data: {access_token: JSON.parse(localStorage.getItem("access_token")).access_token},
      // need to pass in the access token
      dataType: "json",
      success: function(data) {
        this.props.dispatch(fetchFriend(data));
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  }

});

var mapStateToProps = function(state) {
  return {
    profile: state.user.profile,
    friends: state.user.friends,
    friend: state.friend
  }
};

export default connect(mapStateToProps)(FriendManager);
