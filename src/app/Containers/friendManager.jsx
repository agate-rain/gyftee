var React = require('react');
var FilterableFriends = require('../Components/filterableFriends');
var FriendList = require('../Components/friendList');
var FRIENDS = require('../../../data/hardCoded').FRIENDS;
var PORT = require('../../config/port.js');

var FriendManager = React.createClass({

  render: function() {
    return (
      <div className="friend-manager">
        <FilterableFriends fbFriends={this.state.fbFriends} />
        <FriendList friends={FRIENDS} />
      </div>
    );
  },

  getInitialState: function() {
    return { fbFriends: [] }
  },

  componentDidMount: function() {
    this.fetchFacebookFriends();
    //setInterval and use polling to run this function at specfic intervals
    //could also use socketIO
  },

  fetchFacebookFriends: function() {
    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends",
      data: {access_token: JSON.parse(localStorage.getItem('access_token')).access_token}, // need to pass in the access token
      dataType: 'json',
      success: function(data) {
        console.log(JSON.stringify(data, null, '\t'));
        this.setState({fbFriends: data}); // check
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }.bind(this)
    });
  },

  fetchAppFriends: function() {

  }

});

module.exports = FriendManager;
