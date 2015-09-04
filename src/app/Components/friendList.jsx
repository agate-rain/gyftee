var React = require('react');

var Friend = require('./friend');

var FriendList = React.createClass({
  //displays the friend list for the user
  removeFriend: function(i){
    var id = this.props.appFriends[i].id
    console.log('remove friend call with id', id)
    console.log(this.props.actions);
    this.props.actions.removeFriend(id);
  },

  render: function() {
    var friends = [];
    // console.log("HERE",this.props.appFriends)
    this.props.appFriends.map(function(friend, i) {
      var handleRemove = this.removeFriend.bind(this, i);
      friends.push(<Friend friend={friend} key={friend.id} onClick={handleRemove}/>);
    },this);

    return (
      <div className='friend-list'>{friends}</div>
    );
  }
});

module.exports = FriendList;
