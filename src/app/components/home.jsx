var React = require('react');

var Home = React.createClass({
  showLock: function() {
    this.props.lock.show();
  },

  render: function() {
    return (
    <div className="login-box auth0-box before">
      <img src="../img/mipmap-xxxhdpi/ic_launcher.png" />
      <h1>Gyftee</h1>
      <a onClick={this.showLock} className="btn btn-primary btn-lg btn-login btn-block">Sign In</a>
    </div>);
  }
});

module.exports = Home;
