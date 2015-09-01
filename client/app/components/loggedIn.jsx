var LoggedIn = React.createClass({

  callApi: function(data) {
    $.ajax({
      url:    'http://localhost:3000/api/friends',
      method: 'POST',
      data:   {access_token : data}
    }).then(function(data) {
      alert("The request to the secured endpoint was successful");
    }).then(function(data) {
      $.ajax({
        url:    'http://localhost:3000/api/gifts',
        method: 'POST',
        data:   data
      });
    }).then(function(gift) {
      console.log(gift);
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
