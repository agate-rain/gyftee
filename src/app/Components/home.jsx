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
      <div className="login-container">
        <div className="logo-responsive">
          <div className="icon-container"><img src="src/client/img/g-icon.png"></img></div>
          <div className="brand-container"><span className="gyftee-text">Gyftee</span></div>
        </div>
        <button className="login-button" onClick={this.showLock}>
          <a className="white-font opacity">LOG IN</a>
        </button>
      </div>
    );
  }
});

export default Home;
