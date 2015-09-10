var React = require('react');

var Home = React.createClass({
  showLock: function() {
    this.props.lock.show();
  },

  render: function() {
    return (
    <div className="login-container container-fluid flex-container responsive">
      <div className="container">
      <div className="logo responsive">
        <div className="icon-container"><img src="src/client/img/g-icon.png"></img></div>
        <div className="brand-container"><span className="gyftee-text">gyftee</span></div>
      </div>
      <div className="login-button-container">
      <a onClick={this.showLock} className="btn btn-default dark-teal proxima white-font btn-block btn">Sign In</a>
      </div>
    </div>
  </div>
  );
  }
});

module.exports = Home;
