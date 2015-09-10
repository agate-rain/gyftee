import React from 'react';
import { Navigation, Link } from 'react-router';
import { connect } from 'react-redux';

var NavBar = React.createClass({

  mixins: [ Navigation ],

  render: function() {
    return (
      <div className="home-container">
        <nav className="navbar navbar-fixed-top gyftee-nav teal" role="navigation">
          <div className="container">
            <div className="navbar-toggle" data-toggle="collapse">
              <span className="icon-bar white"></span>
              <span className="icon-bar white"></span>
              <span className="icon-bar white"></span>
            </div>

            <div className="navbar-brand">
              <Link to="/friends" className="white-font">
                <img className="brand-icon" src="../../src/client/img/g-icon.png"/>
                Gyftee
              </Link>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link className="nav-menu-item" onClick={this.logout.bind(this)}>Logout</Link>
                </li>
                <li>
                  <Link className="nav-menu-item">Profile</Link>
                </li>
              </ul>
            </div>

          </div>
        </nav>
      </div>
    );
  },

  logout: function() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('access_token');
    this.props.lock.logout({ref: 'localhost:3000/login'});
  }

});

var mapStateToProps = function(state) {
  return {
    lock: state.user.lock
  };
};

export default connect(mapStateToProps)(NavBar);
