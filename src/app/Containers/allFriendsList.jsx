import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../Components/navbar';
import Friend from '../Components/friend';
import { removeFriend } from '../Actions/user';
import { Navigation } from 'react-router';
import FilterableFriends from '../Components/filterableFriends';
import PORT from '../../config/port.js';

var AllFriendsList = React.createClass({

  render: function() {
    return (
      <div className='all-friend-list'>
        <NavBar />
        <div className="welcome-container container flex-container">
        </div>
        <FilterableFriends fbFriends={this.state.fbFriends}/>
      </div>
    );
  },

  getInitialState: function() {
    return { fbFriends: [] }
  },

  componentDidMount: function() {
    this.fetchFacebookFriends();
  },

  fetchFacebookFriends: function() {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/invitableFriends",
      method: 'POST',
      data: {access_token: JSON.parse(localStorage.getItem('access_token')).access_token}, // need to pass in the access token
      success: function(data) {
        this.setState({fbFriends: JSON.parse(data)}); // check
        console.log(this.state.fbFriends);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/invitableFriends", status, err.toString());
      }
    });
  },
});

export default AllFriendsList;
