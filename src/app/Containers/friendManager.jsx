import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {PropTypes} from 'react';
// var React = require('react');
var userActions = require('../Actions/user');
var FilterableFriends = require('../Components/filterableFriends');
var FriendList = require('../Components/friendList');
var PORT = require('../../config/port.js');

var FriendManager = React.createClass({

  render: function() {
    const {friends, dispatch } = this.props;
    const actions = bindActionCreators(userActions, dispatch);
    return (
      <div className="friend-manager">
        <FilterableFriends fbFriends={this.state.fbFriends} />
        <FriendList appFriends={this.state.appFriends} actions={actions} />
      </div>
    );
  },

  getInitialState: function() {
    return { fbFriends: [], appFriends: [] }
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
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }.bind(this)
    });
  },

  fetchAppFriends: function() {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/",
      method: 'POST',
      data: {access_token: JSON.parse(localStorage.getItem('access_token')).access_token}, // need to pass in the access token
      success: function(data) {
        this.setState({appFriends: JSON.parse(data)}); // check
        userActions.fetchFriends(JSON.parse(data));
        console.log('fetching app friends')
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }.bind(this)
    });
  }

});

FriendManager.propTypes = {
  friends: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

var mapStateToProps = function(state){
  return {
    friends : state.friends
  }
}
export default connect(mapStateToProps)(FriendManager);

