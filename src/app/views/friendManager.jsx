var React = require('react');
var FilterableFriends = require('../components/filterableFriends.jsx');
var FriendList = require('../components/friendList.jsx');
var FRIENDS = require('../../data/hardCoded').FRIENDS;

var FriendManager = React.createClass({
  render: function() {
    return (
      <div className="friend-manager">
        <FilterableFriends fbFriends={this.props.facebookFriends}/>
        <FriendList friends={this.props.appFriends}/>
      </div>
    );
  }
});

React.render(<FriendManager facebookFriends={FRIENDS} appFriends={FRIENDS}/>,
  document.getElementById('friend-manager-container'));
