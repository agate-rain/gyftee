var React = require('react');

var FacebookFriend = React.createClass({
  //displays facebook friend using app when searching for facebook friends
  render: function() {
    return (
      <div className='friend-row'>
        <div className='friend-picture'>{this.props.friend.picture}</div>
        <div className='friend-name'>{this.props.friend.name}</div>
      </div>
    );
  }
});

module.exports = FacebookFriend;
