var React = require('react');

var Home = React.createClass({
  showLock: function() {
    this.props.lock.show();
  },

  render: function() {
    return (
    <div className="container login-container">
      <div className="container">
        <div className="logo responsive">
          <div className="icon-container"><img src="src/client/img/g-icon.png"></img></div>
          <div className="brand-container"><span className="gyftee-text">gyftee</span></div>
        </div>
        <button className="login-button">
          <a className="white-font opacity" onClick={this.showLock}>SIGN IN</a>
        </button>
    </div>
  </div>
  );
  }
});

module.exports = Home;
