var React = require('react');

var Friend = require('./friend');

var FriendList = React.createClass({
  //displays the friend list for the user
  render: function() {
    var friends = [];
    this.props.friends.forEach(function(friend) {
      friends.push(<Friend friend={friend} key={friend.id}/>);
    });
    return (
      <div className='friend-list'>{friends}</div>
    );
  }
});

module.exports = FriendList;
