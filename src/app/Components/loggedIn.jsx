var React = require('react');
var PORT = require('../../config/port.js')

var LoggedIn = React.createClass({

  callApi: function(data) {
    var that = this;

    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/friends',
      method: 'POST',
      data: {access_token : data}
    }).then(function(jsonFriend) {
      alert("The request to the secured endpoint was successful");
      that.getGift(jsonFriend);
    }, function() {
      alert("Error");
    });
  },

  logout: function() {
    localStorage.removeItem('userToken');
    this.props.lock.logout({ref: 'window.location.href'});
    // Go to home with your React Router
  },

  getGift: function(jsonFriend){
    var that = this;

    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/searchbykeyword',
      method: 'POST',
      data: {friend : jsonFriend}
    }).then(function(gift) {
      var ASIN = gift.Items.Item[0].ASIN;
      that.getSimilarItem(ASIN);
    });
  },


  //PUT THIS INTO ANOTHER JSX FILE
  getSimilarItem: function(ASIN){
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/searchsimilargifts',
      method: 'POST',
      data: {ASIN : ASIN}
    }).then(function(similargifts) {
      similargifts.Items.Item.forEach(function(gift){
        console.log(gift);
      })
    });
  },

  getInitialState: function() {
    return {
      profile: null
    }
  },

  componentDidMount: function() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        alert("Error loading the Profile");
      }
      this.setState({profile: profile});
    }.bind(this));
  },

  componentDidUpdate: function() {
    this.callApi(this.state.profile.identities[0].access_token);
    localStorage.setItem('access_token', JSON.stringify({'access_token' : this.state.profile.identities[0].access_token }))
  },

  render: function() {
    if (this.state.profile) {
      return (
        <div className="logged-in-box auth0-box logged-in">
          <img src={this.state.profile.picture} />
          <h2>Welcome {this.state.profile.nickname}</h2>
          <button onClick={this.logout} className="btn btn-lg btn-primary">Logout</button>
        </div>);
    } else {
      return (
        <div className="logged-in-box auth0-box logged-in">
          <h1 id="logo"><img src="https://cdn.auth0.com/blog/auth0_logo_final_blue_RGB.png" /></h1>
        </div>);
    }
  }
});

module.exports = LoggedIn;
