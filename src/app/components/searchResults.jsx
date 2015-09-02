var React = require('react');

var FacebookFriend = require('./facebookFriend.jsx');

var SearchResults = React.createClass({
  render: function() {
    var facebookFriends = [];
    this.props.friends.forEach(function(friend) {
      facebookFriends.push(<FacebookFriend friend={friend} key={friend.id}/>);
    });
    return (
      <div className='search-results'>{facebookFriends}</div>
    )
  }
});

module.exports = SearchResults;
