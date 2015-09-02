var React = require('react');

var LoggedIn = React.createClass({

  callApi: function(data) {
    var that = this;

    $.ajax({
      url: 'http://localhost:3000/api/friends',
      method: 'POST',
      data: {access_token : data}
    }).then(function(jsonFriend) {
      alert("The request to the secured endpoint was successful");
      that.getGift(jsonFriend);
    }, function() {
      alert("Error");
    });
  },

  getGift: function(jsonFriend){
    var that = this;

    $.ajax({
      url: 'http://localhost:3000/api/gifts/searchbykeyword',
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
      url: 'http://localhost:3000/api/gifts/searchsimilargifts',
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

  render: function() {
    if (this.state.profile) {
      this.callApi(this.state.profile.identities[0].access_token)
      return (
        <div className="logged-in-box auth0-box logged-in">

          <img src={this.state.profile.picture} />
          <h2>Welcome {this.state.profile.nickname}</h2>

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
