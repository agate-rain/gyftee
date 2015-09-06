var React = require('react');

var Home = React.createClass({
  showLock: function() {
    this.props.lock.show();
  },

  render: function() {
    return (
      <View row expand>
    <div className="login-container flex-container responsive">

      <div className="container">

      <div className="logo">
        <div className="icon-container"><img src="src/client/img/gyftee-icon.png"></img></div>
        <div className="brand-container"><span className="gyftee-text">gyftee</span></div>
      </div>

      <div className="login-button-container">
      <a onClick={this.showLock} className="login-button btn">Sign In</a>
      </div>

    </div>
   
  </div>
  </View>
  );
  }
});

module.exports = Home;
