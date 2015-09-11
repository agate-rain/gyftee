import React from 'react';

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
          <div className="logo-responsive">
            <div className="icon-container"><img src="src/client/img/g-icon.png"></img></div>
            <div className="brand-container"><span className="gyftee-text">Gyftee</span></div>
          </div>
          <button className="login-button" onClick={this.showLock}>
            <a className="white-font opacity">SIGN IN</a>
          </button>
        </div>
      </div>
    );
  }
});

export default Home;
