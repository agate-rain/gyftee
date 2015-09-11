import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import PORT from '../../config/port.js';
import { getUser } from '../Actions/user';
import Q from 'q';

var LoggedIn = React.createClass({

  mixins: [ Navigation ],

  navToFriends: function() {
    this.transitionTo(`/friends`);
  },

  componentDidMount: function() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        localStorage.removeItem('userToken');
        this.props.lock.logout({ref: 'window.location.href'});
      }
      console.log("profile in loggedIn", profile);
      this.props.dispatch(getUser(profile));
      this.navToFriends();
    }.bind(this));
  },

  componentDidUpdate: function() {
    localStorage.setItem('access_token', JSON.stringify({'access_token' : this.props.profile.identities[0].access_token }))
    var profile = {
      user_id : this.props.profile.identities[0].user_id,
      birthday : this.props.profile.birthday,
      mutual_friends : this.props.profile.context.mutual_friends.data
    }
    this.saveUserToDB(profile);
  },

  assembleImage : function(access_token){
    var albumArr = this.props.friend.friend.albums.data;
    console.log(albumArr)
  },

  getImage : function(albumId, access_token) {
    FB.api('/v2.4/' + albumId + '/photos',
      'GET',
      {"fields":"source,url,message,place", "access_token": access_token},
      function(response) {
        response.data.forEach(function(photo){
          console.log(photo.source)
        });
    });
  },

  saveUserToDB: function(profile){
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/users/save',
      method: 'POST',
      data: {user : profile},
      success: function(savedUser) {
        if (typeof savedUser === 'string') {
          console.log('USER EXISTS')
        } else {
          console.log('USER SAVED TO DB', savedUser);
        }
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/users/save", status, err.toString());
      }
    });
  },

  render: function() {
    if (this.props.profile) {
      return (
        <div className="logged-in-box auth0-box logged-in">
          <p>You are logged in!</p>
        </div>
      );
    } else {
      return (
        <div className="logged-in-box auth0-box logged-in">
          <h1 id="logo"><img src="https://cdn.auth0.com/blog/auth0_logo_final_blue_RGB.png" /></h1>
        </div>
      );
    }
  }
});

var mapStateToProps = function(state) {
  return {
    profile: state.user.profile
  }
};

export default connect(mapStateToProps)(LoggedIn);
