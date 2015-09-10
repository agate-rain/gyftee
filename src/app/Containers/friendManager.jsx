import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../Actions/user';
import FilterableFriends from '../Components/filterableFriends';
import FriendList from '../Components/friendList';
import PORT from '../../config/port.js';

var FriendManager = React.createClass({

  render: function() {

    return (
      <div className="friend-manager">
        <FriendList appFriends={this.props.friends} user={this.props.profile} />
      </div>
    );
  },

  componentDidMount: function() {
    // this.fetchFacebookFriends();
    this.fetchAppFriends();
    //setInterval and use polling to run this function at specfic intervals
    //could also use socketIO
  },

  fetchFacebookFriends: function() {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/invitableFriends",
      method: 'POST',
      data: {access_token: JSON.parse(localStorage.getItem('access_token')).access_token}, // need to pass in the access token
      success: function(data) {
        this.setState({fbFriends: JSON.parse(data)}); // check
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends/invitableFriends", status, err.toString());
      }
    });
  },

  fetchAppFriends: function() {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/",
      method: 'POST',
      data: {access_token: JSON.parse(localStorage.getItem('access_token')).access_token}, // need to pass in the access token
      success: function(data) {
        this.props.dispatch(fetchFriends(JSON.parse(data)));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

});

FriendManager.propTypes = {
  user: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

var mapStateToProps = function(state) {
  return {
    profile: state.user.profile,
    friends: state.user.friends,
  }
};

export default connect(mapStateToProps)(FriendManager);
