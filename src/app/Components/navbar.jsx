import React from 'react';
import { Navigation, Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

var NavBar = React.createClass({

  mixins: [ Navigation ],

  render: function() {
    var icon = (
      <span className="brand-icon">
        <a href="/friends">
          <img className="brand-icon" src="/src/client/img/gyftee-icon.png" alt="gift box with ribbon" />
          <span>Gyftee</span>
        </a>
      </span>
    );

    return (
      <Navbar className="navbar" brand={icon} toggleNavKey={0}>
        <Nav right eventKey={0}>
          <NavItem eventKey={1} href="/friends/invite">Invite</NavItem>
          <NavItem eventKey={2} href="/logout" onClick={this.logout}>Logout</NavItem>
        </Nav>
      </Navbar>
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
