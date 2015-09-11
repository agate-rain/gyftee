import React from 'react';
import { Navigation, Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { FriendList } from './friendList'

var NavBar = React.createClass({

  mixins: [ Navigation ],

  navToFriendList: function() {
    this.transitionTo(`/friends/`);
  },

  navToInvite: function() {
    this.transitionTo(`/friends/invite`);
  },

  navToLogout: function() {
    this.transitionTo(`/login`);
  },

  render: function() {
    var icon = (
      <span className="brand-icon">
        <a onClick={this.navToFriendList.bind(this)}>
          <img className="brand-icon" src="/src/client/img/gyftee-icon.png" alt="gift box with ribbon" />
          <span>Gyftee</span>
        </a>
      </span>
    );

    return (
      <Navbar className="navbar-fixed-top navbar" brand={icon} toggleNavKey={0}>
        <Nav right eventKey={0}>
          <NavItem eventKey={1} onClick={this.navToInvite.bind(this)}>Invite</NavItem>
          <NavItem eventKey={2} onClick={this.navToLogout.bind(this), this.logout}>Logout</NavItem>
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
