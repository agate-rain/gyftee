var React = require('react');

var Friend = React.createClass({
  render: function() {
    return (
      <div className='friend-row'>
        <div className='friend-photo'>{this.props.friend.photo}</div>
        <div className='friend-name'>{this.props.friend.name}</div>
        <div className='friend-birthday'>{this.props.friend.birthday}</div>
      </div>
    );
  }
});

module.exports = Friend;
