import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import PORT from '../../config/port.js';
import { getUser } from '../Actions/user';

var LoggedIn = React.createClass({

  mixins: [ Navigation ],

  //TODO REMOVE ONCE LOGOUT FUNCTIONALITY WORKS IN NAV
  logout: function() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('access_token');
    this.props.lock.logout({ref: 'window.location.href'});
    //TODO LOGOUT BUTTON IN NAV, WHICH REDIRECTS TO ??? LOGIN PAGE?
  },

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

  saveUserToDB: function(profile){
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/users/saveuser',
      method: 'POST',
      data: {user : profile}, // need to pass in the access token
      success: function(savedUser) {
        if(typeof savedUser === 'string'){
          console.log('USER EXISTS')
        }else{
          console.log('USER SAVED TO DB', savedUser);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/users/saveduser", status, err.toString());
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
