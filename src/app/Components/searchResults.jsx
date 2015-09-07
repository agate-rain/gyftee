var React = require('react');

var FacebookFriend = require('./facebookFriend');

var SearchResults = React.createClass({
  render: function() {
    var facebookFriends = [];

    this.props.friends.forEach(function(friend) {
      facebookFriends.push(<FacebookFriend friend={friend} key={friend.id}/>);
    });
    return (
        <div className="bday-list-container">
          <div className="bday-list-body seafoam">
            {facebookFriends}
          </div>
        </div>
    )
  }
});

module.exports = SearchResults;
