var React = require('react');

var SearchResults = require('./searchResults');

var FilterableFriends = React.createClass({
  getInitialState: function () {
    return {
      filterText: '',
      resultsVisible: false
    };
  },

  filterFacebookFriends: function(e) {
    console.log(this.state);
    this.setState({filterText: e.target.value});

    if (this.state.filterText.length === 0) {

      this.setState({resultsVisible: false});

    } else {

      this.setState({resultsVisible: true});

    }
  },

  showSearchResults: function(e) {
    React.findDOMNode(this.refs.filterText).focus();
  },

  render: function() {
    var friends = this.props.fbFriends,
        filterText = this.state.filterText.trim().toLowerCase();
        // friends = JSON.parse(friends);
        // friends = JSON.parse(friends);
        // console.log(friends)
        // friends = JSON.parse(friends);
    if (filterText.length > 0) {
      friends = friends.filter(function(friend) {
        return friend.name.toLowerCase().match( filterText );
      });
    }
    return (
      <div className="filtered-friends">
        <input ref="filterText" type="text" placeholder="Search for your friends" value={this.state.filterText} onChange={this.filterFacebookFriends}/>
        { this.state.resultsVisible ? <SearchResults friends={friends}/> : null }
      </div>
    );
  }
});

module.exports = FilterableFriends;
