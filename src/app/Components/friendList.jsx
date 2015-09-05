var React = require('react');

var Friend = require('./friend');

var FriendList = React.createClass({
  // displays the friend list for the user
  // removeFriend: function(i){
  //   var id = this.props.appFriends[i].id;
  //   console.log('remove friend call with id', id)
  //   // console.log(this.props.actions);
  //   // console.log(id);
  //   this.props.actions.removeFriend(id);
  // },
  render: function() {
    // console.log("HERE",this.props.appFriends)
    return (
      <div className='friend-list'>
        {this.props.appFriends.map(function(friend,i){
          return (
            <Friend friend={friend} key={i} onClick={this.props.actions.removeFriend.bind(this, i)}/>
            );
        },this)}

      </div>
    );
  }
});

module.exports = FriendList;
