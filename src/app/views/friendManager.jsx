var React = require('react');
var FilterableFriends = require('../components/filterableFriends');
var FriendList = require('../components/friendList');
var FRIENDS = require('../../../data/hardCoded').FRIENDS;

var FriendManager = React.createClass({
  render: function() {
    return (
      <div className="friend-manager">
        <FilterableFriends fbFriends={FRIENDS}/>
        <FriendList friends={FRIENDS}/>
      </div>
    );
  }
});

module.exports = FriendManager;
