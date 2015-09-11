var React = require('react');

var Home = React.createClass({
  showLock: function() {
    this.props.lock.show({
      connections: ['facebook'],
      icon: '../../src/client/img/gyftee-icon.png'
    });
  },

  render: function() {
    return (
    <div className="container login-container">
      <div className="container">
        <div className="logo responsive">
          <div className="icon-container"><img src="src/client/img/g-icon.png"></img></div>
          <div className="brand-container"><span className="gyftee-text">Gyftee</span></div>
        </div>
        <a className="white-font login opacity" onClick={this.showLock}>
          <button className="login-button">SIGN IN</button>
        </a>
    </div>
  </div>
  );
  }
});

module.exports = Home;
