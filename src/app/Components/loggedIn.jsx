import React from 'react';
import { connect } from 'react-redux';
import PORT from '../../config/port.js';
import { getUser } from '../Actions/user';

var LoggedIn = React.createClass({

  callApi: function(data) {
    var that = this;
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/friends',
      method: 'POST',
      data: {access_token : data}
    }).then(function(jsonFriend) {
      alert("The request to the secured endpoint was successful");
      location.href = location.origin;
    }, function() {
      alert("Error");
    });
  },

  logout: function() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('access_token');
    this.props.lock.logout({ref: 'window.location.href'});
    // Go to home with your React Router
  },

  componentDidMount: function() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        localStorage.removeItem('userToken');
        this.props.lock.logout({ref: 'window.location.href'});
      }
      this.props.dispatch(getUser(profile));
    }.bind(this));
  },

  componentDidUpdate: function() {
    localStorage.setItem('access_token', JSON.stringify({'access_token' : this.props.profile.identities[0].access_token }))
  },

  render: function() {
    if (this.props.profile) {
      return (
        <div className="logged-in-box auth0-box logged-in">
        <p>You are logged in!</p>
          <button onClick={this.logout} className="btn btn-lg btn-primary">Logout</button>
        </div>);
    } else {
      return (
        <div className="logged-in-box auth0-box logged-in">
          <h1 id="logo"><img src="https://cdn.auth0.com/blog/auth0_logo_final_blue_RGB.png" /></h1>
        </div>);
    }
  }
});

var mapStateToProps = function(state) {
  return {
    profile: state.user.profile
  }
};

export default connect(mapStateToProps)(LoggedIn);
