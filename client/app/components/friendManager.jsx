var Friend = React.createClass({
  render: function() {
    return (
      <div className='friend-row'>
        <div className='friend-name'>{this.props.friend.name}</div>
        <div className='friend-birthday'>{this.props.friend.birthday}</div>
      </div>
    );
  }
});

var FriendList = React.createClass({
  render: function() {
    var friends = [];
    this.props.pals.forEach(function(friend) {
      friends.push(<Friend friend={friend} key={friend.id}/>);
    });
    return (
      <div className='friend-list'>{friends}</div>
    );
  }
});

var Search = React.createClass({
  render: function() {
    return (
      <form className="search friend-search">
        <input type="text" placeholder="Search for your friends"/>
      </form>
    );
  }
});

var FriendManager = React.createClass({
  render: function() {
    return (
      <div className="friend-manager">
        <Search/>
        <FriendList pals={this.props.friends}/>
      </div>
    );
  }
});

var FRIENDS = [
  {
    "name": "Jennie Kim Eldon",
    "id": "202385",
    "birthday": "01/02/1999"
  },
  {
    "name": "Debarshi Chaudhuri",
    "id": "713437",
    "birthday": "01/01/1999"
  },
  {
    "name": "Nicolas Artman",
    "id": "6421341",
    "birthday": "01/01/1999"
  },
  {
    "name": "Vitaliy Levit",
    "id": "10104361677485275",
    "birthday": "01/01/1999"
  },
  {
    "name": "Michael Wales",
    "id": "505644766",
    "birthday": "01/01/1999"
  },
  {
    "name": "Gundega Dekena",
    "id": "534614898",
    "birthday": "01/01/1999"
  },
  {
    "name": "Gabriel Sanchez",
    "id": "1149750337",
    "birthday": "01/01/1999"
  },
  {
    "name": "Lakshman Mody",
    "id": "1223850500",
    "birthday": "01/01/1999"
  }
]

React.render(<FriendManager friends={FRIENDS}/>, document.getElementById('friend-manager-container'));